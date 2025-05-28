"use client";
import { TbSend2 } from "react-icons/tb";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function handleSend(message, onSend, setMessage) {
    onSend({
        id: uuidv4(),
        role: "user",
        content: message,
    });
    setMessage("");
}

export default function TextBox({onSend}) {
    const [message, setMessage] = useState("");
    return (
      <div style={styles.container}>
        <input 
            type="text" 
            placeholder="Escribe tu mensaje" 
            style={styles.input} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    handleSend(message, onSend, setMessage);
                }
            }}
        />
        {
            message.length > 0 ? (
                <button 
                    style={styles.button} 
                    onClick={() => {
                        handleSend(message, onSend, setMessage);
                    }}
                >
                    <TbSend2 />
                </button>
            ) : (
                <div style={styles.disabledButton}>
                </div>
            )
        }
      </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        border: "1px solid #ccc",
        borderRadius: "20px",
        padding: "20px",
        margin: "20px",
        backgroundColor: "transparent",
    },
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