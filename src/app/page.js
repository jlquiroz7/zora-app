import TextBox from "@/app/components/textbox";
import MessageBox from "@/app/components/messagebox";

export default function Home() {
  return (
    <Chat />
  );
}

function Chat() {
  return (
    <div>
      <h1>Chat</h1>
      <MessageList />
      <TextBox />
    </div>
  );
}

function MessageList() {
  return (
    <div>
      <MessageBox message={{ role: "user", content: "Hello" }} />
      <MessageBox message={{ role: "model", content: "Hello" }} />
    </div>
  );
}