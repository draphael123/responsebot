#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Building shared package..."
cd packages/shared
npm run build
cd ../..

echo "Building web app..."
cd apps/web
npm run build

echo "Build complete!"

