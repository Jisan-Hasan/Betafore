import { Role } from "@prisma/client";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../config";
import ApiError from "../errors/ApiError";
import { comparePassword, hashPassword } from "../shared/bcrypt";
import { jwtHelpers } from "../shared/jwtHelpers";
import prisma from "../shared/prisma";
import { ILogin, ILoginResponse, ISignup } from "../types/auth.types";

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
        role: Role.user,
    };

    // create user
    await prisma.user.create({
        data: userData,
    });

    return;
};

const login = async (payload: ILogin): Promise<ILoginResponse> => {
    const { email, password } = payload;

    // check if user already exists with the email
    const isUserExist = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not exist");
    }

    // check if password is correct or not
    if (
        isUserExist.password &&
        !(await comparePassword(password, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password in incorrect");
    }

    // create jwt token
    const jwtPayload = { email: isUserExist?.email, role: isUserExist?.role };
    const token = jwtHelpers.createToken(
        jwtPayload,
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    // return token
    return { token };
};

export const AuthService = { signup, login };
