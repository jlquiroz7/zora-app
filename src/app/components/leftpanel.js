import { TbMenu2 } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { useState } from "react";
import ChatHistory from "./chathistory";

export default function LeftPanel({chatHistory, currentChat, onNewChatClick}) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="flex flex-col items-start h-dvh bg-[#edf1f7] transition-width duration-200 gap-2" style={{
            width: showMenu ? "300px" : "64px",
            padding: "10px",
        }}>
            <button className="flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                <TbMenu2 className="w-10 h-10" style={{
                    padding: "8px",
                }} />
            </button>
            <button 
                className="flex flex-row items-center justify-start rounded-full transition-colors cursor-pointer duration-200"
                style={{
                    width: showMenu ? "280px" : "",
                }}
                disabled={currentChat.messages.length === 0}
                onClick={onNewChatClick}
                >
                <TbEdit className="w-10 h-10" style={{
                    padding: "10px",
                }} />
                {showMenu && <p>Nueva conversación</p>}
            </button>
            {showMenu && (
                <ChatHistory showMenu={showMenu} chatHistory={chatHistory} />
            )}
        </div>
    );
}