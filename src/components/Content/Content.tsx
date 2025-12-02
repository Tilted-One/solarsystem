"use client";

import { useMemo } from "react";
import Header from "./Header";
import PlanetCarousel from "./PlanetCarousel";
import PlanetInfo from "./PlanetInfo";
import { planets, type Planet } from "@/data/planets";

type ContentProps = {
  selectedPlanetName: string;
  onSelectPlanet: (name: string) => void;
};

export default function Content({
  selectedPlanetName,
  onSelectPlanet,
}: ContentProps) {
  const selectedPlanet: Planet =
    useMemo(
      () => planets.find((p) => p.name === selectedPlanetName) ?? planets[0],
      [selectedPlanetName]
    ) ?? planets[0];

  return (
    <div className="w-full md:w-2/5 h-full flex flex-col">
      <Header />
      <PlanetCarousel
        selectedPlanetName={selectedPlanetName}
        onSelectPlanet={onSelectPlanet}
      />
      <div className="h-[282px] w-px shrink-0" />
      <div className="flex-1 min-h-0">
        <PlanetInfo planet={selectedPlanet} />
      </div>
    </div>
  );
}