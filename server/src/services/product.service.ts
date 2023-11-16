import { Product } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";
import prisma from "../shared/prisma";

const create = async (payload: Product): Promise<Product> => {
    const result = await prisma.product.create({
        data: payload,
    });

    return result;
};

const getAll = async (): Promise<Product[]> => {
    const result = await prisma.product.findMany();

    return result;
};

const getById = async (id: string): Promise<Product> => {
    const result = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    // throw error if product not found
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    return result;
};

export const ProductService = {
    create,
    getAll,
    getById,
};
