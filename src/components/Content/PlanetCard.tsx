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
};

export default function PlanetCard({ name, imgSrc }: PlanetCardProps) {
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
      className="relative w-[250px] h-full rounded-2xl shrink-0 snap-center flex justify-center items-center overflow-hidden bg-[#0C0C0E]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 rounded-2xl pointer-events-none"
      />
      <button className="w-auto h-auto bg-white rounded-2xl px-8 py-2 absolute bottom-4 z-10">
        Select {name}
      </button>
    </div>
  );
}