"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

type NovaAnimationProps = {
  className?: string;
};

export function NovaAnimation({
  className,
}: NovaAnimationProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
    >
      <div className="animate-pulse-glow absolute h-[78%] w-[78%] rounded-full bg-[#FF9B45]/25 blur-3xl" />

      <div className="animate-float relative z-10 h-full w-full">
        <DotLottieReact
          src="/lottie/nova.lottie"
          loop
          autoplay
          className="h-full w-full"
        />
      </div>
    </div>
  );
}