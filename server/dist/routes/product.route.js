"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const product_validation_1 = require("../validation/product.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.Role.admin), (0, validate_1.default)(product_validation_1.ProductValidation.create), product_controller_1.ProductController.create);
router.get("/", (0, auth_1.default)(client_1.Role.admin, client_1.Role.user), product_controller_1.ProductController.getAll);
router.get("/:id", (0, auth_1.default)(client_1.Role.admin, client_1.Role.user), product_controller_1.ProductController.getById);
exports.ProductRoutes = router;
