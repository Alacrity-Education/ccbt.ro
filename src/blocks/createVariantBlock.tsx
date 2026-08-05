import React from "react";

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
};

/**
 * Builds the shell shared by every block that dispatches on a variant: pick the
 * component named by `discriminator` and hand the whole props object down.
 *
 * Archive and CallToAction each carried their own copy of this; they differed only
 * in the values passed here.
 */
export function createVariantBlock<P, K extends keyof P>({
  discriminator,
  variants,
}: VariantBlockOptions<P, K>): React.FC<P> {
  const VariantBlock: React.FC<P> = (props) => {
    const name = (props || ({} as P))[discriminator] as string | null | undefined;

    if (!name) return null;

    const Variant = variants[name];

    if (!Variant) return null;

    return (
      <div className="w-full">
        <Variant {...props} />
      </div>
    );
  };

  return VariantBlock;
}
