import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import { PrimaryCTA } from "./Primary";
import { BackgroundCTA } from "./Background";
import { SecondaryCTA } from "./Secondary";
import { HighlightCTA } from "./Highlight";

const HighlightLeftCTA: React.FC<CTABlockProps> = (props) => (
  <HighlightCTA {...props} align="left" />
);
const HighlightCenteredCTA: React.FC<CTABlockProps> = (props) => (
  <HighlightCTA {...props} align="center" />
);

const variants = {
  primary: PrimaryCTA,
  background: BackgroundCTA,
  secondary: SecondaryCTA,
  highlightLeft: HighlightLeftCTA,
  highlightCentered: HighlightCenteredCTA,
};

// Highlight variants render their own heading, so the generic wrapper title is skipped.
const SELF_TITLED_VARIANTS = ["highlightLeft", "highlightCentered"];

export const CallToActionBlock: React.FC<CTABlockProps> = (props) => {
  const { variant, title } = props || {};

  if (!variant) return null;

  const CTAToRender = variants[variant];

  if (!CTAToRender) return null;

  const showWrapperTitle = title && !SELF_TITLED_VARIANTS.includes(variant);

  return (
    <div className="w-full">
      {showWrapperTitle && (
        <div className="container mx-auto">
          <h2 className="text-primary py-10 text-center text-base font-semibold md:text-3xl">
            {title}
          </h2>
        </div>
      )}
      <CTAToRender {...props} />
    </div>
  );
};
