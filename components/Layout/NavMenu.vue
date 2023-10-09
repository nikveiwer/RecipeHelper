<template>
    <ul :class="$style.menuWrapper" role="list">
        <li v-for="{ descr, href } in links" :class="$style.menuItem">
            <NuxtLink :to="href">{{ descr }}</NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { MenuLinks as links } from "./MenuLinks";

const route = useRoute();
</script>

<style module>
.menuWrapper {
    padding-right: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    align-items: center;
}

.menuItem {
    font-size: 17px;
    text-align: center;
}

.menuItem a {
    text-decoration: underline;
    outline: none;
    color: white;
}
</style>
