import express from "express";
import { AuthController } from "../controllers/auth.controller";
import validate from "../middlewares/validate";
import { AuthValidation } from "../validation/auth.validation";

const router = express.Router();

router.post("/signup", validate(AuthValidation.signup), AuthController.signup);

router.post("/login", validate(AuthValidation.login), AuthController.login);

export const AuthRoutes = router;
