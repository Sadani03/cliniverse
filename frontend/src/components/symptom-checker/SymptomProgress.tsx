import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  "Symptoms",
  "Severity",
  "Duration",
  "Details",
  "Results",
];

type SymptomProgressProps = {
  currentStep: number;
};

export function SymptomProgress({
  currentStep,
}: SymptomProgressProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[620px] items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={step}
              className="relative flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition",
                    isCompleted &&
                      "primary-gradient border-transparent text-white",
                    isActive &&
                      "border-[#D5451B] bg-[#FF9B45]/20 text-[#D5451B]",
                    !isCompleted &&
                      !isActive &&
                      "border-white/70 bg-white/40 text-[#85675E]"
                  )}
                >
                  {isCompleted ? (
                    <Check size={18} />
                  ) : (
                    stepNumber
                  )}
                </div>

                <span
                  className={cn(
                    "mt-2 text-xs font-semibold",
                    isActive || isCompleted
                      ? "text-[#D5451B]"
                      : "text-[#85675E]"
                  )}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-3 h-0.5 flex-1",
                    stepNumber < currentStep
                      ? "bg-[#D5451B]"
                      : "bg-white/60"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}