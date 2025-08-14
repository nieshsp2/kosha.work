#!/bin/bash

# Production Build Script for Doc-to-Intent
set -e

echo "🚀 Starting production build..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Check environment variables
echo "🔍 Checking environment variables..."
if [ ! -f ".env.production" ]; then
    echo "⚠️  Warning: .env.production not found. Using default values."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Type checking
echo "🔍 Running type checks..."
npm run type-check

# Linting
echo "🔍 Running linting..."
npm run lint

# Build for production
echo "🏗️  Building for production..."
npm run build:prod

# Verify build output
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output: dist/"
    echo "📊 Bundle size:"
    du -sh dist/*
else
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "🎉 Production build completed successfully!"
