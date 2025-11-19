import { Planet } from "@/data/planets";
import PlanetCard from "./PlanetCard";

export default function PlanetCarousel() {
  return (
    <div className="absolute left-0 pl-6 w-3/5 h-[250px] bg-white rounded-2xl z-[99] gap-x-4 flex items-center  flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory  outline outline-22 outline-white ">
      <button className="fixed  bg-white rounded-full py-2 px-6 h-fit w-auto flex items-center justify-center cursor-pointer z-10"
      >
        {'<'}
      </button>
      {require('../../data/planets').firstFourPlanets.map((planet: Planet) => (
        <PlanetCard
          name={planet.name}
          imgSrc={planet.image}
        />
      ))}
      <div className="ml-[-88px]">
      </div>
      <button className="sticky right-0 bg-white rounded-full py-2 px-6 h-fit w-auto flex items-center justify-center cursor-pointer">
        {'>'}
      </button>
    </div>
  )
}