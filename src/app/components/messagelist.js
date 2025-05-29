import MessageBox from "@/app/components/messagebox";

export default function MessageList({className, messages}) {
    return (
      <div className={className}>
        {messages.map((message) => (
            <MessageBox key={message.id} message={message} />
        ))}
      </div>
    );
}