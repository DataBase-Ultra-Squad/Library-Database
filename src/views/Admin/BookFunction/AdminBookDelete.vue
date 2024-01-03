<template>
  <div class="bookFormDelete-container">
    <h1>書籍管理介面 — 刪除</h1>
    <a-form :model="bookFormState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">

      <a-form-item label="書籍ID" class="input-width" name="bookID">
        <a-input v-model:value="bookFormState.bookID" />
      </a-form-item>

      <a-form-item label="書籍姓名" class="input-width" name="bookName">
        <a-input v-model:value="bookFormState.bookName" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
        <a-button @click="searchBooks">查詢</a-button>
      </a-form-item>

      <!-- radio -->
      <div>
        <div>
          <a-radio-group v-model:value="selectedLanguage" button-style="solid">
            <a-radio-button value="none">不限</a-radio-button>
            <a-radio-button value="Chinese">中文</a-radio-button>
            <a-radio-button value="English">英文</a-radio-button>
          </a-radio-group>
        </div>
        <div :style="{ marginTop: '16px' }">
          <a-radio-group v-model:value="selectedCategory" button-style="solid">
            <a-radio-button value="none">不限</a-radio-button>
            <a-radio-button value="Science">科學</a-radio-button>
            <a-radio-button value="Technology">科技</a-radio-button>
            <a-radio-button value="History">歷史</a-radio-button>
            <a-radio-button value="Literature">文學</a-radio-button>
          </a-radio-group>
        </div>

        <div :style="{ marginTop: '16px' }">
          <a-radio-group v-model:value="selectedIsAvailabe" button-style="solid">
            <a-radio-button value="none">不限</a-radio-button>
            <a-radio-button value="true">可借閱</a-radio-button>
            <a-radio-button value="false">不可借閱</a-radio-button>
          </a-radio-group>
        </div>
      </div>

      <a-table :columns="bookColumns" :data-source="bookData" :scroll="{ y: 500 }">
        <template v-slot:action="{ record }">
          <a-button @click="() => deleteBookById(record.bookID)">刪除</a-button>
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
import { reactive, computed, ref, onMounted, watch } from 'vue';
import axios from 'axios';

// radio group 預設值
const selectedLanguage = ref('none');
const selectedCategory = ref('none');
const selectedIsAvailabe = ref('none');

const bookData = ref([]);
const isModalOpen = ref(false);
const modalContent = ref('');

const bookColumns = [
  {
    title: '書籍ID',
    dataIndex: 'bookID',
    width: 120
  },
  {
    title: '書籍名稱',
    dataIndex: 'bookName',
    width: 120
  },
  {
    title: '書籍作者',
    dataIndex: 'author',
    width: 120
  },
  {
    title: '書籍語言',
    dataIndex: 'language',
    width: 120
  },
  {
    title: '書籍分類',
    dataIndex: 'category',
    width: 120
  },
  {
    title: '借閱狀態',
    dataIndex: 'state'
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    slots: { customRender: 'action' }
  }
];

const getToken = () => {
  const token = localStorage.getItem('token');
  console.log('獲得 token:', token); // 打印出token
  return token;
};

const bookFormState = reactive({
  bookName: '',
  bookID: ''
});

const fetchBooks = async () => {
  try {
    const token = getToken(); // 使用helper函数获取token
    let url = 'https://lt.italkutalk.com/book';
    let params = {};

    console.log('params:', params)
    const response = await axios.get(url, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    bookData.value = response.data.map((book, index) => ({
      key: index,
      bookID: book.bookId,
      bookName: book.title,
      author: book.author,
      language: book.language,
      category: book.category,  // 更正字段名称
      state: book.isAvailable ? '可借閱' : '已借出'
    }));

    console.log('Books:', response.data);
  } catch (error) {
    console.error('Error fetching books:', error);
    // 处理错误情况
  }
};

onMounted(fetchBooks);

watch([selectedLanguage, selectedCategory, selectedIsAvailabe], () => {
  searchBooks();
});

const searchBooks = async () => {

  try {
    const token = getToken();
    let url = 'https://lt.italkutalk.com/book';

    let params = {};

    if (selectedLanguage.value !== 'none') {
      params.language = selectedLanguage.value;
    }
    if (selectedCategory.value !== 'none') {
      params.category = selectedCategory.value;
    }
    if (selectedIsAvailabe.value !== 'none') {
      params.isAvailable = selectedIsAvailabe.value;
    }

    params.bookId = bookFormState.bookID;
    params.title = bookFormState.bookName;

    const response = await axios.get(url, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    bookData.value = response.data.map((book, index) => ({
      key: index,
      bookID: book.bookId,
      bookName: book.title,
      author: book.author,
      language: book.language,
      category: book.category,  // 更正字段名称
      state: book.isAvailable ? '可借閱' : '已借出'
    }));

    console.log('Data:', params);
    modalContent.value = '查詢成功';
    console.log('Filtered Books:', response.data);
    clearForm();
  } catch (error) {
    modalContent.value = '查詢失敗！' + error.response?.data.errMsg;
    console.error('Error fetching filtered books:', error);
    isModalOpen.value = true;
  } finally {
    
  }
};

const clearForm = () => {
  bookFormState.bookName = '';
  bookFormState.bookID = '';
};

// 更新 deleteBookById 函數
const deleteBookById = async (bookId) => {
  if (!bookId) {
    console.log('書籍ID為空');
    return;
  }

  try {
    const token = getToken();
    await axios.delete(`https://lt.italkutalk.com/admin/book`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { bookId }
    });

    console.log('Book deleted successfully');
    modalContent.value = '刪除成功';

    isModalOpen.value = true;
    // 重新獲取書籍列表
    fetchBooks();
  } catch (error) {
    modalContent.value = '刪除失敗！' + error.response?.data.errMsg;
    console.error('Error deleting book:', error);
    // 處理錯誤情況
  } finally {
    isModalOpen.value = true;
  }
};

const handleOk = () => {
  isModalOpen.value = false;
};

</script>

<style>
.bookFormDelete-container {
  flex: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>