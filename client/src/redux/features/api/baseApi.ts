import config from "@/config";
import { authKey } from "@/constants/storageKey";
import { getFromLocalStorage } from "@/utils/local-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: config.NEXT_API_URL,
        prepareHeaders: (headers) => {
            const token = getFromLocalStorage(authKey);

            if (token) {
                headers.set("authorization", `${token}`);
            }

            headers.set("Content-Type", "application/json");

            return headers;
        },
    }),

    endpoints: () => ({}),
    tagTypes: ["user", "product"],
});
