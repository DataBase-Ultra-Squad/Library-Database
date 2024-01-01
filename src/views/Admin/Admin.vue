<template>
  <div id="app">
    <div class="management-container">
      <div class="bookForm-container">
        <h1>書籍管理介面</h1>
        <a-form :model="bookFormState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
          autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">

          <a-form-item label="書籍ID" class="input-width" name="bookID" >
            <a-input v-model:value="bookFormState.bookID" />
          </a-form-item>

          <a-form-item label="書籍名稱" class="input-width" name="bookName"
            :rules="[{ required: true, message: 'Please input book name!' }]">
            <a-input v-model:value="bookFormState.bookName" />
          </a-form-item>

          <a-form-item label="書籍作者" class="input-width" name="bookAuthor">
            <a-input v-model:value="bookFormState.bookAuthor" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
            <a-button @click="addBook">新增</a-button>
            <a-button style="margin-left: 10px" @click="deleteBook">刪除</a-button>
            <a-button style="margin-left: 10px" @click="modifyBook">修改</a-button>
            <a-button style="margin-left: 10px" @click="searchBooks">搜尋</a-button>
          </a-form-item>
          <a-table :columns="bookColumns" :data-source="bookData" :scroll="{ y: 400 }" :customRow="getBookRow" />
        </a-form>

      </div>

      <div class="userForm-container">
        <h1>用戶管理介面</h1>
        <a-form :model="userFormState" name="userForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
          autocomplete="off">
          <a-form-item label="使用者帳號" class="input-width" name="username"
            :rules="[{ required: true, message: 'Please input username!' }]">
            <a-input v-model:value="userFormState.username" />
          </a-form-item>

          <a-form-item label="使用者密碼" class="input-width" name="password">
            <a-input-password v-model:value="userFormState.password" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 30, span: 16 }">
            <a-button @click="deleteUser">刪除帳號</a-button>
            <a-button style="margin-left: 10px" @click="modifyUserPassword">修改密碼</a-button>
          </a-form-item>

          <a-table :columns="userColumns" :data-source="userData" :scroll="{ y: 400 }" :customRow="getUserRow" />
        </a-form>

      </div>
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

const bookFormState = reactive({
  bookName: '',
  bookAuthor: ''
});

const clearForm = () => {
  bookFormState.bookName = '';
  bookFormState.bookAuthor = '';
};

const addBook = () => {
  if (bookFormState.bookName == '') {
    console.log('書名為空');
    return;
  }
  console.log('Adding book:', bookFormState);
  // 添加书籍的逻辑
  clearForm();
};

const deleteBook = () => {
  if (bookFormState.bookName == '') {
    console.log('書名為空');
    return;
  }
  console.log('Deleting book');
  // 删除书籍的逻辑
  clearForm();
};

const modifyBook = () => {
  if (bookFormState.bookName == '') {
    console.log('書名為空');
    return;
  }
  console.log('Modifying book:', bookFormState);
  // 修改书籍的逻辑
};

const searchBooks = () => {
  if (bookFormState.bookName == '') {
    console.log('書名為空');
    return;
  }
  console.log('Searching books');
  // 搜索书籍的逻辑
};

//用戶管理相關方法
const userFormState = reactive({
  username: '',
  password: ''
});

// 删除用户方法
const deleteUser = () => {
  console.log('Deleting user:', userFormState.username);
  // 删除用户的逻辑
  clearUserForm();
};

// 修改用户密码方法
const modifyUserPassword = () => {
  console.log('Modifying password for user:', userFormState.username);
  // 修改密码的逻辑
  clearUserForm();
};

// 清空用户表单
const clearUserForm = () => {
  userFormState.username = '';
  userFormState.password = '';
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
    dataIndex: 'state',
    width: 120
  },
  {
    title: '借閱時間',
    dataIndex: 'borrowDate'
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

const getUserRow = (record) => {
  return {
    onClick: () => {
      // 假设您想在点击行时将用户名更新到输入框中
      userFormState.username = record.userName;
    },
  };
};

const bookData = [...Array(15)].map((_, i) => ({
  key: i,
  bookID: `ID ${i}`,
  bookName: `Book ${i}`,
  author: `Author ${i}`,
  state: `in stock`,
  borrowDate: `12/${i + 1}`
}));


const userColumns = [
  {
    title: '會員帳號',
    dataIndex: 'userName',
    width: 150
  },
  {
    title: '會員密碼',
    dataIndex: 'userPassword',
    width: 150
  },
  {
    title: '借閱書籍',
    dataIndex: 'borrowedBooks',
  }
];
const userData = [...Array(15)].map((_, i) => ({
  key: i,
  userName: `user ${i}`,
  userPassword: `userPassword ${i}`,
  borrowedBooks: `None`,
}));

</script>

<style>
h1 {
  color: #333;
  font-size: 24px;
  text-align: left;
  margin-bottom: 20px;
}

.management-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 10px;
  /* 容器之间的间隔 */
}

.bookForm-container,
.userForm-container {
  flex: 1;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>