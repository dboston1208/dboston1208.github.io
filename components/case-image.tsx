"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type CaseImageProps = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
};

export function CaseImage({ src, alt, caption, className }: CaseImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={className ? `case-image cursor-zoom-in ${className}` : "case-image cursor-zoom-in"}
      />
      <p className="case-caption">{caption}</p>
      <Lightbox open={open} close={() => setOpen(false)} slides={[{ src, alt }]} />
    </>
  );
}
