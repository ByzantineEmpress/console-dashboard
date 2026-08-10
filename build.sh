#!/bin/sh
# Build script: precompile Tailwind CSS + run Vite
set -e
cd "$(dirname "$0")"

echo "=== STEP 1: Precompile Tailwind CSS ==="
npx tailwindcss --config postcss.config.cjs --input src/index.css -o dist/styles.css
echo "OK: dist/styles.css created ($(stat -c%s dist/styles.css) bytes)"

echo ""
echo "=== STEP 2: Vite build ==="
rm -rf node_modules/.vite
npx vite build --mode production
echo ""
echo "=== BUILD COMPLETE ==="
