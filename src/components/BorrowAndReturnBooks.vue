<template>
  <div id="app">
    <div class="borrow-book-container">
      <h1>使用者介面</h1>
      <a-form :model="borrowBookForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">

        <a-form-item label="書籍ID" class="input-width" name="bookID"
          :rules="[{ required: true, message: 'Please input book ID!' }]">
          <a-input v-model:value="borrowBookForm.bookID" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
          <a-button @click="doBorrowBook">借閱</a-button>
          <a-button style="margin-left: 10px" @click="doReturnBook">歸還</a-button>
        </a-form-item>
        <a-table :columns="bookColumns" :data-source="bookData" :scroll="{ y: 400 }" />
      </a-form>

    </div>
  </div>
</template>


<script setup>
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedKeys = ref(['1']);

const handleMenuClick = (e) => {
  if (e.key === '1') {
    router.push('/borrow-and-return-books');
    selectedKeys.value = ['1'];
  } else if (e.key === '2') {
    router.push('/search-books');
    selectedKeys.value = ['2'];
  }
};

const onFinish = (values) => {
  console.log('Form Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Form Failed:', errorInfo);
};

const borrowBookForm = reactive({
  bookID: '',
  bookAuthor: '',
});

const clearForm = () => {
  borrowBookForm.bookID = '';
};

const doBorrowBook = () => {
  if (borrowBookForm.bookID == '') {
    console.log('ID為空');
    return;
  }
  console.log('Adding book:', borrowBookForm);
  // 添加书籍的逻辑
  clearForm();
};

const doReturnBook = () => {
  if (borrowBookForm.bookID == '') {
    console.log('書名為空');
    return;
  }
  console.log('Returning book:', borrowBookForm);
  // 歸還书籍的逻辑
  clearForm();
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
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}

h1 {
  color: #333;
  font-size: 24px;
  text-align: left;
  margin-bottom: 20px;
}

.borrow-book-container {
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>