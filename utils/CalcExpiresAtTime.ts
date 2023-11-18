export const calcExpiresAtTime = (expiresAt: number) => {
    const minutes = Math.floor(expiresAt / 60);
    const seconds = expiresAt % 60;

    let resMinutes = String(minutes);
    let resSeconds = String(seconds);

    if (minutes < 10) {
        resMinutes = "0" + resMinutes;
    }

    if (seconds < 10) {
        resSeconds = "0" + resSeconds;
    }

    return `${resMinutes}:${resSeconds}`;
};
