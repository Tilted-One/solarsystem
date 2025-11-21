"use client";

import { useEffect, useRef } from "react";
import type { Planet } from "@/data/planets";
import { planets } from "@/data/planets";
import {
  createPlanetCardScene,
  type PlanetCardSceneHandle,
} from "@/three/PlanetCard";

type PlanetCardProps = {
  name: string;
  imgSrc: string;
  isSelected: boolean;
  onSelect: () => void;
};

export default function PlanetCard({
  name,
  imgSrc,
  isSelected,
  onSelect,
}: PlanetCardProps) {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const sceneHandleRef = useRef<PlanetCardSceneHandle | null>(null);

  const planet: Planet | undefined = planets.find((p) => p.name === name);

  useEffect(() => {
    if (!canvasContainerRef.current || !planet) return;

    sceneHandleRef.current = createPlanetCardScene(
      canvasContainerRef.current,
      planet
    );

    return () => {
      sceneHandleRef.current?.dispose();
      sceneHandleRef.current = null;
    };
  }, [planet]);

  const handleMouseEnter = () => {
    sceneHandleRef.current?.setHover(true);
  };

  const handleMouseLeave = () => {
    sceneHandleRef.current?.setHover(false);
  };

  return (
    <div
      className={`relative w-[250px] h-full rounded-2xl shrink-0 snap-center flex justify-center items-center overflow-hidden bg-[#0C0C0E] transition-transform duration-200 ${
        isSelected ? "ring-2 ring-yellow-300 scale-[1.02]" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 rounded-2xl pointer-events-none"
      />
      <button
        type="button"
        onClick={onSelect}
        className={`w-auto h-auto rounded-2xl px-8 py-2 absolute bottom-4 z-10 cursor-pointer text-sm font-medium transition-colors ${
          isSelected
            ? "bg-yellow-300 text-black"
            : "bg-white text-black hover:bg-neutral-200"
        }`}
      >
        {isSelected ? "Selected" : `Select ${name}`}
      </button>
    </div>
  );
}