<template>
  <div id="app" class="container">

    <a-spin :spinning="isLoading">
      <!-- 用户登录界面 -->
      <a-form class="login-section">
        <h1>圖書館系統</h1>

        <a-form-item label="帳號：">
          <a-input v-model:value="loginUsername" class="input-width" />
        </a-form-item>
        <a-form-item label="密碼：">
          <a-input-password type="password" v-model:value="loginPassword" class="input-width" />
        </a-form-item>

        <a-form-item>
          <a-button @click="registerAccount" class="margin-right">註冊</a-button>
          <a-button @click="loginAccount" type="primary">登入</a-button>
        </a-form-item>

        <!--顯示登入狀態-->
        <div class="login-status">
          {{ loginStatus }}
        </div>
      </a-form>
    </a-spin>

  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';

export default {
  setup() {
    const formState = reactive({
      username: '',
      password: '',
      remember: true,
    });
    const onFinish = values => {
      console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
  },

  data() {
    return {
      loginUsername: '',  // 用于绑定登录用户名
      loginPassword: '',  // 用于绑定登录密码
      loginStatus: '',    // 用于显示登录状态
      users: [],         // 用于存储注册的用户信息
      isLoading: false // 初始化loading狀態
    };
  },

  methods: {
    registerAccount() {
      this.$router.push('/register');
      return;
    },

    async loginAccount() {
      const { loginUsername, loginPassword } = this;
      if (!loginUsername || !loginPassword) {
        this.loginStatus = '帳號和密碼不能為空';
        return;
      }

      this.isLoading = true; // 开始加载

      try {
        const response = await axios.post('https://lt.italkutalk.com/user/login', {
          userId: loginUsername,
          password: loginPassword
        });

        if (response.status === 200 && response.data.token) {
          // 保存JWT令牌
          localStorage.setItem('token', response.data.token);
          console.log('Login Success:', response.data);
          console.log('JWT:', response.data.token);

          // 路由跳转
          if (response.data.isAdmin) {
            this.$router.push('/book/add');
          } else {
            this.$router.push('/borrow-and-search-books');
          }
        } else {
          throw new Error('無效的Token');
        }
      } catch (error) {
        this.loginStatus = '登入失敗：' + error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}

.container {
  display: flex;
  /* justify-content: center; */
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* min-height: 100vh; */
  /* 至少为视口高度 */
}

.login-status {
  margin-bottom: 20px;
  font-weight: bold;
  color: gray;
}

.margin-right {
  margin-right: 20px;
  /* 按鈕間隔 */
}

.input-width {
  width: 300px;
  /* 或者您想要的任何宽度 */
}
</style>