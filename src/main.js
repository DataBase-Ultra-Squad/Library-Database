import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import STable from '@surely-vue/table';
import Antd from 'ant-design-vue';

const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(STable);
app.use(Antd);