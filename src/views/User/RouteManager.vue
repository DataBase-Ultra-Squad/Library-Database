<template>
  <a-layout class="layout">
    <a-layout-header>
      <!-- <div class="logo" /> -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        @click="handleMenuClick"
      >
        <a-menu-item key="1">借閱、歸還書籍</a-menu-item>
        <a-menu-item key="2">查詢書籍</a-menu-item>
        <a-menu-item key="3">登出</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys = ref(['1']);

const handleMenuClick = (e) => {
  if (e.key === '1') {
    router.push('/borrow-and-search-books');
    selectedKeys.value = ['1'];
  } else if (e.key === '2') {
    router.push('/return-books');
    selectedKeys.value = ['2'];
  } else if (e.key === '3') {
    localStorage.setItem('token', '');
    console.log('登出 清除token: ',localStorage.getItem('token'));
    router.push('/login');
    selectedKeys.value = ['3'];
  }
};
</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>