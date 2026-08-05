"use client";

import { useState } from "react";
import {
  ArrowUp,
  Brain,
  Mic,
  Moon,
  Thermometer,
} from "lucide-react";
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

export function NovaCard() {
  const [message, setMessage] = useState("");

  function sendMessage() {
    const cleanMessage = message.trim();

    if (!cleanMessage) {
      return;
    }

    console.log("Message:", cleanMessage);
    setMessage("");
  }

  return (
    <GlassCard
      strong
      className="relative overflow-hidden p-6 sm:p-8"
    >
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#FF9B45]/20 blur-3xl" />

      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#D5451B]/15 blur-3xl" />

      <div className="relative grid min-h-[500px] gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D5451B]">
            Meet Nova
          </p>

          <h3
            className="mt-4 text-4xl font-bold leading-tight sm:text-5xl"
            style={{
              fontFamily:
                "var(--font-plus-jakarta), sans-serif",
            }}
          >
            Hi! I&apos;m{" "}
            <span className="text-gradient">Nova</span> 👋
          </h3>

          <p className="mt-4 max-w-lg text-base leading-7 text-[#6F4B40]">
            Your AI healthcare companion. I&apos;m here to
            listen, understand, and help you with general
            health questions.
          </p>

          <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            I&apos;m online and ready to help
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {suggestions.map((suggestion) => {
              const Icon = suggestion.icon;

              return (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() =>
                    setMessage(suggestion.label)
                  }
                  className="glass-panel flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-white/65"
                >
                  <Icon size={17} className="text-[#D5451B]" />
                  {suggestion.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-[310px] items-center justify-center">
          <NovaAnimation className="h-[330px] w-full max-w-[440px] sm:h-[390px]" />
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-3 rounded-[24px] border border-white/70 bg-white/48 p-2 pl-5 shadow-sm backdrop-blur-xl">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-[#85675E]/70"
        />

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/60 transition hover:bg-white"
          aria-label="Use microphone"
        >
          <Mic size={20} />
        </button>

        <button
          type="button"
          onClick={sendMessage}
          className="primary-gradient flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105"
          aria-label="Send message"
        >
          <ArrowUp size={21} />
        </button>
      </div>
    </GlassCard>
  );
}