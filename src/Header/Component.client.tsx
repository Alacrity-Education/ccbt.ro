"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import type { Header, Page, Post } from "@/payload-types";

import { useViewport } from "@/hooks/useViewport";

interface HeaderClientProps {
  data: Header;
}

function resolveHref(link: any): string {
  if (!link) return "/";
  if (link.type === "reference" && typeof link.reference?.value === "object") {
    const slug = (link.reference.value as Page | Post).slug;
    const prefix = link.reference.relationTo !== "pages" ? `/${link.reference.relationTo}` : "";
    return `${prefix}/${slug ?? ""}`;
  }
  return link.url || "/";
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const vp = useViewport();
  const compact = !vp.isDesktop;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = data?.navItems || [];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          height: compact ? 64 : 88,
          display: "flex",
          alignItems: "center",
          padding: compact ? "0 20px" : "0 64px",
          background: "var(--cream)",
          position: "sticky",
          top: 0,
          zIndex: 30,
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <Link href="/" style={{ display: "block", transform: compact ? "scale(0.78)" : "none", transformOrigin: "left center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Centrul Cultural Botoșani" style={{ height: 56, width: "auto" }} />
        </Link>

        {compact ? (
          <button
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            onClick={() => setOpen((v) => !v)}
            style={{
              marginLeft: "auto",
              width: 40,
              height: 40,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--ink)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 7h18M3 12h18M3 17h18" />
              </svg>
            )}
          </button>
        ) : (
          <>
            <nav style={{ display: "flex", gap: 40, marginLeft: "auto", marginRight: 40, alignItems: "center" }}>
              {navItems.map((item, i) => {
                const navLink = (item as any).link;
                const href = resolveHref(navLink);
                const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
                return (
                  <div key={i} style={{ position: "relative", paddingBottom: 6 }}>
                    <Link
                      href={href}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: isActive ? "var(--red)" : "var(--ink)",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                      target={navLink?.newTab ? "_blank" : undefined}
                    >
                      {navLink?.label}
                    </Link>
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: -10,
                          height: 2,
                          background: "var(--red)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
              style={{ cursor: "pointer", flexShrink: 0 }}
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </>
        )}
      </header>

      {compact && open && (
        <div
          style={{
            position: "fixed",
            top: compact ? 64 : 88,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 25,
            background: "var(--cream)",
            padding: "32px 24px",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map((item, i) => {
              const navLink = (item as any).link;
              const href = resolveHref(navLink);
              const isActive = pathname === href;
              return (
                <Link
                  key={i}
                  href={href}
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--red)" : "var(--ink)",
                    textDecoration: "none",
                    padding: "18px 4px",
                    borderBottom: "1px solid var(--rule)",
                    display: "block",
                  }}
                  target={navLink?.newTab ? "_blank" : undefined}
                >
                  {navLink?.label}
                </Link>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              border: "1px solid var(--rule)",
              borderRadius: 2,
              background: "var(--paper)",
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span style={{ color: "var(--ink-soft)", fontSize: 14 }}>Caută…</span>
          </div>
        </div>
      )}
    </>
  );
};
