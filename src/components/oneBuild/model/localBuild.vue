<template>
  <div class="content-mian">
    <a-form
        style="width: 50%;overflow-y: auto;height: 100%;box-sizing: border-box"
        :model="Data.formState"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          label="包名"
          name="PACKAGE_NAME"
      >
        <a-select
            style="text-align: left"
            v-model:value="Data.formState.PACKAGE_NAME"
            placeholder="输入或选择包名"
            :show-search="true"
            :default-active-first-option="false"
            :show-arrow="false"
            :not-found-content="null"
            :options="Data.PACKAGE_NAME_options"
            :filter-option="filterOption"
            @search="search"
            @change="handleSelectChange"
            @dropdownVisibleChange="dropdownVisibleChange"
        />
      </a-form-item>

      <a-form-item
          label="别名"
          name="other_NAME"
      >
        <a-input v-model:value="Data.formState.other_NAME" placeholder="输入别名"/>
      </a-form-item>

      <a-form-item
          label="UNI-项目路径"
          name="UNI_SRC"
      >
        <a-input v-model:value="Data.formState.UNI_SRC" placeholder="输入UNI-项目路径"/>
      </a-form-item>
      <a-form-item
          label="APP_KEY"
          name="APP_KEY"
      >
        <a-input v-model:value="Data.formState.APP_KEY" placeholder="输入APP_KEY"/>
      </a-form-item>

      <a-form-item
          label="KEY密码"
          name="KEY_PASSWORD"
      >
        <a-input-password v-model:value="Data.formState.KEY_PASSWORD" placeholder="输入KEY密码"/>
      </a-form-item>
      <a-form-item
          label="证书密码"
          name="STORE_PASSWORD"
      >
        <a-input-password v-model:value="Data.formState.STORE_PASSWORD" placeholder="输入证书密码"/>
      </a-form-item>

      <a-form-item
          label="文件输出路径"
          name="APK_OUTPUT_DIR"
      >
        <a-input v-model:value="Data.formState.APK_OUTPUT_DIR" placeholder="输入输出文件路径"/>
      </a-form-item>

      <a-form-item
          label="证书文件"
          name="STORE_FILE"
      >
