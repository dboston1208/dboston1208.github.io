import { cn } from "@/lib/utils";

// Marks where unfinished content goes. Visible only under `next dev`, so the
// static export never ships placeholder text.
export function DevSlot({ label, className }: { label: string; className?: string }) {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div
      data-dev-slot
      className={cn(
        "flex items-center justify-center rounded-[16px] border border-dashed border-sand bg-surface/60 p-6 text-center text-[13px] text-gold",
        className,
      )}
    >
      {label}
    </div>
  );
}
