import { Router } from "express";
import { alertsRoutes } from "../modules/alerts/alerts.routes.js";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { ipoRoutes } from "../modules/ipo/ipo.routes.js";
import { notificationsRoutes } from "../modules/notifications/notifications.routes.js";
import { portfolioRoutes } from "../modules/portfolio/portfolio.routes.js";
import { stocksRoutes } from "../modules/stocks/stocks.routes.js";
import { tradesRoutes } from "../modules/trades/trades.routes.js";
import { usersRoutes } from "../modules/users/users.routes.js";
import { watchlistRoutes } from "../modules/watchlist/watchlist.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", usersRoutes);
apiRouter.use("/stocks", stocksRoutes);
apiRouter.use("/portfolio", portfolioRoutes);
apiRouter.use("/watchlist", watchlistRoutes);
apiRouter.use("/alerts", alertsRoutes);
apiRouter.use("/trades", tradesRoutes);
apiRouter.use("/ipo", ipoRoutes);
apiRouter.use("/notifications", notificationsRoutes);

