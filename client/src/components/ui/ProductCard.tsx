import { useAppDispatch } from "@/redux/app/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
import toast from "react-hot-toast";

const ProductCard = ({ product }: { product: any }) => {
    const dispatch = useAppDispatch();
    const handleAddToCart = () => {
        toast.success("Added to cart");
        dispatch(addToCart(product));
    };
    return (
        <Card
            className="max-w-sm"
            renderImage={() => (
                <Image
                    width={500}
                    height={500}
                    src={product?.image}
                    alt="image 1"
                />
            )}
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product?.name}
            </h5>
            <div className="flex justify-between">
                <p className="font-bold text-xl text-gray-700 dark:text-gray-400">
                    $ {product?.price}
                </p>
                <Button outline color="blue" onClick={() => handleAddToCart()}>
                    Add to cart
                </Button>
            </div>
        </Card>
    );
};

export default ProductCard;
