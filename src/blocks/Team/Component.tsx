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

/** The department's colour and the one that sits behind it as the offset plinth. */
const PAIR: Record<string, { surface: BrandColor; plinth: string }> = {
  purple: { surface: "purple", plinth: "bg-secondary" },
  coral: { surface: "coral", plinth: "bg-primary" },
};

const pairFor = (color?: string | null) => PAIR[color ?? "coral"] ?? PAIR.coral;

/**
 * A person. The photo sits above a solid panel carrying the role and the name,
 * in the colour of the department they belong to.
 *
 * The mockup also puts a pair of offset rectangles over each photo's corner;
 * those are deliberately not built.
 */
const MemberCard: React.FC<{ member: Member; color?: string | null }> = ({
  member,
  color,
}) => {
  const { surface } = pairFor(color);
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
      <div
        className={cn(
          "font-barlow-semi px-4 py-3.5 sm:px-5 sm:py-4",
          brandSurface(surface),
        )}
      >
        {member.role && (
          <p className="flex items-center gap-1.5 text-base/tight opacity-90 sm:text-lg/tight">
            {member.role}
            {hasHref && (
              <FiArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4"
              />
            )}
          </p>
        )}
        <p className="mt-0.5 text-xl leading-tight font-bold sm:text-xl">
          {member.name}
        </p>
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
 * The department's label: the same two-layer treatment as the site's button — a
 * solid face over an offset plinth — except the plinth is the other brand colour
 * rather than a fixed one, so the pair reads as a set.
 */
const DepartmentLabel: React.FC<{ name: string; color?: string | null }> = ({
  name,
  color,
}) => {
  const { surface, plinth } = pairFor(color);

  return (
    <div className="relative isolate mb-6 inline-block">
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 translate-x-[-6px] translate-y-[6px] rounded-sm",
          plinth,
        )}
      />
      <p
        className={cn(
          "font-barlow-semi rounded-sm px-8 py-1.5 text-lg font-semibold sm:text-xl",
          brandSurface(surface),
        )}
      >
        {name}
      </p>
    </div>
  );
};

export const TeamBlock: React.FC<TeamBlockProps & { id?: string | null }> = ({
  id,
  departments,
}) => {
  if (!departments || departments.length === 0) return null;

  return (
    <section className="bg-base-100 relative w-full overflow-hidden">
      {/* The weave, tiled the full height rather than crossing once. Anchored to
          the section rather than sitting in the flow, so the copy below can use
          the shared container and still line up with every other block.
          Dropped entirely below `sm`: on a phone the lane it needs costs the two
          card columns more width than the ribbons are worth there. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[88px] overflow-hidden sm:block lg:w-[130px]"
      >
        <TeamMotif uid={id ?? "team"} className="h-auto w-full" />
      </div>

      <div className="relative container mx-auto py-12 lg:py-16">
        {/* Keeps the cards clear of the ribbons. The motif is anchored to the
            section edge while the container is centred, so this has to hold at
            every width the motif is shown at — not just below `lg`. */}
        <div className="sm:pr-[104px] lg:pr-[150px]">
          {departments.map((department, i) => (
            <div key={department.id ?? i} className={cn(i > 0 && "mt-14")}>
              <DepartmentLabel
                name={department.name}
                color={department.color}
              />

              {/* Two up on a phone, the mockup's three once there is room. */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
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
