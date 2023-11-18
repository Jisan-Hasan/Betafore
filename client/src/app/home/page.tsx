"use client";

import PrivateRoute from "@/components/PrivateRoute";
import ProductCard from "@/components/ui/ProductCard";
import { useGetProductsQuery } from "@/redux/features/api/productApi";

const HomePage = () => {
    const { data, isLoading, error } = useGetProductsQuery({});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <PrivateRoute>
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {data?.data &&
                        data?.data?.map((product: any) => (
                            <ProductCard key={product?.id} product={product} />
                        ))}
                </div>
            </div>
        </PrivateRoute>
    );
};

export default HomePage;
