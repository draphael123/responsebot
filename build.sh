#!/bin/bash
set -e

# Ensure we're in the project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Installing dependencies..."
npm install

echo "Building shared package..."
npm run build:shared

echo "Verifying shared package build..."
if [ ! -f "packages/shared/dist/index.js" ]; then
  echo "Error: Shared package was not built correctly"
  exit 1
fi

echo "Building web app..."
cd apps/web
npm run build

echo "Build complete!"

