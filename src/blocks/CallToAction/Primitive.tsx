import React from "react";
import type { CallToActionBlock as CTABlockProps } from "@/payload-types";
import RichText from "@/components/RichText";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { CTAModal } from "./Primitive.client";
import type {  Form as FormType } from "@/payload-types";

// Token types for colors
type ColorToken = "primary" | "secondary" | "neutral" | "base" | "transparent";

type PrimitiveProps = CTABlockProps & {
  bgToken?: ColorToken;
  textToken?: ColorToken;
  // Optional: use media as background when provided
  useMediaBackground?: boolean;
  // Modal variant support
  ctaType?: "links" | "modal" | null;
  form?: FormType | undefined | null;
};

// Maps a token to tailwind classes for background/text/button
const tokenToBgClass: Record<ColorToken, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  neutral: "bg-neutral",
  base: "bg-base-100",
  transparent: "bg-transparent",
};

const tokenToTextClass: Record<ColorToken, string> = {
  primary: "text-primary-content",
  secondary: "text-secondary-content",
  neutral: "text-neutral-content",
  base: "text-base-content",
  transparent: "text-base-content",
};

export const CTAPrimitive: React.FC<PrimitiveProps> = ({
  links,
  richText,
  media,
  bgToken = "primary",
  textToken = "base",
  useMediaBackground = false,
  ctaType,
  form,
  modalButtonText,
}) => {
  const bgClass = tokenToBgClass[bgToken];
  const textClass = tokenToTextClass[textToken];

  return (
    <div className={"container mx-auto max-w-2xl lg:max-w-4xl"}>
      <div className={`${bgClass} ${textClass} relative h-max min-h-64 w-full overflow-clip rounded-xl shadow-2xl`}>
        {useMediaBackground && media && typeof media === "object" && (
          <Media
            fill
            priority
            resource={media}
            pictureClassName="absolute inset-0 h-full w-full rounded-xl brightness-75"
            imgClassName="object-cover z-0"
          />
        )}
        {useMediaBackground && (
          <div className="absolute top-0 left-0 z-0 h-full w-full bg-linear-to-r from-black to-transparent opacity-40 backdrop-blur-xs"></div>
        )}
        <div className="relative z-20 flex h-max min-h-64 w-full flex-col rounded p-6 sm:p-8">
          <div className="max-w-3xl">
            {richText && (
              <RichText
                className={`mb-0 text-start ${textClass}`}
                data={richText}
                preset="onDark"
                enableGutter={false}
              />
            )}
          </div>
          <div className="grow"></div>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            {ctaType === "modal" && form ? (
              <CTAModal
                id="cta_modal"
                buttonText={modalButtonText || "Open"}
                form={form}
                buttonClassName="btn-brand btn-brand-invert"
              />
            ) : (
              // The panel behind these is purple or coral, where the standard
              // button's coral face and purple plinth would each disappear into
              // the surface — so this is the one place the inverted fills are used.
              (links || []).map(({ link }, i) => (
                <CMSLink key={i} {...link} appearance="brandInvert" />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
