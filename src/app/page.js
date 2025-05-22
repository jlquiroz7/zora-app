import TextBox from "@/app/components/textbox";

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
function MessageBox() {
  return (
    <div>
      <p>Message</p>
    </div>
  );
}

function MessageList() {
  return (
    <div>
      <MessageBox />
    </div>
  );
}