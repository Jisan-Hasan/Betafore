"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({ required_error: "Name is required" })
            .min(3)
            .max(255),
        price: zod_1.z.number({ required_error: "Price is required" }).min(0),
        image: zod_1.z.string({ required_error: "Image is required" }).url(),
    })
        .strict(),
});
exports.ProductValidation = {
    create,
};
