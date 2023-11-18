import { useAppSelector } from "@/redux/app/hooks";
import Link from "next/link";

const BillDetails = () => {
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
        <div>
            <div className="">
                <h4 className="mt-2 mb-8 text-xl font-bold text-center">
                    Bill Details
                </h4>
                <div className="space-y-4">
                    {/* <!-- sub total --> */}
                    <div className="flex items-center justify-between">
                        <p>Sub Total</p>
                        <p>
                            $ <span className="">{subTotal.toFixed(2)}</span>
                        </p>
                    </div>
                    {/* <!-- Discount --> */}
                    <div className="flex items-center justify-between">
                        <p>Discount</p>
                        <p>
                            $ <span className="">{(0).toFixed(2)}</span>
                        </p>
                    </div>
                    {/* <!-- Total --> */}
                    <div className="flex items-center justify-between pb-4">
                        <p className="font-bold">TOTAL</p>
                        <p className="font-bold">
                            $ <span className="">{subTotal.toFixed(2)}</span>
                        </p>
                    </div>
                    <Link href="/checkout">
                        <button className="mt-4 px-4 block w-full rounded-md bg-gray-600 text-white py-2">
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BillDetails;
