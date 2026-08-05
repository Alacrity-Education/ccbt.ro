import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";

import { baseConverters, type NodeTypes } from "./base";
import { displayConverters } from "./display";
import { sectionConverters } from "./section";

export type { NodeTypes };

type Preset = {
  converters: JSXConvertersFunction<NodeTypes>;
  /** Whether the Tailwind typography styles wrap the output. */
  prose: boolean;
  /** Wrapper classes — for anything that applies once, not per node. */
  className?: string;
};

/**
 * How a rich text field renders, chosen by name at the call site instead of by
 * stacking classes there. Each preset owns the converters, whether prose applies
 * and any wrapper classes, because those decisions are never independent.
 */
export const PRESETS = {
  /** Ordinary body copy — the behaviour every field had before presets existed. */
  body: { converters: baseConverters, prose: true },
  /** Content block columns, where an h2 is the section heading. */
  section: { converters: sectionConverters, prose: true },
  /** Archive "Text" intro: eyebrow, display heading and body in one field. */
  display: {
    converters: displayConverters,
    prose: false,
    className: "text-base-content/80 mb-8 max-w-lg",
  },
} satisfies Record<string, Preset>;

export type PresetName = keyof typeof PRESETS;
