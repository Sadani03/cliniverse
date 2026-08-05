import { Construction } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <GlassCard
      strong
      className="mt-8 flex min-h-[520px] flex-col items-center justify-center p-8 text-center"
    >
      <div className="primary-gradient flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-lg">
        <Construction size={28} />
      </div>

      <h2
        className="mt-5 text-3xl font-bold"
        style={{
          fontFamily:
            "var(--font-plus-jakarta), sans-serif",
        }}
      >
        {title}
      </h2>

      <p className="mt-3 max-w-lg text-sm leading-6 text-[#85675E]">
        {description}
      </p>
    </GlassCard>
  );
}