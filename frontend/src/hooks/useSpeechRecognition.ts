"use client";

import {
  useRef,
  useState,
} from "react";

type SpeechRecognitionResultEvent = Event & {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;

  start: () => void;
  stop: () => void;
  abort: () => void;

  onstart:
    | (() => void)
    | null;

  onend:
    | (() => void)
    | null;

  onresult:
    | ((
        event: SpeechRecognitionResultEvent
      ) => void)
    | null;

  onerror:
    | ((
        event: SpeechRecognitionErrorEvent
      ) => void)
    | null;
};

type SpeechRecognitionConstructor = new () =>
  SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?:
      SpeechRecognitionConstructor;

    webkitSpeechRecognition?:
      SpeechRecognitionConstructor;
  }
}

type UseSpeechRecognitionOptions = {
  onTranscript: (
    transcript: string
  ) => void;
};

export function useSpeechRecognition({
  onTranscript,
}: UseSpeechRecognitionOptions) {
  const [
    isListening,
    setIsListening,
  ] = useState(false);

  const [
    voiceError,
    setVoiceError,
  ] = useState("");

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(
      null
    );

  function stopListening() {
    recognitionRef.current?.stop();
  }

  function startListening() {
    setVoiceError("");

    const SpeechRecognition =
      window.SpeechRecognition ??
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        "Speech recognition is not supported in this browser."
      );

      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (
      event
    ) => {
      const transcript =
        event.results[0]?.[0]
          ?.transcript ?? "";

      if (transcript.trim()) {
        onTranscript(
          transcript.trim()
        );
      }
    };

    recognition.onerror = (
      event
    ) => {
      if (
        event.error ===
        "not-allowed"
      ) {
        setVoiceError(
          "Microphone permission was denied. Allow microphone access in your browser settings."
        );
      } else if (
        event.error ===
        "no-speech"
      ) {
        setVoiceError(
          "I couldn't hear anything. Please try speaking again."
        );
      } else {
        setVoiceError(
          "Voice input couldn't start. Please try again."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current =
        null;
    };

    recognitionRef.current =
      recognition;

    try {
      recognition.start();
    } catch {
      setIsListening(false);

      setVoiceError(
        "Voice input couldn't start. Please try again."
      );
    }
  }

  return {
    isListening,
    voiceError,
    startListening,
    stopListening,
  };
}