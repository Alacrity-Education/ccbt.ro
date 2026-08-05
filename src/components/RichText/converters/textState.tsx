import React from "react";

import type { SerializedTextNode } from "@payloadcms/richtext-lexical";
import {
  TextJSXConverter,
  type JSXConverterArgs,
  type JSXConverters,
} from "@payloadcms/richtext-lexical/react";

import { TEXT_STATE_CLASS, type TextColorState } from "@/fields/textState";

import { ArrowUnderline } from "./ArrowUnderline";

/**
 * TextStateFeature stores its selections under `$` on the text node. The
 * serialized type does not declare the property, so it is narrowed here rather
 * than asserted at each use.
 */
type StatefulTextNode = SerializedTextNode & {
  $?: { color?: TextColorState };
};

/**
 * Renders the brand text colors (see fields/textState).
 *
 * This wraps the default text converter instead of replacing it. The default one
 * decodes `node.format`, which is a bitmask carrying bold, italic, underline,
 * strikethrough, code, sub and superscript — rendering `node.text` directly
 * would drop every one of them the moment a run is also coloured.
 */
export const TextStateJSXConverter: JSXConverters<SerializedTextNode> = {
  text: (args: JSXConverterArgs<SerializedTextNode>) => {
    const base = TextJSXConverter.text;
    const rendered = typeof base === "function" ? base(args) : base;

    const state = (args.node as StatefulTextNode).$?.color;

    if (!state || !TEXT_STATE_CLASS[state]) return rendered;

    return (
      <span className={TEXT_STATE_CLASS[state]}>
        {rendered}
        {state === "arrowUnderline" && <ArrowUnderline />}
      </span>
    );
  },
};
