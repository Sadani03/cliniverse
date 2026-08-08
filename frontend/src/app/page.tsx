"use client";

import { useState } from "react";

import { AuthPage } from "@/components/auth/AuthPage";
import { AIChatPage } from "@/components/chat/AIChatPage";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { SettingsPage } from "@/components/settings/SettingsPage";
import { SymptomCheckerPage } from "@/components/symptom-checker/SymptomCheckerPage";
import { useAuth } from "@/hooks/useAuth";

type PageName =
  | "Dashboard"
  | "AI Chat"
  | "Symptom Checker"
  | "Profile"
  | "Settings";

export default function Home() {
  const [activeItem, setActiveItem] =
    useState<PageName>("Dashboard");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const {
    user,
    isCheckingAuth,
    login,
    register,
    logout,
  } = useAuth();

  function handleNavigation(item: string) {
    const allowedPages: PageName[] = [
      "Dashboard",
      "AI Chat",
      "Symptom Checker",
      "Profile",
      "Settings",
    ];

    if (allowedPages.includes(item as PageName)) {
      setActiveItem(item as PageName);
    }
  }

  function handleLogout() {
    logout();
    setActiveItem("Dashboard");
    setMobileMenuOpen(false);
  }

  function renderCurrentPage() {
    switch (activeItem) {
      case "Dashboard":
        return (
          <Dashboard
            onNavigate={handleNavigation}
          />
        );

      case "AI Chat":
        return <AIChatPage />;

      case "Symptom Checker":
        return <SymptomCheckerPage />;

      case "Profile":
        return <ProfilePage />;

      case "Settings":
        return <SettingsPage />;

      default:
        return (
          <Dashboard
            onNavigate={handleNavigation}
          />
        );
    }
  }

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="glass-panel-strong flex flex-col items-center gap-4 rounded-[28px] px-8 py-7 shadow-xl">
          <div className="primary-gradient h-10 w-10 animate-pulse rounded-2xl" />

          <div className="text-center">
            <p
              className="font-bold"
              style={{
                fontFamily:
                  "var(--font-plus-jakarta), sans-serif",
              }}
            >
              CliniVerse
            </p>

            <p className="mt-1 text-sm text-[#85675E]">
              Loading your healthcare experience...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <AuthPage
        onLogin={login}
        onRegister={register}
      />
    );
  }

  return (
    <main className="min-h-screen p-3 sm:p-4">
      <div className="mx-auto flex max-w-[1700px] gap-4">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeItem={activeItem}
            onItemChange={handleNavigation}
            onLogout={handleLogout}
          />
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="absolute inset-0 bg-[#521C0D]/25 backdrop-blur-sm"
            />

            <div className="relative h-full w-[280px] p-3">
              <Sidebar
                activeItem={activeItem}
                onItemChange={(item: string) => {
                  handleNavigation(item);
                  setMobileMenuOpen(false);
                }}
                onLogout={handleLogout}
              />
            </div>
          </div>
        )}

        {/* Main Application */}
        <section className="min-w-0 flex-1 p-2 sm:p-4 lg:p-6">
          <Header
            onOpenMobileMenu={() =>
              setMobileMenuOpen(true)
            }
            userName={user.full_name}
          />

          {renderCurrentPage()}
        </section>
      </div>
    </main>
  );
}