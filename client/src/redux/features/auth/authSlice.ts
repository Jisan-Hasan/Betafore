import { authKey } from "@/constants/storageKey";
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage,
} from "@/utils/local-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: string;
}

const initialState: AuthState = {
    token: getFromLocalStorage(authKey) || "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            setToLocalStorage(authKey, action.payload);
            state.token = action.payload;
        },
        clearToken: (state) => {
            removeFromLocalStorage(authKey);
            state.token = "";
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
