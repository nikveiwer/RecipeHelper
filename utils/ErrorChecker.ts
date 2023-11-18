import { AxiosError, isAxiosError } from "axios";
import { useToast } from "vue-toastification";
import { isSimpleError } from "~/models/Errors";

const toast = useToast();

export function ErrorChecker(
    error: unknown,
    justToast?: boolean
): string | false {
    if (isAxiosError(error) && "error" in error?.response?.data && !justToast) {
        return error.response?.data.error;
    }

    if (isSimpleError(error)) {
        toast.error(error.message);
    } else {
        toast.error(error as string);
    }

    return false;
}
