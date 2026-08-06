"use client";

import { useState } from "react";
import {
  defaultHealthProfile,
  type HealthProfile,
} from "@/types/profile";

const STORAGE_KEY = "cliniverse-health-profile";

function loadProfile(): HealthProfile {
  if (typeof window === "undefined") {
    return defaultHealthProfile;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultHealthProfile;
    }

    const parsed = JSON.parse(stored) as Partial<HealthProfile>;

    return {
      ...defaultHealthProfile,
      ...parsed,
      personal: {
        ...defaultHealthProfile.personal,
        ...parsed.personal,
      },
      health: {
        ...defaultHealthProfile.health,
        ...parsed.health,
      },
      lifestyle: {
        ...defaultHealthProfile.lifestyle,
        ...parsed.lifestyle,
      },
      preferences: {
        ...defaultHealthProfile.preferences,
        ...parsed.preferences,
      },
    };
  } catch {
    return defaultHealthProfile;
  }
}

export function useProfile() {
  const [profile, setProfile] =
    useState<HealthProfile>(loadProfile);

  function updatePersonalField<
    K extends keyof HealthProfile["personal"]
  >(
    field: K,
    value: HealthProfile["personal"][K]
  ) {
    setProfile((current) => ({
      ...current,
      personal: {
        ...current.personal,
        [field]: value,
      },
    }));
  }

  function updateHealthField<
    K extends keyof HealthProfile["health"]
  >(
    field: K,
    value: HealthProfile["health"][K]
  ) {
    setProfile((current) => ({
      ...current,
      health: {
        ...current.health,
        [field]: value,
      },
    }));
  }

  function saveProfile() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profile)
      );
      return true;
    } catch {
      return false;
    }
  }

  function clearProfile() {
    setProfile(defaultHealthProfile);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return {
    profile,
    updatePersonalField,
    updateHealthField,
    saveProfile,
    clearProfile,
  };
}