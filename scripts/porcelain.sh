#!/usr/bin/env bash

set -eo pipefail

status=$(git status --porcelain)

if [ -n "$status" ]; then
  echo "There are uncommitted changes. Please make sure you run \`pnpm build\` and commit your changes."
  echo "$status"
  exit 1
fi
