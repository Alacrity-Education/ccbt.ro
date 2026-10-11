/**
 * The video id inside a YouTube link, or null if there isn't one.
 *
 * Takes the link as a person would paste it. YouTube hands out at least four
 * shapes for the same video — the watch page, the share shortlink, an embed
 * URL, and a Short — and an editor should not have to know which one they
 * copied, so all four are accepted along with any trailing `?t=`, `&list=` or
 * tracking parameters.
 *
 * Ids are 11 characters of `A-Za-z0-9_-`. Matching that exactly is what keeps a
 * mistyped link from becoming an iframe pointed at nothing.
 */
const ID = /^[A-Za-z0-9_-]{11}$/;

export const youtubeId = (url: string | null | undefined): string | null => {
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    // Not a URL at all — but a bare id is a reasonable thing to paste.
    const bare = url.trim();
    return ID.test(bare) ? bare : null;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  // youtu.be/<id>
  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1).split("/")[0];
    return ID.test(id) ? id : null;
  }

  if (!/(^|\.)youtube(-nocookie)?\.com$/.test(host)) return null;

  // youtube.com/watch?v=<id>
  const v = parsed.searchParams.get("v");
  if (v && ID.test(v)) return v;

  // youtube.com/embed/<id>, /shorts/<id>, /live/<id>
  const match = parsed.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
  if (match && ID.test(match[1])) return match[1];

  return null;
};

/**
 * The privacy-enhanced embed URL. `youtube-nocookie.com` is the same player
 * without the tracking cookies set before someone presses play, which is the
 * difference between embedding a video and signing visitors up to something.
 */
export const youtubeEmbedUrl = (id: string): string =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
