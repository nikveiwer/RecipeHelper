<template>
    <button class="innerButtonStyle">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps();
</script>

<style>
.innerButtonStyle {
    margin-top: 23px;
    padding: 19px 32px;
    border-radius: 32px;
    background: var(--main-color);
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
}

.innerButtonStyle:focus-visible {
    border: 2px solid var(--text-color);
}
</style>
