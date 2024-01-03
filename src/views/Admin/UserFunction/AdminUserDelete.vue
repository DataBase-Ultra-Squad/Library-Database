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

      <a-table :columns="userColumns" :data-source="userData" :scroll="{ y: 500 }">
        <template v-slot:action="{ record }">
          <a-button @click="() => deleteUser(record.userId)">刪除</a-button>
        </template>
      </a-table>
    </a-form>

    <!-- 註冊狀態對話框 -->
    <div>
      <a-modal v-model:open="isModalOpen" title="提示訊息" @ok="handleOk">
        <p>{{ modalContent }}</p>
      </a-modal>
    </div>

  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import axios from 'axios';

const isModalOpen = ref(false);
const modalContent = ref('');

const userFormState = reactive({
  userID: '',
  username: ''
});

const userData = reactive([]);

const userColumns = [
  {
    title: '會員ID',
    dataIndex: 'userId',
    width: 120
  },
  {
    title: '會員姓名',
    dataIndex: 'name',
    width: 120
  },
  {
    title: '會員信箱',
    dataIndex: 'email',
    width: 200
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
    width: 150
  }
];

const handleOk = () => {
  isModalOpen.value = false;
};

onMounted(async () => {
  await fetchAllUsers();
});

const fetchAllUsers = async () => {
  try {
    const token = localStorage.getItem('token'); // 获取存储的token
    const response = await axios.get('https://lt.italkutalk.com/admin/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    userData.splice(0, userData.length, ...response.data);
  } catch (error) {
    console.error('获取用户数据失败:', error);
  }
};

const searchUser = async () => {
  try {
    const token = localStorage.getItem('token'); // 获取存储的token
    const params = {};
    if (userFormState.userID) {
      params.userId = userFormState.userID;
    }
    if (userFormState.username) {
      params.name = userFormState.username;
    }

    const response = await axios.get('https://lt.italkutalk.com/admin/user', {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    userData.splice(0, userData.length, ...response.data);
  } catch (error) {
    console.error('查询用户数据失败:', error);
  }
};

const deleteUser = async (userId) => {
  if (!userId) {
    console.log('未指定用戶ID');
    return;
  }

  try {
    const token = localStorage.getItem('token'); // 获取存储的token
    const data = {};
    data.userId = userId;
    console.log('Data:', data);

    await axios.delete(`https://lt.italkutalk.com/admin/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: data
    });
    
    console.log('用户删除成功');

    modalContent.value = '用戶刪除成功';
    isModalOpen.value = true;
    fetchAllUsers(); // 重新获取用户列表
  } catch (error) {
    modalContent.value = '用戶刪除失敗: ' + error.response?.data.errMsg;
    console.error('Error deleting user:', error);
    isModalOpen.value = true;
  }
};

</script>

<style>
userFormDelete-container {
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>