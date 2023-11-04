<template>
    <Title tag="p" :class="$style.title"> Your Password must contain: </Title>
    <ul :class="$style.list" role="list">
        <li
            v-for="(value, key) in rules"
            :class="{
                [$style.listItem]: true,
                [$style.acceptedListItem]: value,
            }"
        >
            <div
                :class="{
                    [$style.listItemIcon]: true,
                    [$style.acceptedListItemIcon]: value,
                }"
            >
                <Icon
                    icon="fluent-mdl2:accept"
                    width="12"
                    height="12"
                    :color="value ? '#30a46c' : '9fa5c0'"
                />
            </div>
            {{ key }}
        </li>
    </ul>
</template>

<script setup lang="ts">
import Title from "../GeneralComponents/Title.vue";
import { Icon } from "@iconify/vue";

import { type Rules } from "~/pages/Authorization/[type].vue";

interface PasswordValidProps {
    rules: Rules;
}

defineProps<PasswordValidProps>();
</script>

<style module>
.title {
    margin-top: 24px;
    color: var(--text-color, #3e5481);
    font-feature-settings: "clig" off, "liga" off;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.list {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
}

.listItem {
    display: flex;
    gap: 8px;
    color: var(--secondary-text, #2e3e5c);
    font-feature-settings: "clig" off, "liga" off;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.listItemIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 100px;
    background-color: #e4e4e9;
}

.acceptedListItem {
    color: var(--text-color);
}

.acceptedListItemIcon {
    background-color: var(--main-color);
}
</style>
