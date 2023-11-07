import { IUser } from "./user.types";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest extends ILoginRequest{
    userId?: string;
    name: string;
    email: string;
    password: string;
}

export interface ILoginResponse {
    access_token: string;
    refresh_tokeb: string;
    user: IUser;
}

export interface IRefreshTokenRequest {
    refreshToken: string;
}


export interface ITopTokenRequest {
    userToken: string;
}
export interface ChangePwdRequest {
    currentPassword: string;
    password: string;
    confirmPassword: string;
}