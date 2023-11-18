import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use<PluginOptions>(Toast, {
        position: POSITION.TOP_RIGHT,
        timeout: 2500,
        maxToasts: 5,
    });
});
