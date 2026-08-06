import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import {
  LinkJSXConverter,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";

import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  StaticMapBlock as StaticMapBlockProps,
} from "@/payload-types";

import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { StaticMapBlock } from "@/blocks/StaticMap/Component";
import { CMSLink } from "@/components/Link";

import { TextStateJSXConverter } from "./textState";

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | StaticMapBlockProps
      | ButtonBlockProps
    >;

/**
 * The button node, rendered with whichever set of fills suits the surface.
 *
 * Which one that is depends on where the rich text is being rendered, not on
 * anything the editor picked — so the preset decides and the button block itself
 * carries no appearance field.
 */
export const buttonConverter = (appearance: "brand" | "brandInvert") => ({
  button: ({ node }: { node: SerializedBlockNode<ButtonBlockProps> }) => (
    <div className="not-prose my-6">
      <CMSLink {...node.fields.link} appearance={appearance} />
    </div>
  ),
});

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

/**
 * The converters every preset starts from: Payload's defaults, internal link
 * resolution, the brand text colors, and the blocks that can be embedded in a
 * rich text field. Presets spread this and override only the nodes they restyle.
 */
export const baseConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...TextStateJSXConverter,
  blocks: {
    banner: ({ node }) => (
      <BannerBlock className="col-start-2 mb-4" {...node.fields} />
    ),
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    staticMap: ({ node }) => <StaticMapBlock {...node.fields} />,
    ...buttonConverter("brand"),
  },
});
