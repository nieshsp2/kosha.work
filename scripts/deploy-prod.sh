#!/bin/bash

# Production Deployment Script
set -e

echo "🚀 Starting production deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: docker-compose is not installed. Please install it and try again."
    exit 1
fi

# Validate environment variables
echo "🔍 Validating environment variables..."
if [ ! -f ".env.production" ]; then
    echo "❌ Error: .env.production file not found. Please create it with production values."
    exit 1
fi

# Build and deploy
echo "🏗️  Building and deploying application..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for application to be ready
echo "⏳ Waiting for application to be ready..."
sleep 10

# Health check
echo "🔍 Performing health check..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ Application is healthy and running!"
    echo "🌐 Application URL: http://localhost"
else
    echo "❌ Health check failed. Application may not be running properly."
    echo "📋 Checking logs..."
    docker-compose -f docker-compose.prod.yml logs app
    exit 1
fi

echo "🎉 Production deployment completed successfully!"
echo "📊 To view logs: docker-compose -f docker-compose.prod.yml logs -f app"
echo "🛑 To stop: docker-compose -f docker-compose.prod.yml down"
