import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router'
import store from './store'
import VueGtag from "vue-gtag";
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App)
app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(VueGtag, {
  config: { id: "G-W7V2BHX7E3" }
});
app.mount('#app');
