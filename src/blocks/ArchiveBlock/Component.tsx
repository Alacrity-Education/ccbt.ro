import React from "react";

import type { ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

import { CardsArchiveBlock } from "./Cards";
import { TextArchiveBlock } from "./Text";

const variants = {
  cards: CardsArchiveBlock,
  text: TextArchiveBlock,
};

// The Text variant renders its own heading, so the generic wrapper title is skipped.
const SELF_TITLED_VARIANTS = ["text"];

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = (props) => {
  const { style, title } = props || {};

  if (!style) return null;

  const ArchiveBlockToRender = variants[style as keyof typeof variants];

  if (!ArchiveBlockToRender) return null;

  const showWrapperTitle = title && !SELF_TITLED_VARIANTS.includes(style);

  return (
    <div className="w-full">
      {showWrapperTitle && (
        <div className="container mx-auto">
          <h2 className="text-primary text-center text-xl font-semibold md:text-3xl">
            {title}
          </h2>
        </div>
      )}
      <ArchiveBlockToRender {...props} />
    </div>
  );
};
