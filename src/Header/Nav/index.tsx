"use client";

import React from "react";

import type { Header as HeaderType } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { MenuIcon } from "lucide-react";
import { FiChevronRight } from "react-icons/fi";

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="flex items-center gap-3">
      {/* Desktop nav with submenu support */}
      {navItems.map((item, i) => {
        const { itemType, link, subItems } = item as any;
        if (itemType === "parent") {
          return (
            <div key={i} className="dropdown dropdown-end dropdown-hover group hidden lg:block">
              <div
                tabIndex={0}
                role="button"
                className="text-primary flex items-center gap-1 hover:cursor-pointer"
              >
                <FiChevronRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90 group-focus-within:rotate-90"
                />
                {link?.label || "Menu"}
       
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box bg-base-100 z-10 mt-3 w-52 p-1 shadow-sm before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']"
              >
                {(subItems || []).map((sub: any, idx: number) => (
                  <li key={idx}>
                    <CMSLink {...sub.link} appearance="inline" className={"text-sm text-primary"} />
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
            className="text-primary! hover:text-secondary! hidden lg:inline-flex "
          />
        );
      })}

      {/* Mobile menu */}
      <details className="dropdown dropdown-end lg:hidden">
        <summary className="btn btn-primary  m-1">
          <MenuIcon className="h-full" />
        </summary>
        <ul className="menu dropdown-content rounded-box bg-base-100 z-1 mt-3 w-52 p-1 shadow-sm ">
          {navItems.map((item, i) => {
            const { itemType, link, subItems } = item as any;
            if (itemType === "parent") {
              return (
                <li key={i}>
                  <details>
                    <summary className={"text-base-content"}>{link?.label || "Menu"}</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      {(subItems || []).map((sub: any, idx: number) => (
                        <li key={idx}>
                          <CMSLink {...sub.link} appearance="inline" className={"text-primary text-sm"} />
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            }
            return (
              <li key={i}>
                <CMSLink {...link} appearance={"inline"} className={"text-primary text-sm"} />
              </li>
            );
          })}
        </ul>
      </details>
    </nav>
  );
};
