<template>
    <div :class="$style.divider"></div>
</template>

<script setup lang="ts">
type DividerProps = {
    mt?: number;
    mb?: number;
};

defineProps<DividerProps>();
</script>

<style module>
.divider {
    position: absolute;
    left: 50%;
    height: 8px;
    width: 100vw;
    transform: translateX(-50%);
    background-color: var(--form);
    margin-top: v-bind(mt + "px");
    margin-bottom: v-bind(mb + "px");
}
</style>
