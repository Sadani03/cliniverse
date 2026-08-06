import type {
  LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

type ProfileSectionProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
};

export function ProfileSection({
  title,
  description,
  icon: Icon,
  children,
}: ProfileSectionProps) {
  return (
    <section className="rounded-[26px] border border-white/70 bg-white/32 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-start gap-4">
        <div className="primary-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg">
          <Icon size={21} />
        </div>

        <div>
          <h3
            className="text-lg font-bold"
            style={{
              fontFamily:
                "var(--font-plus-jakarta), sans-serif",
            }}
          >
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-[#85675E]">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}