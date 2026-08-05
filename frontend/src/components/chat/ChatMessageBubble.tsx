import { Bot, UserRound } from "lucide-react";
import type { ChatMessage } from "@/types/chat";

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

export function ChatMessageBubble({
  message,
}: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="primary-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-white shadow-md">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`max-w-[82%] rounded-[22px] px-4 py-3 shadow-sm sm:max-w-[72%] ${
          isUser
            ? "rounded-br-md bg-[#D5451B] text-white"
            : "glass-panel rounded-bl-md text-[#521C0D]"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">
          {message.content}
        </p>

        <p
          className={`mt-2 text-[11px] ${
            isUser
              ? "text-white/70"
              : "text-[#85675E]"
          }`}
        >
          {message.createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#521C0D] text-white shadow-md">
          <UserRound size={18} />
        </div>
      )}
    </div>
  );
}