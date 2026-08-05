import {
  CalendarCheck,
  Droplets,
  Flame,
  Phone,
} from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export function InfoCards() {
  return (
    <div className="grid gap-5">
      <GlassCard className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF9B45]/20 text-[#D5451B]">
            <Droplets size={21} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#85675E]">
              Today
            </p>
            <h3 className="font-bold">Health Tip</h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#6F4B40]">
          Drink enough water throughout the day to support
          healthy digestion, concentration, and energy.
        </p>
      </GlassCard>

      <GlassCard className="border-red-200/70 bg-red-50/40 p-5">
        <div className="flex items-center gap-3 text-red-700">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100/80">
            <Phone size={20} />
          </div>

          <h3 className="font-bold">Need Immediate Help?</h3>
        </div>

        <p className="mt-4 text-sm leading-6 text-red-950/70">
          If this is a medical emergency, contact your local
          emergency services immediately.
        </p>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
        >
          <Phone size={18} />
          Emergency Information
        </button>
      </GlassCard>

      <GlassCard className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF9B45]/20 text-[#D5451B]">
            <Flame size={21} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#85675E]">
              Wellness
            </p>
            <h3 className="font-bold">Five-Day Streak</h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#6F4B40]">
          You have checked in with Nova for five days in a
          row. Keep taking care of yourself.
        </p>

        <div className="mt-4 flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="primary-gradient flex h-8 w-8 items-center justify-center rounded-full text-white"
            >
              <CalendarCheck size={15} />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}