<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }"
        @click="handleMenuClick">
        <a-menu-item key="1">書籍管理</a-menu-item>
        <a-menu-item key="2">會員管理</a-menu-item>
        <a-menu-item key="3">查詢歷程</a-menu-item>
        <a-menu-item key="4">登出</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline"
          :style="{ height: '100%', borderRight: 0 }" @click="handleSubMenuClick">
          <!-- 書籍管理的子菜單 -->
          <a-menu-item key="1" v-if="selectedKeys1[0] === '1'">新增</a-menu-item>
          <a-menu-item key="2" v-if="selectedKeys1[0] === '1'">刪除</a-menu-item>
          <a-menu-item key="3" v-if="selectedKeys1[0] === '1'">修改</a-menu-item>

          <!-- 用戶管理的子菜單 -->
          <a-menu-item key="1" v-if="selectedKeys1[0] === '2'">刪除＆查詢</a-menu-item>
          <!-- <a-menu-item key="2" v-if="selectedKeys1[0] === '2'">修改</a-menu-item>
          <a-menu-item key="3" v-if="selectedKeys1[0] === '2'">查詢歷程</a-menu-item> -->
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys1 = ref(['1']);
const selectedKeys2 = ref(['1']);
const openKeys = ref(['sub1']);

const handleMenuClick = (e) => {
  if (e.key === '1') {
    // Set the submenu selected key to the first item and navigate
    selectedKeys2.value = ['1'];
    router.push('/book/add');
    selectedKeys1.value = ['1'];
  } else if (e.key === '2') {
    // Set the submenu selected key to the first item and navigate
    selectedKeys2.value = ['1'];
    router.push('/user/delete');
    selectedKeys1.value = ['2'];
  } else if (e.key === '3') {
    // Set the submenu selected key to the first item and navigate
    selectedKeys2.value = ['1'];
    router.push('/user/search');
    selectedKeys1.value = ['3'];
  } else if (e.key === '4') {
    localStorage.setItem('token', '');
    console.log('登出 清除token: ', localStorage.getItem('token'));
    router.push('/login');
    selectedKeys1.value = ['3'];
    selectedKeys2.value = ['1'];
  }
};

const handleSubMenuClick = (e) => {
  // 書籍管理的路由處理
  if (selectedKeys1.value[0] === '1') {
    switch (e.key) {
      case '1': // 新增書籍
        router.push('/book/add');
        break;
      case '2': // 刪除書籍
        router.push('/book/delete');
        break;
      case '3': // 修改書籍
        router.push('/book/modify');
        break;
    }
  }

  // 用戶管理的路由處理
  if (selectedKeys1.value[0] === '2') {
    switch (e.key) {
      case '1': // 刪除&查詢用戶
        router.push('/user/delete');
        break;
      case '2': // 查詢歷程
        router.push('/user/search');
        break;
      // case '2': // 修改用戶
      //   router.push('/user/modify');
      //   break;
      // case '3': // 查詢用戶
      //   router.push('/user/search');
      //   break;
    }
  }
};

</script>
  
<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>