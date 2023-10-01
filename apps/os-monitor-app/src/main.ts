import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* Charts */
import VueApexCharts from "vue3-apexcharts";

/* Feather Icons */
import VueFeather from "vue-feather";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";
import "@/theme/variables.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueApexCharts)
  .component(VueFeather.name, VueFeather);

router.isReady().then(() => {
  app.mount("#app");
});
