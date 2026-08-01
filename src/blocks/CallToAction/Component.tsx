import React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import { SectionTitle } from "@/components/SectionTitle";

import { PrimaryCTA } from "./Primary";
import { BackgroundCTA } from "./Background";
import { SecondaryCTA } from "./Secondary";
import { HighlightCTA } from "./Highlight";

const variants = {
  primary: PrimaryCTA,
  background: BackgroundCTA,
  secondary: SecondaryCTA,
  highlight: HighlightCTA,
};

// The highlight variant renders its own heading, so the generic wrapper title is skipped.
const SELF_TITLED_VARIANTS = ["highlight"];

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
          <SectionTitle title={title} className="py-10 text-center" />
        </div>
      )}
      <CTAToRender {...props} />
    </div>
  );
};