<!--        <a-input v-model:value="Data.formState.STORE_FILE" placeholder="输入证书文件"/>-->
        <a-upload-dragger
            v-model:fileList="fileList"
            name="file"
            :maxCount="1"
            :multiple="false"
            :custom-request="customRequest"
            @change="handleUploadChange"
            @drop="handleUploadDrop"
            @remove="handleRemove"
            :disabled="Data.uploadDisabled"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">单击或拖动文件到此区域以上传</p>
        </a-upload-dragger>
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 5, span: 16 }">
        <a-checkbox v-model:checked="Data.formState.remember">记住当前值</a-checkbox><a-button type="dashed" @click="deleteFile">删除文件</a-button>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
    <div style="width: 50%" class="log-main">
      <div style="display: flex;justify-content:space-between;margin-bottom: 15px;color: #990055;font-size:1.2rem;font-weight: 800;">
        <h3>日志</h3>
        <a-button type="dashed" @click="emptyLog">清空log</a-button>
      </div>
      <ul class="log-ul">
        <li v-for="(log, index) in Data.logs" :key="index">{{ log || '日志' }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {filterOption,uploadLocalFile,deleteLocalFile} from '../../utils/publicFun';
import { InboxOutlined } from '@ant-design/icons-vue';

const fileList = ref([]);

const Data = reactive({
  FileData:<any>[],
  PACKAGE_NAME_options:<any>[],
  uploadDisabled:<any>false,
  formState:<any> {
    other_NAME: null,
    UNI_SRC: null,
    PACKAGE_NAME: null,
    APP_KEY: null,
    KEY_PASSWORD: null,
    STORE_PASSWORD: null,
    STORE_FILE: null,
    APK_OUTPUT_DIR: null,
    remember: false
  },
  logs:<any> [],
});

// 显示日志
function addLog(message:any) {
  Data.logs.push(message);
}
// 清空日志
function emptyLog() {
  Data.logs = [];
}
// 清空
const clear = () => {
  Data.formState = {
    other_NAME: null,
    UNI_SRC: null,
    PACKAGE_NAME: null,
    APP_KEY: null,
    KEY_PASSWORD: null,
    STORE_PASSWORD: null,
    STORE_FILE: null,
    APK_OUTPUT_DIR: null,
    remember: false
  };
}

onMounted(()=>{
  window.ipcRenderer.on('settingConfig', (_event, message) => {
    let config = JSON.parse(message)
    Data.FileData = config;
    console.log('接收到配置:', config)
    config.map((item:any) => {
      Data.PACKAGE_NAME_options.push({label: item.other_NAME,value: item.PACKAGE_NAME})
    })
    // Object.keys(config).forEach((key) => {
    //   localStorage.setItem(key, config[key])
    // })
  })
})


// 表单

/**
 * 下拉款搜索
 * @param value
 */
const search = (value:any) => {
  // inputValue.value = value
  if (value !== '') {
    Data.formState.PACKAGE_NAME = value;
  }
}

/**
 * 展开下拉菜单
 * @param value
 */
const dropdownVisibleChange = (value:any) => {
  if (value) {
    console.log(value)
  } else {

  }
}

/**
 * 下拉框选择
 * @param value
 */
const handleSelectChange = (value:any) => {
  if (typeof value !== 'undefined') {
    const selectedItem = Data.FileData.find((item:any) => item.PACKAGE_NAME == value);
    if (selectedItem) {
      Data.formState = { ...selectedItem };
    } else {
      // 可选：重置表单或提示信息
      clear(); // 假设你有定义 clear 方法来清空表单
    }
  } else {
    // resetCarrierInfo()
  }
}

const onFinish = (values:any) => {
  // 监听实时日志
  window.ipcRenderer.on('build:log', (_, msg) => {
    console.log('[Build Log]', msg);
    addLog('[Build Log]'+ msg);
  });

  console.log('kaishigoujian',values)
  // 调用构建
  window.ipcRenderer.invoke('build:start', values);

  // if (result.success) {
  //   alert('构建成功！');
  // } else {
  //   alert(`构建失败: ${result.error}`);
  // }
  // ✅ 设置监听器（只执行一次）
  const handler = (_event: any, message: string) => {
    let params = [];

    try {
      params = JSON.parse(message) || [];
    } catch (e) {
      console.error('解析配置出错:', e);
    }

    const index = params.findIndex((item: any) => item.PACKAGE_NAME === values.PACKAGE_NAME);

    if (index !== -1) {
      params[index] = values;
    } else {
      if(values.remember) {
        params.push(values);
      }
    }
    window.ipcRenderer.send('writeConfig', params);

    // ✅ 只监听一次，避免内存泄漏
    window.ipcRenderer.off('settingConfig', handler);
  };

  window.ipcRenderer.on('settingConfig', handler);

  // ✅ 主动请求配置
  window.ipcRenderer.send('requestConfig');
};

const onFinishFailed = (errorInfo:any) => {
  console.log('Failed:', errorInfo);
};

// 选择上传文件
function handleUploadChange(info:any){
  // Data.formState.STORE_FILE
  if(info.fileList.length > 0){
    Data.uploadDisabled = true
  }else {
    Data.uploadDisabled = false
  }
}

// 拖拽上传文件
function handleUploadDrop(value:any) {
  if(value.fileList.length > 0){
    Data.uploadDisabled = true
  }else {
    Data.uploadDisabled = false
  }
}

// 上传处理

const customRequest = async ({ file, onSuccess, onError }: any) => {
  await uploadLocalFile(file, onSuccess, onError, true)
  Data.formState.STORE_FILE = file.name
}

const handleRemove = async (file: any) => {
  await deleteLocalFile(file.name,true)
}

// 删除文件
async function deleteFile() {
  await deleteLocalFile(fileList.value[0]['name'],true)
  fileList.value = [];
  Data.uploadDisabled = false
}
</script>

<style scoped>

.content-mian{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}

.log-main {
  height: 100%;
}


.log-ul{
  background: #f5f5f5;
  height: 90%;
  overflow-y: auto;
  text-align: left;
}
</style>
