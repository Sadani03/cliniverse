import { cn } from "@/lib/utils";
import type { SymptomSeverity } from "@/types/symptom";

const severityOptions: {
  value: SymptomSeverity;
  description: string;
}[] = [
  {
    value: "Mild",
    description:
      "Noticeable but does not interrupt normal activities.",
  },
  {
    value: "Moderate",
    description:
      "Affects some normal activities or requires rest.",
  },
  {
    value: "Severe",
    description:
      "Strong symptoms that significantly limit activities.",
  },
];

type SeveritySelectionProps = {
  severity: SymptomSeverity | "";
  onChange: (severity: SymptomSeverity) => void;
};

export function SeveritySelection({
  severity,
  onChange,
}: SeveritySelectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold">
        How severe are your symptoms?
      </h3>

      <p className="mt-2 text-sm text-[#85675E]">
        Choose the option that best matches how you feel.
      </p>

      <div className="mt-6 grid gap-4">
        {severityOptions.map((option) => {
          const isSelected = severity === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-[24px] border p-5 text-left transition duration-300",
                isSelected
                  ? "border-[#D5451B] bg-[#FF9B45]/20 shadow-md"
                  : "border-white/70 bg-white/35 hover:bg-white/60"
              )}
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "h-5 w-5 rounded-full border-2",
                    isSelected
                      ? "border-[#D5451B] bg-[#D5451B] shadow-[inset_0_0_0_4px_white]"
                      : "border-[#85675E]/40"
                  )}
                />

                <div>
                  <p className="font-bold">
                    {option.value}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#85675E]">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}