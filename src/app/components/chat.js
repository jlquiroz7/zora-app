"use client";
import MessageList from "./messagelist";
import TextBox from "./textbox";    
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            id: uuidv4(),
            role: "user",
            content: "Hello",
        },
        {
            id: uuidv4(),
            role: "model",
            content: "Hello",
        },
    ]);
    return (
      <div>
        <MessageList messages={messages} />
        <TextBox onSend={(message) => setMessages([...messages, message])} />
      </div>
    );
}