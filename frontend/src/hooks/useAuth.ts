"use client";

import { useEffect, useState } from "react";

import {
  getAccessToken,
  getCurrentUser,
  loginUser,
  registerUser,
  removeAccessToken,
  saveAccessToken,
} from "@/services/authService";

import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth";

function loadInitialToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return getAccessToken();
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    loadInitialToken
  );

  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [isCheckingAuth, setIsCheckingAuth] =
    useState<boolean>(() => {
      return Boolean(loadInitialToken());
    });

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    async function checkCurrentUser() {
      try {
        const currentUser =
          await getCurrentUser(token!);

        if (!cancelled) {
          setUser(currentUser);
        }
      } catch {
        if (!cancelled) {
          removeAccessToken();
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsCheckingAuth(false);
        }
      }
    }

    void checkCurrentUser();

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function login(
    payload: LoginPayload
  ): Promise<void> {
    setIsCheckingAuth(true);

    try {
      const response =
        await loginUser(payload);

      saveAccessToken(
        response.access_token
      );

      const currentUser =
        await getCurrentUser(
          response.access_token
        );

      setToken(response.access_token);
      setUser(currentUser);
    } finally {
      setIsCheckingAuth(false);
    }
  }

  async function register(
    payload: RegisterPayload
  ): Promise<void> {
    await registerUser(payload);

    await login({
      email: payload.email,
      password: payload.password,
    });
  }

  function logout() {
    removeAccessToken();

    setToken(null);
    setUser(null);
    setIsCheckingAuth(false);
  }

  return {
    user,
    isCheckingAuth,
    login,
    register,
    logout,
  };
}