<template>
  <t-config-provider>
    <t-layout :class="configStore.theme" class="min-h-screen flex flex-col">
      <AppHeader />
      <main class="flex-grow">
        <slot />
      </main>
      <AppFooter />
    </t-layout>
  </t-config-provider>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useConfigStore } from '../stores/config';

// 获取配置store
const configStore = useConfigStore();

// 初始化配置
onMounted(() => {
  configStore.init();
});
</script>

<style>
body {
  margin: 0;
  transition: background-color 0.3s ease;
}

/* 应用主题到整个文档 */
:root {
  --bg-color: #f9fafb;
  --text-color: #1f2937;
}

html[theme-mode="dark"] {
  --bg-color: #111827;
  --text-color: #f9fafb;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>