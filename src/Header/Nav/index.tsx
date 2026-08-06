"use client";

import React, { useEffect, useState } from "react";

import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { MenuButton } from "@/Header/MenuButton";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

/** Mirrors the href CMSLink builds, so we can tell which item is the current page. */
const resolveHref = (link: any): string | null => {
  if (!link) return null;

  if (
    link.type === "reference" &&
    typeof link.reference?.value === "object" &&
    link.reference.value?.slug
  ) {
    const prefix =
      link.reference.relationTo !== "pages"
        ? `/${link.reference.relationTo}`
        : "";
    return `${prefix}/${link.reference.value.slug}`;
  }

  return link.url ?? null;
};

/** The "home" page is served from "/", so both spellings must compare equal. */
const normalizePath = (value: string) => {
  const trimmed = value.length > 1 ? value.replace(/\/+$/, "") : value;
  return trimmed === "/home" ? "/" : trimmed;
};

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  /** True when a nav link points at the page we're currently on. */
  const isCurrentPage = (link: any) => {
    const href = resolveHref(link);
    return Boolean(
      href && pathname && normalizePath(href) === normalizePath(pathname),
    );
  };

  /* Close the sidebar whenever we navigate away. */
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  /* Lock the page behind the sidebar and allow Escape to dismiss it. */
  useEffect(() => {
    if (!isSidebarOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isSidebarOpen]);

  return (
    <nav className="flex items-center gap-5">
      {/* Desktop nav with submenu support. Type styling mirrors the mobile
          sidebar rows, only in brand purple instead of black. */}
      {navItems.map((item, i) => {
        const { itemType, link, subItems } = item as any;
        if (itemType === "parent") {
          return (
            <div
              key={i}
              className="dropdown dropdown-end dropdown-hover group hidden lg:block"
            >
              <div
                tabIndex={0}
                role="button"
                className="font-barlow text-primary flex items-center gap-1 text-[22px] font-semibold hover:cursor-pointer"
              >
                <FiChevronRight
                  aria-hidden
                  className="h-5 w-5 transition-transform duration-200 group-focus-within:rotate-90 group-hover:rotate-90"
                />
                {link?.label || "Menu"}
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box bg-base-100 z-10 mt-3 w-60 p-1 shadow-sm before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']"
              >
                {(subItems || []).map((sub: any, idx: number) => (
                  <li key={idx}>
                    <CMSLink
                      {...sub.link}
                      appearance="inline"
                      className={`font-barlow w-full justify-start text-left text-[18px] font-semibold ${
                        isCurrentPage(sub.link)
                          ? "text-[#E84935]!"
                          : "text-primary!"
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className={`font-barlow hidden text-[22px] font-semibold lg:inline-flex ${
              isCurrentPage(link) ? "text-[#E84935]!" : "text-primary!"
            }`}
          />
        );
      })}

      {/* Mobile trigger */}
      <MenuButton
        className="m-1 lg:hidden"
        expanded={isSidebarOpen}
        controls="mobile-sidebar"
        onClick={() => setIsSidebarOpen(true)}
      />

      {/* Mobile sidebar */}
      <div
        aria-hidden={!isSidebarOpen}
        className={`fixed inset-0 z-50 lg:hidden ${isSidebarOpen ? "" : "pointer-events-none"}`}
      >
        {/* Backdrop — frosted glass over the page behind the sidebar */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute inset-0 bg-white/10 backdrop-blur-md transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Close button — sits on the blurred area, top right of the screen */}
        <button
          type="button"
          aria-label="Închide meniul"
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border-3 border-[#5F0058] bg-[#F5E8FF] transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/sidebar-close.svg" className="h-6 w-auto" />
        </button>

        {/* Panel */}
        <aside
          id="mobile-sidebar"
          className={`absolute inset-y-0 left-0 flex w-60 max-w-[80vw] flex-col overflow-x-hidden overflow-y-auto border-r-[9.5px] border-[#5F0058] bg-[#F5E8FF] shadow-xl transition-transform duration-300 ease-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Brand: mark on its own row, wordmark stacked underneath. Both are
              crops of logo.svg, so they keep the brand colors and typeface. */}
          <div className="shrink-0 px-4 pt-6 pb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/logo-mark.svg" className="ml-6 h-20 w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Centrul Cultural Botoșani"
              src="/logo-wordmark.svg"
              className="mx-auto mt-4 block w-40"
            />
          </div>

          {/* px-4 here + pl-6 on each row lines the labels up with the logo mark */}
          <ul className="menu w-full shrink-0 gap-1 px-4 py-0">
            {navItems.map((item, i) => {
              const { itemType, link, subItems } = item as any;
              if (itemType === "parent") {
                return (
                  <li key={i}>
                    <details>
                      <summary className="font-barlow justify-start pl-6 text-left text-[22px] font-semibold text-black">
                        {link?.label || "Menu"}
                      </summary>
                      <ul className="p-1">
                        {(subItems || []).map((sub: any, idx: number) => (
                          <li key={idx} onClick={() => setIsSidebarOpen(false)}>
                            <CMSLink
                              {...sub.link}
                              appearance="inline"
                              className={`font-barlow w-full justify-start pl-6 text-left text-[18px] font-semibold ${
                                isCurrentPage(sub.link)
                                  ? "text-[#E84935]!"
                                  : "text-black!"
                              }`}
                            />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              }
              return (
                <li key={i} onClick={() => setIsSidebarOpen(false)}>
                  <CMSLink
                    {...link}
                    appearance="inline"
                    className={`font-barlow w-full justify-start pl-6 text-left text-[22px] font-semibold ${
                      isCurrentPage(link) ? "text-[#E84935]!" : "text-black!"
                    }`}
                  />
                </li>
              );
            })}

            {/* Invisible filler rows so the list always occupies at least six
                rows' worth of height. That pins the decorative chevrons at the
                position they'd sit at with six nav items: fewer items can no
                longer pull them upwards, more items still push them down. */}
            {Array.from({ length: Math.max(0, 6 - navItems.length) }).map(
              (_, i) => (
                <li key={`filler-${i}`} aria-hidden className="invisible">
                  <span className="font-barlow pl-6 text-[22px] font-semibold">
                    &nbsp;
                  </span>
                </li>
              ),
            )}
          </ul>

          {/* Decorative chevron column, clipped where it runs off the screen */}
          <div
            aria-hidden
            className="pointer-events-none relative mt-auto min-h-40 flex-1 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src="/sidebar-decor.svg"
              className="absolute top-10 left-1/2 w-2/5 -translate-x-1/2"
            />
          </div>
        </aside>
      </div>
    </nav>
  );
};
