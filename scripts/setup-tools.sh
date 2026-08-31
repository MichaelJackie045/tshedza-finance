#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TOOLS_DIR="$ROOT_DIR/.tools"

mkdir -p "$TOOLS_DIR"

if [ ! -d "$TOOLS_DIR/jdk-21" ]; then
  echo "Downloading JDK 21..."
  curl -fsSL "https://api.adoptium.net/v3/binary/latest/21/ga/linux/x64/jdk/hotspot/normal/eclipse?project=jdk" \
    -o "$TOOLS_DIR/jdk21.tar.gz"
  mkdir -p "$TOOLS_DIR/jdk-21-extract"
  tar -xzf "$TOOLS_DIR/jdk21.tar.gz" -C "$TOOLS_DIR/jdk-21-extract" --strip-components=1
  mv "$TOOLS_DIR/jdk-21-extract" "$TOOLS_DIR/jdk-21"
  rm -f "$TOOLS_DIR/jdk21.tar.gz"
fi

export JAVA_HOME="$TOOLS_DIR/jdk-21"
export PATH="$JAVA_HOME/bin:$PATH"

if ! command -v java >/dev/null 2>&1; then
  echo "Java setup failed." >&2
  exit 1
fi

echo "Using Java: $(java -version 2>&1 | head -1)"
