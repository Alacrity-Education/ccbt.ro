"use client";

import React, { useEffect, useState } from "react";

import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { MenuButton } from "@/Header/MenuButton";
import { cn } from "@/utilities/ui";
import { usePathname } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

/**
 * Closes whichever desktop dropdown is open.
 *
 * These are daisyUI dropdowns, which stay open while something inside them has
 * focus. Clicking a link puts focus on that link, so the menu was still hanging
 * open over the page it had just navigated to. Dropping focus is what closes
 * it — the same gesture also closes one dropdown when a different one is
 * clicked, since focus can only be in one of them.
 */
const closeDropdowns = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

/** Matches the sidebar's own slide, so panel and drawer feel like one motion. */
const PANEL_SLIDE = "transition-transform duration-300 ease-out";

/**
 * A submenu panel, parked off the right edge until its parent is tapped.
 *
 * Panels tile rather than overlap — the top level reaches -100% exactly as the
 * incoming panel reaches 0 — so neither needs a background of its own, and the
 * sidebar shows through unbroken.
 */
const PANEL_OVERLAY = "absolute inset-0 overflow-x-hidden overflow-y-auto";

/**
 * Rows the top-level menu is padded out to, pinning the decorative chevrons
 * below it at the height they would sit at with a full menu.
 */
const MIN_ROWS = 6;

const ROW_TYPE = "font-barlow justify-start text-left font-semibold";

/** Invisible rows that pad the menu to MIN_ROWS. */
const FillerRows: React.FC<{ count: number }> = ({ count }) => (
  <>
    {Array.from({ length: Math.max(0, count) }).map((_, i) => (
      <li key={`filler-${i}`} aria-hidden className="invisible">
        <span className={cn(ROW_TYPE, "pl-6 text-[22px]")}>&nbsp;</span>
      </li>
    ))}
  </>
);

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  /** Index of the parent that has taken over the sidebar, or null for the top level. */
  const [openPanel, setOpenPanel] = useState<number | null>(null);
  const pathname = usePathname();

  /** True when a nav link points at the page we're currently on. */
  const isCurrentPage = (link: any) => {
    const href = resolveHref(link);
    return Boolean(
      href && pathname && normalizePath(href) === normalizePath(pathname),
    );
  };

  const openSidebar = () => {
    /* Reset on open, not on close: at close time the sidebar is still sliding
       out, so snapping back to the top level happens in full view. */
    setOpenPanel(null);
    setIsSidebarOpen(true);
  };

  /* Close the sidebar whenever we navigate away. */
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  /* Lock the page behind the sidebar. Kept apart from the Escape handler below
     so it only runs on open/close: re-running it while already locked would
     capture "hidden" as the overflow to restore. */
  useEffect(() => {
    if (!isSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  /* Escape backs out one step at a time: out of a sub-panel first, and only
     then out of the sidebar. */
  useEffect(() => {
    if (!isSidebarOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openPanel !== null) setOpenPanel(null);
      else setIsSidebarOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isSidebarOpen, openPanel]);

  /* Only parents with somewhere to go get a panel. */
  const panels = navItems
    .map((item, index) => ({ item: item as any, index }))
    .filter(
      ({ item }) => item.itemType === "parent" && (item.subItems || []).length,
    );

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
                onClick={closeDropdowns}
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
                onClick={closeDropdowns}
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
        onClick={openSidebar}
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

          {/* The menu area. Tapping a parent slides its sub-items in over the
              top level instead of unfolding them underneath it, so a long
              submenu never pushes the rest of the menu off the screen.

              The top level stays in the flow and is what gives this box its
              height; the submenu panels are laid over it. That keeps the
              chevrons below from moving as panels slide past, which padding
              the panels to equal row counts would not: sub-items are set two
              points smaller, so equal rows are not equal heights. */}
          <div className="relative shrink-0 overflow-hidden">
            {/* Top level. `inert` as well as the transform, so a panel that has
                slid off is not still reachable by tab or screen reader. */}
            <div
              className={cn(
                PANEL_SLIDE,
                openPanel === null ? "translate-x-0" : "-translate-x-full",
              )}
              inert={openPanel !== null}
            >
              {/* px-4 here + pl-6 on each row lines the labels up with the logo mark */}
              <ul className="menu w-full gap-1 px-4 py-0">
                {navItems.map((item, i) => {
                  const { itemType, link, subItems } = item as any;
                  if (itemType === "parent") {
                    if (!(subItems || []).length) return null;

                    return (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => setOpenPanel(i)}
                          // flex, because daisyUI lays menu rows out as a
                          // grid of max-content columns — where `grow` does
                          // nothing and the chevron sits against the label
                          // instead of out at the edge.
                          className={cn(
                            ROW_TYPE,
                            "flex w-full items-center pl-6 text-[22px] text-black",
                          )}
                        >
                          <span className="grow truncate">
                            {link?.label || "Menu"}
                          </span>
                          <FiChevronRight
                            aria-hidden
                            className="h-5 w-5 shrink-0"
                          />
                        </button>
                      </li>
                    );
                  }
                  return (
                    <li key={i} onClick={() => setIsSidebarOpen(false)}>
                      <CMSLink
                        {...link}
                        appearance="inline"
                        className={`font-barlow w-full justify-start pl-6 text-left text-[22px] font-semibold ${
                          isCurrentPage(link)
                            ? "text-[#E84935]!"
                            : "text-black!"
                        }`}
                      />
                    </li>
                  );
                })}

                <FillerRows count={MIN_ROWS - navItems.length} />
              </ul>
            </div>

            {/* One panel per parent. All stay mounted: the menu is a handful of
                links, and a panel that mounts on tap has nothing to slide in
                from. */}
            {panels.map(({ item, index }) => {
              const subItems = (item.subItems || []) as any[];

              return (
                <div
                  key={index}
                  className={cn(
                    PANEL_OVERLAY,
                    PANEL_SLIDE,
                    openPanel === index ? "translate-x-0" : "translate-x-full",
                  )}
                  inert={openPanel !== index}
                >
                  <ul className="menu w-full gap-1 px-4 py-0">
                    {/* The parent's own row becomes the way back. It travels
                        with the panel rather than sitting above the menu area,
                        so nothing shifts as the panel arrives. */}
                    <li>
                      <button
                        type="button"
                        onClick={() => setOpenPanel(null)}
                        aria-label={`Înapoi la meniul principal, din ${
                          item.link?.label || "Menu"
                        }`}
                        className={cn(
                          ROW_TYPE,
                          "text-primary w-full gap-1 pl-0 text-[22px]",
                        )}
                      >
                        <FiChevronLeft
                          aria-hidden
                          className="h-5 w-5 shrink-0"
                        />
                        <span className="truncate">
                          {item.link?.label || "Menu"}
                        </span>
                      </button>
                    </li>

                    {subItems.map((sub: any, idx: number) => (
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
                </div>
              );
            })}
          </div>

          {/* Decorative chevron column, clipped where it runs off the screen.
              Outside the sliding area on purpose, so it stays put. */}
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
