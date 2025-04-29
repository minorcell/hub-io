#!/bin/bash

set -e

echo "🚀 Starting build process..."

# Step 1: Update dependencies
echo "📦 Updating dependencies..."
pnpm update
pnpm install

# Step 2: Lint and format the code
echo "🧹 Formatting code..."
pnpm run lint

# Step 3: Build the application
echo "🔨 Building the application..."
pnpm run build

echo "✅ Build process completed successfully!"
echo "📦 The built application is available in the dist directory."