<script setup lang="ts">
// AppFooter 组件不需要额外的逻辑，只需要展示页脚信息
</script>

<template>
  <t-footer>
    <t-layout>
      <div class="max-w-6xl mx-auto w-full p-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 mb-4 md:mb-0">
            &copy; {{ new Date().getFullYear() }} andstats. All rights
            reserved.
          </p>
          <div class="social-links flex items-center space-x-4">
            <t-link href="#" theme="primary">
              <t-icon name="brand-github" class="mr-1" /> GitHub
            </t-link>
            <t-link href="#" theme="primary">
              <t-icon name="mail" class="mr-1" /> Email
            </t-link>
          </div>
        </div>
      </div>
    </t-layout>
  </t-footer>
</template>

<style scoped>
/* 无额外样式，全部使用UnoCSS类 */
</style>
