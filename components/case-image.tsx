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
    <figure className={className ? `case-media ${className}` : "case-media"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} onClick={() => setOpen(true)} className="case-image cursor-zoom-in" />
      <figcaption className="case-caption">{caption}</figcaption>
      <Lightbox open={open} close={() => setOpen(false)} slides={[{ src, alt }]} />
    </figure>
  );
}
