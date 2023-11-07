<template>
    <div :class="wrapperStyle" class="innerInputWrapper">
        <Icon
            v-if="iconParameters"
            :class="iconStyle"
            class="innerSearchIconStyle"
            v-bind="iconParameters"
        />
        <label v-if="label" :for="id" :class="labelStyle">{{ label }}</label>
        <input
            :id="id"
            :name="name"
            :class="inputStyle"
            class="innerInputStyle"
            :value="modelValue"
            @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
            :type="type || `text`"
            :placeholder="placeholder"
            v-bind="$attrs"
        />
        <Icon
            v-if="clearable && modelValue"
            class="clearIcon"
            icon="system-uicons:cross"
            color="#3E5481"
            width="24"
            height="24"
            @click="$emit(`update:modelValue`, ``)"
        />
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { Icon, type IconProps } from "@iconify/vue";

interface MainInputProps {
    modelValue: string;
    type?: string;
    iconParameters?: IconProps;
    iconStyle?: string;
    placeholder?: string;
    inputStyle?: string;
    wrapperStyle?: string;
    label?: string;
    labelStyle?: string;
    id?: string;
    name?: string;
    clearable?: boolean;
}

defineProps<MainInputProps>();
const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();
</script>

<style>
.innerInputStyle {
    width: 100%;
    height: 56px;
    padding: 0 56px;
    border-radius: 32px;
    background: var(--form, #f4f5f7);
    outline: none;
    border: none;
    caret-color: var(--text-color);
    font-size: 15px;
    color: var(--text-color);
}

.innerInputStyle::placeholder {
    color: var(--secondary-text);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.105px;
}

.innerInputStyle:focus {
    border: 2px solid var(--main-color);
}

.innerSearchIconStyle {
    position: absolute;
    top: 16px;
    left: 24px;
}

.innerInputWrapper {
    position: relative;
    margin-top: 15px;
}

.clearIcon {
    position: absolute;
    top: 16px;
    right: 24px;
}
</style>
