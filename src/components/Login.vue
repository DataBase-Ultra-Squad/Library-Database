
<template>
  <div id="app">
    <h1>{{ message }}</h1>

    <!-- 用户登录界面 -->
    <a-form class="login-section">
      <h2>使用者登入</h2>

      <a-form-item label="帳號：">
        <a-input v-model="loginUsername" />

      <!-- </a-form-item>
      <a-form-item label="密碼：">
        <a-input type="password" v-model="loginPassword" />
      </a-form-item> -->

      <a-form-item label="帳號：">
        <input type="text" v-model="loginUsername" />
      </a-form-item>
      <a-form-item label="密碼：">
        <input type="password" v-model="loginPassword" />
      </a-form-item>

      <a-form-item>
        <a-button @click="registerAccount" type="primary">註冊</a-button>
        <a-button @click="loginAccount">登入</a-button>
      </a-form-item>

    </a-form>

    <!-- 显示登录状态 -->
    <div class="login-status">
      {{ loginStatus }}
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginUsername: '',  // 用于绑定登录用户名
      loginPassword: '',  // 用于绑定登录密码
      loginStatus: '',    // 用于显示登录状态
      users: [],         // 用于存储注册的用户信息
    };
  },
  methods: {
    registerAccount() {
      const { loginUsername, loginPassword } = this;

      console.log("Username:", this.loginUsername);
      console.log("Password:", this.loginPassword);
      if (!loginUsername || !loginPassword) {
        this.loginStatus = '帳號和密碼不能為空';
        return;
      }

      if (this.users.some(user => user.username === loginUsername)) {
        this.loginStatus = '此帳號名已經存在';
        return;
      }

      this.users.push({ username: loginUsername, password: loginPassword });
      this.loginUsername = '';
      this.loginPassword = '';
      this.loginStatus = '註冊成功';
    },

    loginAccount() {
      const { loginUsername, loginPassword } = this;
      if (!loginUsername || !loginPassword) {
        this.loginStatus = '帳號和密碼不能為空';
        return;
      }

      const user = this.users.find(user => user.username === loginUsername && user.password === loginPassword);
      if (user) {
        this.loginStatus = '登入成功';
        // 这里可以添加登录成功后的逻辑，比如路由跳转等
      } else {
        this.loginStatus = '帳號或密碼錯誤';
      }
    },
  }
};
</script>

<style>
#app {
  text-align: left;
  margin-top: 30px;
}

.login-status {
  margin-bottom: 20px;
  font-weight: bold;
  color: green;
}
</style>