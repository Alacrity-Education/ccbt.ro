import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText as ConvertRichText } from "@payloadcms/richtext-lexical/react";

import { cn } from "@/utilities/ui";

import { PRESETS, type PresetName } from "./converters";

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
          "prose lg:prose-lg prose-invert mx-auto prose-h1:text-primary prose-h2:text-primary prose-h3:text-base-content prose-h3:font-normal prose-h3:text-[1em]":
            withProse,
        },
        "className" in config ? config.className : undefined,
        className,
      )}
      {...rest}
    />
  );
}
