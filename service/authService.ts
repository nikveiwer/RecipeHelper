import { $api } from "~/http/axiosInit";
import { AxiosResponse } from "axios";
import { RegisterResponse } from "~/models/auth/register";
import { LoginRequest, LoginResponse } from "~/models/auth/login";
import {
    ChangePasswordResponse,
    SendEmailResponse,
} from "~/models/auth/recovery";

export default class AuthService {
    static async register(
        username: string,
        email: string,
        password: string
    ): Promise<AxiosResponse<RegisterResponse>> {
        return $api.post<RegisterResponse>("/users", {
            username,
            email,
            password,
        });
    }

    static async login(
        usernameOrEmail: string,
        password: string
    ): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>("/users/login", {
            usernameOrEmail,
            password,
        });
    }

    static async sendEmailForRecovery(
        email: string
    ): Promise<AxiosResponse<SendEmailResponse>> {
        return $api.post<SendEmailResponse>("/users/sendRecoverCode", {
            email,
        });
    }

    static async changePassword(
        email: string,
        code: string,
        newPassword: string
    ): Promise<AxiosResponse<ChangePasswordResponse>> {
        return $api.post<ChangePasswordResponse>("/users/changePassword", {
            email,
            code,
            newPassword,
        });
    }

    static async authTest(userId: string): Promise<AxiosResponse<any>> {
        return $api.get<any>(`/healthcheck/${userId}`);
    }
}
