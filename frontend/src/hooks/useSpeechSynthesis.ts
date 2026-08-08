"use client";

import { useState } from "react";

function chooseBestVoice(): SpeechSynthesisVoice | null {
  const voices =
    window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    return null;
  }

  const preferredNames = [
    "Samantha",
    "Ava",
    "Serena",
    "Karen",
    "Google US English",
    "Microsoft Aria",
    "Microsoft Jenny",
  ];

  for (const name of preferredNames) {
    const voice = voices.find(
      (candidate) =>
        candidate.name
          .toLowerCase()
          .includes(name.toLowerCase())
    );

    if (voice) {
      return voice;
    }
  }

  const englishVoice = voices.find(
    (voice) =>
      voice.lang
        .toLowerCase()
        .startsWith("en-us")
  );

  if (englishVoice) {
    return englishVoice;
  }

  return (
    voices.find((voice) =>
      voice.lang
        .toLowerCase()
        .startsWith("en")
    ) ?? voices[0]
  );
}

export function useSpeechSynthesis() {
  const [
    isSpeaking,
    setIsSpeaking,
  ] = useState(false);

  function stopSpeaking() {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  function speak(text: string) {
    if (
      typeof window === "undefined" ||
      !(
        "speechSynthesis" in window
      )
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    const selectedVoice =
      chooseBestVoice();

    if (selectedVoice) {
      utterance.voice =
        selectedVoice;

      utterance.lang =
        selectedVoice.lang;
    } else {
      utterance.lang =
        "en-US";
    }

    // More natural, calm Nova voice
    utterance.rate = 0.92;
    utterance.pitch = 1.02;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(
      utterance
    );
  }

  return {
    isSpeaking,
    speak,
    stopSpeaking,
  };
}