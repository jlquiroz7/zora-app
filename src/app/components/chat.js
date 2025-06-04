"use client";
import MessageList from "./messagelist";
import TextBox from "./textbox";    
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LeftPanel from "./leftpanel";

const user = {
  id: "12341234",
  username: "username",
}

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
  const [chatHistory, setChatHistory] = useState([]);
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
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory, currentChat];
        localStorage.setItem(user.id, JSON.stringify(updatedChatHistory));
        return updatedChatHistory;
      });
    } else {
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = prevChatHistory.map((chat) => {
          if (chat.id === currentChat.id) {
            return {
              ...chat,
              messages: [...chat.messages, currentChat.messages[currentChat.messages.length - 1]],
            };
          }
          return chat;
        });
        localStorage.setItem(user.id, JSON.stringify(updatedChatHistory));
        return updatedChatHistory;
      });
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

  useEffect(() => {
    const chatHistoryAsString = localStorage.getItem(user.id);
    if (chatHistoryAsString) {
      const chatHistory = JSON.parse(chatHistoryAsString);
      setChatHistory(chatHistory);
    } else {
      localStorage.setItem(user.id, JSON.stringify([]));
    }
  }, []);

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