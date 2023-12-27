import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import STable from '@surely-vue/table';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.use(router)
app.use(STable);
app.use(Antd).mount('#app');