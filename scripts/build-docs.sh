#!/usr/bin/env bash
# รวมไฟล์เนื้อหาที่กระจายอยู่ตาม root ของ repo เข้าไปในโฟลเดอร์ staging
# แล้วให้ mkdocs build จากตรงนั้น — ไฟล์ต้นฉบับไม่ถูกย้ายหรือแก้ไข
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAGE="$ROOT/.mkdocs-build"

rm -rf "$STAGE"
mkdir -p "$STAGE"

# หน้าแรกและ asset
cp -R "$ROOT/docs/." "$STAGE/"

# เนื้อหาจริง
cp -R "$ROOT/readings" "$STAGE/"
cp -R "$ROOT/project-ideas" "$STAGE/"
for d in "$ROOT"/WS-*; do
  [ -d "$d" ] && cp -R "$d" "$STAGE/"
done
# README.md ของ repo ใช้ชื่อ overview.md บนเว็บ เพราะ index.md เป็นหน้าแรกอยู่แล้ว
cp "$ROOT/README.md" "$STAGE/overview.md"

echo "staged $(find "$STAGE" -name '*.md' | wc -l | tr -d ' ') markdown files -> $STAGE"

cd "$ROOT"
if [ "${1:-build}" = "serve" ]; then
  exec mkdocs serve
else
  exec mkdocs build --strict
fi
