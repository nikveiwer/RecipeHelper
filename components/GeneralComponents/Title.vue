<template>
    <component v-bind="$attrs" :is="tag">
        <slot></slot>
    </component>
    <slot name="titleSubcontent"></slot>
</template>

<script setup lang="ts">
type TitleTag = "h1" | "h2" | "h3" | "h4" | "p";

interface TitleProps {
    tag: TitleTag;
}

defineProps<TitleProps>();
</script>

<style></style>
