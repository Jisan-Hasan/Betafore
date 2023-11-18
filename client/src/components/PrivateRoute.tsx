"use client";

import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { clearToken } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "../utils/auth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.auth.token);

    if (!token) {
        router.push("/signin");
        return null;
    }

    if (isTokenExpired(token)) {
        dispatch(clearToken());
        router.push("/signin");
        return null;
    }

    // Render the protected content if the token is valid
    return <>{children}</>;
};

export default PrivateRoute;
