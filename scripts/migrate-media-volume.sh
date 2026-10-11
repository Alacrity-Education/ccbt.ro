#!/usr/bin/env bash
#
# Copies the uploads from one Docker volume into another.
#
# Coolify names a volume <project-prefix>-<key>, and the prefix changes when the
# application is recreated — so a redeploy can come up pointing at an empty
# volume while every previously uploaded image sits in the old one. Payload
# stores uploads on disk and only their metadata in Postgres, so the database
# still references files that are no longer there: the site renders with broken
# images rather than failing outright.
#
# Usage:
#   scripts/migrate-media-volume.sh <source-volume> <destination-volume> [--force]
#
# Example:
#   scripts/migrate-media-volume.sh \
#     wy8t1rpa7fkwlfbgmhmatwfy-ccbt-media \
#     abc123def456-ccbt-media
#
# Find the names with:  docker volume ls | grep media
#
# The copy is additive and never deletes from the source. It refuses to write
# into a destination that already holds files unless --force is given, so
# running it twice cannot quietly merge two different sets of uploads.
set -euo pipefail

SRC="${1:-}"
DST="${2:-}"
FORCE="${3:-}"

if [ -z "$SRC" ] || [ -z "$DST" ]; then
  sed -n '2,24p' "$0" | sed 's/^# \{0,1\}//'
  exit 64
fi

die() { echo "error: $*" >&2; exit 1; }

docker volume inspect "$SRC" >/dev/null 2>&1 \
  || die "source volume '$SRC' does not exist. Try: docker volume ls | grep media"

if ! docker volume inspect "$DST" >/dev/null 2>&1; then
  echo "destination volume '$DST' does not exist — creating it"
  docker volume create "$DST" >/dev/null
fi

# busybox is enough for the counting and the copy, and pulls in seconds.
count_files() {
  docker run --rm -v "$1":/v:ro busybox sh -c 'find /v -type f | wc -l' 2>/dev/null | tr -d '[:space:]'
}
size_of() {
  docker run --rm -v "$1":/v:ro busybox sh -c 'du -sh /v 2>/dev/null | cut -f1' | tr -d '[:space:]'
}

src_count=$(count_files "$SRC")
dst_count=$(count_files "$DST")

echo "source      : $SRC  — $src_count files, $(size_of "$SRC")"
echo "destination : $DST  — $dst_count files, $(size_of "$DST")"

[ "$src_count" -eq 0 ] && die "source volume is empty — nothing to copy. Is the name right?"

if [ "$dst_count" -ne 0 ] && [ "$FORCE" != "--force" ]; then
  die "destination already holds $dst_count files. Re-run with --force to copy over it."
fi

echo "copying…"
# cp -a preserves timestamps — and ownership, which is the catch. The app runs
# as uid 1001 (nextjs, see the Dockerfile) and cannot write into a directory
# owned by root, so a faithful copy produces a site that serves every existing
# upload and refuses every new one with EACCES. Handing the volume over
# afterwards is what makes it usable, not just present.
docker run --rm \
  -v "$SRC":/from:ro \
  -v "$DST":/to \
  busybox sh -c 'cp -a /from/. /to/'

echo "handing the volume to uid 1001…"
"$(dirname "$0")/fix-media-permissions.sh" "$DST" >/dev/null \
  || die "copied, but could not give the volume to uid 1001 — run scripts/fix-media-permissions.sh $DST"

final_count=$(count_files "$DST")
echo "destination : $DST  — $final_count files, $(size_of "$DST")"

if [ "$final_count" -lt "$src_count" ]; then
  die "expected at least $src_count files, found $final_count — the copy is incomplete"
fi

echo "done. The source volume is untouched; remove it only once the site is verified."
