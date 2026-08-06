"use client";

import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";

import { DurationSelection } from "@/components/symptom-checker/DurationSelection";
import { SeveritySelection } from "@/components/symptom-checker/SeveritySelection";
import { SymptomDetails } from "@/components/symptom-checker/SymptomDetails";
import { SymptomProgress } from "@/components/symptom-checker/SymptomProgress";
import { SymptomResults } from "@/components/symptom-checker/SymptomResults";
import { SymptomSelection } from "@/components/symptom-checker/SymptomSelection";
import { GlassCard } from "@/components/shared/GlassCard";

import type {
  SymptomFormData,
  SymptomResult,
} from "@/types/symptom";

const initialFormData: SymptomFormData = {
  symptoms: [],
  severity: "",
  duration: "",
  additionalDetails: "",
};

function createDemoResult(
  formData: SymptomFormData
): SymptomResult {
  const hasChestDiscomfort =
    formData.symptoms.includes("Chest discomfort");

  if (
    hasChestDiscomfort &&
    formData.severity === "Severe"
  ) {
    return {
      title: "Prompt medical assessment is recommended",
      urgency: "Urgent",
      summary:
        "Severe chest discomfort can require immediate professional assessment, especially when it is new, worsening, or accompanied by breathing difficulty, faintness, sweating, or pain spreading elsewhere.",
      selfCare: [
        "Stop strenuous activity and rest.",
        "Avoid driving yourself if you feel faint or seriously unwell.",
        "Ask a trusted adult or nearby person for help.",
      ],
      seekHelpWhen: [
        "Chest discomfort is severe, sudden, or worsening.",
        "You have difficulty breathing, faintness, confusion, or heavy sweating.",
        "Pain spreads toward the arm, back, neck, shoulder, or jaw.",
      ],
    };
  }

  if (formData.severity === "Severe") {
    return {
      title: "Professional medical advice is recommended",
      urgency: "Urgent",
      summary:
        "Because you described your symptoms as severe, it would be safer to contact a qualified healthcare professional rather than relying only on self-care.",
      selfCare: [
        "Rest and avoid strenuous activity.",
        "Drink fluids if you can do so safely.",
        "Ask a trusted person to stay nearby if you feel very unwell.",
      ],
      seekHelpWhen: [
        "Symptoms are rapidly worsening.",
        "You experience breathing difficulty, fainting, confusion, or severe weakness.",
        "You feel that something is seriously wrong.",
      ],
    };
  }

  if (
    formData.severity === "Moderate" ||
    formData.duration === "More than one week"
  ) {
    return {
      title: "Monitor your symptoms and consider medical advice",
      urgency: "Moderate",
      summary:
        "Your answers suggest that monitoring the symptoms closely is important. Persistent or moderate symptoms may benefit from assessment by a healthcare professional.",
      selfCare: [
        "Rest and maintain regular fluid intake.",
        "Track whether symptoms improve, remain stable, or worsen.",
        "Avoid activities that clearly make the symptoms worse.",
      ],
      seekHelpWhen: [
        "Symptoms persist or continue to interfere with normal activities.",
        "New symptoms appear.",
        "You develop breathing difficulty, confusion, fainting, or severe pain.",
      ],
    };
  }

  return {
    title: "General self-care and monitoring may be appropriate",
    urgency: "Low",
    summary:
      "Your answers currently suggest mild symptoms. Basic self-care and monitoring may help, but seek professional advice if your condition changes.",
    selfCare: [
      "Rest and drink enough fluids.",
      "Eat regular balanced meals if you are able.",
      "Monitor symptoms and note any new changes.",
    ],
    seekHelpWhen: [
      "Symptoms become moderate or severe.",
      "Symptoms continue longer than expected.",
      "You experience breathing difficulty, fainting, confusion, severe pain, or rapid worsening.",
    ],
  };
}

