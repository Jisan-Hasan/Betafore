"use client";

import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { clearToken } from "@/redux/features/auth/authSlice";
import { Button, Navbar } from "flowbite-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsCart } from "react-icons/bs";

const NavbarComponent = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);

    // handle logout
    const handleLogout = () => {
        dispatch(clearToken());
        toast.success("Logged out successfully");
        router.push("/signin");
    };

    // calculate total price in the cart
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
        <Navbar>
            <Navbar.Brand>
                <Link href="/home">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Betafore
                    </span>
                </Link>
            </Navbar.Brand>
            <div className="flex md:order-2 gap-2">
                {token && (
                    <Button
                        outline
                        color="blue"
                        onClick={() => router.push("/cart")}
                    >
                        <BsCart size={20} className="mr-2" /> $
                        {subTotal.toFixed(2)}
                    </Button>
                )}
                {!token ? (
                    <Button onClick={() => router.push("/signin")} color="blue">
                        Sign In
                    </Button>
                ) : (
                    <Button color="red" onClick={() => handleLogout()}>
                        Logout
                    </Button>
                )}
            </div>
        </Navbar>
    );
};

export default dynamic(() => Promise.resolve(NavbarComponent), { ssr: false });
