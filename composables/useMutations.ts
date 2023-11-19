import { AxiosResponse } from "axios";

export const useMutations = () => {
    const isLoading: Ref<boolean> = ref(false);
    const serverError: Ref<string> = ref("");

    const mutate = async <V>(
        reqFunc: () => Promise<AxiosResponse<V>>
    ): Promise<V | null> => {
        isLoading.value = true;

        try {
            const { data } = await reqFunc();

            isLoading.value = false;

            return data;
        } catch (e) {
            console.error(e);
            const err = ErrorChecker(e);
            if (err) {
                serverError.value = err;
            }

            isLoading.value = false;
            return null;
        }
    };

    return { isLoading, serverError, mutate };
};
