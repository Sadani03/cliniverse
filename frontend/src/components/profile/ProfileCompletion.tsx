import { CheckCircle2 } from "lucide-react";

type ProfileCompletionProps = {
  percentage: number;
};

export function ProfileCompletion({
  percentage,
}: ProfileCompletionProps) {
  const isComplete = percentage === 100;

  return (
    <div className="glass-panel rounded-[26px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold">
            Profile completion
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#85675E]">
            Complete your information to help Nova understand
            your health context.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-[#D5451B]">
          {isComplete && (
            <CheckCircle2 size={20} />
          )}

          <span className="text-xl font-bold">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/55">
        <div
          className="primary-gradient h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}