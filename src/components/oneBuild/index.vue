<template>
  <a-layout>
    <a-layout-sider
        width="100px"
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleClickMenu">
        <a-menu-item key="1">
          <AndroidOutlined />
          <span class="nav-text">在线</span>
        </a-menu-item>
        <a-menu-item key="2">
          <WindowsOutlined />
          <span class="nav-text">本地</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
<!--      <a-layout-header :style="{ background: '#fff', padding: 0 }">-->
<!--      </a-layout-header>-->
      <a-layout-content :style="{ margin: '24px 16px 0',minHeight: '450px' }">
        <div v-if="Data.MenuType" :style="{ padding: '24px', background: '#fff', height: '90vh' }">
          <localBuild />
        </div>
        <div v-else :style="{ padding: '24px', background: '#fff', height: '90vh' }">
          <on-line-build />
        </div>
      </a-layout-content>
<!--      <a-layout-footer style="text-align: center">-->
<!--        Ant Design ©2018 Created by Ant UED-->
<!--      </a-layout-footer>-->
    </a-layout>
  </a-layout>
</template>
<script setup>
import {reactive, ref} from 'vue';
import { AndroidOutlined, WindowsOutlined } from '@ant-design/icons-vue';
import localBuild from '../oneBuild/model/localBuild.vue';
import OnLineBuild from "./model/onLineBuild.vue";


const Data = reactive({
  MenuType: true,
  PACKAGE_NAME_options:[],
});

// 目录
const selectedKeys = ref(['1']);

const onCollapse = (collapsed, type) => {
  console.log(collapsed, type);
};

const onBreakpoint = (broken) => {
  console.log(broken);
};

/**
 * 切换打包菜单
 * @param key
 */
function handleClickMenu({ key }) {
  if (key == '1') {
    Data.MenuType = true;
  }else{
    Data.MenuType = false;
  }
}

</script>

<style scoped>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}


</style>
