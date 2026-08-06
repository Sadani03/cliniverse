"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { AIChatPage } from "@/components/chat/AIChatPage";
import { SymptomCheckerPage } from "@/components/symptom-checker/SymptomCheckerPage";
import { ProfilePage } from "@/components/profile/ProfilePage";

export default function Home() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function renderCurrentPage() {
    switch (activeItem) {
      case "Dashboard":
        return (
          <Dashboard onNavigate={setActiveItem} />
        );

      case "AI Chat":
        return <AIChatPage />;

      case "Symptom Checker":
        return <SymptomCheckerPage />;

      case "Profile":
        return <ProfilePage />;

      case "Settings":
        return (
          <PlaceholderPage
            title="Settings"
            description="Theme, language, voice, privacy, and AI response preferences will be managed here."
          />
        );

      default:
        return null;
    }
  }

  return (
    <main className="min-h-screen p-3 sm:p-4">
      <div className="mx-auto flex max-w-[1700px] gap-4">
        <div className="hidden lg:block">
          <Sidebar
            activeItem={activeItem}
            onItemChange={setActiveItem}
          />
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#521C0D]/25 backdrop-blur-sm"
            />

            <div className="relative h-full w-[280px] p-3">
              <Sidebar
                activeItem={activeItem}
                onItemChange={(item) => {
                  setActiveItem(item);
                  setMobileMenuOpen(false);
                }}
              />
            </div>
          </div>
        )}

        <section className="min-w-0 flex-1 p-2 sm:p-4 lg:p-6">
          <Header
            onOpenMobileMenu={() =>
              setMobileMenuOpen(true)
            }
          />

          {renderCurrentPage()}
        </section>
      </div>
    </main>
  );
}