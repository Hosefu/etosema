#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-}"

if [[ "$MODE" != "dev" && "$MODE" != "prod" ]]; then
  echo "Usage: scripts/use-env.sh dev|prod"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

SRC_FILE="$MODE.compose.env"
DST_FILE="compose.env"

if [[ ! -f "$SRC_FILE" ]]; then
  echo "Missing $SRC_FILE in repo root."
  echo "Create it (gitignored) or copy from compose.env.example."
  exit 1
fi

cp "$SRC_FILE" "$DST_FILE"
echo "✓ Selected env: $SRC_FILE -> $DST_FILE"

# Export env vars so docker-compose build args can use them
set -a
source "./$DST_FILE"
set +a

docker compose up -d --build
echo "✓ Done. Open: ${FRONTEND_URL:-http://localhost:3000}"
