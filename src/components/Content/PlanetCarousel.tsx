"use client";

import { useRef } from "react";
import { firstFourPlanets, type Planet } from "@/data/planets";
import PlanetCard from "./PlanetCard";

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
      <button
        type="button"
        onClick={handleScrollLeft}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl py-2 px-3 flex items-center justify-center cursor-pointer z-10 shadow-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M14.75 18l-6-6 6-6"
          />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="w-full h-full py-6 gap-x-4 flex items-center flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
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

      <button
        type="button"
        onClick={handleScrollRight}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl py-2 px-3 flex items-center justify-center cursor-pointer z-10 shadow-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M9.25 6l6 6-6 6"
          />
        </svg>
      </button>
    </div>
  );
}