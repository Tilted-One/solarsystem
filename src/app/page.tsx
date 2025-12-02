"use client";

import { useMemo, useState } from "react";
import Content from "@/components/Content/Content";
import SceneContainer from "@/components/Scene/SceneContainer";
import { planets, type Planet } from "@/data/planets";

export default function Home() {
  const [selectedPlanetName, setSelectedPlanetName] = useState<string>(
    planets[0]?.name ?? "Earth"
  );

  const selectedPlanet: Planet =
    useMemo(
      () => planets.find((p) => p.name === selectedPlanetName) ?? planets[0],
      [selectedPlanetName]
    ) ?? planets[0];

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full p-6 bg-white">
      <Content
        selectedPlanetName={selectedPlanetName}
        onSelectPlanet={setSelectedPlanetName}
      />
      <SceneContainer planet={selectedPlanet} />
    </div>
  );
}
