import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SymptomDuration } from "@/types/symptom";

const durationOptions: SymptomDuration[] = [
  "Less than 24 hours",
  "1–3 days",
  "4–7 days",
  "More than one week",
];

type DurationSelectionProps = {
  duration: SymptomDuration | "";
  onChange: (duration: SymptomDuration) => void;
};

export function DurationSelection({
  duration,
  onChange,
}: DurationSelectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold">
        How long have you had these symptoms?
      </h3>

      <p className="mt-2 text-sm text-[#85675E]">
        Select the closest duration.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {durationOptions.map((option) => {
          const isSelected = duration === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "flex items-center gap-4 rounded-[24px] border p-5 text-left transition duration-300",
                isSelected
                  ? "border-[#D5451B] bg-[#FF9B45]/20 shadow-md"
                  : "border-white/70 bg-white/35 hover:-translate-y-1 hover:bg-white/60"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                  isSelected
                    ? "primary-gradient text-white"
                    : "bg-white/60 text-[#D5451B]"
                )}
              >
                <Clock3 size={22} />
              </div>

              <span className="text-sm font-bold">
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}