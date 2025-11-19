type PlanetCardProps = {
    name: string;
    imgSrc: string;
}

export default function PlanetCard({ name, imgSrc }: PlanetCardProps) {
    return (
        <div className="relative w-[250px] h-full rounded-2xl shrink-0 snap-center flex justify-center items-center ">
            <img src={imgSrc} alt={name} className="w-full h-full absolute top-0 left-0 rounded-2xl" />
            <button className="w-auto h-auto bg-white rounded-2xl px-8 py-2 absolute bottom-4">Select {name}</button>
        </div>
    )
}