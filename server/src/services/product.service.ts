import { Product } from "@prisma/client";
import prisma from "../shared/prisma";

const create = async (payload: Product): Promise<Product> => {
    const result = await prisma.product.create({
        data: payload,
    });

    return result;
};

export const ProductService = {
    create,
};
