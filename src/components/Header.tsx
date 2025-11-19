export default function Header() {
    return (
        <div className="flex justify-center items-center gap-x-2 w-fit">
            <div className="w-12 h-12 bg-[#212121] rounded-full"></div>
            <div className="flex justify-center items-center bg-[#212121] rounded-full px-8 py-2 h-12">
                <h1 className="text-white text-2xl font-semibold">
                    Solar System
                </h1>
            </div>
        </div>
    )
}