import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import BorrowBooks from './components/BorrowBooks.vue';
import Admin from './components/Admin.vue';
import Register from './components/register.vue';
// 创建路由器实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/borrow-books',
      name: 'borrow-books',
      component: BorrowBooks,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
  ],
});

export default router;
