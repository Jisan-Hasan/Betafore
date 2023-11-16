import { Request, Response } from "express";
import httpStatus from "http-status";
import { AuthService } from "../services/auth.service";
import catchAsync from "../shared/catchAsync";
import sendResponse from "../shared/sendResponse";

const signup = catchAsync(async (req: Request, res: Response) => {
    await AuthService.signup(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Signup successful",
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Login successful",
        data: result,
    });
});

export const AuthController = { signup, login };
