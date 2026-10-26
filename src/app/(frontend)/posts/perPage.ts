/**
 * How many posts a page of the index holds.
 *
 * Shared because it is used in four places across two routes — the query, the
 * `Pagination` component, and the page count `generateStaticParams` works out
 * — and they had already drifted: the paginated route fetched twelve at a
 * time while its page count divided the total by ten. On the server build
 * that was invisible, since nothing prerenders there and an over-counted page
 * simply never gets asked for. The static export writes every page it is
 * given, so it would have published the extra ones, each rendering "not
 * found" under a 200.
 */
export const POSTS_PER_PAGE = 12
