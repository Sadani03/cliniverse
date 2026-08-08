"use client";

import {
  MessageCirclePlus,
  ShieldAlert,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatMessageBubble } from "@/components/chat/ChatMessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { NovaAnimation } from "@/components/nova/NovaAnimation";
import { GlassCard } from "@/components/shared/GlassCard";

import type { ChatMessage } from "@/types/chat";

type AIChatPageProps = {
  initialMessage?: string | null;
};

function createWelcomeMessage(): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Hello! I’m Nova, your AI healthcare companion. Tell me how you’re feeling, and I’ll help you understand possible next steps.",
    createdAt: new Date(),
  };
}

function createDemoResponse(
  message: string
): string {
  const value =
    message.toLowerCase();

  if (
    value.includes("headache")
  ) {
    return (
      "Headaches can have common causes such as dehydration, stress, tiredness, eye strain, or minor infections.\n\n" +
      "Try resting, drinking water, and reducing screen exposure. Seek urgent medical care for a sudden severe headache or one accompanied by confusion, weakness, fainting, or vision loss."
    );
  }

  if (
    value.includes("fever")
  ) {
    return (
      "A fever is often the body’s response to an infection. Rest, drink enough fluids, and monitor your temperature.\n\n" +
      "Seek medical care if it is very high, lasts several days, or occurs with breathing difficulty, confusion, severe dehydration, seizures, or a worsening rash."
    );
  }

  if (
    value.includes("sleep")
  ) {
    return (
      "Try following a regular sleep schedule, avoiding caffeine late in the day, reducing screen use before bed, and keeping your room dark and comfortable.\n\n" +
      "Consider speaking with a healthcare professional if sleep difficulties continue or interfere with your daily life."
    );
  }

  if (
    value.includes("sore throat")
  ) {
    return (
      "A sore throat may be related to a viral infection, allergies, dry air, irritation, or sometimes a bacterial infection.\n\n" +
      "Warm fluids and rest may help. Seek medical advice for breathing or swallowing difficulty, severe swelling, dehydration, or worsening symptoms."
    );
  }

  return (
    "Thank you for explaining that. Could you tell me when the symptoms started, how severe they are, and whether you have any other symptoms?\n\n" +
    "For severe or urgent symptoms, contact a qualified healthcare professional."
  );
}

function createInitialMessages(
  initialMessage?: string | null
): ChatMessage[] {
  const welcome =
    createWelcomeMessage();

  if (!initialMessage) {
    return [welcome];
  }

  return [
    welcome,
    {
      id: crypto.randomUUID(),
      role: "user",
      content: initialMessage,
      createdAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        createDemoResponse(
          initialMessage
        ),
      createdAt: new Date(),
    },
  ];
}

const suggestedPrompts = [
  "I have a headache",
  "What can cause a sore throat?",
  "How can I improve my sleep?",
  "When should I see a doctor for a fever?",
];

export function AIChatPage({
  initialMessage,
}: AIChatPageProps) {
  const [messages, setMessages] =
    useState<ChatMessage[]>(() =>
      createInitialMessages(
        initialMessage
      )
    );

  const [message, setMessage] =
    useState("");

  const [
    isTyping,
    setIsTyping,
  ] = useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function clearChat() {
    setMessages([
      createWelcomeMessage(),
    ]);

    setMessage("");
    setIsTyping(false);
  }

  function sendMessage(
    customMessage?: string
  ) {
    const cleanMessage = (
      customMessage ?? message
    ).trim();

    if (
      !cleanMessage ||
      isTyping
    ) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: cleanMessage,
      createdAt: new Date(),
    };

    setMessages(
      (currentMessages) => [
        ...currentMessages,
        userMessage,
      ]
    );

    setMessage("");
    setIsTyping(true);

    window.setTimeout(() => {
      const assistantMessage: ChatMessage =
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            createDemoResponse(
              cleanMessage
            ),
          createdAt: new Date(),
        };

      setMessages(
        (currentMessages) => [
          ...currentMessages,
          assistantMessage,
        ]
      );

      setIsTyping(false);
    }, 1200);
  }

  return (
    <div className="mt-8 grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="hidden xl:block">
        <GlassCard
          strong
          className="sticky top-5 flex min-h-[700px] flex-col p-5"
        >
          <button
            type="button"
            onClick={clearChat}
            className="primary-gradient flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
          >
            <MessageCirclePlus
              size={18}
            />

            New conversation
          </button>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#85675E]">
              Suggested questions
            </p>

            <div className="mt-4 grid gap-2">
              {suggestedPrompts.map(
                (prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() =>
                      sendMessage(
                        prompt
                      )
                    }
                    className="rounded-2xl border border-white/60 bg-white/35 px-3 py-3 text-left text-sm leading-5 transition hover:bg-white/65"
                  >
                    {prompt}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-auto rounded-2xl border border-red-200/60 bg-red-50/45 p-4">
            <div className="flex items-center gap-2 font-bold text-red-700">
              <ShieldAlert
                size={18}
              />

              Emergency warning
            </div>

            <p className="mt-2 text-xs leading-5 text-red-950/70">
              Nova cannot handle medical
              emergencies. Contact local
              emergency services for
              immediate help.
            </p>
          </div>
        </GlassCard>
      </aside>

      <GlassCard
        strong
        className="flex min-h-[700px] min-w-0 flex-col overflow-hidden"
      >
        <header className="flex items-center justify-between border-b border-white/55 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#FF9B45]/15">
              <NovaAnimation className="h-16 w-16" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">
                  Nova
                </h2>

                <Sparkles
                  size={16}
                  className="text-[#D5451B]"
                />
              </div>

              <p className="flex items-center gap-2 text-xs text-[#85675E]">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                AI healthcare companion
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearChat}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/40 text-[#85675E] transition hover:bg-red-50 hover:text-red-600"
            aria-label="Clear conversation"
          >
            <Trash2 size={18} />
          </button>
        </header>

        <div className="soft-scrollbar flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col gap-5">
            {messages.map(
              (chatMessage) => (
                <ChatMessageBubble
                  key={
                    chatMessage.id
                  }
                  message={
                    chatMessage
                  }
                />
              )
            )}

            {isTyping && (
              <TypingIndicator />
            )}

            <div
              ref={
                messagesEndRef
              }
            />
          </div>
        </div>

        <div className="border-t border-white/55 p-4 sm:p-5">
          {messages.length === 1 && (
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {suggestedPrompts
                .slice(0, 3)
                .map(
                  (prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() =>
                        sendMessage(
                          prompt
                        )
                      }
                      className="rounded-full border border-white/70 bg-white/45 px-4 py-2 text-xs font-medium transition hover:bg-white/75"
                    >
                      {prompt}
                    </button>
                  )
                )}
            </div>
          )}

          <ChatComposer
            message={message}
            disabled={isTyping}
            onMessageChange={
              setMessage
            }
            onSend={() =>
              sendMessage()
            }
          />
        </div>
      </GlassCard>
    </div>
  );
}