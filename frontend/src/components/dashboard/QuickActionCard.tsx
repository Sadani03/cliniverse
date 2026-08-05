import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

type QuickActionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
};

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
}: QuickActionCardProps) {
  return (
    <GlassCard
      role="button"
      tabIndex={0}
      onClick={onClick}
      className="group flex cursor-pointer items-center justify-between p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/60"
    >
      <div className="flex items-center gap-4">
        <div className="primary-gradient flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg">
          <Icon size={25} />
        </div>

        <div>
          <h3
            className="font-bold"
            style={{
              fontFamily:
                "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {title}
          </h3>

          <p className="mt-1 max-w-[260px] text-sm leading-5 text-[#85675E]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/45 transition group-hover:translate-x-1 group-hover:bg-[#FF9B45] group-hover:text-white">
        <ArrowRight size={19} />
      </div>
    </GlassCard>
  );
}