export function SymptomCheckerPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] =
    useState<SymptomFormData>(initialFormData);

  const [result, setResult] =
    useState<SymptomResult | null>(null);

  function toggleSymptom(symptom: string) {
    setFormData((current) => ({
      ...current,
      symptoms: current.symptoms.includes(symptom)
        ? current.symptoms.filter(
            (item) => item !== symptom
          )
        : [...current.symptoms, symptom],
    }));
  }

  function canContinue() {
    if (currentStep === 1) {
      return formData.symptoms.length > 0;
    }

    if (currentStep === 2) {
      return Boolean(formData.severity);
    }

    if (currentStep === 3) {
      return Boolean(formData.duration);
    }

    return true;
  }

  function goNext() {
    if (!canContinue()) {
      return;
    }

    if (currentStep === 4) {
      setResult(createDemoResult(formData));
      setCurrentStep(5);
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, 5));
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function restart() {
    setFormData(initialFormData);
    setResult(null);
    setCurrentStep(1);
  }

  return (
    <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <GlassCard strong className="p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="primary-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg">
            <Stethoscope size={23} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Symptom Checker
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#85675E]">
              Answer a few questions to receive general
              guidance from Nova.
            </p>
          </div>
        </div>

        <div className="mt-7">
          <SymptomProgress currentStep={currentStep} />
        </div>

        <div className="mt-8 min-h-[430px]">
          {currentStep === 1 && (
            <SymptomSelection
              selectedSymptoms={formData.symptoms}
              onToggle={toggleSymptom}
            />
          )}

          {currentStep === 2 && (
            <SeveritySelection
              severity={formData.severity}
              onChange={(severity) =>
                setFormData((current) => ({
                  ...current,
                  severity,
                }))
              }
            />
          )}

          {currentStep === 3 && (
            <DurationSelection
              duration={formData.duration}
              onChange={(duration) =>
                setFormData((current) => ({
                  ...current,
                  duration,
                }))
              }
            />
          )}

          {currentStep === 4 && (
            <SymptomDetails
              details={formData.additionalDetails}
              onChange={(additionalDetails) =>
                setFormData((current) => ({
                  ...current,
                  additionalDetails,
                }))
              }
            />
          )}

          {currentStep === 5 && result && (
            <SymptomResults
              result={result}
              onRestart={restart}
            />
          )}
        </div>

        {currentStep < 5 && (
          <div className="mt-8 flex items-center justify-between border-t border-white/55 pt-5">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/40 px-5 py-3 text-sm font-bold transition hover:bg-white/65 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue()}
              className="primary-gradient flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {currentStep === 4
                ? "View guidance"
                : "Continue"}

              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </GlassCard>

      <aside className="grid content-start gap-5">
        <GlassCard className="p-5">
          <h3 className="font-bold">
            Your selected symptoms
          </h3>

          {formData.symptoms.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-[#85675E]">
              No symptoms selected yet.
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              {formData.symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="rounded-full bg-[#FF9B45]/20 px-3 py-2 text-xs font-bold text-[#D5451B]"
                >
                  {symptom}
                </span>
              ))}
            </div>
          )}
        </GlassCard>

        <GlassCard className="border-orange-200/60 bg-orange-50/40 p-5">
          <div className="flex items-center gap-3 text-[#D5451B]">
            <ShieldAlert size={21} />
            <h3 className="font-bold">
              Important safety notice
            </h3>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#6F4B40]">
            Nova does not diagnose illnesses. Contact a
            healthcare professional for persistent, worsening,
            unusual, or severe symptoms.
          </p>
        </GlassCard>

        <GlassCard className="border-red-200/60 bg-red-50/45 p-5">
          <h3 className="font-bold text-red-700">
            Medical emergency
          </h3>

          <p className="mt-3 text-sm leading-6 text-red-950/70">
            For severe breathing difficulty, fainting,
            confusion, severe chest discomfort, or rapidly
            worsening symptoms, contact local emergency
            services immediately.
          </p>
        </GlassCard>
      </aside>
    </div>
  );
}