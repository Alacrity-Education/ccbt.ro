import React from "react";

import { cn } from "@/utilities/ui";

/**
 * The heading over one month's posts. Set as an eyebrow rather than as a
 * section title: it labels the run below it and has to stay quieter than the
 * post titles it sits over, which are the thing being read.
 */
export const MonthHeading: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h3
    className={cn(
      "text-primary text-sm font-semibold tracking-[0.18em] uppercase",
      className,
    )}
  >
    {children}
  </h3>
);
