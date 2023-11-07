<template>
    <header :class="$style.header">
        <nav :class="$style.navbar">
            <NuxtLink to="/" :class="$style.mainLink">
                <Icon
                    icon="arcticons:recipe-keeper"
                    color="white"
                    width="48"
                    height="48"
                />
            </NuxtLink>
            <NavMenu :class="$style.navMenu"></NavMenu>
            <NavBurger :class="$style.navBurger"></NavBurger>
        </nav>
    </header>
    <main :class="$style.container">
        <NuxtLoadingIndicator></NuxtLoadingIndicator>
        <NuxtPage></NuxtPage>
    </main>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import NavBurger from "~/components/Layout/NavBurger.vue";
import NavMenu from "~/components/Layout/NavMenu.vue";
</script>

<style module>
.header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 100;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;
    padding: 5px 10px;
    background-color: var(--main-color);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;

    container-type: inline-size;
    container-name: navBar;
}

.mainLink {
    display: flex;
    height: 100%;
    max-width: 50px;
    justify-content: flex-start;
    align-items: center;
}

.navBurger {
    display: block;
}

.navMenu {
    display: none;
}

.container {
    padding: 58px 24px 0 24px;
    position: absolute;
    top: 0;
    min-width: 100%;
    min-height: 100vh;
}

@container navBar (min-width: 1024px) {
    .navBurger {
        display: none;
    }

    .navMenu {
        display: flex;
    }
}
</style>
