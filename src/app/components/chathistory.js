import { TbDotsVertical } from "react-icons/tb";

export default function ChatHistory({showMenu, chatHistory}) {
    return (
        <div className="flex flex-col">
            <p>Reciente</p>
            {chatHistory.map((chat) => (
                <p 
                    key={chat.id}
                    className="flex items-center justify-between rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                    style={{
                        padding: "10px",
                        width: showMenu ? "284px" : "",
                    }}>
                    {chat.timestamp.toLocaleString()}
                    <button className="flex items-center justify-center cursor-pointer">
                        <TbDotsVertical />
                    </button>
                </p>
            ))}
        </div>
    );
}
