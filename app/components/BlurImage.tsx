"use client";

import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

type BlurImageProps = ImageProps & {
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
};

/**
 * Image wrapper that always renders the next/image visibly.
 * A shimmer is drawn underneath as a placeholder; the image (fill = absolute)
 * naturally covers it once decoded. No JS state controls visibility — that
 * way the image can never be permanently hidden by a missed load event.
 */
export default function BlurImage({
  wrapperClassName,
  wrapperStyle,
  className,
  style,
  alt,
  ...rest
}: BlurImageProps) {
  return (
    <div
      className={wrapperClassName}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        backgroundColor: "#eef2f6",
        ...wrapperStyle,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, #eef2f6 0%, #f7f9fc 50%, #eef2f6 100%)",
          backgroundSize: "200% 100%",
          animation: "blur-shimmer 1.4s linear infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Image
        {...rest}
        alt={alt}
        className={className}
        style={{ ...style, zIndex: 1 }}
      />
      <style jsx>{`
        @keyframes blur-shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
