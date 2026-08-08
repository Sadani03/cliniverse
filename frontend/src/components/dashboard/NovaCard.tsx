"use client";

import {
  ArrowUp,
  Brain,
  Mic,
  Moon,
  Thermometer,
} from "lucide-react";
import { useState } from "react";

import { NovaAnimation } from "@/components/nova/NovaAnimation";
import { GlassCard } from "@/components/shared/GlassCard";

const suggestions = [
  {
    label: "I have a headache",
    icon: Brain,
  },
  {
    label: "I have a fever",
    icon: Thermometer,
  },
  {
    label: "Help me sleep",
    icon: Moon,
  },
];

type NovaCardProps = {
  onOpenChat: (
    message?: string
  ) => void;
};

export function NovaCard({
  onOpenChat,
}: NovaCardProps) {
  const [message, setMessage] =
    useState("");

  function sendMessage() {
    const cleanMessage =
      message.trim();

    if (!cleanMessage) {
      return;
    }

    onOpenChat(cleanMessage);
    setMessage("");
  }

  return (
    <GlassCard
      strong
      className="relative overflow-hidden p-5 sm:p-7 lg:p-8"
    >
      <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-[#FF9B45]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#D5451B]/14 blur-3xl" />

      <div className="relative grid min-h-[560px] items-center gap-6 lg:grid-cols-[0.95fr_1.05fr] xl:min-h-[600px]">
        <div className="z-10 flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D5451B]">
            Meet Nova
          </p>

          <h3
            className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl xl:text-6xl"
            style={{
              fontFamily:
                "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Hi! I&apos;m{" "}
            <span className="text-gradient">
              Nova
            </span>{" "}
            👋
          </h3>

          <p className="mt-5 max-w-md text-base leading-7 text-[#6F4B40] sm:text-lg">
            Your AI healthcare companion.
            I&apos;m here to listen,
            understand, and help you with
            general health questions.
          </p>

          <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/45 px-4 py-2.5 text-sm shadow-sm backdrop-blur-xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />

            I&apos;m online and ready to help
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {suggestions.map(
              (suggestion) => {
                const Icon =
                  suggestion.icon;

                return (
                  <button
                    key={
                      suggestion.label
                    }
                    type="button"
                    onClick={() =>
                      onOpenChat(
                        suggestion.label
                      )
                    }
                    className="glass-panel flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition duration-300 hover:-translate-y-1 hover:bg-white/70 hover:shadow-md"
                  >
                    <Icon
                      size={17}
                      className="text-[#D5451B]"
                    />

                    {suggestion.label}
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="relative flex min-h-[360px] items-center justify-center sm:min-h-[430px] lg:min-h-[500px]">
          <NovaAnimation className="h-[360px] w-[360px] sm:h-[430px] sm:w-[430px] lg:h-[500px] lg:w-[500px] xl:h-[540px] xl:w-[540px]" />
        </div>
      </div>

      <div className="relative mt-5 flex items-center gap-2 rounded-[24px] border border-white/75 bg-white/50 p-2 pl-5 shadow-[0_12px_35px_rgba(82,28,13,0.08)] backdrop-blur-2xl sm:gap-3">
        <input
          type="text"
          value={message}
          onChange={(event) =>
            setMessage(
              event.target.value
            )
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter"
            ) {
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          className="h-12 min-w-0 flex-1 bg-transparent text-sm text-[#521C0D] outline-none placeholder:text-[#85675E]/70 sm:text-base"
        />

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/60 transition duration-300 hover:scale-105 hover:bg-white"
          aria-label="Use microphone"
        >
          <Mic size={20} />
        </button>

        <button
          type="button"
          onClick={sendMessage}
          disabled={
            !message.trim()
          }
          className="primary-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <ArrowUp size={21} />
        </button>
      </div>
    </GlassCard>
  );
}