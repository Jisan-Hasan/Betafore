import PrivateRoute from "@/components/PrivateRoute";
import Link from "next/link";

const SuccessPage = () => {
    return (
        <PrivateRoute>
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-4xl font-bold mb-4 text-green-800">
                    Congratulations!
                </h2>
                <p className="text-lg text-green-700 mb-8">
                    Your Payment was successful, and your order has been placed.
                </p>
                <Link
                    href="/home"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Back To Home
                </Link>
            </div>
        </PrivateRoute>
    );
};

export default SuccessPage;
