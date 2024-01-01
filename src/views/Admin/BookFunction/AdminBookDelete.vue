<template>
  <div class="bookFormDelete-container">
    <h1>書籍管理介面 — 刪除</h1>
    <a-form :model="bookFormState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">

      <a-form-item label="書籍ID" class="input-width" name="bookID">
        <a-input v-model:value="bookFormState.bookID" />
      </a-form-item>

      <a-form-item label="書籍姓名" class="input-width" name="bookName">
        <a-input v-model:value="bookFormState.bookName" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
        <a-button @click="searchBooks">查詢</a-button>
      </a-form-item>

      <a-table :columns="bookColumns" :data-source="bookData" :scroll="{ y: 400 }" :customRow="getBookRow">
        <template v-slot:action="{ record }">
          <a-button @click="() => deleteBookById(record.bookID)">刪除</a-button>
        </template>
      </a-table>
    </a-form>

  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import axios from 'axios';

const selectedLanguage = ref('none');
const selectedCategory = ref('none');
const bookData = ref([]);

const bookFormState = reactive({
  bookID: '',
  bookName: ''
});

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
  console.log('token:', token); // 打印出token
  return token;
};

const fetchBooks = async () => {
  try {
    const token = getToken(); // 使用helper函数获取token
    let url = 'https://lt.italkutalk.com/book';
    let params = {};

    // 根据radio选择设置查询参数
    if (selectedLanguage.value !== 'none') {
      params.language = selectedLanguage.value;
    }
    if (selectedCategory.value !== 'none') {
      params.category = selectedCategory.value;  // 更正拼写错误
    }
    params.isAvailable = true;
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


const searchBooks = async () => {
  try {
    const token = getToken();
    let url = 'https://lt.italkutalk.com/book';
    let params = {
      bookId: bookFormState.bookID,
      title: bookFormState.bookName
    };

    // 这里可以根据需要添加其他筛选条件，比如语言和分类
    if (selectedLanguage.value !== 'none') {
      params.language = selectedLanguage.value;
    }
    if (selectedCategory.value !== 'none') {
      params.category = selectedCategory.value;
    }

    const response = await axios.get(url, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    bookData.value = response.data.map((book, index) => ({
      // ... 数据处理逻辑不变 ...
    }));

    console.log('Filtered Books:', response.data);
  } catch (error) {
    console.error('Error fetching filtered books:', error);
  }
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
    // 重新獲取書籍列表
    fetchBooks();
  } catch (error) {
    console.error('Error deleting book:', error);
    // 處理錯誤情況
  }
};
</script>

<style>
.bookFormDelete-container {
  flex: 1;
  max-width: 750px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>