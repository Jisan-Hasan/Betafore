import { decodedToken } from "./jwt";

export const isTokenExpired = (token: string) => {
    const { exp = 0 } = decodedToken(token);
    if (!token) {
        return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime >= exp;
};
