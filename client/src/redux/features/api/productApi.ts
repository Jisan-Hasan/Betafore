import { baseApi } from "./baseApi";

const PRODUCT_URL = "/product";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (arg: Record<string, any>) => ({
                url: `${PRODUCT_URL}`,
                method: "GET",
                params: arg,
            }),
            providesTags: ["product"],
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "GET",
            }),
            providesTags: ["product"],
        }),
    }),
});

export const { useGetProductQuery, useGetProductsQuery } = productApi;
