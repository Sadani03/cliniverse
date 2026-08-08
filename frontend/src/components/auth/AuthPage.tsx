"use client";

import {
  ArrowRight,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  FormEvent,
  useState,
} from "react";

import { NovaAnimation } from "@/components/nova/NovaAnimation";
import { GlassCard } from "@/components/shared/GlassCard";

import type {
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";


type AuthPageProps = {
  onLogin: (
    payload: LoginPayload
  ) => Promise<void>;

  onRegister: (
    payload: RegisterPayload
  ) => Promise<void>;
};


export function AuthPage({
  onLogin,
  onRegister,
}: AuthPageProps) {
  const [mode, setMode] =
    useState<"login" | "register">(
      "login"
    );

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        await onRegister({
          full_name: fullName,
          email,
          password,
        });
      } else {
        await onLogin({
          email,
          password,
        });
      }
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message);
      } else {
        setError(
          "Authentication failed."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <GlassCard
        strong
        className="grid w-full max-w-6xl overflow-hidden p-0 lg:grid-cols-2"
      >
        <section className="relative hidden min-h-[680px] overflow-hidden p-10 lg:flex lg:flex-col">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#FF9B45]/30 blur-3xl" />

          <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#D5451B]/20 blur-3xl" />

          <div className="relative z-10">
            <h1
              className="text-3xl font-bold"
              style={{
                fontFamily:
                  "var(--font-plus-jakarta), sans-serif",
              }}
            >
              Clini
              <span className="text-gradient">
                Verse
              </span>
            </h1>

            <p className="mt-2 text-sm text-[#85675E]">
              AI Healthcare Assistant
            </p>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
            <NovaAnimation className="h-[330px] w-[330px]" />

            <div className="-mt-5">
              <div className="flex items-center justify-center gap-2 text-[#D5451B]">
                <Sparkles size={18} />

                <p className="text-sm font-bold uppercase tracking-[0.14em]">
                  Meet Nova
                </p>
              </div>

              <h2 className="mt-3 text-3xl font-bold">
                Your healthcare companion
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#85675E]">
                Ask health questions and use
                CliniVerse&apos;s guided symptom
                checker in one calm AI experience.
              </p>
            </div>
          </div>
        </section>


        <section className="flex min-h-[680px] items-center p-6 sm:p-10 lg:p-12">
          <div className="mx-auto w-full max-w-md">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D5451B]">
                Welcome to CliniVerse
              </p>

              <h2
                className="mt-3 text-3xl font-bold sm:text-4xl"
                style={{
                  fontFamily:
                    "var(--font-plus-jakarta), sans-serif",
                }}
              >
                {mode === "login"
                  ? "Welcome back"
                  : "Create your account"}
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#85675E]">
                {mode === "login"
                  ? "Sign in to continue your CliniVerse experience."
                  : "Create an account to get started with Nova."}
              </p>
            </div>


            <div className="mt-7 grid grid-cols-2 rounded-2xl border border-white/70 bg-white/35 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  mode === "login"
                    ? "primary-gradient text-white shadow-md"
                    : "text-[#85675E]"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  mode === "register"
                    ? "primary-gradient text-white shadow-md"
                    : "text-[#85675E]"
                }`}
              >
                Register
              </button>
            </div>


            <form
              onSubmit={handleSubmit}
              className="mt-7 grid gap-4"
            >
              {mode === "register" && (
                <label className="grid gap-2">
                  <span className="text-sm font-bold">
                    Full name
                  </span>

                  <div className="glass-panel flex h-13 items-center gap-3 rounded-2xl px-4">
                    <UserRound
                      size={19}
                      className="text-[#85675E]"
                    />

                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={150}
                      value={fullName}
                      onChange={(event) =>
                        setFullName(
                          event.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </label>
              )}


              <label className="grid gap-2">
                <span className="text-sm font-bold">
                  Email
                </span>

                <div className="glass-panel flex h-13 items-center gap-3 rounded-2xl px-4">
                  <Mail
                    size={19}
                    className="text-[#85675E]"
                  />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </label>


              <label className="grid gap-2">
                <span className="text-sm font-bold">
                  Password
                </span>

                <div className="glass-panel flex h-13 items-center gap-3 rounded-2xl px-4">
                  <LockKeyhole
                    size={19}
                    className="text-[#85675E]"
                  />

                  <input
                    type="password"
                    required
                    minLength={8}
                    maxLength={128}
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Minimum 8 characters"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </label>


              {error && (
                <div className="rounded-2xl border border-red-200/70 bg-red-50/60 p-4 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}


              <button
                type="submit"
                disabled={isSubmitting}
                className="primary-gradient mt-2 flex h-13 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isSubmitting
                  ? "Please wait..."
                  : mode === "login"
                    ? "Login"
                    : "Create account"}

                {!isSubmitting && (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>


            <p className="mt-6 text-center text-xs leading-5 text-[#85675E]">
              Nova provides general health
              information and does not replace
              professional medical advice.
            </p>
          </div>
        </section>
      </GlassCard>
    </main>
  );
}