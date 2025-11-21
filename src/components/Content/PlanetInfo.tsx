"use client";

import type { Planet } from "@/data/planets";

type PlanetInfoProps = {
    planet: Planet;
};

export default function PlanetInfo({ planet }: PlanetInfoProps) {
    return (
        <div className="w-full h-full text-black">
            <div className="h-full mr-4 overflow-y-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-2">
                    Planet overview
                </p>
                <h2 className="text-2xl font-semibold tracking-tight mb-3">
                    {planet.name}
                </h2>

                <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                    {planet.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs text-neutral-800 mb-4">
                    <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-neutral-500">
                            Size
                        </p>
                        <p className="mt-1">
                            Diameter{" "}
                            <span className="font-semibold">
                                {planet.diameterKm.toLocaleString()} km
                            </span>
                            , about{" "}
                            <span className="font-semibold">
                                {planet.radiusScale.toFixed(2)}×
                            </span>{" "}
                            Earth radius.
                        </p>
                    </div>
                    <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-neutral-500">
                            Distance from Sun
                        </p>
                        <p className="mt-1">
                            Orbits at{" "}
                            <span className="font-semibold">
                                {planet.semiMajorAxisAu.toFixed(2)} AU
                            </span>{" "}
                            on average, taking{" "}
                            <span className="font-semibold">
                                {planet.orbitalPeriodDays.toLocaleString()} days
                            </span>{" "}
                            to complete one year.
                        </p>
                    </div>
                    <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-neutral-500">
                            Day length
                        </p>
                        <p className="mt-1">
                            One rotation takes{" "}
                            <span className="font-semibold">
                                {planet.rotationPeriodHours.toFixed(1)} hours
                            </span>
                            .
                        </p>
                    </div>
                    <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-neutral-500">
                            Tilt & orbit
                        </p>
                        <p className="mt-1">
                            Axis tilt of{" "}
                            <span className="font-semibold">
                                {planet.axialTiltDeg.toFixed(1)}°
                            </span>{" "}
                            and orbit inclination of{" "}
                            <span className="font-semibold">
                                {planet.orbitInclinationDeg.toFixed(2)}°
                            </span>
                            .
                        </p>
                    </div>
                </div>

                {planet.facts?.length > 0 && (
                    <div className="pt-2 border-t border-neutral-200">
                        <p className="mt-3 text-[0.65rem] uppercase tracking-[0.18em] text-neutral-500 mb-1">
                            Quick facts
                        </p>
                        <ul className="list-disc list-inside text-xs text-neutral-800 space-y-1">
                            {planet.facts.map((fact, index) => (
                                <li key={index}>{fact}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}