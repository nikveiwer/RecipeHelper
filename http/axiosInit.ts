import axios from "axios";
import { RefreshRespons } from "~/models/user/refresh";

export const $api = axios.create({
    baseURL: process.env.NUXT_API_URL ?? "http://localhost:8080/rh",
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    config.headers.set("X-JWT-TOKEN", localStorage.getItem("token"));

    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                error.config._isRetry = true;
                const refreshUrl = `${
                    process.env.NUXT_API_URL ?? "http://localhost:8080/rh"
                }/users/refresh`;

                const response = await axios.get<RefreshRespons>(refreshUrl);

                localStorage.setItem("token", response.data.token);

                return $api.request(error.config);
            } catch (e) {
                console.log("Do not authorized");
            }
        }

        throw error;
    }
);
