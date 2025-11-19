export default function SceneButton() {
    return (
        <div className="absolute top-0 right-0 w-auto h-auto bg-white">
            <div className="absolute pointer-events-none z-0 bg-[#0C0C0E] w-8 h-8 rounded-tr-2xl ml-[-32px]
                 drop-shadow-[8px_-8px_0_rgba(255,255,255,2)]"></div>
            <div className="absolute pointer-events-none z-0 left-0 bottom-0 bg-white w-8 h-8 rounded-bl-2xl
                drop-shadow-[-8px_8px_0_rgba(12,12,14,2)]"></div>

            <div
                className="absolute pointer-events-none z-0 right-0 bottom-0 mb-[-32px] w-8 h-8 bg-[#0C0C0E] rounded-tr-2xl 
             drop-shadow-[8px_-8px_0_rgba(255,255,255,2)]"
            ></div>
            <button className='relative z-[9999] bg-black text-white px-10 py-4 rounded-2xl ml-4 mb-4'>Discover Earth</button>
        </div>
    )
}