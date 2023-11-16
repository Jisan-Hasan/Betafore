import bcrypt from "bcrypt";
import config from "../config";

export const hashPassword = async (password: string): Promise<string> => {
    const salt = Number(config.bcrypt_salt_rounds);

    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
    password: string,
    hashPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};
