# TradeMandu

TradeMandu is a Nepal-first investing app focused on portfolio tracking, market data, paper trading, IPO discovery, and investor education.

## Workspace

- `apps/api`: Express + Prisma + PostgreSQL + Socket.IO backend
- `apps/mobile`: Expo + React Native + TypeScript mobile app

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Copy environment templates:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env
```

3. Start infrastructure and database setup:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

4. Run the backend:

```bash
npm run dev:api
```

5. Run the mobile app:

```bash
npm run dev:mobile
```

See [docs/architecture.md](/Users/shushilkarki/My-projects/TradeMandu/docs/architecture.md) for the module design and scaling notes.
See [docs/api-endpoints.md](/Users/shushilkarki/My-projects/TradeMandu/docs/api-endpoints.md) for the MVP route surface.
