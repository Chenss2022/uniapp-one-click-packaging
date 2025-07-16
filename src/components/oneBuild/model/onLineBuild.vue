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
          name="包名"
          :rules="[{ required: true, message: '请输入包名' }]"
      >
        <!--                <a-input v-model:value="Data.formState.PACKAGE_NAME" />-->
        <a-select
            v-model:value="Data.formState.PACKAGE_NAME"
            placeholder="输入或选择包名"
            show-search
            :default-active-first-option="false"
            :not-found-content="null"
            :show-arrow="false"
            style="width: 100%"
            :options="Data.PACKAGE_NAME_options"
            :filter-option="filterOption"
            @search="search"
            @change="handleChange"
            @dropdownVisibleChange="dropdownVisibleChange"
        />
      </a-form-item>

      <a-form-item
          label="别名"
          name="别名"
          :rules="[{ required: true, message: '请输入别名' }]"
      >
        <a-input v-model:value="Data.formState.other_NAME" />
      </a-form-item>

      <a-form-item
          label="UNI-项目目录"
          name="UNI-项目目录"
          :rules="[{ required: true, message: '请输入UNI-项目目录，到项目名' }]"
      >
        <a-input v-model:value="Data.formState.UNI_SRC" />
      </a-form-item>
      <a-form-item
          label="APP_KEY"
          name="APP_KEY"
          :rules="[{ required: true, message: '请输入APP_KEY' }]"
      >
        <a-input v-model:value="Data.formState.APP_KEY" />
      </a-form-item>

      <a-form-item
          label="KEY密码"
          name="KEY密码"
          :rules="[{ required: true, message: '请输入KEY密码' }]"
      >
        <a-input-password v-model:value="Data.formState.KEY_PASSWORD" />
      </a-form-item>
      <a-form-item
          label="证书密码"
          name="证书密码"
          :rules="[{ required: true, message: '请输入证书密码' }]"
      >
        <a-input-password v-model:value="Data.formState.STORE_PASSWORD" />
      </a-form-item>


      <a-form-item
          label="证书文件"
          name="证书文件"
          :rules="[{ required: true, message: '请输入证书文件' }]"
      >
        <a-input v-model:value="Data.formState.STORE_FILE" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 5, span: 16 }">
        <a-checkbox v-model:checked="Data.formState.remember">记住当前值</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
    <div style="width: 50%" >日志显示s</div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {filterOption,uploadLocalFile,deleteLocalFile} from '../../utils/publicFun';

const Data = reactive({
  MenuType: true,
  PACKAGE_NAME_options:[],
  formState: {
    other_NAME: '',
    UNI_SRC: '',
    PACKAGE_NAME: '',
    APP_KEY: '',
    KEY_PASSWORD: '',
    STORE_PASSWORD:'',
    STORE_FILE:'',
    remember: false
  },
  formState1:{
    username: '',
    password: '',
    remember: false
  }
});


// 表单

/**
 * 下拉款搜索
 * @param value
 */
const search = (value:any) => {
  // inputValue.value = value
  // if (value !== '') {
  //   setFieldsValue({
  //     cyr: value
  //   })
  // }
}

/**
 * 展开下拉菜单
 * @param value
 */
const dropdownVisibleChange = (value:any) => {
  if (value) {

  } else {

  }
}

/**
 * 下拉框选择
 * @param value
 */
const handleChange = (value:any) => {
  if (typeof value !== 'undefined') {
    // const [name, _, idNumber, phone, ysgj, cchlx, cch, gch] = value.split(' / ')
    // placeholder.value = name
    // handleCarrierInfoSuccess({ name, idNumber, phone, ysgj, cchlx, cch, gch })
  } else {
    // resetCarrierInfo()
  }
}

const onFinish = (values:any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo:any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style scoped>

.content-mian{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}
</style>
