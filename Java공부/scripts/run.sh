#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$PROJECT_DIR/out"
CLASS="${1:-basics.Hello}"

if [ ! -d "$OUT_DIR" ]; then
  echo "Build output not found. Compiling..."
  "$PROJECT_DIR/scripts/compile.sh"
fi

java -cp "$OUT_DIR" "$CLASS"
