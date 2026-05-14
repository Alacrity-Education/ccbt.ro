import React from "react";

import type { ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

import { CardsArchiveBlock } from "./Cards";

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = (props) => {
  const { title } = props || {};

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-primary text-center text-xl font-semibold md:text-3xl">
          {title}
        </h2>
      )}
      <CardsArchiveBlock {...props} />
    </div>
  );
};
