"use client";

import PrivateRoute from "@/components/PrivateRoute";
import config from "@/config";
import { useAppSelector } from "@/redux/app/hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import dynamic from "next/dynamic";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(config.PK as string);
const CheckoutPage = () => {
    // calculate subtotal from cart
    const { cart } = useAppSelector((state) => state.cart);
    let subTotal = 0;
    if (cart) {
        subTotal = cart.reduce((total, item) => {
            if (item.quantity) {
                return total + item.price * item.quantity;
            }
            return total;
        }, 0);
    }

    return (
        <PrivateRoute>
            <div className="AppWrapper">
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={parseFloat(subTotal.toFixed(2))} />
                </Elements>
            </div>
        </PrivateRoute>
    );
};

export default dynamic(() => Promise.resolve(CheckoutPage), {
    ssr: false,
});
