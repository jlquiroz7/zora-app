import { TbMenu2 } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { useState } from "react";

export default function LeftPanel() {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="flex flex-col items-start h-dvh bg-[#edf1f7] transition-width duration-200 gap-2" style={{
            width: showMenu ? "300px" : "64px",
            padding: "8px",
        }}>
            <button className="flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                <TbMenu2 className="w-10 h-10" style={{
                    padding: "8px",
                }} />
            </button>
            <button className="flex flex-row items-center justify-center rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                <TbEdit className="w-10 h-10" style={{
                    padding: "8px",
                }} />
                {showMenu && <p>Nueva conversación</p>}
            </button>
        </div>
    );
}