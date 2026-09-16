import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText as ConvertRichText } from "@payloadcms/richtext-lexical/react";

import { cn } from "@/utilities/ui";

import { PRESETS, type PresetName } from "./converters";

/**
 * The type scale every rich text field renders at.
 *
 * Sizes used to be set per block — the base CTA had its own headings, the
 * section preset had another, and a `prose` layer underneath disagreed with
 * both. One block's h3 was 1em ink, another's was 3xl coral. This is the single
 * place that decides, expressed as prose modifiers so the plugin still handles
 * lists, quotes and links.
 *
 * Headings hold tight leading because they are short and set large; body copy
 * gets relaxed leading, which Montserrat needs at these sizes. The ratio between
 * steps is roughly 1.25.
 */
const TYPE_SCALE = [
  // Size and leading are set in one utility (`text-3xl/[1.15]`) rather than as
  // `text-3xl leading-tight`. Written apart, the size utility carries its own
  // line-height and wins the cascade — which is how an h2 ended up at 48px on
  // 48px, tight enough to collide with itself the moment it wrapped.
  "prose-h2:text-primary prose-h2:font-bold prose-h2:tracking-tight",
  "prose-h2:text-3xl/[1.15] sm:prose-h2:text-4xl/[1.1] lg:prose-h2:text-5xl/[1.05]",
  "prose-h3:text-secondary prose-h3:font-semibold",
  "prose-h3:text-xl/[1.3] sm:prose-h3:text-2xl/[1.25]",
  "prose-h4:text-base-content prose-h4:font-semibold",
  "prose-h4:text-lg/[1.35] sm:prose-h4:text-xl/[1.3]",
  "prose-p:text-base-content/80",
  "prose-p:text-base/[1.65] sm:prose-p:text-lg/[1.6]",
  "prose-li:text-base-content/80 prose-li:text-base/[1.65] sm:prose-li:text-lg/[1.6]",
].join(" ");

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  /** Overrides the preset's own prose setting. */
  enableProse?: boolean;
  /** Which converter set and typography to render with. See converters/index. */
  preset?: PresetName;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const {
    className,
    preset = "body",
    enableProse,
    enableGutter = true,
    ...rest
  } = props;

  const config = PRESETS[preset];
  const withProse = enableProse ?? config.prose;

  return (
    <ConvertRichText
      converters={config.converters}
      className={cn(
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          [`prose max-w-none prose-invert prose-h1:text-primary ${TYPE_SCALE}`]:
            withProse,
        },
        "className" in config ? config.className : undefined,
        className,
      )}
      {...rest}
    />
  );
}
