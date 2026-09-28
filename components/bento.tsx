import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { DevSlot } from "@/components/dev-slot";
import { cn } from "@/lib/utils";

type Shape = "big" | "wide" | "tall" | "full" | "small";

// Spans on the 2-column (md) and 4-column (lg) grids. Mobile stacks.
const SHAPE_CLASS: Record<Shape, string> = {
  big: "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  wide: "md:col-span-2 lg:col-span-2",
  full: "md:col-span-2 lg:col-span-4",
  tall: "md:row-span-2 lg:row-span-2",
  small: "",
};

// One gap-free arrangement per filled-tile count, assigned in page order.
// Each sums to whole rows on both the 4- and 2-column grids (with dense
// packing), so the grid reflows cleanly as slots fill in.
const LAYOUTS: Record<number, Shape[]> = {
  1: ["full"],
  2: ["big", "big"],
  3: ["big", "wide", "wide"],
  4: ["big", "wide", "small", "small"],
  5: ["big", "small", "small", "wide", "full"],
  6: ["big", "wide", "small", "small", "wide", "wide"],
  7: ["big", "wide", "small", "small", "wide", "small", "small"],
  8: ["big", "wide", "small", "small", "wide", "small", "small", "full"],
  9: ["big", "wide", "small", "small", "wide", "tall", "small", "wide", "small"],
};

type BentoSlotProps = {
  name: string;
  hint: string;
  shape?: Shape;
  children?: ReactNode;
};

export function BentoSlot({ name, shape = "small", children }: BentoSlotProps) {
  return (
    <div data-slot={name} className={cn("min-h-40 overflow-hidden rounded-[16px] bg-surface", SHAPE_CLASS[shape])}>
      {children}
    </div>
  );
}

function hasContent(node: ReactNode) {
  return Children.toArray(node).length > 0;
}

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  const slots = Children.toArray(children).filter(
    (child): child is ReactElement<BentoSlotProps> => isValidElement(child) && child.type === BentoSlot,
  );
  const filled = slots.filter((slot) => hasContent(slot.props.children));
  const empty = slots.filter((slot) => !hasContent(slot.props.children));
  const shapes = LAYOUTS[filled.length] ?? [];

  return (
    <>
      {filled.length > 0 ? (
        <div
          className={cn(
            "grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-2 md:auto-rows-[200px] lg:grid-cols-4 lg:auto-rows-[180px]",
            className,
          )}
        >
          {filled.map((slot, i) => cloneElement(slot, { shape: shapes[i] ?? "small" }))}
        </div>
      ) : null}

      {empty.length > 0 && process.env.NODE_ENV === "development" ? (
        <div className={cn("grid gap-3 sm:grid-cols-3", filled.length > 0 ? "mt-10" : className)}>
          <DevSlot
            className="p-3 sm:col-span-3"
            label={`Empty bento slots (dev only, collapsed in the build): ${empty.length} of ${slots.length}`}
          />
          {empty.map((slot) => (
            <DevSlot key={slot.props.name} className="min-h-24" label={`${slot.props.name} · ${slot.props.hint}`} />
          ))}
        </div>
      ) : null}
    </>
  );
}
