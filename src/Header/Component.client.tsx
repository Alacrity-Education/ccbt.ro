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
    <header className="text-base-content z-50 w-screen bg-base-300 fixed top-0">
      <div className="container mx-auto flex w-full items-center justify-between py-2">
        <Link href="/">
          <Logo loading="eager" priority="high" className="" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  );
};
