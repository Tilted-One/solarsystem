"use client";

import { useMemo, useState } from "react";
import Header from "./Header";
import PlanetCarousel from "./PlanetCarousel";
import PlanetInfo from "./PlanetInfo";
import { planets, type Planet } from "@/data/planets";

export default function Content() {
    const [selectedPlanetName, setSelectedPlanetName] = useState<string>(
        planets[0]?.name ?? "Earth",
    );

    const selectedPlanet: Planet =
        useMemo(
            () => planets.find((p) => p.name === selectedPlanetName) ?? planets[0],
            [selectedPlanetName],
        ) ?? planets[0];

    return (
        <div className="w-2/5 h-full flex flex-col">
            <Header />
            <PlanetCarousel
                selectedPlanetName={selectedPlanetName}
                onSelectPlanet={setSelectedPlanetName}
            />
            <div className="h-[282px] w-px shrink-0" />
            <div className="flex-1 min-h-0">
                <PlanetInfo planet={selectedPlanet} />
            </div>
        </div>
    );
}