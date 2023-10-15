import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Antd from 'ant-design-vue';
import './style.css';

createApp(App).use(Antd).use(router).mount('#app')
