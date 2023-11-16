import { Role } from "@prisma/client";
import express from "express";
import { ProductController } from "../controllers/product.controller";
import auth from "../middlewares/auth";
import validate from "../middlewares/validate";
import { ProductValidation } from "../validation/product.validation";

const router = express.Router();

router.post(
    "/",
    auth(Role.admin),
    validate(ProductValidation.create),
    ProductController.create
);

export const ProductRoutes = router;
