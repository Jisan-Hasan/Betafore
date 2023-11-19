"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useAppSelector } from "@/redux/app/hooks";
import dynamic from "next/dynamic";
import BillDetails from "../../components/ui/BillDetails";
import CartCard from "../../components/ui/CartCard";

const CartPage = () => {
    const { cart } = useAppSelector((state) => state.cart);
    const sortedCart = [...cart].sort((a: any, b: any) => a.id - b.id);

    return (
        <PrivateRoute>
            <main className="py-16">
                <div className="container 2xl:px-8 px-2 mx-auto">
                    <h2 className="mb-8 text-xl font-bold">Shopping Cart</h2>
                    <div className="grid grid-cols-6 gap-12">
                        <div className="space-y-6 col-span-4">
                            {sortedCart?.map((product) => (
                                <CartCard product={product} key={product.id} />
                            ))}
                        </div>

                        {/* <!-- Bill Details --> */}
                        <div className="col-span-2 border py-5 px-3 rounded">
                            <BillDetails />
                        </div>
                    </div>
                </div>
            </main>
        </PrivateRoute>
    );
};

export default dynamic(() => Promise.resolve(CartPage), {
    ssr: false,
});
