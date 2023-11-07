import { IUser } from "../User";

export interface LoginRequest {}

export interface LoginResponse extends IUser {
    token: string;
}
