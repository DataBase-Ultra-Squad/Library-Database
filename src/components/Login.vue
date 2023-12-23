<template>
  <div id="app">
    <h1>{{ message }}</h1>
    
    <!-- 顯示登入狀態 -->
    <div class="login-status">
      {{ loginStatus }}
    </div>

    <!-- 使用者登入介面 -->
    <div class="login-section">
      <h2>使用者登入</h2>
      <div class="input-group">
        <label for="login-username">帳號名稱：</label>
        <input type="text" id="login-username" v-model="loginUsername" />
      </div>

      <div class="input-group">
        <label for="login-password">密碼：</label>
        <input type="password" id="login-password" v-model="loginPassword" />
      </div>

      <div class="button-group">
        <button @click="registerAccount">註冊</button>
        <button @click="loginAccount">登入</button>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  text-align: left;
  margin-top: 30px;
}

.login-status {
  position: absolute;
  top: 0;
  left: 0;

  padding: 8px;
  background: #ddd;
}

.login-section,
.borrow-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  margin-bottom: 10px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  margin-right: 10px;
}

.button-group button {
  margin-right: 10px;
}

.login-status {
  margin-top: 20px;
  font-weight: bold;
  color: green;
}
</style>

<script>
export default {
  data() {
    return {
      users: [],
      loginStatus: null
    };
  },
  
  methods: {
    registerAccount() {
      const username = this.loginUsername;
      const password = this.loginPassword;

      if (!username || !password) {
        this.loginStatus = '帳號和密碼不能為空';
        return;
      }

      if (this.users.some(user => user.username === username)) {
        this.loginStatus = '此帳號名已經存在';
        return;
      }

      this.users.push({ username, password });
      this.loginUsername = '';
      this.loginPassword = '';
      this.loginStatus = '註冊成功';
    },
    
    loginAccount() {
      const username = this.loginUsername;
      const password = this.loginPassword;

      if (!username || !password) {
        this.loginStatus = '帳號和密碼不能為空';
        return;
      }
      
      if (username === 'admin' && password === 'admin') {
        this.loginStatus = '登入成功';
        this.$router.push('/admin');
        return;
      }
      
      const user = this.users.find(user => user.username === username && user.password === password);

      if (user) {
        this.loginStatus = '登入成功';
        this.$router.push('/borrow-books');
      } else {
        this.loginStatus = '帳號或密碼錯誤';
      }
    },
  }
};
</script>
