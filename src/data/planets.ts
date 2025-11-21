export type Planet = {
    name: string;
    image: string;

    texture: string;
    cloudTexture?: string;
    nightTexture?: string;
    atmosphereTexture?: string;
    ringTexture?: string;

    diameterKm: number;

    massKg: number;

    semiMajorAxisAu: number;
    orbitalPeriodDays: number;
    rotationPeriodHours: number;
    axialTiltDeg: number;
    orbitInclinationDeg: number;
    eccentricity: number;

    radiusScale: number;
    orbitRadiusScale: number;
};

export const planets: Planet[] = [
    {
        name: "Mercury",
        image: "/textures/mercury.jpg",
        texture: "/textures/mercury.jpg",
        diameterKm: 4879,
        massKg: 3.3011e23,
        semiMajorAxisAu: 0.39,
        orbitalPeriodDays: 88,
        rotationPeriodHours: 1407.6,
        axialTiltDeg: 0.03,
        orbitInclinationDeg: 7.0,
        eccentricity: 0.2056,
        radiusScale: 0.38,
        orbitRadiusScale: 0.39,
    },
    {
        name: "Venus",
        image: "/textures/venus.jpg",
        texture: "/textures/venus.jpg",
        atmosphereTexture: "/textures/venus_atmosphere.jpg",
        diameterKm: 12104,
        massKg: 4.8675e24,
        semiMajorAxisAu: 0.72,
        orbitalPeriodDays: 224.7,
        rotationPeriodHours: -5832.5,
        axialTiltDeg: 177.4,
        orbitInclinationDeg: 3.4,
        eccentricity: 0.0068,
        radiusScale: 0.95,
        orbitRadiusScale: 0.72,
    },
    {
        name: "Earth",
        image: "/textures/earth.jpg",
        texture: "/textures/earth.jpg",
        cloudTexture: "/textures/earth_clouds.jpg",
        nightTexture: "/textures/earth_nightmap.jpg",
        diameterKm: 12756,
        massKg: 5.97237e24,
        semiMajorAxisAu: 1.0,
        orbitalPeriodDays: 365.25,
        rotationPeriodHours: 23.93,
        axialTiltDeg: 23.44,
        orbitInclinationDeg: 0.0,
        eccentricity: 0.0167,
        radiusScale: 1.0,
        orbitRadiusScale: 1.0,
    },
    {
        name: "Mars",
        image: "/textures/mars.jpg",
        texture: "/textures/mars.jpg",
        diameterKm: 6792,
        massKg: 6.4171e23,
        semiMajorAxisAu: 1.52,
        orbitalPeriodDays: 687,
        rotationPeriodHours: 24.6,
        axialTiltDeg: 25.2,
        orbitInclinationDeg: 1.85,
        eccentricity: 0.0934,
        radiusScale: 0.53,
        orbitRadiusScale: 1.52,
    },
    {
        name: "Jupiter",
        image: "/textures/jupiter.jpg",
        texture: "/textures/jupiter.jpg",
        diameterKm: 142984,
        massKg: 1.8982e27,
        semiMajorAxisAu: 5.2,
        orbitalPeriodDays: 4331,
        rotationPeriodHours: 9.9,
        axialTiltDeg: 3.1,
        orbitInclinationDeg: 1.3,
        eccentricity: 0.0484,
        radiusScale: 11.2,
        orbitRadiusScale: 5.2,
    },
    {
        name: "Saturn",
        image: "/textures/saturn.jpg",
        texture: "/textures/saturn.jpg",
        ringTexture: "/textures/saturn_ring_alpha.png",
        diameterKm: 120536,
        massKg: 5.6834e26,
        semiMajorAxisAu: 9.58,
        orbitalPeriodDays: 10747,
        rotationPeriodHours: 10.7,
        axialTiltDeg: 26.7,
        orbitInclinationDeg: 2.5,
        eccentricity: 0.0542,
        radiusScale: 9.5,
        orbitRadiusScale: 9.58,
    },
    {
        name: "Uranus",
        image: "/textures/uranus.jpg",
        texture: "/textures/uranus.jpg",
        diameterKm: 51118,
        massKg: 8.6810e25,
        semiMajorAxisAu: 19.2,
        orbitalPeriodDays: 30589,
        rotationPeriodHours: -17.2,
        axialTiltDeg: 97.8,
        orbitInclinationDeg: 0.77,
        eccentricity: 0.0472,
        radiusScale: 4.0,
        orbitRadiusScale: 19.2,
    },
    {
        name: "Neptune",
        image: "/textures/neptune.jpg",
        texture: "/textures/neptune.jpg",
        diameterKm: 49528,
        massKg: 1.02413e26,
        semiMajorAxisAu: 30.05,
        orbitalPeriodDays: 59800,
        rotationPeriodHours: 16.1,
        axialTiltDeg: 28.3,
        orbitInclinationDeg: 1.77,
        eccentricity: 0.0086,
        radiusScale: 3.9,
        orbitRadiusScale: 30.05,
    },
];

export const firstFourPlanets: Planet[] = planets;

export default planets;
