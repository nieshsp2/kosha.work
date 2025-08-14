# Production Deployment Guide

## Overview
This document provides comprehensive instructions for deploying the Doc-to-Intent application to production.

## Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Production environment variables configured
- Supabase production project set up
- Gemini API production key

## Environment Configuration

### 1. Production Environment Variables
Create `.env.production` with the following variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key

# AI API Configuration
VITE_GEMINI_API_KEY=your_production_gemini_api_key

# Application Configuration
VITE_APP_ENV=production
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=Doc-to-Intent
```

### 2. Supabase Production Setup
1. Create a new Supabase project for production
2. Update RLS policies for production use
3. Configure production database settings
4. Set up production authentication

## Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Quick Start
```bash
# Build and deploy
./scripts/deploy-prod.sh

# View logs
docker-compose -f docker-compose.prod.yml logs -f app

# Stop deployment
docker-compose -f docker-compose.prod.yml down
```

#### Manual Docker Deployment
```bash
# Build image
docker build -t doc-to-intent:prod .

# Run container
docker run -d -p 80:80 --name doc-to-intent-prod doc-to-intent:prod
```

### Option 2: Manual Build and Deploy

#### Build for Production
```bash
# Install dependencies
npm ci --only=production

# Build application
npm run build:prod

# Preview build
npm run preview
```

#### Deploy to Web Server
1. Copy `dist/` contents to your web server
2. Configure nginx/apache for SPA routing
3. Set up SSL certificates
4. Configure reverse proxy if needed

## Performance Optimizations

### Build Optimizations
- Code splitting enabled
- Tree shaking for unused code
- Minification and compression
- Asset optimization

### Runtime Optimizations
- Gzip compression
- Static asset caching
- Security headers
- Health check endpoints

## Monitoring and Logging

### Health Checks
- Endpoint: `/health`
- Returns application status
- Used by load balancers and monitoring

### Logs
- Application logs via Docker
- Nginx access/error logs
- Structured logging for production

## Security Considerations

### Headers
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy configured
- Referrer-Policy: strict-origin-when-cross-origin

### Environment
- No sensitive data in client bundle
- Environment variables properly configured
- HTTPS enforced in production

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clean and rebuild
npm run clean
npm run build:prod
```

#### Connection Issues
- Check environment variables
- Verify Supabase connectivity
- Check network configuration

#### Performance Issues
- Analyze bundle size: `npm run analyze`
- Check nginx configuration
- Monitor resource usage

### Logs and Debugging
```bash
# View application logs
docker-compose -f docker-compose.prod.yml logs app

# View nginx logs
docker exec -it <container_id> tail -f /var/log/nginx/error.log
```

## Maintenance

### Updates
1. Pull latest code
2. Update environment variables if needed
3. Rebuild and redeploy
4. Verify health checks

### Backup
- Database backups via Supabase
- Environment configuration backup
- Build artifacts backup

## Support
For production issues, check:
1. Application logs
2. Environment configuration
3. Network connectivity
4. Supabase dashboard
5. Gemini API status

## Version History
- v1.0.0: Initial production release
