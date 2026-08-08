"use client";

import {
  Bot,
  Square,
  UserRound,
  Volume2,
} from "lucide-react";

import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

import type { ChatMessage } from "@/types/chat";

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

export function ChatMessageBubble({
  message,
}: ChatMessageBubbleProps) {
  const isUser =
    message.role === "user";

  const {
    isSpeaking,
    speak,
    stopSpeaking,
  } = useSpeechSynthesis();

  return (
    <div
      className={`flex w-full gap-3 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="primary-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-md">
          <Bot size={19} />
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

        <div className="mt-2 flex items-center justify-between gap-4">
          <p
            className={`text-[11px] ${
              isUser
                ? "text-white/70"
                : "text-[#85675E]"
            }`}
          >
            {message.createdAt.toLocaleTimeString(
              [],
              {
                hour:
                  "2-digit",
                minute:
                  "2-digit",
              }
            )}
          </p>

          {!isUser && (
            <button
              type="button"
              onClick={() => {
                if (
                  isSpeaking
                ) {
                  stopSpeaking();
                } else {
                  speak(
                    message.content
                  );
                }
              }}
              aria-label={
                isSpeaking
                  ? "Stop Nova speaking"
                  : "Read Nova response aloud"
              }
              title={
                isSpeaking
                  ? "Stop speaking"
                  : "Listen to response"
              }
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#85675E] transition hover:bg-[#FF9B45]/15 hover:text-[#D5451B]"
            >
              {isSpeaking ? (
                <Square
                  size={14}
                />
              ) : (
                <Volume2
                  size={16}
                />
              )}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#521C0D] text-white shadow-md">
          <UserRound
            size={19}
          />
        </div>
      )}
    </div>
  );
}