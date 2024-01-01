<template>
  <div class="userFormSearch-container">
    <h1>會員管理介面 — 查詢歷程</h1>
    <a-form :model="historyState" name="userForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
      autocomplete="off">

      <a-form-item label="會員ID" class="input-width" name="userID">
        <a-input v-model:value="historyState.userID" />
      </a-form-item>

      <a-form-item label="書籍ID" class="input-width" name="bookID">
        <a-input v-model:value="historyState.bookID" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
        <a-button @click="searchUser">查詢</a-button>
      </a-form-item>

      <a-table :columns="userColumns" :data-source="userData" :scroll="{ y: 400 }" :customRow="getUserRow">
      </a-table>
    </a-form>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

// 定义查询状态
const historyState = reactive({
  userID: '',
  bookID: ''
});

// 定义表格列和数据
const userColumns = [
  {
    title: '會員ID',
    dataIndex: 'userID',
    width: 120
  },
  {
    title: '書籍ID',
    dataIndex: 'bookID',
    width: 120
  },
  {
    title: '借閱時間',
    dataIndex: 'borrowDate',
    width: 120
  },
  {
    title: '歸還時間',
    dataIndex: 'returnDate',
    width: 120
  },
];
const userData = ref([]);

// 获取 token
const getToken = () => {
  return localStorage.getItem('token');
};

// 查询借阅历史的方法
const searchUser = async () => {
  try {
    const token = getToken();
    const params = {
      userID: historyState.userID,
      bookID: historyState.bookID
    };
    const response = await axios.get('/admin/borrowHistory', {
      params: params,
      headers: { Authorization: `Bearer ${token}` }
    });

    // 根据API响应更新userData
    userData.value = response.data.map((item, index) => ({
      key: index,
      userID: item.userID,
      bookID: item.bookID,
      borrowDate: item.borrowDate, // 确保这些字段与API返回的字段匹配
      returnDate: item.returnDate
    }));

    console.log('Borrow History:', response.data);
  } catch (error) {
    console.error('Error fetching borrow history:', error);
  }
};

</script>

<style>
userFormSearch-container {
  flex: 1;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>