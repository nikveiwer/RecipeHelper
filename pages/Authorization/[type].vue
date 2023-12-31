<template>
    <section :class="$style.auth">
        <h3 :class="$style.title">Welcome{{ isSignIn ? " Back" : "" }}!</h3>
        <h2 :class="$style.subtitle">Please enter your credentials here</h2>

        <div v-if="serverError" :class="$style.error">{{ serverError }}</div>

        <form @submit.prevent="onSubmit">
            <MainInput
                v-if="!isSignIn"
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

            <MainInput
                v-if="!isSignIn"
                :disabled="isLoading"
                v-model="username"
                placeholder="Username"
                type="text"
                name="username"
                aria-label="username"
                required
                :icon-parameters="{
                    icon: `ph:user`,
                    color: `#3E5481`,
                    width: 24,
                    height: 24,
                }"
                :input-style="$style.inputStyle"
            ></MainInput>

            <MainInput
                v-if="isSignIn"
                :disabled="isLoading"
                v-model="username"
                :wrapper-style="$style.emailMargin"
                placeholder="Username or Email"
                type="text"
                name="usernameOrEmail"
                aria-label="Username or Email"
                required
                :icon-parameters="{
                    icon: `ph:user`,
                    color: `#3E5481`,
                    width: 24,
                    height: 24,
                }"
                :input-style="$style.inputStyle"
            ></MainInput>

            <MainInput
                v-model="password"
                :disabled="isLoading"
                placeholder="Password"
                type="password"
                name="password"
                aria-label="password"
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
                v-if="!isSignIn && validVisible"
            ></PasswordValid>
            <MainButton
                :disabled="!isValid || isLoading"
                :class="$style.button"
                >{{ isSignIn ? " Sign In" : "Sign Up" }}</MainButton
            >
        </form>
        <p :class="$style.switch">
            {{
                isSignIn
                    ? "Don't have any account?"
                    : "Already have an account?"
            }}
            <NuxtLink
                :to="`/Authorization/${isSignIn ? 'SignUp' : 'SignIn'}`"
                :class="$style.switchLink"
                >Sign {{ isSignIn ? "Up" : "In" }}</NuxtLink
            >
        </p>
    </section>
</template>

<script setup lang="ts">
import MainInput from "~/components/GeneralComponents/MainInput.vue";
import MainButton from "~/components/GeneralComponents/MainButton.vue";
import PasswordValid from "~/components/Authorization/PasswordValid.vue";

import AuthService from "~/service/authService";

export interface Rules {
    [prop: string]: boolean;
}

const route = useRoute();
const router = useRouter();

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const username: Ref<string> = ref("");

const serverError: Ref<string> = ref("");
const isLoading: Ref<boolean> = ref(false);

const validVisible: Ref<boolean> = ref(false);
const passwordRules: Ref<Rules> = ref({
    "Atleast 6 characters": false,
    "Contains a number": false,
});

const isSignIn = computed(() => route.params.type === "SignIn");
const isValid = computed(
    () =>
        isSignIn ||
        (!isSignIn &&
            Object.values(passwordRules.value).every((value) => value))
);

const validate = () => {
    passwordRules.value["Atleast 6 characters"] = !(password.value.length <= 5);

    passwordRules.value["Contains a number"] = /\d/.test(password.value);
};

const onSignUp = async () => {
    isLoading.value = true;

    try {
        const { data } = await AuthService.register(
            username.value,
            email.value,
            password.value
        );

        localStorage.setItem("token", data.token);
        router.push("/");
    } catch (e: any) {
        console.log(e);
        serverError.value = e.response.data.error;
    }

    isLoading.value = false;
};

const onSignIn = async () => {
    isLoading.value = true;

    try {
        const { data } = await AuthService.login(
            username.value,
            password.value
        );

        localStorage.setItem("token", data.token);
        router.push("/");
    } catch (e: any) {
        console.log(e);
        serverError.value = e.response.data.error;
    }

    isLoading.value = false;
};

const onSubmit = () => {
    if (isSignIn.value) {
        onSignIn();
    } else {
        onSignUp();
    }
};
</script>

<style module>
.auth {
    margin: 0 auto;
    max-width: 500px;
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

.switch {
    margin-top: 24px;
    color: var(--text-color, #2e3e5c);
    font-feature-settings: "clig" off, "liga" off;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
}

.switchLink {
    display: inline;
    color: var(--main-color);
    text-align: right;
    font-feature-settings: "clig" off, "liga" off;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.5px;
}
</style>
