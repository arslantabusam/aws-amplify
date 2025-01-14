import { createApp } from 'vue';
import './assets/main.css';

import { widget, disableDefaultCSS, requirejs, onVisibilityChange } from "@widget-lab/3ddashboard-utils";
import App from './components/App.vue';

import { vuetify } from './plugins/vuetify.js';
import { store } from "./store/index.js";

const start = () => {
  disableDefaultCSS(true);

  widget.setTitle("Widget Vue");

  const app = createApp(App);
  app.use(store);
  app.use(vuetify);
  app.mount('#app');  // Ensure you're using the correct mount element (e.g., <app></app>)

  requirejs(["DS/PlatformAPI/PlatformAPI"], (/* PlatformAPI */) => {
    // use 3DDashboard APIs
  });

  onVisibilityChange((/* visibility */) => {
    // widget (or fullpage) visibility has changed
  });
};

widget.addEvent("onLoad", () => {
  start();
});

widget.addEvent("onRefresh", () => {
  // TO DO
});
