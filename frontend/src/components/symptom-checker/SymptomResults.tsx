import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SymptomResult } from "@/types/symptom";

type SymptomResultsProps = {
  result: SymptomResult;
  onRestart: () => void;
};

export function SymptomResults({
  result,
  onRestart,
}: SymptomResultsProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D5451B]">
            Nova&apos;s guidance
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {result.title}
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6F4B40]">
            {result.summary}
          </p>
        </div>

        <span
          className={cn(
            "w-fit rounded-full px-4 py-2 text-sm font-bold",
            result.urgency === "Low" &&
              "bg-green-100 text-green-700",
            result.urgency === "Moderate" &&
              "bg-amber-100 text-amber-700",
            result.urgency === "Urgent" &&
              "bg-red-100 text-red-700"
          )}
        >
          {result.urgency} priority
        </span>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[24px] border border-green-200/60 bg-green-50/45 p-5">
          <div className="flex items-center gap-3 text-green-700">
            <CheckCircle2 size={21} />
            <h4 className="font-bold">
              General self-care
            </h4>
          </div>

          <ul className="mt-4 space-y-3">
            {result.selfCare.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 text-green-950/75"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[24px] border border-red-200/60 bg-red-50/45 p-5">
          <div className="flex items-center gap-3 text-red-700">
            <AlertTriangle size={21} />
            <h4 className="font-bold">
              Seek medical help when
            </h4>
          </div>

          <ul className="mt-4 space-y-3">
            {result.seekHelpWhen.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 text-red-950/75"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-[22px] border border-orange-200/70 bg-orange-50/50 p-4">
        <ShieldAlert
          size={20}
          className="mt-0.5 shrink-0 text-[#D5451B]"
        />

        <p className="text-xs leading-5 text-[#6F4B40]">
          This result is educational guidance, not a medical
          diagnosis. A qualified healthcare professional must
          evaluate persistent, worsening, unusual, or severe
          symptoms.
        </p>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="primary-gradient mt-6 flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
      >
        <RotateCcw size={18} />
        Start again
      </button>
    </div>
  );
}