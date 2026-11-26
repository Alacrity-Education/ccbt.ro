import type { Post } from "@/payload-types";

/**
 * Written out rather than taken from `Intl.DateTimeFormat('ro-RO')`: the site
 * is Romanian-only, so there is nothing to look up, and a literal list cannot
 * come back in English from a runtime whose ICU data was trimmed — which is a
 * real risk in a slim container image, and one that would only show in
 * production.
 */
export const MONTHS_RO = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
];

export type PostGroup = {
  /** Sort key and React key: `YYYY-MM`. */
  key: string;
  /** What the heading reads, e.g. "Octombrie 2026". */
  label: string;
  posts: Post[];
};

/**
 * The date a post is filed under. `publishedAt` is what the archive sorts by
 * and what the cards print, so it is what the months have to agree with;
 * `createdAt` only stands in for a draft that was never given one, which would
 * otherwise have no month to sit in at all.
 */
const postDate = (post: Post): Date | null => {
  const raw = post.publishedAt ?? post.createdAt;
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
};

/** A month the archive shows even when no post is filed under it. */
export type ExtraMonth = {
  /** 1–12, as the select stores it: `"4"` is April. */
  month?: string | null;
  year?: number | null;
};

const groupKey = (year: number, monthIndex: number): string =>
  `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

/**
 * Posts gathered into one group per calendar month, newest month first and
 * newest post first inside each.
 *
 * `extraMonths` are months the editor wants headed even with nothing under
 * them yet — the homepage programme links to every month of the season, and a
 * month whose events are not written up still needs its anchor to land on.
 * One that does have posts is the same group, so the heading is never written
 * twice; one with a month or year that does not parse is ignored.
 *
 * The sort is applied here rather than left to the caller because grouping by
 * date and showing the groups out of date order makes no sense — which also
 * means an Individual Selection loses the order the editor arranged it in once
 * this is switched on. That is the trade the toggle buys.
 *
 * A post with no usable date is dropped from the months and handed back
 * separately, so the caller can still show it rather than have it disappear.
 */
export const groupPostsByMonth = (
  posts: Post[],
  extraMonths: ExtraMonth[] = [],
): { groups: PostGroup[]; undated: Post[] } => {
  const undated: Post[] = [];
  const byKey = new Map<string, PostGroup>();

  const dated = posts
    .map((post) => ({ post, date: postDate(post) }))
    .filter((entry) => {
      if (entry.date) return true;
      undated.push(entry.post);
      return false;
    }) as { post: Post; date: Date }[];

  dated.sort((a, b) => b.date.getTime() - a.date.getTime());

  for (const { post, date } of dated) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = groupKey(year, month);

    const group = byKey.get(key);
    if (group) group.posts.push(post);
    else
      byKey.set(key, {
        key,
        label: `${MONTHS_RO[month]} ${year}`,
        posts: [post],
      });
  }

  for (const extra of extraMonths) {
    const month = Number(extra.month) - 1;
    const year = Number(extra.year);
    if (!Number.isInteger(month) || month < 0 || month > 11) continue;
    if (!Number.isInteger(year)) continue;

    const key = groupKey(year, month);
    if (!byKey.has(key))
      byKey.set(key, { key, label: `${MONTHS_RO[month]} ${year}`, posts: [] });
  }

  // `YYYY-MM` sorts as text in date order. The posts already arrived newest
  // first, but the extra months can be anywhere in the list.
  const groups = [...byKey.values()].sort((a, b) =>
    b.key.localeCompare(a.key),
  );

  return { groups, undated };
};
