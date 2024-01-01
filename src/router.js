import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

// User
import Login from './views/User/Login.vue';
import Register from './views/User/Register.vue';
import BorrowAndSearchBooks from './views/User/BorrowAndSearchBooks.vue';
import ReturnBooks from './views/User/ReturnBooks.vue';
import RouteManager from './views/User/RouteManager.vue';

// Admin
import Admin from './views/Admin/Admin.vue';
import AdminRouteManager from './views/Admin/AdminRouteManager.vue';

// Admin/BookFunction
import AdminBookAdd from './views/Admin/BookFunction/AdminBookAdd.vue';
import AdminBookDelete from './views/Admin/BookFunction/AdminBookDelete.vue';
import AdminBookModify from './views/Admin/BookFunction/AdminBookModify.vue';
import AdminBookSearch from './views/Admin/BookFunction/AdminBookSearch.vue';

// Admin/UserFunction
import AdminUserAdd from './views/Admin/UserFunction/AdminUserAdd.vue';
import AdminUserDelete from './views/Admin/UserFunction/AdminUserDelete.vue';
import AdminUserModify from './views/Admin/UserFunction/AdminUserModify.vue';
import AdminUserSearch from './views/Admin/UserFunction/AdminUserSearch.vue';

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
          path: '/borrow-and-search-books',
          name: 'borrow-and-search-books',
          component: BorrowAndSearchBooks,
        },
        {
          path: '/return-books',
          name: 'return-books',
          component: ReturnBooks,
        },
      ],
    },
    {
      path: '/adminDashboard',
      component: AdminRouteManager,
      children: [
        {
          path: '/book/add',
          name: 'book-add',
          component: AdminBookAdd,
        },
        {
          path: '/book/delete',
          name: 'book-delete',
          component: AdminBookDelete,
        },
        {
          path: '/book/modify',
          name: 'book-modify',
          component: AdminBookModify,
        },
        {
          path: '/book/search',
          name: 'book-search',
          component: AdminBookSearch,
        },
        {
          path: '/user/add',
          name: 'user-add',
          component: AdminUserAdd,
        },
        {
          path: '/user/delete',
          name: 'user-delete',
          component: AdminUserDelete,
        },
        {
          path: '/user/modify',
          name: 'user-modify',
          component: AdminUserModify,
        },
        {
          path: '/user/search',
          name: 'user-search',
          component: AdminUserSearch,
        },
      ],
    },
  ],
});


export default router;
