<template>
  <div class="userFormHistory-container">
    <h1>會員管理介面 — 查詢歷程</h1>
    <a-form :model="historyState" name="userForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">

      <a-form-item label="會員ID" class="input-width" name="userID">
        <a-input v-model:value="historyState.userID" />
      </a-form-item>

      <a-form-item label="書籍ID" class="input-width" name="bookName">
        <a-input v-model:value="historyState.bookName" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
        <a-button @click="searchUser">查詢</a-button>
      </a-form-item>

      <a-table :columns="userColumns" :data-source="userData" :scroll="{ y: 400 }">
      </a-table>
    </a-form>
  </div>

  <!-- 註冊狀態對話框 -->
  <div>
    <a-modal v-model:open="isModalOpen" title="提示訊息" @ok="handleModalOk">
      <p>{{ modalContent }}</p>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';

// 添加用于对话框的状态
const isModalOpen = ref(false);
const modalContent = ref('');

// 借书成功或失败时的处理方法
const handleModalOk = () => {
  isModalOpen.value = false;
};

// 定义查询状态
const historyState = reactive({
  userID: '',
  bookID: ''
});

// 定义表格列和数据
const userColumns = [
  {
    title: '會員名字',
    dataIndex: 'userName',
    width: 120
  },
  {
    title: '書籍名稱',
    dataIndex: 'bookName',
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

const searchUser = async () => {
  try {
    const token = getToken();
    const params = {};
    if (historyState.userID) {
      params.name = historyState.userID; // 注意参数名称是否与后端API一致
    }
    if (historyState.bookName) {
      params.title = historyState.bookName; // 注意参数名称是否与后端API一致
    }

    console.log('params:', params);
    const response = await axios.get('https://lt.italkutalk.com/admin/borrowHistory', {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('response:', response);
    userData.value = response.data.map((item, index) => ({
      key: index,
      userName: item.name, // 确保字段名称与API返回的匹配
      bookName: item.title,
      borrowDate: formatDateTime(item.borrowDate),
      returnDate: item.returnDate ? formatDateTime(item.returnDate) : '' // 如果 returnDate 不存在，返回空字符串
    }));
    modalContent.value = '查詢成功';
  } catch (error) {
    console.error('Error fetching borrow history:', error);
    modalContent.value = '查詢失敗' + error.message;
  } finally {
    isModalOpen.value = true;
  }
};

onMounted(searchUser);

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return `${date.getMonth() + 1}-${date.getDate()}`;
};

</script>

<style>
userFormHistory-container {
  flex: 1;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>