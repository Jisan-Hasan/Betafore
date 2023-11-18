import config from "../config";

const stripe = require("stripe")(config.stripe_secret_key);

const createPaymentIntent = async (amount: number) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
    });

    return {
        clientSecret: paymentIntent.client_secret,
    };
};

export const PaymentService = {
    createPaymentIntent,
};
