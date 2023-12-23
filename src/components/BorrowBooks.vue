<template>
  <div id="app">
    <h1>{{ message }}</h1>

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
    
    </div>
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

</style>

<script>
export default {
  
  methods: {
    // 其他方法...
    
  }
};
</script>

