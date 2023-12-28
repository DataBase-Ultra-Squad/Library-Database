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
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <router-view></router-view> <!-- 显示当前路由的内容 -->
    </a-layout-content>
    <!-- <a-layout-footer style="text-align: center">
      資料庫系統 — 圖書館管理系統
    </a-layout-footer> -->
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys = ref(['1']);

const handleMenuClick = (e) => {
  if (e.key === '1') {
    router.push('/borrow-and-return-books');
    selectedKeys.value = ['1'];
  } else if (e.key === '2') {
    router.push('/search-books');
    selectedKeys.value = ['2'];
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