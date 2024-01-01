<template>
  <div id="app" div class="form-container">
    <a-spin :spinning="isLoading">
      <h1 class="form-title">使用者註冊</h1>
      <a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages"
        @finish="onFinish">
        <a-form-item :name="['user', 'userID']" label="學號" class="input-width" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.userID" />
        </a-form-item>
        <a-form-item :name="['user', 'email']" label="電子郵件" class="input-width"
          :rules="[{ type: 'email', required: true }]">
          <a-input v-model:value="formState.user.email" />
        </a-form-item>
        <a-form-item :name="['user', 'name']" label="姓名" class="input-width" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.name" />
        </a-form-item>
        <a-form-item :name="['user', 'password']" label="密碼" class="input-width" :rules="[{ required: true }]">
          <a-input-password v-model:value="formState.user.password" />
        </a-form-item>
        <a-form-item :name="['user', 'passwordConfirm']" label="確認密碼" class="input-width" :rules="[{ required: true }]">
          <a-input-password v-model:value="formState.user.passwordConfirm" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">註冊帳號</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>

  <!-- 註冊狀態對話框 -->
  <div>
    <a-modal v-model:open="isModalOpen" title="提示訊息" @ok="handleOk">
      <p>{{ modalContent }}</p>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoading = ref(false); // 初始化加载状态为 false

// 對話框相關
const isModalOpen = ref(false);
const modalContent = ref('');
const isGoingLogin = ref(false);

const handleCancel = () => {
  isModalOpen.value = false;
  // 这里可以添加其他取消时需要执行的代码
};

const handleOk = () => {
  isModalOpen.value = false;
  if (isGoingLogin.value) {
    router.push({ name: 'login' });
  }
};

const formState = reactive({
  user: {
    userID: '',
    email: '',
    name: '',
    password: '',
    passwordConfirm: ''
  },
});

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const onFinish = async values => {
  isLoading.value = true; // 开始加载

  try {
    if (values.user.password !== values.user.passwordConfirm) {
      alert('密碼不一致');
      return;
    }

    const response = await axios.post('https://lt.italkutalk.com/user/register', {
      userId: values.user.userID,
      email: values.user.email,
      name: values.user.name,
      password: values.user.password
    });

    if (response.status === 201) {
      modalContent.value = '註冊成功！';
      isGoingLogin.value = true;
      isModalOpen.value = true;
      console.log('Registration Success:', response.data);
    }
  } catch (error) {
    isGoingLogin.value = false;
    if (error.response.status === 409) {
      console.log(error);
      modalContent.value = '註冊失敗！' + error.response.data.errMsg;
    } else {
      modalContent.value = '註冊失敗！' + error.response.data.errMsg;
    }
    isModalOpen.value = true;

  } finally {
    isLoading.value = false; // 结束加载
  }
};
</script>

<style>
#app {
  text-align: left;
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.register-form .ant-form-item {
  margin-bottom: 16px;
}

.register-form .ant-btn {
  width: 100%;
}
</style>