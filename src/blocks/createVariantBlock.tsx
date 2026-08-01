import React from "react";

import { SectionTitle } from "@/components/SectionTitle";

/**
 * Variant components may be async server components, so they are typed by their
 * call signature rather than as React.FC — the latter rejects a Promise return.
 */
type VariantComponent = (props: any) => React.ReactNode | Promise<React.ReactNode>;

type VariantBlockOptions<P, K extends keyof P> = {
  /** Field on the block that names which variant to render. */
  discriminator: K;
  /** Variant name -> component. An unrecognised name renders nothing. */
  variants: Record<string, VariantComponent>;
  /** Variants that draw their own heading, so the wrapper skips the block title. */
  selfTitled?: readonly string[];
};

/**
 * Builds the shell shared by every block that dispatches on a variant: pick the
 * component named by `discriminator`, render the block title above it unless that
 * variant supplies its own, and hand the whole props object down.
 *
 * Archive and CallToAction each carried their own copy of this; they differed only
 * in the four values passed here.
 */
export function createVariantBlock<
  P extends { title?: string | null },
  K extends keyof P,
>({ discriminator, variants, selfTitled = [] }: VariantBlockOptions<P, K>): React.FC<P> {
  const VariantBlock: React.FC<P> = (props) => {
    const { [discriminator]: variant, title } = props || ({} as P);
    const name = variant as string | null | undefined;

    if (!name) return null;

    const Variant = variants[name];

    if (!Variant) return null;

    return (
      <div className="w-full">
        {title && !selfTitled.includes(name) && (
          <div className="container mx-auto">
            <SectionTitle title={title} className="py-10 text-center" />
          </div>
        )}
        <Variant {...props} />
      </div>
    );
  };

  return VariantBlock;
}
