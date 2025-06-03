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
  const [chatHistory, setChatHistory] = useState([
    {
      id: uuidv4(),
      timestamp: new Date(),
      messages: [
        {
          id: uuidv4(),
          role: "user",
          content: "Hola",
        },
        {
          id: uuidv4(),
          role: "model",
          content: "Hola, ¿en qué puedo ayudarte?",
        },
      ],
    }
  ]);
  const [currentChat, setCurrentChat] = useState({
    id: uuidv4(),
    timestamp: new Date(),
    messages: [],
  });
  const [sideEffect, setSideEffect] = useState(IDLE);

  function addChatToHistory() {
    if (!chatHistory.some((chat) => chat.id === currentChat.id)) {
      const updatedChatHistory = chatHistory.map((chat) => {
        if (chat.id === currentChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, modelMessage],
          };
        }
        return chat;
      });
      setChatHistory(updatedChatHistory);
    }
  }

  useEffect(() => {
    async function handleSideEffect() {
      if (sideEffect === SEND_MESSAGE) {
        const modelMessage = await sendMessage(currentChat.messages);
        setCurrentChat({
          ...currentChat,
          messages: [...currentChat.messages, modelMessage],
        });
        addChatToHistory();
      }
    }
    handleSideEffect();
    return () => {
      setSideEffect(IDLE);
    }  
  }, [sideEffect]);

  return (
    <div className="flex flex-row">
      <LeftPanel 
        chatHistory={chatHistory}
        currentChat={currentChat}
        onNewChatClick={() => {
          setCurrentChat({
            id: uuidv4(),
            timestamp: new Date(),
            messages: [],
          });
        }}
      />
      <div className="flex-1 flex flex-col items-center h-dvh">
        <MessageList className="flex-1 max-w-[2048px] w-9/10 md:w-8/10 lg:w-6/10" messages={currentChat.messages} />
        <TextBox className="max-w-[2048px] w-9/10 md:w-8/10 lg:w-6/10" onSend={(message) => {
          setCurrentChat({
            ...currentChat,
            messages: [...currentChat.messages, message],
          });
          addChatToHistory();
          setSideEffect(SEND_MESSAGE);
        }} />
      </div>
    </div>
  );
}

const SEND_MESSAGE = "SEND_MESSAGE";
const IDLE = "IDLE";