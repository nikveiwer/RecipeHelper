<template>
    <section :class="$style.auth">
        <h3 :class="$style.title">Password recovery</h3>
        <h2 :class="$style.subtitle">
            Enter your email to recover your password
        </h2>

        <FormServerError
            :is-visible="!!serverError"
            :error-content="serverError"
        />

        <form @submit.prevent="onSubmit">
            <MainInput
                :disabled="isLoading"
                v-model="email"
                :wrapper-style="$style.emailMargin"
                placeholder="Email"
                type="email"
                name="email"
                aria-label="email"
                required
                :icon-parameters="{
                    icon: `carbon:email`,
                    color: `#3E5481`,
                    width: 24,
                    height: 24,
                }"
                :input-style="$style.inputStyle"
            ></MainInput>

            <MainButton :disabled="isLoading" :class="$style.button"
                >Enter</MainButton
            >
        </form>
    </section>
</template>

<script setup lang="ts">
import MainInput from "~/components/GeneralComponents/MainInput.vue";
import MainButton from "~/components/GeneralComponents/MainButton.vue";
import FormServerError from "~/components/GeneralComponents/FormServerError.vue";

import AuthService from "~/service/authService";
import { usePassRecoveryInfo } from "~/composables/userState";
import { Ref, ref } from "vue";

export interface Rules {
    [prop: string]: boolean;
}

const router = useRouter();

const recoveryInfo = usePassRecoveryInfo();

const email: Ref<string> = ref("");

const { isLoading, serverError, mutate } = useMutations();

const onSubmit = async () => {
    const data = await mutate(() =>
        AuthService.sendEmailForRecovery(email.value)
    );

    if (data) {
        recoveryInfo.value = data;

        sessionStorage.setItem("expiresAfter", String(data.expiresAfter));
        sessionStorage.setItem("email", String(data.email));

        router.push("/Authorization/Recovery/Password");
    }
};
</script>

<style module>
.auth {
    margin: 0 auto;
    max-width: 500px;
    padding-top: 70px;
}

.error {
    margin-top: 20px;
    padding: 10px 20px;
    text-align: center;
    border: 2px solid var(--error, #ff6464);
    border-radius: 10px;
    color: var(--error, #ff6464);
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

.emailMargin {
    margin-top: 32px;
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
</style>
