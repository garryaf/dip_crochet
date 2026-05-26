# Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Environment variables to set in Vercel Dashboard:
- `AUTH_SECRET` (generate: `openssl rand -base64 32`)
- `DATABASE_URL` (Neon/Supabase connection string)
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_SITE_URL=https://dipcrochet-nine.vercel.app`

### Option 2: Docker

```bash
# Build image
docker build -t cotcret .

# Run with environment
docker run -p 3333:3333 \
  -e DATABASE_URL="postgresql://..." \
  -e AUTH_SECRET="your-secret" \
  cotcret
```

### Option 3: Docker Compose (Full Stack)

```bash
# Start all services (app + database)
docker compose up -d

# Run migrations
docker compose exec app npx prisma db push

# Seed database
docker compose exec app npx prisma db seed

# View logs
docker compose logs -f app
```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs:

1. **Quality** — Lint + TypeScript type check
2. **Build** — Production build verification
3. **Deploy** — Auto-deploy to Vercel on `main` push

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

## Health Checks

The application exposes health via:
- Docker: `HEALTHCHECK` in Dockerfile (wget to `/`)
- Vercel: Built-in health monitoring

## Rollback Strategy

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback
```

### Docker
```bash
# Tag current as backup before deploying new
docker tag cotcret:latest cotcret:backup

# If new version fails, restore
docker tag cotcret:backup cotcret:latest
docker compose up -d
```

## Monitoring

### Error Tracking (Sentry)
- Set `NEXT_PUBLIC_SENTRY_DSN` in environment
- Errors auto-captured via `src/lib/monitoring.ts`
- Source maps uploaded during build

### Performance
- Core Web Vitals reported to GA4 via `WebVitals` component
- Lighthouse CI can be added to GitHub Actions

### Uptime
- Vercel: Built-in uptime monitoring
- Docker: Health check + external monitoring (UptimeRobot, Better Uptime)

## Database Backup

### Neon (Recommended)
- Automatic point-in-time recovery
- Branch-based development (create branch per PR)

### Manual Backup
```bash
# Export
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup_20240101.sql
```
