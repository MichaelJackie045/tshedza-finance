#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "=== Frontend tests ==="
cd "$ROOT_DIR/frontend"
npm test

echo
echo "All tests passed."
echo "(Legacy Spring backend under backend/ is retired — use Supabase.)"
