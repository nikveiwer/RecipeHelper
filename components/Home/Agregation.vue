<template>
    <Search></Search>
    <Title tag="h3" :class="$style.title">
        <template>Category</template>
    </Title>
    <div v-if="user">
        {{ user }}
    </div>
    <Categories></Categories>
</template>

<script setup lang="ts">
import Search from "./Search.vue";
import Title from "../GeneralComponents/Title.vue";
import Categories from "./Categories.vue";
import { useUser } from "~/composables/userState";

const user = useUser();
</script>

<style module>
.title {
    margin-top: 24px;
    margin-bottom: 16px;
    color: var(--text-color, #3e5481);
    font-feature-settings: "clig" off, "liga" off;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.5px;
}
</style>
