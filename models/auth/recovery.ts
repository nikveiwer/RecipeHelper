export interface SendEmailRequest {
    email: string;
}

export interface SendEmailResponse {
    email: string;
    expiresAfter: number;
}

export interface ChangePasswordRequest {
    email: string;
    code: string;
    newPassword: string;
}

export interface ChangePasswordResponse {
    message: string;
}
