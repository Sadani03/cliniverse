import {
  Activity,
  Brain,
  CircleDot,
  Droplets,
  HeartPulse,
  Thermometer,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/utils";

const symptoms = [
  {
    label: "Headache",
    icon: Brain,
  },
  {
    label: "Fever",
    icon: Thermometer,
  },
  {
    label: "Cough",
    icon: Wind,
  },
  {
    label: "Sore throat",
    icon: CircleDot,
  },
  {
    label: "Fatigue",
    icon: Activity,
  },
  {
    label: "Nausea",
    icon: Droplets,
  },
  {
    label: "Chest discomfort",
    icon: HeartPulse,
  },
];

type SymptomSelectionProps = {
  selectedSymptoms: string[];
  onToggle: (symptom: string) => void;
};

export function SymptomSelection({
  selectedSymptoms,
  onToggle,
}: SymptomSelectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold">
        What symptoms are you experiencing?
      </h3>

      <p className="mt-2 text-sm text-[#85675E]">
        Select every symptom that applies.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {symptoms.map((symptom) => {
          const Icon = symptom.icon;
          const isSelected = selectedSymptoms.includes(
            symptom.label
          );

          return (
            <button
              key={symptom.label}
              type="button"
              onClick={() => onToggle(symptom.label)}
              className={cn(
                "flex min-h-32 flex-col items-center justify-center rounded-[24px] border p-5 text-center transition duration-300",
                isSelected
                  ? "border-[#D5451B] bg-[#FF9B45]/20 text-[#D5451B] shadow-md"
                  : "border-white/70 bg-white/35 hover:-translate-y-1 hover:bg-white/60"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  isSelected
                    ? "primary-gradient text-white"
                    : "bg-white/55 text-[#D5451B]"
                )}
              >
                <Icon size={23} />
              </div>

              <span className="mt-3 text-sm font-bold">
                {symptom.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}