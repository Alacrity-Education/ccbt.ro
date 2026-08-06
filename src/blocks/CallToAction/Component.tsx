import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import { createVariantBlock } from "../createVariantBlock";

import { PrimaryCTA } from "./Primary";
import { BackgroundCTA } from "./Background";
import { SecondaryCTA } from "./Secondary";
import { HighlightCTA } from "./Highlight";

export const CallToActionBlock = createVariantBlock<CTABlockProps, "variant">({
  discriminator: "variant",
  variants: {
    primary: PrimaryCTA,
    background: BackgroundCTA,
    secondary: SecondaryCTA,
    highlight: HighlightCTA,
  },
});
