import { baseApi } from "./baseApi";

const PAYMENT_URL = "/payment";

export const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation({
            query: (price: number) => ({
                url: `${PAYMENT_URL}/create-payment-intent`,
                method: "POST",
                body: {
                    price,
                },
            }),
        }),
    }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
