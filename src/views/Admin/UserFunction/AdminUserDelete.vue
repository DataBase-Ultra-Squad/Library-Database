<template>
  <div class="userFormDelete-container">
    <h1>會員管理介面 — 刪除 & 查詢</h1>
    <a-form :model="userFormState" name="userForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
      autocomplete="off">

      <a-form-item label="會員ID" class="input-width" name="userID">
        <a-input v-model:value="userFormState.userID" />
      </a-form-item>

      <a-form-item label="會員姓名" class="input-width" name="userName">
        <a-input v-model:value="userFormState.username" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
        <a-button @click="searchUser">查詢</a-button>
      </a-form-item>

      <a-table :columns="userColumns" :data-source="userData" :scroll="{ y: 400 }" :customRow="getUserRow">
        <template v-slot:action="{ record }">
          <a-button @click="() => deleteBookById(record.bookID)">刪除</a-button>
        </template>
      </a-table>
    </a-form>

  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const userFormState = reactive({
  userID: '',
  username: ''
});

const userData = reactive([]);

const userColumns = [
  {
    title: '會員ID',
    dataIndex: 'userID',
    width: 150
  },
  {
    title: '會員密碼',
    dataIndex: 'userPassword',
    width: 150
  },
  {
    title: '會員姓名',
    dataIndex: 'userName',
    width: 150
  },
  {
    title: '會員信箱',
    dataIndex: 'userEmail',
    width: 200
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
    width: 150
  }
];

onMounted(async () => {
  await fetchAllUsers();
});

const fetchAllUsers = async () => {
  try {
    const response = await axios.get('/admin/user');
    userData.splice(0, userData.length, ...response.data.users);
  } catch (error) {
    console.error('获取用户数据失败:', error);
  }
};

const searchUser = async () => {
  try {
    const response = await axios.get('/admin/user/search', { params: { userID: userFormState.userID, username: userFormState.username } });
    userData.splice(0, userData.length, ...response.data.users);
  } catch (error) {
    console.error('查询用户数据失败:', error);
  }
};  

</script>

<style>
userFormDelete-container {
  flex: 1;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>