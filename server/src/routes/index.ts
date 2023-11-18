import express from "express";
import { AuthRoutes } from "./auth.route";
import { PaymentRoutes } from "./payment.route";
import { ProductRoutes } from "./product.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/product",
        route: ProductRoutes,
    },
    {
        path: "/payment",
        route: PaymentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
