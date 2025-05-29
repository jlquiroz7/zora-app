"use client";
import MessageList from "./messagelist";
import TextBox from "./textbox";    
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LeftPanel from "./leftpanel";

async function sendMessage(messages) {
  const contents = messages.map((message) => {
    return {
      role: message.role,
      parts: [{text: message.content}]
    }
  });
  const body = {
    contents
  };
  const res = await fetch(`${window.location.origin}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log(data);
  return {
    id: uuidv4(),
    role: "model",
    content: data.candidates[0].content.parts[0].text,
  };
}

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [sideEffect, setSideEffect] = useState(IDLE);

    useEffect(() => {
      async function handleSideEffect() {
        if (sideEffect === SEND_MESSAGE) {
          const modelMessage = await sendMessage(messages);
          setMessages([...messages, modelMessage]);
        }
      }
      handleSideEffect();
      return () => {
        setSideEffect(IDLE);
      }  
    }, [sideEffect]);

    return (
      <div className="flex flex-row">
        <LeftPanel />
        <div className="flex-1 flex flex-col items-center h-dvh">
          <MessageList className="flex-1 max-w-[2048px] w-9/10 md:w-8/10 lg:w-6/10" messages={messages} />
          <TextBox className="max-w-[2048px] w-9/10 md:w-8/10 lg:w-6/10" onSend={(message) => {
            setMessages([...messages, message]);
            setSideEffect(SEND_MESSAGE);
          }} />
        </div>
      </div>
    );
}

const SEND_MESSAGE = "SEND_MESSAGE";
const IDLE = "IDLE";