"use client";

import {
  ArrowUp,
  Mic,
  MicOff,
  Paperclip,
} from "lucide-react";
import { useRef } from "react";

import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

type ChatComposerProps = {
  message: string;
  disabled?: boolean;

  onMessageChange: (
    message: string
  ) => void;

  onSend: () => void;
};

export function ChatComposer({
  message,
  disabled = false,
  onMessageChange,
  onSend,
}: ChatComposerProps) {
  const fileInputRef =
    useRef<HTMLInputElement>(
      null
    );

  const {
    isListening,
    voiceError,
    startListening,
  } = useSpeechRecognition({
    onTranscript: (
      transcript
    ) => {
      const updatedMessage =
        message.trim()
          ? `${message.trim()} ${transcript}`
          : transcript;

      onMessageChange(
        updatedMessage
      );
    },
  });

  return (
    <div>
      <div className="glass-panel-strong rounded-[26px] p-2">
        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(
              event
            ) => {
              const file =
                event.target
                  .files?.[0];

              if (file) {
                console.log(
                  "Selected file:",
                  file.name
                );
              }
            }}
          />

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/55 transition hover:bg-white"
            aria-label="Upload a file"
          >
            <Paperclip
              size={19}
            />
          </button>

          <textarea
            value={message}
            disabled={disabled}
            rows={1}
            onChange={(
              event
            ) =>
              onMessageChange(
                event.target.value
              )
            }
            onKeyDown={(
              event
            ) => {
              if (
                event.key ===
                  "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                onSend();
              }
            }}
            placeholder={
              isListening
                ? "Listening..."
                : "Ask Nova a health question..."
            }
            className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-2 py-3 text-sm leading-5 outline-none placeholder:text-[#85675E]/70 disabled:opacity-60"
          />

          {/* Voice input */}
          <button
            type="button"
            disabled={disabled}
            onClick={
              startListening
            }
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
              isListening
                ? "bg-[#D5451B] text-white shadow-lg"
                : "bg-white/55 hover:bg-white"
            }`}
            aria-label={
              isListening
                ? "Stop listening"
                : "Start voice input"
            }
            title={
              isListening
                ? "Stop listening"
                : "Speak to Nova"
            }
          >
            {isListening ? (
              <MicOff
                size={19}
              />
            ) : (
              <Mic size={19} />
            )}
          </button>

          <button
            type="button"
            disabled={
              disabled ||
              !message.trim()
            }
            onClick={onSend}
            className="primary-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <ArrowUp
              size={19}
            />
          </button>
        </div>

        <p className="mt-2 px-3 pb-1 text-center text-[11px] text-[#85675E]">
          Nova provides general
          health information and
          does not replace
          professional medical
          advice.
        </p>
      </div>

      {voiceError && (
        <p className="mt-2 px-3 text-xs font-medium text-red-600">
          {voiceError}
        </p>
      )}
    </div>
  );
}