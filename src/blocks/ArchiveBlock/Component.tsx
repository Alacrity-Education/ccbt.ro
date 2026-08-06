import type { ArchiveBlock as ArchiveBlockProps } from "@/payload-types";

import { createVariantBlock } from "../createVariantBlock";

import { CardsArchiveBlock } from "./Cards";
import { TextArchiveBlock } from "./Text";

export const ArchiveBlock = createVariantBlock<
  ArchiveBlockProps & { id?: string },
  "style"
>({
  discriminator: "style",
  variants: {
    cards: CardsArchiveBlock,
    text: TextArchiveBlock,
  },
});
