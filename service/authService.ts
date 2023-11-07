import { $api } from "~/http/axiosInit";
import { AxiosResponse } from "axios";
import { RegisterResponse } from "~/models/auth/register";
import { LoginRequest, LoginResponse } from "~/models/auth/login";

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

    static async authTest(userId: string): Promise<AxiosResponse<any>> {
        return $api.get<any>(`/healthcheck/${userId}`);
    }
}
