import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import axios from 'axios';

// axios.defaults.headers.common['Content-Type'] = 'application/json';


import { createApp } from 'vue'
import App from './App.vue';
import router from './router';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;

createApp(App).use(router).mount('#app');

