import { createApp } from 'vue';

import App from './App.vue';
import { setupVueQuery } from './plugins/vue-query';
import './style.css';

const app = createApp(App);
setupVueQuery(app);
app.mount('#app');
