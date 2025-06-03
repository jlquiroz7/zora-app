import { TbDotsVertical } from "react-icons/tb";

export default function ChatHistory({showMenu, chatHistory, currentChat, onChatClick}) {
    const isCurrentChat = (chat) => chat.id === currentChat.id;
    return (
        <div className="flex flex-col">
            <p>Reciente</p>
            {chatHistory.map((chat) => (
                <div 
                    key={chat.id}
                    className={"flex items-center justify-between rounded-full hover:bg-gray-200 transition-colors cursor-pointer" + (isCurrentChat(chat) ? " bg-gray-200" : "")}
                    style={{
                        padding: "10px",
                        width: showMenu ? "284px" : "",
                        backgroundColor: isCurrentChat(chat) ? "#cadbfd" : "",
                        color: isCurrentChat(chat) ? "#123594" : "",
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
