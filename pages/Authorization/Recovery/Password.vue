<template>
    <section :class="$style.auth">
        <h3 :class="$style.title">Password recovery</h3>
        <h2 :class="$style.subtitle">
            We've sent the code to your email. Please enter the code and your
            new password.
        </h2>

        <FormServerError
            :is-visible="!!serverError"
            :error-content="serverError"
        />

        <form @submit.prevent="onSubmit">
            <MainInput
                :disabled="isLoading"
                v-model="code"
                :wrapper-style="$style.emailMargin"
                placeholder="Code from email"
                type="text"
                name="code"
                maxLength="4"
                aria-label="Code from email"
                required
                :input-style="$style.codeInputStyle"
            ></MainInput>

            <MainInput
                v-model="newPassword"
                :disabled="isLoading"
                placeholder="Type new password here"
                type="password"
                name="newPassword"
                aria-label="new password"
                required
                :icon-parameters="{
                    icon: `mdi:password-outline`,
                    color: `#3E5481`,
                    width: 24,
                    height: 24,
                }"
                :input-style="$style.inputStyle"
                @input="validate"
                @focus="validVisible = true"
                @blur="validVisible = false"
            ></MainInput>
            <PasswordValid
                :rules="passwordRules"
                v-if="validVisible"
            ></PasswordValid>

            <div :class="$style.expires">
                code expires in:
                <span :class="$style.red">{{
                    calcExpiresAtTime(recoveryInfo?.expiresAfter ?? 0)
                }}</span>
            </div>

            <MainButton :disabled="isLoading" :class="$style.button"
                >Enter</MainButton
            >

            <div v-show="!canSendAgain" :class="$style.sendAgainAfter">
                You'll be able to resend the code in:
                {{ calcExpiresAtTime(timeToResend) }}
            </div>
        </form>

        <MainButton
            :disabled="isLoading || !canSendAgain"
            :class="$style.sendAgainBtn"
            @click="onSendAgain"
            >Send again</MainButton
        >
    </section>
</template>

<script setup lang="ts">
import MainInput from "~/components/GeneralComponents/MainInput.vue";
import MainButton from "~/components/GeneralComponents/MainButton.vue";
import PasswordValid from "~/components/Authorization/PasswordValid.vue";
import FormServerError from "~/components/GeneralComponents/FormServerError.vue";

import { Ref, ref } from "vue";
import { useToast } from "vue-toastification";

import AuthService from "~/service/authService";
import { calcExpiresAtTime } from "~/utils/CalcExpiresAtTime";

export interface Rules {
    [prop: string]: boolean;
}

const router = useRouter();

const recoveryInfo = usePassRecoveryInfo();

const toast = useToast();

const code: Ref<string> = ref("");
const newPassword: Ref<string> = ref("");
const validVisible: Ref<boolean> = ref(false);
const passwordRules: Ref<Rules> = ref({
    "Atleast 6 characters": false,
    "Contains a number": false,
});

const { isLoading, serverError, mutate } = useMutations();

const expiredAtInterval: Ref<number> = ref(0);
const sendAgainAfterInterval: Ref<number> = ref(0);
const timeToResend: Ref<number> = ref(60);

onMounted(() => {
    const timeFromStorage = sessionStorage.getItem("expiresAfter");
    const emailFromStorage = sessionStorage.getItem("email");

    if (timeFromStorage && emailFromStorage) {
        recoveryInfo.value.expiresAfter = +timeFromStorage;
        recoveryInfo.value.email = emailFromStorage;
    }

    expiredAtInterval.value = window.setInterval(() => {
        if (recoveryInfo.value.expiresAfter > 0) {
            recoveryInfo.value.expiresAfter -= 1;

            sessionStorage.setItem(
                "expiresAfter",
                String(recoveryInfo.value.expiresAfter)
            );
        }
    }, 1000);

    sendAgainAfterInterval.value = window.setInterval(() => {
        if (timeToResend.value > 0) {
            timeToResend.value--;
        }
    }, 1000);
});

onUnmounted(() => {
    window.clearInterval(expiredAtInterval.value);
    window.clearInterval(sendAgainAfterInterval.value);
});

const canSendAgain = computed(() => timeToResend.value <= 0);

const validate = () => {
    passwordRules.value["Atleast 6 characters"] = !(
        newPassword.value.length <= 5
    );

    passwordRules.value["Contains a number"] = /\d/.test(newPassword.value);
};

const onSubmit = async () => {
    const email = recoveryInfo.value?.email;

    if (!email) {
        toast.error(
            "Could not get information about email, please try to recover later"
        );
        return;
    }

    const data = await mutate(() =>
        AuthService.changePassword(email, code.value, newPassword.value)
    );

    if (data) {
        toast.success(data.message);

        router.push("/Authorization/SignIn");
    }
};

const onSendAgain = async () => {
    const email = recoveryInfo.value?.email;

    if (!email) {
        toast.error(
            "Could not get information about email, please try to recover later"
        );
        return;
    }

    const data = await mutate(() => AuthService.sendEmailForRecovery(email));

    if (data) {
        toast.success("We've generated and send the new code!");

        sessionStorage.setItem("expiresAfter", String(data.expiresAfter));

        recoveryInfo.value = data;
        timeToResend.value = 60;
    }
};
</script>

<style module>
.auth {
    margin: 0 auto;
    max-width: 500px;
    padding-top: 70px;
    padding-bottom: 40px;
}

.title {
    margin-top: 11px;
    text-align: center;
    color: var(--text-color, #3e5481);
    font-feature-settings: "clig" off, "liga" off;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.subtitle {
    margin-top: 8px;
    color: var(--secondary-text, #9fa5c0);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.codeWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.emailMargin {
    margin-top: 32px;
}

.codeInputStyle {
    padding-left: 20px;
    font-size: 25px;
}

.codeInputStyle:focus {
    border: 2px solid var(--main-color);
}

.codeInputStyle:disabled {
    opacity: 0.5;
}

.inputStyle {
    background-color: #fff;
    border: 2px solid var(--secondary-text);
    padding-right: 15px;
}

.inputStyle:disabled {
    opacity: 0.5;
}

.button {
    width: 100%;
}

.button:disabled {
    background-color: #d7f4e6;
    cursor: not-allowed;
}

.sendAgainBtn {
    margin-top: 5px;
    width: 100%;
    background-color: var(--text-color, #2e3e5c);
    border: 2px solid var(--text-color, #2e3e5c);
    color: white;
}

.sendAgainBtn:disabled {
    background-color: white;
    border: 2px solid #d0dbea;
    cursor: not-allowed;
    color: var(--secondary-text, #9fa5c0);
}

.expires {
    margin-top: 48px;
    text-align: center;
    color: var(--text-color, #2e3e5c);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.sendAgainAfter {
    margin-top: 20px;
    text-align: center;
    color: var(--text-color, #2e3e5c);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.red {
    color: var(--error, #ff6464);
}
</style>
