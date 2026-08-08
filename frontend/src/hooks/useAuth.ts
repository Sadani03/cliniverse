"use client";

import {
  useEffect,
  useState,
} from "react";

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

export function useAuth() {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  /*
   * IMPORTANT:
   * Always start as true.
   *
   * This guarantees that the server and browser
   * produce the exact same first render.
   */
  const [
    isCheckingAuth,
    setIsCheckingAuth,
  ] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function initialiseAuth() {
      /*
       * Yield once so all state updates happen
       * asynchronously rather than synchronously
       * inside the effect body.
       */
      await Promise.resolve();

      const token =
        getAccessToken();

      if (!token) {
        if (!cancelled) {
          setIsCheckingAuth(false);
        }

        return;
      }

      try {
        const currentUser =
          await getCurrentUser(
            token
          );

        if (!cancelled) {
          setUser(
            currentUser
          );
        }
      } catch {
        removeAccessToken();

        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsCheckingAuth(
            false
          );
        }
      }
    }

    void initialiseAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  async function login(
    payload: LoginPayload
  ): Promise<void> {
    setIsCheckingAuth(true);

    try {
      const response =
        await loginUser(
          payload
        );

      saveAccessToken(
        response.access_token
      );

      const currentUser =
        await getCurrentUser(
          response.access_token
        );

      setUser(currentUser);
    } finally {
      setIsCheckingAuth(
        false
      );
    }
  }

  async function register(
    payload: RegisterPayload
  ): Promise<void> {
    await registerUser(
      payload
    );

    await login({
      email: payload.email,
      password:
        payload.password,
    });
  }

  function logout() {
    removeAccessToken();

    setUser(null);
    setIsCheckingAuth(
      false
    );
  }

  return {
    user,
    isCheckingAuth,
    login,
    register,
    logout,
  };
}