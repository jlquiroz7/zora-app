import { TbDotsVertical } from "react-icons/tb";

export default function ChatHistory({showMenu, chatHistory, onChatClick}) {
    return (
        <div className="flex flex-col">
            <p>Reciente</p>
            {chatHistory.map((chat) => (
                <div 
                    key={chat.id}
                    className="flex items-center justify-between rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                    style={{
                        padding: "10px",
                        width: showMenu ? "284px" : "",
                    }}
                    onClick={() => onChatClick(chat)}
                    >
                    {chat.timestamp.toLocaleString()}
                    <div className="flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                        <TbDotsVertical />
                    </div>
                </div>
            ))}
        </div>
    );
}
