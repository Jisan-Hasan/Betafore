import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (userData) => ({
                url: `${AUTH_URL}/signup`,
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["user"],
        }),
        signin: builder.mutation({
            query: (loginData) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: loginData,
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
