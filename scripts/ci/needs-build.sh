#!/usr/bin/env bash
# Prints "true" when a pull request changes anything a build reads, "false" when it
# only touches docs, editor settings, tests or CI files. Heavy jobs use it to skip
# work while still reporting a passing result, so required checks never hang.
#
#   scripts/ci/needs-build.sh BASE_SHA HEAD_SHA [path that always counts ...]
#
# The trailing paths are the exceptions: a CI file is normally ignored, but the
# workflow that calls this passes its own path and this script's, because a
# change to either is exactly what wants testing.
set -euo pipefail
base=$1
head=$2
shift 2
merge_base=$(git merge-base "$base" "$head")

while IFS= read -r file; do
  for always in "$@"; do
    if [[ "$file" == "$always" ]]; then
      echo true
      exit 0
    fi
  done
  case "$file" in
    *.md | LICENSE | .editorconfig | .prettierrc* | .prettierignore | eslint.config.mjs) ;;
    .vscode/* | .cursor/* | .claude/* | tests/* | playwright.config.ts | vitest.config.mts | vitest.setup.ts) ;;
    .github/* | scripts/ci/*) ;;
    *)
      echo true
      exit 0
      ;;
  esac
done < <(git diff --name-only --no-renames "$merge_base" "$head")

echo false
