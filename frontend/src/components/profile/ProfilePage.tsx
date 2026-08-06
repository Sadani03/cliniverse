"use client";

import {
  HeartPulse,
  RotateCcw,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { GlassCard } from "@/components/shared/GlassCard";
import { ProfileCompletion } from "@/components/profile/ProfileCompletion";
import { ProfileInput } from "@/components/profile/ProfileInput";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { ProfileSelect } from "@/components/profile/ProfileSelect";
import { ProfileTextarea } from "@/components/profile/ProfileTextarea";
import { useProfile } from "@/hooks/useProfile";

import type {
  BiologicalSex,
  BloodGroup,
} from "@/types/profile";

const biologicalSexOptions = [
  "Female",
  "Male",
  "Prefer not to say",
] as const;

const bloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown",
] as const;

export function ProfilePage() {
  const {
    profile,
    updatePersonalField,
    updateHealthField,
    saveProfile,
    clearProfile,
  } = useProfile();

  const [statusMessage, setStatusMessage] =
    useState("");

  const completionPercentage = useMemo(() => {
    const values = [
      profile.personal.fullName,
      profile.personal.dateOfBirth,
      profile.personal.biologicalSex,
      profile.personal.heightCm,
      profile.personal.weightKg,
      profile.personal.bloodGroup,
      profile.health.allergies,
      profile.health.chronicConditions,
      profile.health.emergencyContactName,
      profile.health.emergencyContactPhone,
    ];

    const completedFields = values.filter(
      (value) => value.trim().length > 0
    ).length;

    return Math.round(
      (completedFields / values.length) * 100
    );
  }, [profile]);

  function showTemporaryMessage(message: string) {
    setStatusMessage(message);

    window.setTimeout(() => {
      setStatusMessage("");
    }, 3000);
  }

  function handleSave() {
    if (!profile.personal.fullName.trim()) {
      showTemporaryMessage(
        "Please enter your full name before saving."
      );

      return;
    }

    const saved = saveProfile();

    showTemporaryMessage(
      saved
        ? "Your profile was saved successfully."
        : "Your profile could not be saved."
    );
  }

  function handleClear() {
    const confirmed = window.confirm(
      "Clear all locally saved profile information?"
    );

    if (!confirmed) {
      return;
    }

    clearProfile();
    showTemporaryMessage(
      "Your saved profile was cleared."
    );
  }

  return (
    <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
      <GlassCard strong className="p-5 sm:p-7">
        <header className="flex items-start gap-4 border-b border-white/55 pb-6">
          <div className="primary-gradient flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg">
            <UserRound size={25} />
          </div>

          <div>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{
                fontFamily:
                  "var(--font-plus-jakarta), sans-serif",
              }}
            >
              Your Health Profile
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#85675E]">
              Keep your basic information accurate so Nova can
              provide more relevant general health guidance.
            </p>
          </div>
        </header>

        <div className="mt-6 grid gap-5">
          <ProfileSection
            title="Personal information"
            description="Enter your basic personal details."
            icon={UserRound}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <ProfileInput
                id="full-name"
                label="Full name"
                value={profile.personal.fullName}
                placeholder="Enter your full name"
                required
                onChange={(value) =>
                  updatePersonalField(
                    "fullName",
                    value
                  )
                }
              />

              <ProfileInput
                id="date-of-birth"
                label="Date of birth"
                type="date"
                value={profile.personal.dateOfBirth}
                required
                onChange={(value) =>
                  updatePersonalField(
                    "dateOfBirth",
                    value
                  )
                }
              />

              <ProfileSelect
                id="biological-sex"
                label="Biological sex"
                value={
                  profile.personal.biologicalSex
                }
                options={biologicalSexOptions}
                placeholder="Select an option"
                onChange={(value) =>
                  updatePersonalField(
                    "biologicalSex",
                    value as BiologicalSex
                  )
                }
              />

              <ProfileSelect
                id="blood-group"
                label="Blood group"
                value={profile.personal.bloodGroup}
                options={bloodGroupOptions}
                placeholder="Select blood group"
                onChange={(value) =>
                  updatePersonalField(
                    "bloodGroup",
                    value as BloodGroup
                  )
                }
              />

              <ProfileInput
                id="height"
                label="Height"
                type="number"
                value={profile.personal.heightCm}
                placeholder="Height in cm"
                min="50"
                max="250"
                helperText="Enter height in centimetres."
                onChange={(value) =>
                  updatePersonalField(
                    "heightCm",
                    value
                  )
                }
              />

              <ProfileInput
                id="weight"
                label="Weight"
                type="number"
                value={profile.personal.weightKg}
                placeholder="Weight in kg"
                min="10"
                max="400"
                helperText="Enter weight in kilograms."
                onChange={(value) =>
                  updatePersonalField(
                    "weightKg",
                    value
                  )
                }
              />
            </div>
          </ProfileSection>

          <ProfileSection
            title="Health information"
            description="Add basic health context for Nova."
            icon={HeartPulse}
          >
            <div className="grid gap-5">
              <ProfileTextarea
                id="allergies"
                label="Known allergies"
                value={profile.health.allergies}
                placeholder="Example: Penicillin, peanuts, or write None"
                helperText="List known allergies or enter None."
                onChange={(value) =>
                  updateHealthField(
                    "allergies",
                    value
                  )
                }
              />

              <ProfileTextarea
                id="chronic-conditions"
                label="Chronic conditions"
                value={
                  profile.health.chronicConditions
                }
                placeholder="Example: Asthma, diabetes, or write None"
                helperText="List long-term conditions or enter None."
                onChange={(value) =>
                  updateHealthField(
                    "chronicConditions",
                    value
                  )
                }
              />
            </div>
          </ProfileSection>

          <ProfileSection
            title="Emergency contact"
            description="Add someone who can be contacted when needed."
            icon={ShieldCheck}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <ProfileInput
                id="emergency-contact-name"
                label="Contact name"
                value={
                  profile.health
                    .emergencyContactName
                }
                placeholder="Enter contact name"
                onChange={(value) =>
                  updateHealthField(
                    "emergencyContactName",
                    value
                  )
                }
              />

              <ProfileInput
                id="emergency-contact-phone"
                label="Phone number"
                type="tel"
                value={
                  profile.health
                    .emergencyContactPhone
                }
                placeholder="+94..."
                onChange={(value) =>
                  updateHealthField(
                    "emergencyContactPhone",
                    value
                  )
                }
              />
            </div>
          </ProfileSection>
        </div>

        {statusMessage && (
          <div className="mt-5 rounded-2xl border border-[#FF9B45]/35 bg-[#FF9B45]/10 p-4 text-sm font-semibold text-[#8C3218]">
            {statusMessage}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-white/55 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/75 bg-white/40 px-5 py-3 text-sm font-bold transition hover:bg-white/70"
          >
            <RotateCcw size={18} />
            Clear profile
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="primary-gradient flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
          >
            <Save size={18} />
            Save profile
          </button>
        </div>
      </GlassCard>

      <aside className="grid content-start gap-5">
        <ProfileCompletion
          percentage={completionPercentage}
        />

        <GlassCard className="p-5">
          <h3 className="font-bold">
            Local storage
          </h3>

          <p className="mt-3 text-sm leading-6 text-[#85675E]">
            Your profile is currently stored only in this
            browser. It will move to your secure account when
            the backend is connected.
          </p>
        </GlassCard>

        <GlassCard className="border-orange-200/70 bg-orange-50/40 p-5">
          <div className="flex items-center gap-3 text-[#D5451B]">
            <ShieldCheck size={20} />

            <h3 className="font-bold">
              Privacy reminder
            </h3>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#6F4B40]">
            Do not enter passwords, banking information, or
            government identification numbers.
          </p>
        </GlassCard>
      </aside>
    </div>
  );
}