# Architecture

## Backend

The API is organized around business modules:

- `auth`: OTP login, token issuance, refresh, session-safe flows
- `users`: profile and preferences
- `stocks`: cached stock listings, quotes, movers, historical candles
- `portfolio`: real holdings tracking for manually added positions
- `watchlist`: saved symbols with quick market context
- `alerts`: price, percentage, and volume alerts
- `trades`: paper trading wallet, positions, and history
- `ipo`: IPO calendars, open offers, results, reminders
- `notifications`: device token registration and in-app notifications

## Realtime

- Socket.IO is used for pushing quote and portfolio refresh events.
- Redis is prepared for cache and pub/sub so the app can scale horizontally later.

## Mobile

- Expo Router for screen structure
- NativeWind for styling
- Zustand for session/UI state
- Axios for API communication

## Production Notes

- Live NEPSE integrations should be added behind provider services in `stocks`.
- OTP delivery should be wired to email/SMS providers in `auth`.
- Background workers are a good next step for alerts, notifications, and market sync jobs.

