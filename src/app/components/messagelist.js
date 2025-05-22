import MessageBox from "@/app/components/messagebox";

export default function MessageList({messages}) {
    return (
      <div>
        {messages.map((message) => (
            <MessageBox key={message.id} message={message} />
        ))}
      </div>
    );
}