<template>
  <div>
    <a-button type="primary" @click="runBuildadd">打包</a-button>
  </div>
</template>

<script setup>
import {runBuild} from "../../electron/main/build.js";
import {Button} from "ant-design-vue";


function runBuildadd() {
  runBuild((line) => {
    console.log('日志:', line);
  }).catch((e) => {
    console.error('打包出错:', e);
  });
}

</script>

<style scoped>

</style>
