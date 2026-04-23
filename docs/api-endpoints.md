# API Endpoints

Base URL: `/api/v1`

## Auth

- `POST /auth/request-otp`
- `POST /auth/verify-otp`
- `POST /auth/refresh`

## Users

- `GET /users/me`
- `PATCH /users/me`

## Stocks

- `GET /stocks`
- `GET /stocks/top-gainers`
- `GET /stocks/top-losers`
- `GET /stocks/:symbol`

## Portfolio

- `GET /portfolio`
- `POST /portfolio/holdings`

## Watchlist

- `GET /watchlist`
- `POST /watchlist`
- `DELETE /watchlist/:stockId`

## Alerts

- `GET /alerts`
- `POST /alerts`
- `PATCH /alerts/:id`
- `DELETE /alerts/:id`

## Paper Trading

- `GET /trades/paper`
- `POST /trades/paper`

## IPO

- `GET /ipo`
- `POST /ipo/:ipoId/reminders`

## Notifications

- `GET /notifications`
- `POST /notifications/tokens`
