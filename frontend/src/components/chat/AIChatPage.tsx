"use client";

import {
  AlertCircle,
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

import { sendChatMessage } from "@/services/chatService";

import type { ChatMessage } from "@/types/chat";

type AIChatPageProps = {
  initialMessage?: string | null;
};

const suggestedPrompts = [
  "I have a headache",
  "What can cause a sore throat?",
  "How can I improve my sleep?",
  "When should I see a doctor for a fever?",
];

function createWelcomeMessage(): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Hello! I’m Nova, your AI healthcare companion. Tell me how you’re feeling, and I’ll provide general health information and guidance.",
    createdAt: new Date(),
  };
}

function createInitialMessages(
  initialMessage?: string | null
): ChatMessage[] {
  const welcome = createWelcomeMessage();

  if (!initialMessage?.trim()) {
    return [welcome];
  }

  return [
    welcome,
    {
      id: crypto.randomUUID(),
      role: "user",
      content: initialMessage.trim(),
      createdAt: new Date(),
    },
  ];
}

export function AIChatPage({
  initialMessage,
}: AIChatPageProps) {
  const [messages, setMessages] =
    useState<ChatMessage[]>(() =>
      createInitialMessages(initialMessage)
    );

  const [message, setMessage] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const [chatError, setChatError] =
    useState("");

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const initialMessageSentRef =
    useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    if (
      !initialMessage?.trim() ||
      initialMessageSentRef.current
    ) {
      return;
    }

    initialMessageSentRef.current = true;

    const cleanMessage =
      initialMessage.trim();

    async function sendInitialMessage() {
      setIsTyping(true);
      setChatError("");

      try {
        const novaResponse =
          await sendChatMessage(
            cleanMessage
          );

        const assistantMessage: ChatMessage =
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: novaResponse,
            createdAt: new Date(),
          };

        setMessages(
          (currentMessages) => [
            ...currentMessages,
            assistantMessage,
          ]
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Nova is temporarily unavailable.";

        setChatError(errorMessage);
      } finally {
        setIsTyping(false);
      }
    }

    void sendInitialMessage();
  }, [initialMessage]);

  function clearChat() {
    setMessages([
      createWelcomeMessage(),
    ]);

    setMessage("");
    setChatError("");
    setIsTyping(false);
  }

  async function sendMessage(
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
    setChatError("");
    setIsTyping(true);

    try {
      const novaResponse =
        await sendChatMessage(
          cleanMessage
        );

      const assistantMessage: ChatMessage =
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: novaResponse,
          createdAt: new Date(),
        };

      setMessages(
        (currentMessages) => [
          ...currentMessages,
          assistantMessage,
        ]
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Nova is temporarily unavailable.";

      setChatError(errorMessage);
    } finally {
      setIsTyping(false);
    }
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
            <MessageCirclePlus size={18} />
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
                    disabled={isTyping}
                    onClick={() =>
                      void sendMessage(
                        prompt
                      )
                    }
                    className="rounded-2xl border border-white/60 bg-white/35 px-3 py-3 text-left text-sm leading-5 transition hover:bg-white/65 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-auto rounded-2xl border border-red-200/60 bg-red-50/45 p-4">
            <div className="flex items-center gap-2 font-bold text-red-700">
              <ShieldAlert size={18} />
              Emergency warning
            </div>

            <p className="mt-2 text-xs leading-5 text-red-950/70">
              Nova cannot handle medical
              emergencies. Contact local
              emergency services for immediate
              help.
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
            aria-label="Clear conversation"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/40 text-[#85675E] transition hover:bg-red-50 hover:text-red-600"
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

            {chatError && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200/60 bg-red-50/60 p-4 text-red-700">
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="text-sm font-bold">
                    Nova couldn&apos;t respond
                  </p>

                  <p className="mt-1 text-xs leading-5">
                    {chatError}
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
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
                      disabled={isTyping}
                      onClick={() =>
                        void sendMessage(
                          prompt
                        )
                      }
                      className="rounded-full border border-white/70 bg-white/45 px-4 py-2 text-xs font-medium transition hover:bg-white/75 disabled:opacity-50"
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
            onMessageChange={setMessage}
            onSend={() =>
              void sendMessage()
            }
          />
        </div>
      </GlassCard>
    </div>
  );
}