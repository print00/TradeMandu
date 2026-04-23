import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  createAlertController,
  deleteAlertController,
  listAlertsController,
  updateAlertController
} from "./alerts.controller.js";
import { createAlertSchema } from "./alerts.schema.js";

const router = Router();

router.use(authenticate);
router.get("/", listAlertsController);
router.post("/", validate(createAlertSchema), createAlertController);
router.patch("/:id", updateAlertController);
router.delete("/:id", deleteAlertController);

export { router as alertsRoutes };

