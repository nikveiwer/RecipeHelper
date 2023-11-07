import { IUser } from "~/models/User";

export const useUser = () => useState<IUser | null>("user", () => null);
