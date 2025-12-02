"use client";

import { useEffect, useRef } from "react";
import SceneButton from "./SceneButton";
import { Helper } from "./Helper";
import { createScene, type SceneHandle } from "@/three/Scene";
import type { Planet } from "@/data/planets";

type SceneContainerProps = {
    planet: Planet;
};

export default function SceneContainer({ planet }: SceneContainerProps) {
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const sceneHandleRef = useRef<SceneHandle | null>(null);

    useEffect(() => {
        if (!canvasContainerRef.current) return;

        const handle = createScene(canvasContainerRef.current, planet);
        sceneHandleRef.current = handle;

        return () => {
            handle.dispose();
            if (sceneHandleRef.current === handle) {
                sceneHandleRef.current = null;
            }
        };
    }, [planet]);

    return (
        <div className="w-full md:w-3/5 h-auto bg-[#0C0C0E] relative rounded-2xl overflow-hidden z-[9]">
            <div
                ref={canvasContainerRef}
                className="absolute inset-0 rounded-2xl overflow-hidden"
            />
            <SceneButton planetName={planet.name} />
            <Helper />
        </div>
    );
}