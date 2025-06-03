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
      timestamp: new Date("2025-06-03T21:25:00"),
      messages: [
        {
          id: uuidv4(),
          role: "user",
          content: "Hola",
        },
        {
          id: uuidv4(),
          role: "model",
          content: "{ \"message\": \"Hola, ¿en qué puedo ayudarte?\" }",
        },
      ],
    },
    {
      id: uuidv4(),
      timestamp: new Date("2025-06-02T21:26:00"),
      messages: [
        {
          id: uuidv4(),
          role: "user",
          content: "Hola",
        },
        {
          id: uuidv4(),
          role: "model",
          content: "{ \"message\": \"Hola, soy Zora, ¿en qué puedo ayudarte?\" }",
        },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(uuidv4());
  const [sideEffect, setSideEffect] = useState(IDLE);

  const getChatById = (chatId) => {
    const chat = chatHistory.find((chat) => chat.id === chatId);
    if (!chat) {
      return {
        id: chatId,
        timestamp: new Date(),
        messages: [],
      };
    }
    return chat;
  }

  function addOrUpdateChatOnHistory(currentChat) {
    if (!chatHistory.some((chat) => chat.id === currentChat.id)) {
      setChatHistory([currentChat, ...chatHistory]);
    } else {
      const updatedChatHistory = chatHistory.map((chat) => {
        if (chat.id === currentChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, currentChat.messages[currentChat.messages.length - 1]],
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
        const modelMessage = await sendMessage(getChatById(currentChatId).messages);
        const updatedCurrentChat = {
          ...getChatById(currentChatId),
          messages: [...getChatById(currentChatId).messages, modelMessage],
        };
        addOrUpdateChatOnHistory(updatedCurrentChat);
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
        currentChat={getChatById(currentChatId)}
        onNewChatClick={() => {
          setCurrentChatId(uuidv4());
        }}
        onChatClick={(chat) => {
          setCurrentChatId(chat.id);
        }}
      />
      <div className="flex-1 flex flex-col items-center h-dvh">
        <MessageList className="flex-1 max-w-[2048px] w-9/10 md:w-8/10 lg:w-6/10" messages={getChatById(currentChatId).messages} />
        <TextBox className="max-w-[2048px] w-9/10 md:w-8/10 lg:w-6/10" chatId={currentChatId} onSend={(chatId, message) => {
          const chat = getChatById(chatId);
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, message],
          };
          addOrUpdateChatOnHistory(updatedChat);
          setSideEffect(SEND_MESSAGE);
        }} />
      </div>
    </div>
  );
}

const SEND_MESSAGE = "SEND_MESSAGE";
const IDLE = "IDLE";