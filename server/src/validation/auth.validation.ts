import { z } from "zod";

const signup = z.object({
    body: z
        .object({
            name: z
                .string({ required_error: "Name is required" })
                .min(3)
                .max(20),
            email: z.string({ required_error: "Email is required" }).email("Invalid email Format"),
            password: z
                .string({ required_error: "Password is required" })
                .min(6)
                .max(15),
        })
        .strict(),
});

const login = z.object({
    body: z
        .object({
            email: z.string({ required_error: "Email is required" }).email(),
            password: z.string({ required_error: "Password is required" }),
        })
        .strict(),
});

export const AuthValidation = {
    signup,
    login,
};
