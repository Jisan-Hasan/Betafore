"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signup = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({ required_error: "Name is required" })
            .min(3)
            .max(20),
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email Format"),
        password: zod_1.z
            .string({ required_error: "Password is required" })
            .min(6)
            .max(15),
    })
        .strict(),
});
const login = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z.string({ required_error: "Email is required" }).email(),
        password: zod_1.z.string({ required_error: "Password is required" }),
    })
        .strict(),
});
exports.AuthValidation = {
    signup,
    login,
};
