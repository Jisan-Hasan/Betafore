import { useAppDispatch } from "@/redux/app/hooks";
import {
    Product,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const CartCard = ({ product }: { product: Product }) => {
    const dispatch = useAppDispatch();

    return (
        <div className="flex justify-between items-center border p-3 rounded">
            <div className="flex items-center col-span-6 space-x-6">
                {/* <!-- cart image --> */}
                <Image
                    src={product.image}
                    alt="product"
                    width={80}
                    height={80}
                />
                {/* <!-- cart item info --> */}
                <div className="space-y-2">
                    <h4 className="">{product.name}</h4>
                    <p>
                        $ <span className="">{product.price.toFixed(2)}</span>
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center col-span-4 mt-4 space-x-8 md:mt-0">
                {/* <!-- amount buttons --> */}
                <div className="flex items-center space-x-4">
                    <button
                        className=""
                        onClick={() => dispatch(decreaseQuantity(product.id))}
                        disabled={product.quantity === 1}
                    >
                        <FaMinus />
                    </button>
                    <span className="">{product.quantity}</span>
                    <button
                        className=""
                        onClick={() => dispatch(increaseQuantity(product.id))}
                    >
                        <FaPlus />
                    </button>
                </div>
                {/* <!-- price --> */}
                <p className="text-lg font-bold">
                    ${" "}
                    <span className="">
                        {/* @ts-ignore */}
                        {(product.price * product?.quantity).toFixed(2)}
                    </span>
                </p>
            </div>
            {/* <!-- delete button --> */}
            <div className="flex items-center justify-center col-span-2 mt-4 md:justify-end md:mt-0">
                <button
                    className=""
                    onClick={() => dispatch(removeFromCart(product.id))}
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default CartCard;
