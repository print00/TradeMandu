import { Router } from "express";
import {
  getStockDetailController,
  getTopGainersController,
  getTopLosersController,
  listStocksController
} from "./stocks.controller.js";

const router = Router();

router.get("/", listStocksController);
router.get("/top-gainers", getTopGainersController);
router.get("/top-losers", getTopLosersController);
router.get("/:symbol", getStockDetailController);

export { router as stocksRoutes };

