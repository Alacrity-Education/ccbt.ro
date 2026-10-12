"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import type { Header } from "@/payload-types";

import { Logo } from "@/components/Logo/Logo";
import { HeaderNav } from "./Nav";

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {


  return (
    <header
      // Below the admin bar when there is one, flush to the top when there is
      // not. The bar is in flow and this is fixed, so without the offset the
      // header covers it and its height becomes a gap further down the page
      // (see components/AdminBar).
      className="text-base-content bg-base-300 fixed top-[var(--admin-bar-height,0px)] z-50 w-screen"
    >
      <div className="container mx-auto flex w-full items-center justify-between py-2">
        <Link href="/">
          <Logo loading="eager" priority="high" className="" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  );
};
