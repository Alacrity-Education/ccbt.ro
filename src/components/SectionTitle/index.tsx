import React from "react";

import { cn } from "@/utilities/ui";

type SectionTitleProps = {
  title?: string | null;
  className?: string;
};

/** Shared section heading used across page blocks. */
export const SectionTitle: React.FC<SectionTitleProps> = ({ title, className }) => {
  if (!title) return null;

  return (
    <h2 className={cn("text-primary text-xl font-semibold md:text-3xl", className)}>
      {title}
    </h2>
  );
};
