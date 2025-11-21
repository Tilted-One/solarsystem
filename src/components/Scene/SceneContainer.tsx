import SceneButton from "./SceneButton";
import { Helper } from "./Helper";
export default function SceneContainer() {
    return (
        <div className="w-3/5 h-auto bg-[#0C0C0E] relative rounded-2xl">
            <SceneButton />
            <Helper />
        </div>
    )
}