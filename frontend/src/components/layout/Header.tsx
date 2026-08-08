"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  UserRound,
} from "lucide-react";

import { useState } from "react";

import { ThemeToggle } from "@/components/settings/ThemeToggle";
import { useTheme } from "@/providers/ThemeProvider";

type HeaderProps = {
  onOpenMobileMenu: () => void;
  userName: string;
  userEmail?: string;
  onNavigate: (item: string) => void;
  onLogout: () => void;
};

function getInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "U";
  }

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
}

export function Header({
  onOpenMobileMenu,
  userName,
  userEmail,
  onNavigate,
  onLogout,
}: HeaderProps) {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const [
    profileMenuOpen,
    setProfileMenuOpen,
  ] = useState(false);

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  const initials = getInitials(userName);

  const firstName =
    userName.trim().split(/\s+/)[0] || "there";

  function navigateTo(item: string) {
    onNavigate(item);

    setProfileMenuOpen(false);
    setNotificationsOpen(false);
  }

  function toggleNotifications() {
    setNotificationsOpen(
      (current) => !current
    );

    setProfileMenuOpen(false);
  }

  function toggleProfileMenu() {
    setProfileMenuOpen(
      (current) => !current
    );

    setNotificationsOpen(false);
  }

  const primaryText =
    isDark
      ? "text-[#FFF4EE]"
      : "text-[#521C0D]";

  const secondaryText =
    isDark
      ? "text-[#D6B7AA]"
      : "text-[#85675E]";

  const dropdownBackground =
    isDark
      ? "border-white/10 bg-[#24100A] shadow-[0_20px_55px_rgba(0,0,0,0.45)]"
      : "border-[#521C0D]/10 bg-white shadow-[0_20px_55px_rgba(82,28,13,0.18)]";

  const divider =
    isDark
      ? "border-white/10"
      : "border-[#521C0D]/10";

  const dropdownHover =
    isDark
      ? "hover:bg-white/5"
      : "hover:bg-[#FFF2EA]";

  return (
    <header className="relative z-40 mb-6 flex items-center justify-between gap-4">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onOpenMobileMenu}
        aria-label="Open navigation"
        className={`glass-panel flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl transition hover:scale-[1.03] lg:hidden ${primaryText}`}
      >
        <Menu size={21} />
      </button>

      {/* Greeting */}
      <div className="hidden sm:block">
        <p
          className={`text-sm ${secondaryText}`}
        >
          Welcome back
        </p>

        <h2
          className={`mt-1 text-xl font-bold ${primaryText}`}
        >
          Hi, {firstName} 👋
        </h2>
      </div>

      {/* Right controls */}
      <div className="ml-auto flex items-center gap-3">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleNotifications}
            aria-expanded={notificationsOpen}
            aria-label="Notifications"
            className={`glass-panel relative flex h-13 w-13 items-center justify-center rounded-2xl transition duration-200 hover:scale-[1.03] ${primaryText}`}
          >
            <Bell size={21} />

            <span
              className={`absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#D5451B] ring-2 ${
                isDark
                  ? "ring-[#24100A]"
                  : "ring-white"
              }`}
            />
          </button>

          {notificationsOpen && (
            <div
              className={`absolute right-0 top-[calc(100%+12px)] z-[100] w-[320px] overflow-hidden rounded-[22px] border ${dropdownBackground}`}
            >
              {/* Notification header */}
              <div
                className={`flex items-center justify-between border-b px-4 py-4 ${divider}`}
              >
                <div>
                  <h3
                    className={`text-sm font-bold ${primaryText}`}
                  >
                    Notifications
                  </h3>

                  <p
                    className={`mt-1 text-xs ${secondaryText}`}
                  >
                    Recent CliniVerse updates
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    isDark
                      ? "bg-[#FF9B45]/15 text-[#FF9B45]"
                      : "bg-[#FF9B45]/20 text-[#D5451B]"
                  }`}
                >
                  2 new
                </span>
              </div>

              {/* Nova notification */}
              <button
                type="button"
                onClick={() =>
                  navigateTo("AI Chat")
                }
                className={`block w-full border-b px-4 py-4 text-left transition ${divider} ${dropdownHover}`}
              >
                <div className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#D5451B]" />

                  <div>
                    <p
                      className={`text-sm font-bold ${primaryText}`}
                    >
                      Nova is ready
                    </p>

                    <p
                      className={`mt-1 text-xs leading-5 ${secondaryText}`}
                    >
                      Continue your conversation
                      with Nova whenever you need
                      general health guidance.
                    </p>
                  </div>
                </div>
              </button>

              {/* Profile notification */}
              <button
                type="button"
                onClick={() =>
                  navigateTo("Profile")
                }
                className={`block w-full px-4 py-4 text-left transition ${dropdownHover}`}
              >
                <div className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF9B45]" />

                  <div>
                    <p
                      className={`text-sm font-bold ${primaryText}`}
                    >
                      Profile reminder
                    </p>

                    <p
                      className={`mt-1 text-xs leading-5 ${secondaryText}`}
                    >
                      Keep your health profile
                      updated for more relevant
                      guidance.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Profile area */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleProfileMenu}
            aria-expanded={profileMenuOpen}
            aria-label="Open profile menu"
            className={`flex items-center gap-3 rounded-2xl px-2 py-1.5 transition ${
              isDark
                ? "hover:bg-white/5"
                : "hover:bg-white/30"
            } ${primaryText}`}
          >
            {/* Avatar */}
            <div className="primary-gradient flex h-13 w-13 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow-md">
              {initials}
            </div>

            {/* User */}
            <div className="hidden text-left md:block">
              <p
                className={`max-w-[160px] truncate text-sm font-bold ${primaryText}`}
              >
                {userName}
              </p>

              <p
                className={`mt-0.5 text-sm ${secondaryText}`}
              >
                Patient
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`hidden transition-transform duration-200 md:block ${primaryText} ${
                profileMenuOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {/* Profile dropdown */}
          {profileMenuOpen && (
            <div
              className={`absolute right-0 top-[calc(100%+12px)] z-[100] w-[270px] overflow-hidden rounded-[22px] border p-2 ${dropdownBackground}`}
            >
              {/* User information */}
              <div className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="primary-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-bold ${primaryText}`}
                    >
                      {userName}
                    </p>

                    {userEmail && (
                      <p
                        className={`mt-1 truncate text-xs ${secondaryText}`}
                      >
                        {userEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`mx-2 border-t ${divider}`}
              />

              {/* Menu options */}
              <div className="p-1 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    navigateTo("Profile")
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${primaryText} ${dropdownHover}`}
                >
                  <UserRound size={18} />

                  My Profile
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigateTo("Settings")
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${primaryText} ${dropdownHover}`}
                >
                  <Settings size={18} />

                  Settings
                </button>
              </div>

              <div
                className={`mx-2 border-t ${divider}`}
              />

              {/* Logout */}
              <div className="p-1 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onLogout();
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                    isDark
                      ? "text-[#FF9B45] hover:bg-[#FF9B45]/10"
                      : "text-[#D5451B] hover:bg-[#FFF0EB]"
                  }`}
                >
                  <LogOut size={18} />

                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}