<template>
  <div id="app">
    <h1>{{ message }}</h1>
    
    <!-- 顯示登入狀態 -->
    <div class="login-status">
      {{ loginStatus }}
    </div>

    <!-- 使用者登入介面 -->
    <div class="login-section">
      <h2>使用者登入</h2>
      <div class="input-group">
        <label for="login-username">帳號名稱：</label>
        <input type="text" id="login-username" v-model="loginUsername" />
      </div>

      <div class="input-group">
        <label for="login-password">密碼：</label>
        <input type="password" id="login-password" v-model="loginPassword" />
      </div>

      <div class="button-group">
        <button @click="registerAccount">註冊</button>
        <button @click="loginAccount">登入</button>
      </div>
    </div>

    <!-- 借閱書籍介面 -->
    <div class="borrow-section">
      <h2>借閱書籍介面</h2>
      <div class="input-group">
        <label for="bookname">書籍名稱：</label>
        <input type="text" id="bookname" v-model="bookname" />
      </div>

      <div class="button-group">
        <button @click="borrowBook">借閱</button>
        <button @click="returnBook">歸還</button>
      </div>
    </div>

    <!-- 添加四個按鈕 -->
    <div class="button-section">
      <button @click="addRecord">新增</button>
      <button @click="deleteRecord">刪除</button>
      <button @click="updateRecord">修改</button>
      <button @click="searchRecords">查詢</button>
    </div>

    <!-- 表格1 -->
    <table class="book-table">
      <thead>
        <tr>
          <th>書籍名稱</th>
          <th>是否借閱</th>
          <th>借閱人</th>
          <th>借閱時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>{{ book.name }}</td>
          <td>{{ book.borrowed ? '已借閱' : '未借閱' }}</td>
          <td>{{ book.borrower }}</td>
          <td>{{ book.borrowTime }}</td>
        </tr>
      </tbody>
    </table>
    
    <!-- 表格2 -->
    <table class="member-table">
      <thead>
        <tr>
          <th>會員編號</th>
          <th>借閱的書籍</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in members" :key="index">
          <td>{{ member.id }}</td>
          <td>{{ member.borrowedBooks.join(', ') }}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<!-- 其他部分保持不變 -->

<style>
#app {
  text-align: left;
  margin-top: 30px;
}

.login-status {
  position: absolute;
  top: 0;
  left: 0;

  padding: 8px;
  background: #ddd;
}

.login-section,
.borrow-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  margin-bottom: 10px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  margin-right: 10px;
}

.button-group button {
  margin-right: 10px;
}

.login-status {
  margin-top: 20px;
  font-weight: bold;
  color: green;
}

/* 表格樣式 */
table {
  width: 30%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

/* 表格的特定樣式 */
.book-table,
.member-table {
  margin-top: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      // 其他資料...
      users: [],  // 新增這一行，用來儲存使用者資訊
      loginStatus: null  // 新增這一行，用來儲存登入狀態
    };
  },
  
  methods: {
    // 其他方法...
    registerAccount() {
      // 取得輸入的帳號和密碼
      const username = this.loginUsername;
      const password = this.loginPassword;

      console.log('Username:', username);
      console.log('Password:', password);
      // 檢查是否帳號已經存在
      if (this.users.some(user => user.username === username)) {
        this.loginStatus = '此帳號名已經存在';
        return;
      }

      // 新增使用者到陣列中
      this.users.push({ username, password });

      // 清空輸入欄位
      // this.loginUsername = '';
      // this.loginPassword = '';

      // 顯示註冊成功的訊息
      this.loginStatus = '註冊成功';        
    },
  }
};
</script>

