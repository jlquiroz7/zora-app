"use client";
import { TbSend2 } from "react-icons/tb";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function handleSend(chatId, message, onSend, setMessage) {
    onSend(chatId, {
        id: uuidv4(),
        role: "user",
        content: message,
    });
    setMessage("");
}

export default function TextBox({className, chatId, onSend}) {
    const [message, setMessage] = useState("");
    return (
      <div className={"flex flex-row border border-gray-200 rounded-xl bg-transparent" + className} style={{
        padding: "20px",
        margin: "20px",
      }}>
        <input 
            className="flex-1 text-xl border-none outline-none"
            type="text" 
            placeholder="Escribe tu mensaje" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    handleSend(chatId, message, onSend, setMessage);
                }
            }}
        />
        {
            message.length > 0 ? (
                <button 
                    className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors text-white"
                    onClick={() => {
                        handleSend(chatId, message, onSend, setMessage);
                    }}
                >
                    <TbSend2 />
                </button>
            ) : (
                <div className="flex items-center justify-center w-12 h-12">
                </div>
            )
        }
      </div>
    );
}

const styles = {
    input: {
        flex: 1,
        fontSize: "20px",
        background: "transparent",
        border: "none",
        outline: "none",
        color: "#000",
        padding: "0",
        caretColor: "#000",
    },
    button: {
        width: "52px",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "52px",
        fontSize: "20px",
    },
    disabledButton: {
        width: "52px",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        borderRadius: "52px",
        fontSize: "20px",
    },
}