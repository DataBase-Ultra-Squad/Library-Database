<template>
  <div id="app">
    <div class="borrow-book-container">
      <h1>使用者介面 — 借閱、查詢書籍</h1>
      <a-form :model="borrowBookForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">

        <a-form-item label="書籍名稱" class="input-width" name="bookName">
          <a-input v-model:value="borrowBookForm.bookName" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 30, span: 16 }" :style="{ marginTop: '16px' }">
          <a-button @click="doSearchBook">查詢</a-button>
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
        
        <a-table :columns="bookColumns" :data-source="bookData" :scroll="{ y: 550 }">
          <template v-slot:action="{ record }">
            <a-button 
              @click="() => borrowBookById(record.bookID)"
              :disabled="record.state === '已借出'"
            >借閱</a-button>
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
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const selectedKeys = ref(['1']);
const bookData = ref([]);


// radio group 預設值
const selectedLanguage = ref('none');
const selectedCategory = ref('none');

// 添加用于对话框的状态
const isModalOpen = ref(false);
const modalContent = ref('');

// 借书成功或失败时的处理方法
const handleModalOk = () => {
  isModalOpen.value = false;
  fetchBooks();
};

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
  bookName: '',
});

const clearForm = () => {
  borrowBookForm.bookName = '';
};

const getToken = () => {
  const token = localStorage.getItem('token');
  console.log('token:', token); // 打印出token
  return token;
};


const bookColumns = [
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
    slots: { customRender: 'action' }  // 指定使用插槽渲染
  }
];

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

const doSearchBook = async () => {
  try {
    const token = getToken();
    let url = 'https://lt.italkutalk.com/book';
    let params = { title: borrowBookForm.bookName };

    if (selectedLanguage.value !== 'none') {
      params.language = selectedLanguage.value;
    }
    if (selectedCategory.value !== 'none') {
      params.category = selectedCategory.value;
    }

    console.log('params:', params)

    const response = await axios.get(url, {
      params: params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Books:', response.data);

    bookData.value = response.data.map((book, index) => ({
      key: index,
      bookID: book.bookId,
      bookName: book.title,
      author: book.author,
      language: book.language,
      category: book.category,  // 更正字段名称
      state: book.isAvailable ? '可借閱' : '已借出'
    }));

  } catch (error) {
    console.error('Error searching books:', error);
  }
};

const borrowBookById = async (bookId) => {
  if (!bookId) {
    console.log('书籍ID为空');
    return;
  }

  try {
    const token = getToken();
    const response = await axios.patch('https://lt.italkutalk.com/book/borrow', {
      bookId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Borrow book success:', response.data);
    modalContent.value = '借書成功！';
    isModalOpen.value = true;
    fetchBooks(); // 重新获取书籍列表以更新状态
  } catch (error) {
    modalContent.value = '借書失敗！' + error.response?.data.errMsg;
    console.error('借書失敗！', error.response?.data.errMsg);
    isModalOpen.value = true;
  }
};

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
  background: rgba(40, 20, 20, 0.3);
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>