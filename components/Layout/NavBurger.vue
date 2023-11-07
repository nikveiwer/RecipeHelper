<template>
    <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger
            :class="$style.menuTrigger"
            v-bind="$attrs"
            aria-label="Navigation menu"
        >
            <Icon icon="radix-icons:hamburger-menu" />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
            <Transition name="popup">
                <DropdownMenuContent
                    :class="$style.menuContent"
                    :side-offset="5"
                    side="bottom"
                    align="end"
                >
                    <DropdownMenuItem
                        v-for="{ descr, href } in links"
                        value="New Tab"
                        :class="{
                            [$style.menuItem]: true,
                            [$style.isCurrentLink]:
                                route.fullPath.includes(href),
                        }"
                    >
                        <NuxtLink :to="href">{{ descr }}</NuxtLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </Transition>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRoot,
    DropdownMenuTrigger,
} from "radix-vue";

import { MenuLinks as links } from "../../static/MenuLinks";

const toggleState = ref(false);

const route = useRoute();
</script>

<style module>
.menuTrigger {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: none;
    color: var(--main-color);
    box-shadow: 0 2px 10px rgb(0 0 0 / 0.05);
    outline: none;
    transition: all 0.25s;
}

.menuTrigger:focus {
    background-color: #30a46c;
}

.menuContent {
    padding: 5px;
    outline: none;
    background-color: #fff;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35);
    border-radius: 5px;
}
.menuItem {
    display: flex;
    justify-content: center;
    font-size: 13px;
    line-height: 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 5px;
    text-align: center;
    text-decoration: underline;
    outline: none;
    color: var(--main-color);
}

.menuItem a {
    color: var(--main-color);
}

.isCurrentLink {
    color: var(--text-color);
}
.isCurrentLink a {
    color: var(--text-color);
}
</style>
