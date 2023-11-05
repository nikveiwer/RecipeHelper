<template>
    <article>
        <div :class="$style.userInfo">
            <img :src="avatar" alt="avatar" :class="$style.avatar" />
            <h4 :class="$style.name">{{ authorName }}</h4>
        </div>

        <img
            :class="$style.recipeImage"
            :src="recipeImage"
            alt="Recipe Image"
        />
        <h3 :class="$style.recipeName">{{ recipeName }}</h3>

        <div :class="$style.info">
            <span>{{ category }}</span>
            <div :class="$style.dot"></div>
            <span>{{ cookingTime }}</span>
        </div>
    </article>
</template>

<script setup lang="ts">
interface RecipeCardProps {
    avatar?: string;
    authorName: string;
    recipeImage?: string;
    recipeName: string;
    category: string;
    cookingTime: string;
}

defineProps<RecipeCardProps>();
</script>

<style module>
.userInfo {
    margin-top: 50px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.avatar {
    width: 31px;
    height: 31px;
    border-radius: 11px;
}

.name {
    color: var(--text-color, #2e3e5c);
    font-feature-settings: "clig" off, "liga" off;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.5px;
}

.recipeImage {
    margin-top: 16px;
    width: 151px;
    height: 151px;
    border-radius: 16px;
    object-fit: cover;
}

.recipeName {
    margin-top: 16px;
    color: var(--text-color, #3e5481);
    font-feature-settings: "clig" off, "liga" off;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.info {
    margin-top: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    color: var(--secondary-text, #9fa5c0);
    font-feature-settings: "clig" off, "liga" off;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.5px;
}

.dot {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: var(--secondary-text);
}

@media (min-width: 768px) {
    .avatar {
        width: 50px;
        height: 50px;
    }

    .name {
        font-size: 14px;
    }

    .recipeImage {
        width: 200px;
        height: 200px;
    }

    .recipeName {
        font-size: 19px;
    }

    .info {
        font-size: 14px;
    }
}
</style>
