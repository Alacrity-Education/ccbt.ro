#!/usr/bin/env bash
#
# Gives the uploads volume back to the user the app runs as.
#
# The runtime image drops to the unprivileged `nextjs` user (uid 1001, gid 1001
# — see the Dockerfile), but a Docker volume is created owned by root, and
# `cp -a` preserves whatever ownership the files already had. Either is enough
# to make Payload fail on write:
#
#   EACCES: permission denied, open '/app/public/media/<file>'
#
# Reads keep working, so the symptom is a site that serves every existing image
# fine and refuses every new upload.
#
# Usage:
#   scripts/fix-media-permissions.sh <volume> [uid] [gid]
#
# Example:
#   scripts/fix-media-permissions.sh wy8t1rpa7fkwlfbgmhmatwfy_ccbt-media
#
# Find the name with:  docker volume ls | grep media
#
# Safe to run while the site is up — chown and chmod do not disturb open files —
# and safe to run twice. It changes ownership and modes only, never contents.
set -euo pipefail

VOL="${1:-}"
UID_WANT="${2:-1001}"
GID_WANT="${3:-1001}"

if [ -z "$VOL" ]; then
  sed -n '2,26p' "$0" | sed 's/^# \{0,1\}//'
  exit 64
fi

die() { echo "error: $*" >&2; exit 1; }

docker volume inspect "$VOL" >/dev/null 2>&1 \
  || die "volume '$VOL' does not exist. Try: docker volume ls | grep media"

# busybox is enough for stat/chown/chmod and pulls in seconds.
report() {
  docker run --rm -v "$VOL":/v busybox sh -c '
    total=$(find /v -mindepth 1 | wc -l)
    echo "  entries        : $total"
    echo "  volume root    : $(stat -c "%u:%g %a" /v)"
    echo "  owners present : $(find /v -mindepth 1 -exec stat -c "%u:%g" {} + 2>/dev/null | sort -u | tr "\n" " ")"
    echo "  not writable by '"$UID_WANT"' : $(find /v -mindepth 1 ! -user '"$UID_WANT"' | wc -l)"
  '
}

echo "volume: $VOL"
echo "before:"
report

echo "applying ${UID_WANT}:${GID_WANT}…"
# The mount root itself matters as much as its contents: Payload writes new
# files into the directory, which needs the write bit for that owner.
# Directories need +x to be traversed, files do not — hence the split.
docker run --rm -v "$VOL":/v busybox sh -c "
  set -e
  chown -R ${UID_WANT}:${GID_WANT} /v
  find /v -type d -exec chmod 755 {} +
  find /v -type f -exec chmod 644 {} +
"

echo "after:"
report

# Prove it rather than assume it: write and delete a file as the target user.
if docker run --rm --user "${UID_WANT}:${GID_WANT}" -v "$VOL":/v busybox \
     sh -c 'touch /v/.permcheck && rm /v/.permcheck' 2>/dev/null; then
  echo "verified: uid ${UID_WANT} can create and remove files in the volume"
else
  die "uid ${UID_WANT} still cannot write to the volume"
fi

echo "done. Uploads should work without restarting anything."
