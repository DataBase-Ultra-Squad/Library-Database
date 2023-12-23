import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import BorrowBooks from './components/BorrowBooks.vue';
import Admin from './components/Admin.vue';

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
      path: '/borrow-books',
      name: 'borrow-books',
      component: BorrowBooks,
      // meta: {
      //   requiresAuth: true, // 如果需要验证登录状态，可以加上这个 meta
      // },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
  ],
});

export default router;
