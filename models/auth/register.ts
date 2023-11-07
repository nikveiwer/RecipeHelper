import { IUser } from "../User";

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse extends IUser {
    token: string;
}
