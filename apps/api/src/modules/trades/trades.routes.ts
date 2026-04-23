import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { executePaperTradeController, getPaperTradingController } from "./trades.controller.js";
import { paperTradeSchema } from "./trades.schema.js";

const router = Router();

router.use(authenticate);
router.get("/paper", getPaperTradingController);
router.post("/paper", validate(paperTradeSchema), executePaperTradeController);

export { router as tradesRoutes };

