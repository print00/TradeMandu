import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  addWatchlistController,
  deleteWatchlistController,
  getWatchlistController
} from "./watchlist.controller.js";
import { watchlistSchema } from "./watchlist.schema.js";

const router = Router();

router.use(authenticate);
router.get("/", getWatchlistController);
router.post("/", validate(watchlistSchema), addWatchlistController);
router.delete("/:stockId", deleteWatchlistController);

export { router as watchlistRoutes };

