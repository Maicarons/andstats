<template>
  <t-footer>
    <t-layout>
      <div class="max-w-6xl mx-auto w-full p-6 ">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 mb-4 md:mb-0">
            &copy; {{ new Date().getFullYear() }} andstats. All rights
            reserved.
          </p>
          <div class="social-links flex items-center space-x-4">
            <t-link href="#" theme="primary">
              <t-icon class="mr-1" name="brand-github" /> GitHub
            </t-link>
            <t-link href="#" theme="primary">
              <t-icon class="mr-1" name="mail" /> Email
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
