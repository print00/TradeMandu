import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { getPortfolioController, upsertHoldingController } from "./portfolio.controller.js";
import { upsertHoldingSchema } from "./portfolio.schema.js";

const router = Router();

router.use(authenticate);
router.get("/", getPortfolioController);
router.post("/holdings", validate(upsertHoldingSchema), upsertHoldingController);

export { router as portfolioRoutes };

