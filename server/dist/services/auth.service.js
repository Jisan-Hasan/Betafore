"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const bcrypt_1 = require("../shared/bcrypt");
const jwtHelpers_1 = require("../shared/jwtHelpers");
const prisma_1 = __importDefault(require("../shared/prisma"));
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = payload;
    // check if user exists with email
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    // if user exists, throw error
    if (user) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "User already exists with this email");
    }
    // hash password using bcrypt
    const encryptedPassword = yield (0, bcrypt_1.hashPassword)(password);
    // prepare user data
    const userData = {
        email,
        name,
        password: encryptedPassword,
        role: client_1.Role.user,
    };
    // create user
    yield prisma_1.default.user.create({
        data: userData,
    });
    return;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // check if user already exists with the email
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User is not exist");
    }
    // check if password is correct or not
    if (isUserExist.password &&
        !(yield (0, bcrypt_1.comparePassword)(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password in incorrect");
    }
    // create jwt token
    const jwtPayload = { email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role };
    const token = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // return token
    return { token };
});
exports.AuthService = { signup, login };
