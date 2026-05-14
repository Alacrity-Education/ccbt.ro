"use client";
import React, { useEffect } from "react";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import type { Page } from "@/payload-types";
import { Media } from "@/components/Media";
import { Divider } from "@/components/Motif";

export const HomeHero: React.FC<Page["hero"]> = ({ media, title, subtitle }) => {
  const { setHeaderTheme } = useHeaderTheme();
  useEffect(() => { setHeaderTheme("dark"); });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: 480,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        background: "var(--ink)",
      }}
    >
      {/* Background image */}
      {media && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background: "linear-gradient(to top, rgba(27,42,74,0.82) 0%, rgba(27,42,74,0.35) 55%, rgba(27,42,74,0.15) 100%)",
            }}
          />
          <Media
            fill
            priority
            resource={media}
            imgClassName="object-cover"
          />
        </div>
      )}

      {/* Text */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(24px, 5vw, 64px) clamp(48px, 6vw, 96px)",
        }}
      >
        <Divider style={{ marginBottom: 28, opacity: 0.55 }} />
        {title && (
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              color: "var(--cream)",
              margin: "0 0 16px",
              maxWidth: 760,
            }}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              lineHeight: 1.6,
              color: "rgba(245,237,224,0.75)",
              margin: 0,
              maxWidth: 520,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
