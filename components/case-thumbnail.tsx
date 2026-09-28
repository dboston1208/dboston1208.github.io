import { cn } from "@/lib/utils";

// Frames a trimmed cover (see scripts/make-thumbnails.mjs) the same way
// everywhere: 16:10, surface background, 16px radius, and the screenshot
// contained with equal padding so no cover gets cropped differently.
export function CaseThumbnail({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[16px] bg-surface p-[7%]",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
