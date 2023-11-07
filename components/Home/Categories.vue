<template>
    <ul role="list" :class="$style.categories">
        <li v-for="{ title, value } in categories">
            <button
                :class="[
                    $style.category,
                    value === chosenCategory && $style.chosenCategory,
                ]"
                @click="onCategoryChanged(value)"
            >
                {{ title }}
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import authService from "~/service/authService";
import { categories, type CategoryValue } from "../../static/Categories";

const chosenCategory: Ref<CategoryValue> = ref("all");

const onCategoryChanged = async (newValue: CategoryValue) => {
    chosenCategory.value = newValue;

    try {
        const data = await authService.authTest(
            "0efc318b-df75-4df8-ada1-cf228d9cbcda"
        );
        console.log(data);
    } catch (e: any) {
        console.log(e);
    }
};
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
    border: 2px solid var(--darker-main, #12a594);
}

.chosenCategory {
    background: var(--main-color);
    color: white;
}
</style>
