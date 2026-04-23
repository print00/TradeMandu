import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import {
  listNotificationsController,
  registerNotificationTokenController
} from "./notifications.controller.js";
import { registerTokenSchema } from "./notifications.schema.js";

const router = Router();

router.use(authenticate);
router.get("/", listNotificationsController);
router.post("/tokens", validate(registerTokenSchema), registerNotificationTokenController);

export { router as notificationsRoutes };

