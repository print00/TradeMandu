# TradeMandu Web

Production-oriented Next.js dashboard that reuses the existing TradeMandu backend without changing backend or mobile code.

## Structure

- `app/`: Next.js App Router pages and layouts
- `components/`: UI, layout, and feature components
- `lib/`: API clients, auth helpers, utilities, storage
- `store/`: Zustand stores for auth, portfolio, watchlist, and theme
- `types/`: Shared TypeScript response types

## Setup

1. Copy environment variables:

```bash
cp web/.env.example web/.env.local
```

2. Set your backend URL in `web/.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://your-existing-backend-url.com/api/v1
```

3. Install dependencies from the `web` folder:

```bash
cd web
npm install
```

4. Start development:

```bash
npm run dev
```

## Implemented Pages

- `/login`
- `/dashboard`
- `/market`
- `/market/[symbol]`
- `/portfolio`
- `/watchlist`
- `/ipo`
- `/alerts`

## Notes

- Auth uses the existing OTP + JWT backend routes.
- Access token and refresh token are stored in `localStorage`.
- Axios automatically retries once after refreshing an expired access token.
- Server components are used for public market and IPO fetches when possible.
- Authenticated portfolio/watchlist/alerts/trade actions use client components.
