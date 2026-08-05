import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="primary-gradient flex h-9 w-9 items-center justify-center rounded-2xl text-white shadow-md">
        <Bot size={18} />
      </div>

      <div className="glass-panel flex items-center gap-1 rounded-[22px] rounded-bl-md px-4 py-4">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="h-2 w-2 animate-bounce rounded-full bg-[#D5451B]"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}