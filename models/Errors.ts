export interface SimpleError {
    message: string;
}

export function isSimpleError(error: unknown): error is SimpleError {
    if (error && error instanceof Object && "message" in error) {
        return true;
    }
    return false;
}

// export interface AxiosErrorResponse {
//     response: {
//         data: {
//             error: string;
//         };
//     };
// }

// function isAxiosErrorRespons(error: unknown): error is AxiosErrorResponse {
//     if (error && error instanceof Object && "response" in error) {
//         return true;
//     }
//     return false;
// }
