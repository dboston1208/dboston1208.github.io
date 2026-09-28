import type { ReactNode } from "react";
import { DevSlot } from "@/components/dev-slot";
import { cn } from "@/lib/utils";

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-2 md:auto-rows-[200px] lg:grid-cols-4 lg:auto-rows-[180px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type BentoSlotProps = {
  name: string;
  hint: string;
  className?: string;
  children?: ReactNode;
};

// An empty slot renders as a blank tile. Its label shows only under
// `next dev` (via DevSlot), so the static export has no placeholder text.
export function BentoSlot({ name, hint, className, children }: BentoSlotProps) {
  const empty = children == null || children === false;

  return (
    <div
      data-slot={name}
      aria-hidden={empty || undefined}
      className={cn("min-h-40 overflow-hidden rounded-[16px] bg-surface", className)}
    >
      {empty ? <DevSlot className="h-full rounded-[16px]" label={`${name} · ${hint}`} /> : children}
    </div>
  );
}
