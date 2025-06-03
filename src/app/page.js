import Chat from "@/app/components/chat";
import { VERSION_NAME } from "./local.json";

export default function Home() {
  return (
    <div className="flex flex-col">
      <p className="text-center bg-blue-100">{VERSION_NAME}</p>
      <Chat />
    </div>
  );
}