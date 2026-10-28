import React, { Fragment } from "react";

import type { Page } from "@/payload-types";

import { cn } from "@/utilities/ui";
import {
  SectionDivider,
  type SectionDividerProps,
} from "@/components/SectionDivider";
import { PageMotif } from "@/components/PageMotif";

// Blocks that butt directly against the section above them (their top margin is
// cancelled), keeping only bottom spacing. Add any full-bleed block that should
// sit flush on top here. (Dividers now keep spacing on both sides, so they're not
// listed — they get the normal bottom margin plus the preceding block's margin.)
const FLUSH_BLOCKS = new Set<string>([]);

// Vertical spacing between blocks. A flush block cancels the preceding block's
// bottom margin with an equal negative top margin so it sits flush on top.
// The two are one measure: change them together or a flush block stops being
// flush.
const BLOCK_MARGIN = "mb-24";
const FLUSH_PULL = "-mt-24";

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { CardBlock } from "@/blocks/CardBlock/Component";
import { CarouselLogoBlock } from "@/blocks/LogoCarouselBlock/Component";
import { StaticMapBlock } from "@/blocks/StaticMap/Component";
import { TimelineBlock } from "@/blocks/Timeline/Component";
import { TeamBlock } from "@/blocks/Team/Component";
import { PublicationsBlockComponent } from "@/blocks/Publications/Component";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  cardBlock: CardBlock,
  carouselLogoBlock: CarouselLogoBlock,
  staticMap: StaticMapBlock,
  timeline: TimelineBlock,
  team: TeamBlock,
  publications: PublicationsBlockComponent,
};

/**
 * Running full width is not an editor's choice: two blocks get the treatment and
 * the rest never do. The timeline always; the CTA only in its base variant,
 * which is the one built as a band. What an editor picks is the pattern and
 * colours (see fields/sectionDividers), and on the timeline whether the edges
 * are drawn at all.
 */
type BlockLayout = {
  variant?: string | null;
  showMotif?: boolean | null;
  showDividers?: boolean | null;
  dividerTop?: SectionDividerProps;
  dividerBottom?: SectionDividerProps;
};

const isBanded = (blockType: string, block: BlockLayout): boolean =>
  blockType === "timeline" || (blockType === "cta" && block.variant === "base");

/**
 * Banded and edged are separate questions. The band — full measure, own fill —
 * is what makes the section read as a break and stays either way; the dividers
 * only finish it, and both banded blocks can turn them off.
 *
 * The two toggles answer opposite defaults, which is why this is not one test.
 * The timeline has drawn the edges since before it had a toggle, so a row
 * holding no value has to keep them — `!== false`. The CTA's toggle is the
 * newer of the two and starts off, so there absent means no: the band already
 * reads as a break on its own fill and its own motif, and the edges on top of
 * that were the first thing the section said.
 */
const hasDividers = (blockType: string, block: BlockLayout): boolean => {
  if (!isBanded(blockType, block)) return false;
  if (blockType === "timeline") return block.showDividers !== false;
  return block.showDividers === true;
};

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page["layout"]>;
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  const rendered = blocks.flatMap((block, index) => {
    const { blockType } = block;

    if (!blockType || !(blockType in blockComponents)) return [];

    const Block = blockComponents[blockType];

    if (!Block) return [];

    const flush = FLUSH_BLOCKS.has(blockType);
    const layout = block as BlockLayout;
    const banded = isBanded(blockType, layout);
    const edged = hasDividers(blockType, layout);
    // Whether this block paints the ribbon out, which is what ends a run.
    //
    // Being banded is not the same question. A band's fill is
    // `--color-base-200`, and on this theme that is #FFFFFF — the same white
    // as the page. The timeline still breaks the run on purpose: it is a dense
    // interactive block with its own bars and fade gradients, and a ribbon
    // behind it is noise. The base CTA is a headline, a line of copy and a
    // button, so it has nothing to hide behind an invisible fill, and breaking
    // the run there cost more than it gave — the ribbon stopped above the
    // block and started again below it, leaving the CTA's own braid stranded
    // in white with a flat cut at each end.
    const opaque = blockType === "timeline" || layout.showMotif === false;

    return [
      {
        opaque,
        node: (
          <div
            // `data-full-bleed` hands the motif's lane back to the
            // content, so the block runs at the container's full measure
            // and the ribbon passes behind it. See globals.css.
            data-full-bleed={banded ? "" : undefined}
            className={cn(
              // Every block keeps bottom spacing; flush blocks additionally
              // pull up over the previous block's margin (unless first).
              BLOCK_MARGIN,
              flush && index > 0 && FLUSH_PULL,
              // The band takes the container's full measure back (see
              // `data-full-bleed` above) and gives the block something to
              // position against.
              banded && "relative w-full",
              // The fill, which is the part that covers the ribbon running
              // behind at `-z-10`. Only a block that is meant to break the
              // run paints one — `bg-base-200` is #FFFFFF and so is the page
              // under it, so this is never a colour anyone sees; its whole
              // effect is on what shows through.
              banded && opaque && "bg-base-200",
              // The ribbon runs behind the blocks, so a block hides it by
              // painting over it. A banded block already has a fill of its
              // own and needs nothing here.
              !banded &&
                layout.showMotif === false &&
                "bg-base-100 relative w-full",
            )}
            key={index}
          >
            {edged && (
              <SectionDivider {...layout.dividerTop} uid={`${index}-top`} />
            )}

            {/* Sits inside the dividers rather than on the wrapper, so a
                divider stays flush against the block's edge instead of
                floating in from it. */}
            <div className={cn(banded && "py-10 lg:py-14")}>
              {/* @ts-expect-error there may be some mismatch between the expected types here */}
              <Block {...block} disableInnerContainer />
            </div>

            {edged && (
              <SectionDivider
                {...layout.dividerBottom}
                uid={`${index}-bottom`}
              />
            )}
          </div>
        ),
      },
    ];
  });

  // Consecutive blocks that let the ribbon through, gathered into one run.
  const runs: { opaque: boolean; nodes: React.ReactNode[] }[] = [];
  for (const { opaque, node } of rendered) {
    const current = runs.at(-1);
    if (current && current.opaque === opaque) current.nodes.push(node);
    else runs.push({ opaque, nodes: [node] });
  }

  return (
    <Fragment>
      {runs.map((run, i) =>
        run.opaque ? (
          <Fragment key={`run-${i}`}>{run.nodes}</Fragment>
        ) : (
          // One ribbon per run, spanning exactly the blocks that show it.
          // See components/PageMotif for why it is scoped this way.
          <div className="relative" key={`run-${i}`}>
            <PageMotif meetsAbove={i > 0} />
            {run.nodes}
          </div>
        ),
      )}
    </Fragment>
  );
};
