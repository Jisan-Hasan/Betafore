"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post("/create-payment-intent", (0, auth_1.default)(client_1.Role.user), payment_controller_1.PaymentController.createPaymentIntent);
exports.PaymentRoutes = router;
