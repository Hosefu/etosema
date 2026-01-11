#!/usr/bin/env bash
set -euo pipefail

# Deploy current repo state to production server via rsync + docker compose build.
#
# Requires:
# - ssh/scp/rsync installed locally
# - SSH key at ./access/id_rsa (gitignored)
# - prod env preset at ./prod.compose.env (gitignored)
#
# Usage:
#   ./scripts/deploy-prod.sh

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

REMOTE_HOST="${REMOTE_HOST:-root@89.111.131.199}"
REMOTE_DIR="${REMOTE_DIR:-/opt/etosema/etosema}"
SSH_KEY="${SSH_KEY:-$ROOT_DIR/access/id_rsa}"

if [[ ! -f "$SSH_KEY" ]]; then
  echo "Missing SSH key: $SSH_KEY"
  exit 1
fi

if [[ ! -f "$ROOT_DIR/prod.compose.env" ]]; then
  echo "Missing prod env preset: $ROOT_DIR/prod.compose.env"
  exit 1
fi

chmod 600 "$SSH_KEY" || true

echo "==> Ensuring remote directory: $REMOTE_DIR"
ssh -i "$SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$REMOTE_HOST" "mkdir -p '$REMOTE_DIR'"

echo "==> Upload compose.env (from prod.compose.env)"
scp -i "$SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$ROOT_DIR/prod.compose.env" "$REMOTE_HOST:$REMOTE_DIR/compose.env"

echo "==> Rsync project files"
rsync -az --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '**/node_modules/' \
  --exclude '.next/' \
  --exclude 'dist/' \
  --exclude 'coverage/' \
  --exclude '.playwright-mcp/' \
  --exclude 'access/' \
  --exclude 'compose.env' \
  --exclude '*.compose.env' \
  -e "ssh -i '$SSH_KEY' -o BatchMode=yes -o StrictHostKeyChecking=accept-new" \
  ./ "$REMOTE_HOST:$REMOTE_DIR/"

echo "==> Remote build & up"
ssh -i "$SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$REMOTE_HOST" "cd '$REMOTE_DIR' && set -a && . ./compose.env && set +a && docker compose up -d --build"

echo "==> Quick health check (local on server)"
ssh -i "$SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$REMOTE_HOST" "curl -skI https://localhost/ | sed -n '1,12p' || true"

echo "✓ Deploy finished"
