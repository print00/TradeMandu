import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { createReminderController, listIposController } from "./ipo.controller.js";

const router = Router();

router.get("/", listIposController);
router.post("/:ipoId/reminders", authenticate, createReminderController);

export { router as ipoRoutes };

