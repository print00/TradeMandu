import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate } from "../../middlewares/validate.js";
import { getProfileController, updateProfileController } from "./users.controller.js";
import { updateProfileSchema } from "./users.schema.js";

const router = Router();

router.use(authenticate);
router.get("/me", getProfileController);
router.patch("/me", validate(updateProfileSchema), updateProfileController);

export { router as usersRoutes };

