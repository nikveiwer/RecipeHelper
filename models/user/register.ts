export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: string;
    email: string;
    username: string;
    token: string;
}
