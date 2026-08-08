"use client";

import {
  Bot,
  Stethoscope,
} from "lucide-react";

import { InfoCards } from "@/components/dashboard/InfoCards";
import { NovaCard } from "@/components/dashboard/NovaCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";

type DashboardProps = {
  onNavigate: (
    item: string
  ) => void;

  onOpenChat: (
    message?: string
  ) => void;
};

export function Dashboard({
  onNavigate,
  onOpenChat,
}: DashboardProps) {
  return (
    <div className="mt-8">
      <section className="grid gap-5 md:grid-cols-2">
        <QuickActionCard
          title="AI Chat"
          description="Chat with Nova, your intelligent healthcare companion."
          icon={Bot}
          onClick={() =>
            onOpenChat()
          }
        />

        <QuickActionCard
          title="Symptom Checker"
          description="Describe your symptoms and receive guided health information."
          icon={Stethoscope}
          onClick={() =>
            onNavigate(
              "Symptom Checker"
            )
          }
        />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]">
        <NovaCard
          onOpenChat={
            onOpenChat
          }
        />

        <InfoCards />
      </section>
    </div>
  );
}