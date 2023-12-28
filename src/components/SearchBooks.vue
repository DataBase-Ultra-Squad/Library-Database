<template>
  <div id="app">
    <div class="search-book-container">
      <h1>使用者介面 — 查詢書籍</h1>
      <a-form :model="borrowBookForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">

        <a-form-item label="書籍名稱" class="input-width" name="bookName"
          :rules="[{ required: true, message: 'Please input book name!' }]">
          <a-input v-model:value="borrowBookForm.bookName" />
        </a-form-item>

        <a-form-item label="書籍作者" class="input-width" name="bookAuthor">
          <a-input v-model:value="borrowBookForm.bookAuthor" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
          <a-button @click="doSearchBooks">查詢</a-button>
        </a-form-item>
        <a-table :columns="bookColumns" :data-source="bookData" :scroll="{ y: 600 }" />
      </a-form>

    </div>
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

const borrowBookForm = reactive({
  bookName: '',
  bookAuthor: '',
});

const clearForm = () => {
  borrowBookForm.bookName = '';
  borrowBookForm.bookAuthor = '';
};

const doSearchBooks = () => {
  if (borrowBookForm.bookName == '') {
    console.log('書名為空');
    return;
  }
  console.log('Searching books');
  // 搜索书籍的逻辑
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
    title: '借閱狀態',
    dataIndex: 'state'
  }
];

const bookData = [...Array(15)].map((_, i) => ({
  key: i,
  bookID: `ID ${i}`,
  bookName: `Book ${i}`,
  author: `Author ${i}`,
  state: `in stock`
}));

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
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>