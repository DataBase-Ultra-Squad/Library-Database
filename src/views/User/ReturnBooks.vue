<template>
  <div id="app">
    <div class="search-book-container">
      <h1>使用者介面 — 歸還書籍</h1>
      <a-form :model="borrowBookForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        
        <a-table :columns="bookColumns" :data-source="borrowedBooks" :scroll="{ y: 600 }">
          <template v-slot:action="{ record }">
            <a-button @click="() => returnBookById(record.bookId)">歸還</a-button>
          </template>
        </a-table>
      </a-form>

    </div>
  </div>

  <!-- 註冊狀態對話框 -->
  <div>
    <a-modal v-model:open="isModalOpen" title="提示訊息" @ok="handleModalOk">
      <p>{{ modalContent }}</p>
    </a-modal>
  </div>

</template>


<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

// 添加用于对话框的状态
const isModalOpen = ref(false);
const modalContent = ref('');

// 借书成功或失败时的处理方法
const handleModalOk = () => {
  isModalOpen.value = false;
  fetchBorrowedBooks();
};

const getToken = () => {
  const token = localStorage.getItem('token');
  console.log('token:', token); // 打印出token
  return token;
};

const onFinish = (values) => {
  console.log('Form Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Form Failed:', errorInfo);
};

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  return `${date.getMonth() + 1}-${date.getDate()}`;
};

const bookColumns = [
  {
    title: '書籍名稱',
    dataIndex: 'title',
    width: 120
  },
  {
    title: '書籍作者',
    dataIndex: 'author',
    width: 120
  },
  {
    title: '借閱日期',
    dataIndex: 'borrowDate',
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    slots: { customRender: 'action' }  // 指定使用插槽渲染
  },
];

const borrowedBooks = ref([]);

const fetchBorrowedBooks = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.log('No token found');
      return;
    }

    const response = await axios.get('https://lt.italkutalk.com/user/borrowed', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Borrowed books:', response.data);
    borrowedBooks.value = response.data.map(book => ({
      ...book,
      borrowDate: formatDateTime(book.borrowRecord.borrowDate),
      bookId: book.bookId
    }));
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
  }
};

onMounted(fetchBorrowedBooks);

// 修改 returnBookById 函数
const returnBookById = async (bookId) => {
  try {
    const token = getToken();
    // 注意这里需要传递一个包含bookId的数组
    const response = await axios.patch('https://lt.italkutalk.com/book/return', {
      bookId: [bookId]
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Return book success:', response.data);
    modalContent.value = '還書成功！';
    isModalOpen.value = true;
    fetchBorrowedBooks(); // 重新获取当前用户借阅的书籍列表
  } catch (error) {
    modalContent.value = '還書失敗！' + error.response?.data.errMsg;
    console.error('還書失敗！', error.response?.data.errMsg);
    isModalOpen.value = true;
  }
};


</script>

<style>

h1 {
  color: #333;
  font-size: 24px;
  text-align: left;
  margin-bottom: 20px;
}

.search-book-container {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>