#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$PROJECT_DIR/src" || "$PROJECT_DIR/src/Java의 정석"
OUT_DIR="$PROJECT_DIR/out"

mkdir -p "$OUT_DIR"
find "$SRC_DIR" -name "*.java" > "$OUT_DIR/sources.txt"

javac -encoding UTF-8 -d "$OUT_DIR" @"$OUT_DIR/sources.txt"
echo "Compiled to $OUT_DIR"
