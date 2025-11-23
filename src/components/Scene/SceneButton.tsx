type SceneButtonProps = {
    planetName: string;
};

export default function SceneButton({ planetName }: SceneButtonProps) {
    return (
        <div className="absolute top-0 right-0 w-auto h-auto bg-white rounded-bl-2xl">
            <div
                className="absolute pointer-events-none z-0 bg-transparent w-8 h-8 rounded-tr-2xl ml-[-32px] shadow-[8px_-8px_0_rgba(255,255,255,2)]"
            ></div>
            <div
                className="absolute pointer-events-none z-0 right-0 bottom-0 mb-[-32px] w-8 h-8 bg-transparent rounded-tr-2xl shadow-[8px_-8px_0_rgba(255,255,255,2)]"
            ></div>
            <div className="relative bg-black text-white px-10 py-4 rounded-2xl ml-4 mb-4">
                {planetName}
            </div>
        </div>
    );
}