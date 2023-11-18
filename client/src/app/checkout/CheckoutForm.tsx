"use client";

import { useAppDispatch } from "@/redux/app/hooks";
import { useCreatePaymentIntentMutation } from "@/redux/features/api/paymentApi";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#fce883",
            },
            "::placeholder": {
                color: "#87bbfd",
            },
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee",
        },
    },
};

const CardField = ({ onChange }: any) => (
    <div className="FormRow">
        <CardElement onChange={onChange} />
    </div>
);

const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange,
}: any) => (
    <div className="FormRow">
        <label htmlFor={id} className="FormRowLabel">
            {label}
        </label>
        <input
            className="FormRowInput"
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
        />
    </div>
);

const SubmitButton = ({ processing, error, children, disabled }: any) => (
    <button
        className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? "Processing..." : children}
    </button>
);

const ErrorMessage = ({ children }: { children: any }) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#FFF"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

const ResetButton = ({ onClick }: { onClick: any }) => (
    <button type="button" className="ResetButton" onClick={onClick}>
        <svg width="32px" height="32px" viewBox="0 0 32 32">
            <path
                fill="#FFF"
                d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
            />
        </svg>
    </button>
);

const CheckoutForm = ({ price = 0 }: { price: number }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<StripeError | null>(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<any>(null);
    const [billingDetails, setBillingDetails] = useState({
        email: "",
        phone: "",
        name: "",
    });

    const [clientSecret, setClientSecret] = useState<string>("");

    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    // create payment intent
    useEffect(() => {
        createPaymentIntent(price)
            .unwrap()
            .then((res) => {
                setClientSecret(res?.data?.clientSecret);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    // handle payment confirmation
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // get card element
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        if (error) {
            card.focus();
            return;
        }

        if (cardComplete) {
            setProcessing(true);
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card,
            billing_details: billingDetails,
        });

        setProcessing(false);

        if (payload.error) {
            setError(payload.error);
        } else {
            setPaymentMethod(payload.paymentMethod);
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: billingDetails.name,
                        email: billingDetails.email,
                        phone: billingDetails.phone,
                    },
                },
            });

        if (confirmError) {
            setError(confirmError);
        }

        if (paymentIntent?.status === "succeeded") {
            // const transactionId = paymentIntent?.id;

            // clear cart
            dispatch(clearCart());

            toast.success("Payment Successfull");

            router.push("/checkout/success");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-10 border">
            <form className="max-w-2xl" onSubmit={handleSubmit}>
                <fieldset className="">
                    <Label htmlFor="name">Name</Label>
                    <TextInput
                        id="name"
                        type="text"
                        placeholder="Jisan Hasan"
                        required
                        autoComplete="name"
                        value={billingDetails.name}
                        onChange={(e) => {
                            setBillingDetails({
                                ...billingDetails,
                                name: e.target.value,
                            });
                        }}
                    />
                    <Label htmlFor="email">Email</Label>
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="jisan@gmail.com"
                        required
                        autoComplete="email"
                        value={billingDetails.email}
                        onChange={(e) => {
                            setBillingDetails({
                                ...billingDetails,
                                email: e.target.value,
                            });
                        }}
                    />
                    <Label htmlFor="phone">Phone</Label>
                    <TextInput
                        id="phone"
                        type="tel"
                        placeholder="(941) 555-0123"
                        required
                        autoComplete="tel"
                        value={billingDetails.phone}
                        onChange={(e) => {
                            setBillingDetails({
                                ...billingDetails,
                                phone: e.target.value,
                            });
                        }}
                    />
                </fieldset>
                <fieldset className="mt-4 bg-gray-100 p-3">
                    <CardField
                        onChange={(e: any) => {
                            setError(e.error);
                            setCardComplete(e.complete);
                        }}
                    />
                </fieldset>
                <div className="text-red-600 mb-5">
                    {error && <small>{error?.message}</small>}
                </div>
                <SubmitButton
                    processing={processing}
                    error={error}
                    disabled={!stripe}
                >
                    <Button disabled={!stripe || !clientSecret || processing}>
                        Pay ${price}
                    </Button>
                </SubmitButton>
            </form>
        </div>
    );
};

export default CheckoutForm;
