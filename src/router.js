import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import BorrowAndReturnBooks from './components/BorrowAndReturnBooks.vue';
import SearchBooks from './components/SearchBooks.vue';
import Admin from './components/Admin.vue';
import Register from './components/Register.vue';
import RouteManager from './components/RouteManager.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login', // 重定向到登录页
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      component: RouteManager,
      children: [
        {
          path: '/borrow-and-return-books',
          name: 'borrow-and-return-books',
          component: BorrowAndReturnBooks,
        },
        {
          path: '/search-books',
          name: 'search-books',
          component: SearchBooks,
        },
        // 可能还有其他子路由...
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
  ],
});


export default router;
