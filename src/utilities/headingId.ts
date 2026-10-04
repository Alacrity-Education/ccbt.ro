// Structural only: the one thing that matters about a node here is whether it
// carries text or children, which every lexical node answers the same way.
type LexicalNodeish = { text?: string; children?: readonly unknown[] };

/**
 * The URL fragment a heading can be linked to, derived from its own words:
 * `Misiunea noastră` becomes `misiunea-noastra`, so `/despre#misiunea-noastra`
 * lands on it.
 *
 * Deriving it from the text is what keeps it free for editors — there is no
 * field to fill in — and is also its one weakness: reword a heading and any
 * link already shared to it stops resolving, silently. Nothing here can warn
 * about that, so it is worth knowing before putting one of these in print.
 *
 * Diacritics are decomposed rather than mapped by hand. Romanian needs `ă ș ț`
 * at minimum, and NFD splits every one of them into a plain letter plus a
 * combining mark, which `\p{Diacritic}` then drops — the same pass covers every
 * other language the site might pick up later.
 */
export const headingId = (text: string): string =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    // Punctuation, dashes and whitespace all collapse to one separator, so a
    // heading's stray em dash or bracket cannot reach the URL.
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * A heading's words with its formatting dropped: the text is split across child
 * nodes wherever part of it is bold, italic or a link, so the slug has to be
 * built from all of them rather than from the first.
 *
 * Takes `unknown[]` because the serialized node types describe no common shape
 * to narrow on — the structure above is the contract, checked per node.
 */
export const nodeText = (nodes: readonly unknown[] | undefined): string =>
  (nodes ?? [])
    .map((node) => {
      const n = node as LexicalNodeish;
      return typeof n.text === "string" ? n.text : nodeText(n.children);
    })
    .join("");
