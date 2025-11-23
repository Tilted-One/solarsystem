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
    description: string;
    facts: string[];
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
        description:
            "Mercury is the smallest planet and the one closest to the Sun, a rocky world with almost no atmosphere and huge temperature swings between day and night.",
        facts: [
            "Orbits the Sun in just 88 Earth days, giving it the shortest year in the Solar System.",
            "Its surface is heavily cratered and looks a bit like our Moon.",
            "Despite being closest to the Sun, Venus is actually hotter on average.",
        ],
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
        description:
            "Venus is Earth’s “sister” in size but wrapped in a thick, toxic atmosphere that traps heat and makes it the hottest planet.",
        facts: [
            "Its thick clouds of carbon dioxide and sulfuric acid create a runaway greenhouse effect.",
            "A day on Venus (one rotation) is longer than its year and it spins in the opposite direction to most planets.",
            "From Earth, Venus is often the brightest object in the night sky after the Moon.",
        ],
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
        description:
            "Earth is our home planet and the only world we know that has liquid water on the surface and life in incredible variety.",
        facts: [
            "About 71% of Earth’s surface is covered by oceans.",
            "Its tilted axis gives us the changing seasons throughout the year.",
            "Earth has one natural satellite: the Moon, which helps drive our tides.",
        ],
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
        description:
            "Mars is a cold, dusty desert world often called the Red Planet because of the iron-rich rust on its surface.",
        facts: [
            "Home to Olympus Mons, the tallest volcano known in the Solar System.",
            "Has two tiny moons, Phobos and Deimos, which may be captured asteroids.",
            "Robotic rovers have found strong evidence that liquid water once flowed on Mars.",
        ],
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
        description:
            "Jupiter is the largest planet, a giant ball of gas with colorful cloud bands and a famous storm called the Great Red Spot.",
        facts: [
            "It is more than 11 times wider than Earth and over 300 times more massive.",
            "Jupiter has at least 90+ known moons, including the volcanic Io and icy Europa.",
            "Its powerful magnetic field creates intense radiation belts around the planet.",
        ],
    },
    {
        name: "Saturn",
        image: "/textures/saturn.jpg",
        texture: "/textures/saturn.jpg",
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
        description:
            "Saturn is a gas giant best known for its spectacular rings made of countless icy and rocky pieces.",
        facts: [
            "Even though its rings are huge, they are only about a few tens of meters thick in many places.",
            "Saturn is less dense than water—if you had a giant bathtub, it could float.",
            "Its moon Titan has thick atmosphere and lakes of liquid methane and ethane.",
        ],
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
        description:
            "Uranus is an ice giant with a pale blue-green color, tilted so far over that it essentially rolls around the Sun on its side.",
        facts: [
            "Its unusual tilt means its poles can point almost directly at the Sun for part of its long year.",
            "The planet’s color comes from methane gas in the upper atmosphere absorbing red light.",
            "It has a faint ring system and more than two dozen known moons.",
        ],
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
        description:
            "Neptune is a deep blue ice giant, the most distant known major planet, with supersonic winds and dark storm systems.",
        facts: [
            "It was discovered using mathematics before anyone actually saw it through a telescope.",
            "Neptune’s largest moon, Triton, orbits backward relative to the planet’s rotation.",
            "One Neptunian year is about 165 Earth years long.",
        ],
    },
];

export const firstFourPlanets: Planet[] = planets;

export default planets;
