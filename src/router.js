import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import BorrowAndReturnBooks from './components/BorrowAndReturnBooks.vue';
import SearchBooks from './components/SearchBooks.vue';
import Admin from './components/Admin.vue';
import Register from './components/Register.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
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
      path: '/borrow-and-return-books',
      name: 'borrow-and-return-books',
      component: BorrowAndReturnBooks,
    },
    {
      path: '/search-books',
      name: 'search-books',
      component: SearchBooks,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
  ],
});

export default router;
