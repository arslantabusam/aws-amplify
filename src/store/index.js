import { createApp } from 'vue'; // Vue 3 imports
import { createStore } from 'vuex'; // Vuex 4.x for Vue 3
import App from '../components/App.vue'; // Correct relative import path

// Create the store
export const store = createStore({
  state: {
    messages: ["Hello 3DX Platform", "Made with Vue"],
    messageNumber: 0
  },
  mutations: {
    swapMessage(state) {
      state.messageNumber = (state.messageNumber + 1) % state.messages.length;
    }
  },
  getters: {
    currentMessage(state) {
      return state.messages[state.messageNumber];
    }
  }
});

// Create and mount the Vue app
const app = createApp(App);
app.use(store); // Add the store to the Vue app
app.mount('#app'); // Mount the app to the DOM
