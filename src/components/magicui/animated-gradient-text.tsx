/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export interface AnimatedGradientTextProps
  extends ComponentPropsWithoutRef<"div"> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function AnimatedGradientText({
  children,
  className,
  speed = 3,
  colorFrom = "#ff6f00",
  colorTo = "#ffdd00",
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "animate-gradient-x bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
      style={{
        "--color-from": colorFrom,
        "--color-to": colorTo,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </span>
  );
}