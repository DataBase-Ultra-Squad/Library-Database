<template>
  <div class="bookFormAdd-container">
    <h1>書籍管理介面 — 新增</h1>
    <a-form :model="bookFormState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">

      <a-form-item label="書籍名稱" class="input-width" name="bookName"
        :rules="[{ required: true, message: 'Please input book name!' }]">
        <a-input v-model:value="bookFormState.bookName" />
      </a-form-item>

      <a-form-item label="書籍作者" class="input-width" name="bookAuthor"
        :rules="[{ required: true, message: 'Please input book name!' }]">
        <a-input v-model:value="bookFormState.bookAuthor" />
      </a-form-item>

      <!-- radio -->
      <div>
        <div>
          <a-radio-group v-model:value="selectedLanguage" button-style="solid">
            <a-radio-button value="none">無</a-radio-button>
            <a-radio-button value="chinese">中文</a-radio-button>
            <a-radio-button value="english">英文</a-radio-button>
          </a-radio-group>
        </div>
        <div :style="{ marginTop: '16px' }">  
          <a-radio-group v-model:value="selectedCategory" button-style="solid">
            <a-radio-button value="none">無</a-radio-button>
            <a-radio-button value="science">科學</a-radio-button>
            <a-radio-button value="technology">科技</a-radio-button>
            <a-radio-button value="history">歷史</a-radio-button>
            <a-radio-button value="biography">傳記</a-radio-button>
          </a-radio-group>
        </div>
      </div>

      <a-form-item :wrapper-col="{ offset: 0, span: 4 }" :style="{ marginTop: '16px' }">
        <a-button @click="addBook">新增</a-button>
      </a-form-item>

      <a-table :columns="bookColumns" :data-source="bookData" :scroll="{ y: 400 }" :customRow="getBookRow"></a-table>

    </a-form>

  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import axios from 'axios';

const selectedLanguage = ref('none');
const selectedCategory = ref('none');
const bookData = ref([]);

const onFinish = (values) => {
  console.log('Form Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Form Failed:', errorInfo);
};

const bookFormState = reactive({
  bookName: '',
  bookAuthor: ''
});

const clearForm = () => {
  bookFormState.bookName = '';
  bookFormState.bookAuthor = '';
};

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
];

const getBookRow = (record) => {
  return {
    onClick: () => {
      // 假设您想在点击行时将书籍名更新到输入框中
      bookFormState.bookID = record.bookID;
      bookFormState.bookName = record.bookName;
    },
  };
};

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

const addBook = async () => {
  if (bookFormState.bookName === '' || bookFormState.bookAuthor === '') {
    console.log('書名或作者名為空');
    return;
  }

  try {
    const token = getToken();
    const response = await axios.post('https://lt.italkutalk.com/admin/book', {
      title: bookFormState.bookName,
      author: bookFormState.bookAuthor,
      language: selectedLanguage.value !== 'none' ? selectedLanguage.value : undefined,
      category: selectedCategory.value !== 'none' ? selectedCategory.value : undefined
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Added book:', response.data);
    // 清空表單
    clearForm();
    // 可以在此處調用 fetchBooks() 來更新書籍列表
    fetchBooks();
  } catch (error) {
    console.error('Error adding book:', error);
    // 處理錯誤情況，例如顯示錯誤消息
  }
};

</script>

<style>
.bookFormAdd-container {
  flex: 1;
  max-width: 750px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>