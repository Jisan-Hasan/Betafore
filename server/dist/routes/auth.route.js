"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const auth_validation_1 = require("../validation/auth.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validate_1.default)(auth_validation_1.AuthValidation.signup), auth_controller_1.AuthController.signup);
router.post("/login", (0, validate_1.default)(auth_validation_1.AuthValidation.login), auth_controller_1.AuthController.login);
exports.AuthRoutes = router;
