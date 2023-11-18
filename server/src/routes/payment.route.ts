import { Role } from "@prisma/client";
import express from "express";
import { PaymentController } from "../controllers/payment.controller";
import auth from "../middlewares/auth";

const router = express.Router();

router.post(
    "/create-payment-intent",
    auth(Role.user),
    PaymentController.createPaymentIntent
);

export const PaymentRoutes = router;
