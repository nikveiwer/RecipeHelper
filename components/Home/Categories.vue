<template>
    <ul role="list" :class="$style.categories">
        <li v-for="{ title, value } in categories">
            <button
                :class="[
                    $style.category,
                    value === chosenCategory && $style.chosenCategory,
                ]"
                @click="chosenCategory = value"
            >
                {{ title }}
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { categories, type CategoryValue } from "../../static/Categories";

const chosenCategory: Ref<CategoryValue> = ref("all");
</script>

<style module>
.categories {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
    color: var(--secondary-text, #9fa5c0);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.5px;
    cursor: pointer;
}
.category {
    padding: 11px 24px;
    border-radius: 32px;
    background: var(--form, #f4f5f7);
}

.category:focus {
    border: 2px solid var(--text-color);
}

.chosenCategory {
    background: var(--main-color);
    color: white;
}
</style>
