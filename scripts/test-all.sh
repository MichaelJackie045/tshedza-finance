#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! command -v java >/dev/null 2>&1; then
  # shellcheck source=/dev/null
  source "$ROOT_DIR/scripts/setup-tools.sh"
else
  export JAVA_HOME="${JAVA_HOME:-$(dirname "$(dirname "$(readlink -f "$(command -v java)")")")}"
fi

echo "=== Backend tests ==="
cd "$ROOT_DIR/backend"
./mvnw test

echo
echo "=== Frontend tests ==="
cd "$ROOT_DIR/frontend"
npm test

echo
echo "All tests passed."
