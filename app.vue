<template>
    <header>
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
    <div :class="$style.container">
        <NuxtLoadingIndicator></NuxtLoadingIndicator>
        <NuxtPage></NuxtPage>
    </div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import NavBurger from "~/components/Layout/NavBurger.vue";
import NavMenu from "~/components/Layout/NavMenu.vue";

export default {
    components: {
        Icon,
        NavBurger,
        NavMenu,
    },
};
</script>

<style module>
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
    padding: 0 24px;
}

@container navBar (min-width: 1024px) {
    .navBurger {
        display: none;
    }

    .navMenu {
        display: block;
    }
}
</style>
