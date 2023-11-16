export type ISignup = {
    name: string;
    email: string;
    password: string;
};

export type ILogin = {
    email: string;
    password: string;
};

export type ILoginResponse = {
    token: string;
};
