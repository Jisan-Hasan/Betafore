import { z } from "zod";

const create = z.object({
    body: z
        .object({
            name: z
                .string({ required_error: "Name is required" })
                .min(3)
                .max(255),
            price: z.number({ required_error: "Price is required" }).min(0),
            image: z.string({ required_error: "Image is required" }).url(),
        })
        .strict(),
});

export const ProductValidation = {
    create,
};
