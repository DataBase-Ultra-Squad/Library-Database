<template>
    <div class="userFormModify-container">
        <h1>會員管理介面 — 修改</h1>
        <a-form :model="userFormState" name="userForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
          autocomplete="off">
          <a-form-item label="會員ID" class="input-width" name="username"
            :rules="[{ required: true, message: 'Please input username!' }]">
            <a-input v-model:value="userFormState.username" />
          </a-form-item>

          <a-form-item label="會員密碼" class="input-width" name="password">
            <a-input-password v-model:value="userFormState.password" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
            <a-button @click="deleteUser">刪除帳號</a-button>
            <a-button style="margin-left: 10px" @click="modifyUserPassword">修改密碼</a-button>
          </a-form-item>

          <a-table :columns="userColumns" :data-source="userData" :scroll="{ y: 400 }" :customRow="getUserRow" />
        </a-form>

      </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

const onFinish = (values) => {
  console.log('Form Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Form Failed:', errorInfo);
};

//用戶管理相關方法
const userFormState = reactive({
  username: '',
  password: ''
});

// 删除用户方法
const deleteUser = () => {
  console.log('Deleting user:', userFormState.username);
  // 删除用户的逻辑
  clearUserForm();
};

// 修改用户密码方法
const modifyUserPassword = () => {
  console.log('Modifying password for user:', userFormState.username);
  // 修改密码的逻辑
  clearUserForm();
};

// 清空用户表单
const clearUserForm = () => {
  userFormState.username = '';
  userFormState.password = '';
};

const getUserRow = (record) => {
  return {
    onClick: () => {
      // 假设您想在点击行时将用户名更新到输入框中
      userFormState.username = record.userName;
    },
  };
};

const userColumns = [
  {
    title: '會員帳號',
    dataIndex: 'userName',
    width: 150
  },
  {
    title: '會員密碼',
    dataIndex: 'userPassword',
    width: 150
  },
  {
    title: '借閱書籍',
    dataIndex: 'borrowedBooks',
  }
];
const userData = [...Array(15)].map((_, i) => ({
  key: i,
  userName: `user ${i}`,
  userPassword: `userPassword ${i}`,
  borrowedBooks: `None`,
}));

</script>

<style>

userFormModify-container {
  flex: 1;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>