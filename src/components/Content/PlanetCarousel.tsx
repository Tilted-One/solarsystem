"use client";

import { useRef } from "react";
import { firstFourPlanets, type Planet } from "@/data/planets";
import PlanetCard from "./PlanetCard";
import CarouselButton from "./CarouselButton";

type PlanetCarouselProps = {
  selectedPlanetName: string;
  onSelectPlanet: (name: string) => void;
};

export default function PlanetCarousel({
  selectedPlanetName,
  onSelectPlanet,
}: PlanetCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollAmount = 280;

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="absolute left-0 top-[96px] pl-6 pr-6 w-3/5 h-[282px] bg-white rounded-2xl z-[99] flex items-center">
      <CarouselButton direction="left" onClick={handleScrollLeft} />

      <div
        ref={scrollRef}
        className="w-full h-full py-6 pl-1 gap-x-4 flex items-center flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
      >
        {firstFourPlanets.map((planet: Planet) => (
          <PlanetCard
            key={planet.name}
            name={planet.name}
            imgSrc={planet.image}
            isSelected={planet.name === selectedPlanetName}
            onSelect={() => onSelectPlanet(planet.name)}
          />
        ))}
      </div>

      <CarouselButton direction="right" onClick={handleScrollRight} />
    </div>
  );
}