import type {
  DefaultTypedEditorState,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { RichText as ConvertRichText } from "@payloadcms/richtext-lexical/react";

import type { Media } from "@/payload-types";

import { getMediaUrl } from "@/utilities/getMediaUrl";
import { cn } from "@/utilities/ui";

import { PRESETS, type NodeTypes, type PresetName } from "./converters";

/**
 * The derivatives that are the same picture at a smaller size. `square` and
 * `og` are crops, so offering them as candidates for the same slot lets the
 * browser show a portrait photograph with its subject cut off.
 */
const RESIZED = ["thumbnail", "small", "medium", "large", "xlarge"] as const;

/**
 * An image or file dropped into a rich text field.
 *
 * Payload's default upload converter emits `src` and every `<source srcSet>`
 * exactly as the API returned them — relative to the Payload instance that
 * answered. On ccbt.ro that resolves against the static site, which serves no
 * uploads, so each one 404s. This is the default's markup with `getMediaUrl`
 * applied, and the crops left out.
 */
const uploadConverter = ({ node }: { node: SerializedUploadNode }) => {
  if (!node.value || typeof node.value !== "object") return null;

  const doc = node.value as Media;
  const alt = (node.fields as { alt?: string } | undefined)?.alt || doc.alt || "";
  const url = getMediaUrl(doc.url, doc.updatedAt);

  if (!doc.mimeType?.startsWith("image")) {
    return (
      <a href={url} rel="noopener noreferrer">
        {doc.filename}
      </a>
    );
  }

  const sources = RESIZED.flatMap((name) => {
    const size = doc.sizes?.[name];

    return size?.url && size.width && size.mimeType
      ? [
          <source
            key={name}
            media={`(max-width: ${size.width}px)`}
            srcSet={getMediaUrl(size.url, doc.updatedAt)}
            type={size.mimeType}
          />,
        ]
      : [];
  });

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key="image"
      alt={alt}
      height={doc.height ?? undefined}
      src={url}
      width={doc.width ?? undefined}
    />
  );

  return sources.length ? (
    <picture>
      {sources}
      {img}
    </picture>
  ) : (
    img
  );
};

/**
 * Each preset's converters with the upload override folded in.
 *
 * Where the uploads live is a property of the deployment, not of the preset,
 * so it is applied here to all of them rather than written into each converter
 * set. Built once at module scope because `ConvertRichText` takes the function
 * itself: wrapping inline would hand it a new identity on every render.
 */
const withUploads =
  (converters: JSXConvertersFunction<NodeTypes>): JSXConvertersFunction<NodeTypes> =>
  (args) => ({ ...converters(args), upload: uploadConverter });

const CONVERTERS = Object.fromEntries(
  (Object.keys(PRESETS) as PresetName[]).map((name) => [
    name,
    withUploads(PRESETS[name].converters),
  ]),
) as Record<PresetName, JSXConvertersFunction<NodeTypes>>;

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
  "prose-p:text-base/[1.65] sm:prose-p:text-lg/[1.6] lg:prose-p:text-xl/[1.6]",
  "prose-li:text-base-content/80 prose-li:text-base/[1.65] sm:prose-li:text-lg/[1.6] lg:prose-li:text-xl/[1.6]",
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
      converters={CONVERTERS[preset]}
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
