import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strong?: boolean;
};

export function GlassCard({
  children,
  className,
  strong = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-panel-strong" : "glass-panel",
        "rounded-[28px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}