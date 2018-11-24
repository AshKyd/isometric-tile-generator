import Vue from "vue";
import App from "./components/App.vue";
import Materialize from "materialize-css/dist/js/materialize.js";

new Vue(App).$mount("#app");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
