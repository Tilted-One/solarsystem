import * as THREE from "three";
import type { Planet } from "@/data/planets";

export type SceneHandle = {
  dispose: () => void;
};

export function createScene(
  container: HTMLDivElement,
  planet: Planet
): SceneHandle {
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 400;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050509);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(
    typeof window !== "undefined" ? window.devicePixelRatio : 1
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  group.position.x = 0.8;
  scene.add(group);

  const textureLoader = new THREE.TextureLoader();

  const isEarth = planet.name === "Earth";
  const maxRadiusScale = 11.2;
  const sizeRatio = THREE.MathUtils.clamp(
    planet.radiusScale / maxRadiusScale,
    0,
    1
  );
  const radius = 1.8 + sizeRatio * 0.8;

  const fovRad = THREE.MathUtils.degToRad(camera.fov);
  const targetScreenFraction = 0.9;
  const startingCameraZ =
    radius / (targetScreenFraction * Math.tan(fovRad / 2));

  const minZoom = startingCameraZ * 0.5;
  const maxZoom = startingCameraZ * 1.4;
  camera.position.set(0, 0, startingCameraZ);

  const geometry = new THREE.SphereGeometry(radius, 96, 96);
  const surfaceTexture = textureLoader.load(planet.texture);

  const material: THREE.Material =
    isEarth && planet.nightTexture
      ? new THREE.ShaderMaterial({
          uniforms: {
            dayTexture: { value: surfaceTexture },
            nightTexture: {
              value: textureLoader.load(planet.nightTexture),
            },
            sunDirection: { value: new THREE.Vector3(5, 64, -10) },
          },
          vertexShader: `
            varying vec3 vNormal;
            varying vec2 vUv;

            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D dayTexture;
            uniform sampler2D nightTexture;
            uniform vec3 sunDirection;

            varying vec3 vNormal;
            varying vec2 vUv;

            void main() {
              vec3 sunDirView = normalize((viewMatrix * vec4(sunDirection, 0.0)).xyz);
              float light = max(dot(vNormal, sunDirView), 0.0);

              float dayAmount = smoothstep(0.08, 0.5, light);
              float nightAmount = 1.0 - dayAmount;

              vec3 dayColor = texture2D(dayTexture, vUv).rgb;
              vec3 nightColor = texture2D(nightTexture, vUv).rgb;

              nightColor *= 1.6;

              vec3 color = dayColor * dayAmount + nightColor * nightAmount;

              gl_FragColor = vec4(color, 1.0);
            }
          `,
        })
      : new THREE.MeshStandardMaterial(
          isEarth
            ? {
                map: surfaceTexture,
                metalness: 0,
                roughness: 0.55,
              }
            : {
                map: surfaceTexture,
                metalness: 0.15,
                roughness: 0.8,
              }
        );

  const sphere = new THREE.Mesh(geometry, material);
  sphere.rotation.z = THREE.MathUtils.degToRad(planet.axialTiltDeg);
  group.add(sphere);

  const cloudMeshes: THREE.Mesh[] = [];
  const atmosphereMeshes: THREE.Mesh[] = [];
  let cloudTexture: THREE.Texture | null = null;
  let atmosphereTexture: THREE.Texture | null = null;

  if (planet.cloudTexture) {
    cloudTexture = textureLoader.load(planet.cloudTexture);

    const cloudRadius = radius * (isEarth ? 1.02 : 1.01);
    const cloudGeometry = new THREE.SphereGeometry(cloudRadius, 80, 80);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: isEarth ? 0.32 : 0.75,
      depthWrite: false,
      metalness: 0,
      roughness: 0.9,
    });

    const cm = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cm.rotation.z = sphere.rotation.z;
    cm.rotation.y = Math.random() * Math.PI * 2;
    group.add(cm);
    cloudMeshes.push(cm);
  }

  if (planet.atmosphereTexture && planet.name !== "Venus") {
    atmosphereTexture = textureLoader.load(planet.atmosphereTexture);

    const atmosphereGeometry = new THREE.SphereGeometry(
      radius * (planet.name === "Venus" ? 1.08 : 1.03),
      80,
      80
    );
    const atmosphereMaterial = new THREE.MeshStandardMaterial({
      map: atmosphereTexture,
      transparent: true,
      opacity: planet.name === "Venus" ? 0.85 : 0.45,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const am = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    am.rotation.z = sphere.rotation.z;
    group.add(am);
    atmosphereMeshes.push(am);
  }

  let ringMesh: THREE.Mesh | null = null;
  let ringGeometry: THREE.RingGeometry | null = null;
  let ringMaterial: THREE.MeshBasicMaterial | null = null;
  let ringTexture: THREE.Texture | null = null;

  if (planet.ringTexture) {
    ringTexture = textureLoader.load(planet.ringTexture);
    const innerRadius = radius * 1.6;
    const outerRadius = radius * 2.7;
    ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 96);
    ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    alphaTest: 0.2,
    });
    ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.2;
    ringMesh.rotation.z = sphere.rotation.z;
    group.add(ringMesh);
  }

  const ambientLight = new THREE.AmbientLight(0x1b2336, 0.6);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xfff3c4, 2.0);
  keyLight.position.set(-6, -3, 6);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x4466ff, 1.0);
  rimLight.position.set(5, 3, 4);
  scene.add(rimLight);

  let animationFrameId: number;
  let lastTime = performance.now();

  const baseRotationSpeed = 0.0015;

  const sunPosition = new THREE.Vector3(0, 0, 0);
  const earthWorldPosition = new THREE.Vector3();
  const sunDirection = new THREE.Vector3();

  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;
  const dragRotationSpeed = 0.005;

  const handlePointerDown = (event: PointerEvent) => {
    isDragging = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
    renderer.domElement.style.cursor = "grabbing";
    try {
      renderer.domElement.setPointerCapture(event.pointerId);
    } catch {}
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMouseX;
    const deltaY = event.clientY - previousMouseY;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;

    group.rotation.y += deltaX * dragRotationSpeed * 0.5;
    group.rotation.x += deltaY * dragRotationSpeed * 0.5;

    const maxTilt = THREE.MathUtils.degToRad(60);
    group.rotation.x = THREE.MathUtils.clamp(group.rotation.x, -maxTilt, maxTilt);
  };

  const endDrag = (event: PointerEvent) => {
    isDragging = false;
    renderer.domElement.style.cursor = "grab";
    try {
      renderer.domElement.releasePointerCapture(event.pointerId);
    } catch {}
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    const zoomSpeed = 0.0025;
    const delta = event.deltaY;

    const newZ = THREE.MathUtils.clamp(
      camera.position.z + delta * zoomSpeed,
      minZoom,
      maxZoom
    );

    camera.position.z = newZ;
  };

  renderer.domElement.style.cursor = "grab";
  renderer.domElement.addEventListener("pointerdown", handlePointerDown);
  renderer.domElement.addEventListener("pointermove", handlePointerMove);
  renderer.domElement.addEventListener("pointerup", endDrag);
  renderer.domElement.addEventListener("pointerleave", endDrag);
  renderer.domElement.addEventListener("wheel", handleWheel, { passive: false });

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    const now = performance.now();
    const delta = now - lastTime;
    lastTime = now;

    const factor = delta / 16.67;
    sphere.rotation.y += baseRotationSpeed * factor * 1.8;

    for (let i = 0; i < cloudMeshes.length; i++) {
      const cm = cloudMeshes[i];
      const factorCloud = 1.6 + i * 0.3;
      cm.rotation.y += baseRotationSpeed * factorCloud * (delta / 16.67);
    }

    for (let i = 0; i < atmosphereMeshes.length; i++) {
      const am = atmosphereMeshes[i];
      const factorAtmo = 1.2 + i * 0.2;
      am.rotation.y += baseRotationSpeed * factorAtmo * (delta / 16.67);
    }

    if (isEarth && material instanceof THREE.ShaderMaterial) {
      group.getWorldPosition(earthWorldPosition);
      sunDirection.subVectors(sunPosition, earthWorldPosition).normalize();
      (material as THREE.ShaderMaterial).uniforms.sunDirection.value.copy(
        sunDirection
      );
    }

    renderer.render(scene, camera);
  };

  animate();

  const handleResize = () => {
    const newWidth = container.clientWidth || width;
    const newHeight = container.clientHeight || height;

    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }

  return {
    dispose() {
      cancelAnimationFrame(animationFrameId);

      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }

      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", endDrag);
      renderer.domElement.removeEventListener("pointerleave", endDrag);
      renderer.domElement.removeEventListener("wheel", handleWheel);

      container.removeChild(renderer.domElement);

      geometry.dispose();
      material.dispose();
      surfaceTexture.dispose();

      for (const cm of cloudMeshes) {
        (cm.geometry as THREE.BufferGeometry).dispose();
        (cm.material as THREE.Material).dispose();
      }
      if (cloudTexture) {
        cloudTexture.dispose();
      }

      for (const am of atmosphereMeshes) {
        (am.geometry as THREE.BufferGeometry).dispose();
        (am.material as THREE.Material).dispose();
      }
      if (atmosphereTexture) {
        atmosphereTexture.dispose();
      }

      if (ringMesh && ringGeometry && ringMaterial) {
        (ringMesh.geometry as THREE.BufferGeometry).dispose();
        (ringMesh.material as THREE.Material).dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
      }
      if (ringTexture) {
        ringTexture.dispose();
      }

      renderer.dispose();
    },
  };
}

