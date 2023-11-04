<template>
    <article>
        <div :class="$style.userInfo">
            <div :class="[$style.avatar]" class="skeleton-box"></div>
            <div :class="$style.name" class="skeleton-box"></div>
        </div>

        <div :class="$style.recipeImage" class="skeleton-box"></div>
        <div :class="$style.recipeName" class="skeleton-box"></div>

        <div :class="$style.info" class="skeleton-box"></div>
    </article>
</template>

<script setup lang="ts"></script>

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
    height: 25px;
    width: 100px;
    border-radius: 11px;
}

.recipeImage {
    margin-top: 16px;
    width: 151px;
    height: 151px;
    border-radius: 16px;
}

.recipeName {
    margin-top: 16px;
    height: 17px;
    width: 110px;
    border-radius: 11px;
}

.info {
    margin-top: 8px;
    height: 12px;
    width: 90px;
    border-radius: 12px;
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
        height: 30px;
        width: 110px;
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
