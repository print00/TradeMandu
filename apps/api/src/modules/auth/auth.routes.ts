import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import {
  refreshTokenController,
  requestOtpController,
  verifyOtpController
} from "./auth.controller.js";
import { refreshTokenSchema, requestOtpSchema, verifyOtpSchema } from "./auth.schema.js";

const router = Router();

router.post("/request-otp", validate(requestOtpSchema), requestOtpController);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtpController);
router.post("/refresh", validate(refreshTokenSchema), refreshTokenController);

export { router as authRoutes };

