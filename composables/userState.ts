import { IUser } from "~/models/User";
import { SendEmailRequest, SendEmailResponse } from "~/models/auth/recovery";

export const useUser = () => useState<IUser | null>("user", () => null);

export const usePassRecoveryInfo = () =>
    useState<SendEmailResponse>("recovery", () => ({
        email: "",
        expiresAfter: 0,
    }));
