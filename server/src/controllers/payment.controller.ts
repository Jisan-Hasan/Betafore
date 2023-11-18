import { Request, Response } from "express";
import httpStatus from "http-status";
import { PaymentService } from "../services/payment.service";
import catchAsync from "../shared/catchAsync";
import sendResponse from "../shared/sendResponse";

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const { price } = req.body;
    const amount = price * 100;

    const data = await PaymentService.createPaymentIntent(amount);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Payment intent created",
        success: true,
        data,
    });
});

export const PaymentController = {
    createPaymentIntent,
};
