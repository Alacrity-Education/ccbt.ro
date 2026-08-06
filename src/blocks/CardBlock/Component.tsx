import React from "react";
import type { CardBlock as CardBlockProps } from "@/payload-types";

import { createVariantBlock } from "../createVariantBlock";

import { PillarCardBlock } from "./Pillar";
import { LongCardBlock } from "./Long";
import { MotifCardBlock } from "./Motif";

const CardBlockVariants = createVariantBlock<
  CardBlockProps & { id?: string },
  "cardType"
>({
  discriminator: "cardType",
  variants: {
    pillar: PillarCardBlock,
    long: LongCardBlock,
    motif: MotifCardBlock,
  },
});

/**
 * `cardType` was added after the block shipped, so rows saved before it have no
 * value and would dispatch to nothing. Pillar is what they were, so that is the
 * fallback rather than a blank block.
 */
export const CardBlock: React.FC<CardBlockProps & { id?: string }> = (
  props,
) => <CardBlockVariants {...props} cardType={props.cardType ?? "pillar"} />;
