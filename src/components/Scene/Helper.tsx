export function Helper() {
    return (
        <div className="w-10 h-[282px] flex flex-col justify-between items-stretch mt-18 relative">
            <div className="absolute top-0 left-0 pointer-events-none z-0 bg-transparent w-8 h-8 rounded-bl-2xl mt-[-32px] shadow-[-8px_8px_0_rgba(255,255,255,2)]"></div>
            <div className="absolute bottom-0 left-0 pointer-events-none z-0 bg-transparent w-8 h-8 rounded-tl-2xl mb-[-32px] shadow-[-8px_-8px_0_rgba(255,255,255,2)]"></div>
        </div>
    );
}