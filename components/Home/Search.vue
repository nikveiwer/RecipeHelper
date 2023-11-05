<template>
    <MainInput
        v-model="search"
        :icon-parameters="{
            icon: `system-uicons:search`,
            color: `#3E5481`,
            width: `24`,
            height: `24`,
        }"
        placeholder="Search"
        clearable
    ></MainInput>
</template>
<script setup lang="ts">
import MainInput from "~/components/GeneralComponents/MainInput.vue";

const search: Ref<string> = ref("");
</script>
<style modeule></style>
