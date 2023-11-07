<template>
    <section ref="section" :class="$style.home">
        <Agregation></Agregation>
        <!-- <div ref="loading" :class="$style.loader"></div> -->
        <Divider :mt="23"></Divider>
        <CardsWrapper></CardsWrapper>
    </section>
</template>
<script setup lang="ts">
import Divider from "~/components/GeneralComponents/Divider.vue";
import CardsWrapper from "~/components/Home/CardsWrapper.vue";
import Agregation from "~/components/Home/Agregation.vue";

// const section: Ref<HTMLElement | null> = ref(null);
// const loading: Ref<HTMLDivElement | null> = ref(null);

// useInersect(
//     section,
//     [loading],
//     (entry, observer) => {
//         console.log(entry);
//         console.log(observer);
//     },
//     "10px 0px 0px 0px",
//     0.2
// );
</script>
<style module>
.loader {
    /* position: absolute;
    top: -15px; */
    left: 0;
    height: 70px;
    width: 100%;
    background-color: red;
}
</style>
