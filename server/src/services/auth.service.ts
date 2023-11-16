import httpStatus from "http-status";
import ApiError from "../errors/ApiError";
import { hashPassword } from "../shared/bcrypt";
import prisma from "../shared/prisma";
import { ISignup } from "../types/auth.types";

const signup = async (payload: ISignup): Promise<void> => {
    const { email, name, password } = payload;
    // check if user exists with email
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    // if user exists, throw error
    if (user) {
        throw new ApiError(
            httpStatus.CONFLICT,
            "User already exists with this email"
        );
    }

    // hash password using bcrypt
    const encryptedPassword = await hashPassword(password);

    // prepare user data
    const userData = {
        email,
        name,
        password: encryptedPassword,
    };

    // create user
    await prisma.user.create({
        data: userData,
    });

    return;
};

export const AuthService = { signup };
