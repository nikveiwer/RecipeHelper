<template>
    <div :class="$style.cardsWrapper">
        <RecipeCard
            avatar="https://avatars.mds.yandex.net/i?id=cfe4611572136ff08945969d503808ba5cdd7cb4-9380132-images-thumbs&n=13"
            author-name="Author Name"
            recipe-image="https://avatars.mds.yandex.net/i?id=cfe4611572136ff08945969d503808ba5cdd7cb4-9380132-images-thumbs&n=13"
            recipe-name="Recipe Name"
            category="Food"
            cooking-time="60 min"
        ></RecipeCard>
        <SkeletonRecipeCard></SkeletonRecipeCard>
        <SkeletonRecipeCard></SkeletonRecipeCard>
        <SkeletonRecipeCard></SkeletonRecipeCard>
        <SkeletonRecipeCard></SkeletonRecipeCard>
        <SkeletonRecipeCard></SkeletonRecipeCard>
        <SkeletonRecipeCard></SkeletonRecipeCard>
    </div>
</template>

<script setup lang="ts">
import RecipeCard from "./RecipeCard.vue";
import SkeletonRecipeCard from "./SkeletonRecipeCard.vue";
</script>

<style module>
.cardsWrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 150px));
    gap: 10px;
    justify-content: space-between;
}

@media (min-width: 768px) {
    .cardsWrapper {
        grid-template-columns: repeat(auto-fill, minmax(100px, 210px));
    }
}
</style>
