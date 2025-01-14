// src/plugins/vuetify.js

import 'vuetify/styles';
import { createVuetify } from 'vuetify';  // Use the Vuetify plugin for Vue 3
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// import "@mdi/font/css/materialdesignicons.css";  // If you want to use Material Design Icons

export const vuetify = createVuetify({
  components,
  directives,
});
