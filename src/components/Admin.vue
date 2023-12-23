<template>
  <div id="app">
    <h1>{{ message }}</h1>

    <!-- 借閱書籍介面 -->
    <div class="manage-section">
      <h2>書籍管理介面</h2>
      <div class="input-group">
        <label for="bookname">書籍名稱：</label>
        <input type="text" id="bookname" v-model="bookname" />
        
        <label for="bookname">書籍作者：</label>
        <input type="text" id="authorname" v-model="authorname" />
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
          <th>書籍作者</th>
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
          <th>會員帳號</th>
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
    
    <!-- 表格3 -->
    <table class="account-table">
      <thead>
        <tr>
          <th>會員帳號</th>
          <th>會員密碼</th>
        </tr>
      </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{ user.username }}</td>
        <td>{{ user.password }}</td>
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
  
  methods: {
    // 其他方法...
    
  }
};
</script>

