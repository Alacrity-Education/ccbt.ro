import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

import type { TeamBlock as TeamBlockProps } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { brandSurface, type BrandColor } from "@/utilities/brand";
import { cn } from "@/utilities/ui";

import { TeamMotif } from "./Motif";

type Department = NonNullable<TeamBlockProps["departments"]>[number];
type Member = NonNullable<Department["members"]>[number];

/**
 * The department's colour: the surface its label is drawn on, and the text
 * colour its people's names take. The cards carry no fill of their own any more,
 * so the name is where the department's colour reads on a card.
 */
const PAIR: Record<string, { surface: BrandColor; name: string }> = {
  purple: { surface: "purple", name: "text-primary" },
  coral: { surface: "coral", name: "text-secondary" },
};

const pairFor = (color?: string | null) => PAIR[color ?? "coral"] ?? PAIR.coral;

/**
 * A person. The photo sits above the name and the job title, set straight on the
 * page — the panel they used to sit on is gone, so the department's colour now
 * comes through the name rather than a fill behind it.
 *
 * The mockup also puts a pair of offset rectangles over each photo's corner;
 * those are deliberately not built.
 */
const MemberCard: React.FC<{ member: Member; color?: string | null }> = ({
  member,
  color,
}) => {
  const { name: nameColor } = pairFor(color);
  const hasHref =
    member.withLink && (member.link?.url || member.link?.reference);

  const card = (
    <article className="flex h-full w-full flex-col">
      {/* Near-square, as in the mockup — the 4:5 crop this had made the cards
          noticeably taller than the artwork they came from. */}
      <div className="bg-base-300 relative aspect-square w-full overflow-hidden">
        {member.photo && (
          <Media
            fill
            resource={member.photo}
            pictureClassName="absolute inset-0 h-full w-full"
            imgClassName="object-cover object-center"
          />
        )}
      </div>
      {/* No side padding: with the fill gone there is no box to inset the text
          from, so the copy lines up with the photo's edge. The top padding is
          what now separates the name from the photo above it. */}
      <div className="font-barlow-semi pt-4 sm:pt-5">
        <p
          className={cn(
            "text-xl leading-tight font-bold sm:text-xl lg:text-3xl",
            nameColor,
          )}
        >
          {member.name}
        </p>
        {member.role && (
          <p className="text-base-content/80 mt-0.5 flex items-center gap-1.5 text-base/tight sm:text-lg/tight lg:text-2xl">
            {member.role}
            {hasHref && (
              <FiArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4"
              />
            )}
          </p>
        )}
      </div>
    </article>
  );

  if (!hasHref) return card;

  return (
    <CMSLink
      {...member.link}
      label={undefined}
      appearance="inline"
      className="group block h-full transition-transform duration-200 hover:-translate-y-1"
    >
      {card}
    </CMSLink>
  );
};

/**
 * The department's label: a solid pill in the department's colour. It used to
 * carry a second rectangle offset behind it, the same two-layer treatment as the
 * site's button; that layer is gone and the pill stands on its own.
 */
const DepartmentLabel: React.FC<{ name: string; color?: string | null }> = ({
  name,
  color,
}) => {
  const { surface } = pairFor(color);

  return (
    <p
      className={cn(
        "font-barlow-semi mb-6 inline-block rounded-sm px-8 py-1.5 text-lg font-semibold sm:text-xl",
        brandSurface(surface),
      )}
    >
      {name}
    </p>
  );
};

export const TeamBlock: React.FC<TeamBlockProps & { id?: string | null }> = ({
  id,
  departments,
}) => {
  if (!departments || departments.length === 0) return null;

  // No background of its own: the page motif runs behind the blocks, and an
  // opaque fill here would cut it (see components/PageMotif).
  return (
    <section className="relative w-full overflow-hidden">
      {/* The weave, tiled the full height rather than crossing once. Anchored to
          the section rather than sitting in the flow, so the copy below can use
          the shared container and still line up with every other block.
          Dropped entirely below `sm`: on a phone the lane it needs costs the two
          card columns more width than the ribbons are worth there.

          Widths track the base CTA's motif so the two read as the same
          object at the same scale — see blocks/CallToAction/Base. `md` is
          the one exception: both narrow to 88px there, which is this section's
          own measure. */}
      <div
        aria-hidden
        // From `lg` the page-wide motif takes over (components/PageMotif), so
        // this one stands down rather than drawing a second ribbon over it.
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[150px] overflow-hidden sm:block md:w-[88px] lg:hidden"
      >
        <TeamMotif uid={id ?? "team"} className="h-auto w-full" />
      </div>

      <div className="relative container mx-auto py-6">
        {/* Keeps the cards clear of the ribbons. The motif is anchored to the
            section edge while the container is centred, so this has to hold at
            every width its own motif is shown at. From `lg` that motif is gone
            and `.container` reserves the lane for the page-wide one instead, so
            this resets rather than adding a second inset. */}
        <div className="sm:pr-[170px] md:pr-[108px] lg:pr-0">
          {departments.map((department, i) => (
            <div key={department.id ?? i} className={cn(i > 0 && "mt-14")}>
              <DepartmentLabel
                name={department.name}
                color={department.color}
              />

              {/* Two up on a phone, four once there is room. */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {(department.members ?? []).map((member, j) => (
                  <MemberCard
                    key={member.id ?? j}
                    member={member}
                    color={department.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
