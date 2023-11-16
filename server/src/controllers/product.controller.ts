import { Request, Response } from "express";
import httpStatus from "http-status";
import { ProductService } from "../services/product.service";
import catchAsync from "../shared/catchAsync";
import sendResponse from "../shared/sendResponse";

const create = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.create(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Product created successfully",
        data: result,
    });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.getAll();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
});

const getById = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.getById(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product retrieved successfully",
        data: result,
    });
});

export const ProductController = {
    create,
    getAll,
    getById,
};
