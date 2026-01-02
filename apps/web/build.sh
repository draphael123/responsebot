#!/bin/bash
# Build script for Vercel deployment
set -e

# Navigate to project root
cd "$(dirname "$0")/../.."

# Build shared package first
echo "Building shared package..."
cd packages/shared
npm run build
cd ../..

# Build web app
echo "Building web app..."
cd apps/web
npm run build

