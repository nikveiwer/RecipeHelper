<template>
    <div v-if="isVisible" :class="$style.error">{{ errorContent }}</div>
</template>

<script setup lang="ts">
type FormServerErrorProps = {
    isVisible: boolean;
    errorContent: string;
};

defineProps<FormServerErrorProps>();
</script>

<style module>
.error {
    margin-top: 20px;
    padding: 10px 20px;
    text-align: center;
    border: 2px solid var(--error, #ff6464);
    border-radius: 10px;
    color: var(--error, #ff6464);
}
</style>
