# TradeMandu deployment checklist

TradeMandu deploys as two web services:

- `web`: Next.js frontend in `web/`
- `apps/api`: Express API in `apps/api/`

The API also needs managed PostgreSQL and Redis.

## 1. Deploy the API

Use a Node web-service host such as Render, Railway, Fly.io, or a VPS.

Recommended service settings:

- Root directory: repository root
- Build command: `npm install && npm run prisma:generate && npm run build:api`
- Start command: `npm --workspace apps/api run start`
- Health check path: `/health`

Set these production environment variables:

```bash
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-web-domain.com
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_ACCESS_SECRET=<long-random-secret>
JWT_REFRESH_SECRET=<different-long-random-secret>
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
OTP_EXPIRY_MINUTES=10
PAPER_TRADING_START_BALANCE=100000
```

Create and commit Prisma migrations before deploying a real production database:

```bash
npm run prisma:migrate
```

After migrations exist, use this for production schema updates:

```bash
npm run prisma:deploy
```

Seed only if you want the sample market data in production:

```bash
npm run prisma:seed
```

## 2. Deploy the web app

Vercel is the simplest fit for the Next.js app.

Recommended project settings:

- Root directory: `web`
- Build command: `npm run build`
- Output: Next.js default

Set this environment variable:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

After the web deploy has a final URL, update the API `CLIENT_URL` to that exact origin and redeploy the API so CORS allows browser requests.

## 3. Quick smoke test

Check these URLs after deployment:

- `https://your-api-domain.com/health` returns `{ "status": "ok" }`
- `https://your-api-domain.com/api/v1/stocks` returns an array
- `https://your-web-domain.com/market` renders the market page
- Login flow completes and authenticated pages can call the API

## References

- Vercel monorepos: https://vercel.com/docs/monorepos
- Render web services: https://render.com/docs/web-services
- Prisma production migrations: https://www.prisma.io/docs/cli/migrate/deploy
