import * as THREE from "three";
import type { Planet } from "@/data/planets";

export type PlanetCardSceneHandle = {
  setHover: (hovered: boolean) => void;
  dispose: () => void;
};

export function createPlanetCardScene(
  container: HTMLDivElement,
  planet: Planet
): PlanetCardSceneHandle {
  const width = container.clientWidth || 250;
  const height = container.clientHeight || 250;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 3;

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

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(planet.texture);
  const isEarth = planet.name === "Earth";

  const maxRadiusScale = 11.2;
  const sizeRatio = THREE.MathUtils.clamp(
    planet.radiusScale / maxRadiusScale,
    0,
    1
  );
  const radius = 1 + sizeRatio * 0.1;

  const geometry = new THREE.SphereGeometry(radius, 80, 80);
  const material = new THREE.MeshStandardMaterial(
    isEarth
      ? {
          map: texture,
          metalness: 0,
          roughness: 0.6,
        }
      : {
          map: texture,
          metalness: 0.1,
          roughness: 0.8,
        }
  );
  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.z = THREE.MathUtils.degToRad(planet.axialTiltDeg);

  scene.add(mesh);

  const cloudMeshes: THREE.Mesh[] = [];
  let cloudTexture: THREE.Texture | null = null;

  if (planet.cloudTexture) {
    cloudTexture = textureLoader.load(planet.cloudTexture);

    const cloudGeometry = new THREE.SphereGeometry(
      radius * (isEarth ? 1.015 : 1.01),
      72,
      72
    );
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: isEarth ? 0.35 : 0.8,
      depthWrite: false,
    });
    const cm = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cm.rotation.z = mesh.rotation.z;
    // random starting longitude so each card shows clouds in a different place
    cm.rotation.y = Math.random() * Math.PI * 2;
    scene.add(cm);
    cloudMeshes.push(cm);
  }

  let ringMesh: THREE.Mesh | null = null;
  let ringTexture: THREE.Texture | null = null;

  if (planet.ringTexture) {
    ringTexture = textureLoader.load(planet.ringTexture);
    const innerRadius = radius * 1.3;
    const outerRadius = radius * 2.2;
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.rotation.z = mesh.rotation.z;
    scene.add(ringMesh);
  }

  const ambientLight = new THREE.AmbientLight(0x1b2336, 0.45);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
  directionalLight.color = new THREE.Color(0xfff1c2);
  directionalLight.position.set(-6, -4, 6);
  scene.add(directionalLight);

  const rimLight = new THREE.DirectionalLight(0x4466ff, 0.7);
  rimLight.position.set(4, 2, 4);
  scene.add(rimLight);

  let hovered = false;
  let animationFrameId: number;
  let lastTime = performance.now();

  const baseRotationSpeed = 0.001;
  const hoverRotationSpeed = 0.01;

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    const now = performance.now();
    const delta = now - lastTime;
    lastTime = now;

    const speed = hovered ? hoverRotationSpeed : baseRotationSpeed;
    mesh.rotation.y += speed * (delta / 16.67);

    for (let i = 0; i < cloudMeshes.length; i++) {
      const cm = cloudMeshes[i];
    const factor = 1.4 + i * 0.25;
      cm.rotation.y += speed * factor * (delta / 16.67);
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
    setHover(value: boolean) {
      hovered = value;
    },
    dispose() {
      cancelAnimationFrame(animationFrameId);
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      for (const cm of cloudMeshes) {
        (cm.geometry as THREE.BufferGeometry).dispose();
        (cm.material as THREE.Material).dispose();
      }
      if (cloudTexture) {
        cloudTexture.dispose();
      }
      if (ringMesh) {
        (ringMesh.geometry as THREE.BufferGeometry).dispose();
        (ringMesh.material as THREE.Material).dispose();
      }
      if (ringTexture) {
        ringTexture.dispose();
      }
      renderer.dispose();
    },
  };
}