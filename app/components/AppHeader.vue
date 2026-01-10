<template>
  <t-header>
    <t-head-menu theme="light" value="home" height="80px">
      <template #logo>
        <t-link href="/" class="flex items-center text-lg font-bold text-primary">
          <t-icon name="home" class="mr-2" /> andstats
        </t-link>
      </template>
      
      <t-menu-item value="home">
        <t-link href="/">首页</t-link>
      </t-menu-item>
      <t-menu-item value="about">
        <t-link href="/about">关于</t-link>
      </t-menu-item>
      <t-menu-item value="services">
        <t-link href="/">服务</t-link>
      </t-menu-item>
      <t-menu-item value="blog">
        <t-link href="/">博客</t-link>
      </t-menu-item>
      <t-menu-item value="contact">
        <t-link href="/">联系</t-link>
      </t-menu-item>
      
      <template #operations>
        <!-- 夜间模式切换按钮 -->
        <t-button 
          variant="text" 
          shape="circle" 
          @click="toggleTheme"
          class="mr-2"
        >
          <t-icon :name="isDarkMode ? 'sun' : 'moon'" />
        </t-button>
        
        <div class="hidden md:block">
          <t-input placeholder="搜索..." :bordered="false" class="w-40 bg-gray-100 rounded px-3 py-1">
            <template #suffix>
              <t-icon name="search" />
            </template>
          </t-input>
        </div>
        <t-button variant="text" class="hidden md:block">登录</t-button>
        <t-button variant="outline" class="hidden md:block ml-2">注册</t-button>
        
        <!-- 移动端菜单按钮 -->
        <t-button variant="text" class="md:hidden" @click="showMobileMenu = !showMobileMenu">
          <t-icon :name="showMobileMenu ? 'close' : 'menu'" />
        </t-button>
      </template>
    </t-head-menu>
    
    <!-- 移动端菜单 -->
    <teleport v-if="showMobileMenu" to="body">
      <div class="fixed inset-0 z-50 bg-black bg-opacity-50" @click="showMobileMenu = false"/>
      <div class="fixed top-0 right-0 bottom-0 z-50 w-64 bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-center mb-8">
            <t-link href="/" class="flex items-center text-lg font-bold text-primary">
              <t-icon name="home" class="mr-2" />
              andstats
            </t-link>
            
            <!-- 移动端夜间模式切换按钮 -->
            <div class="flex items-center">
              <t-button 
                variant="text" 
                shape="circle" 
                @click="toggleTheme"
                class="mr-2"
              >
                <t-icon :name="isDarkMode ? 'sun' : 'moon'" />
              </t-button>
              <t-button variant="text" @click="showMobileMenu = false">
                <t-icon name="close" />
              </t-button>
            </div>
          </div>

          <nav class="flex-1 flex flex-col space-y-4">
            <t-link href="/" @click="showMobileMenu = false">首页</t-link>
            <t-link href="/about" @click="showMobileMenu = false">关于</t-link>
            <t-link href="/" @click="showMobileMenu = false">服务</t-link>
            <t-link href="/" @click="showMobileMenu = false">博客</t-link>
            <t-link href="/" @click="showMobileMenu = false">联系</t-link>

            <div class="pt-8 border-t border-gray-200">
              <t-button block variant="outline" class="mb-3">登录</t-button>
              <t-button block theme="primary">注册</t-button>
            </div>
          </nav>
        </div>
      </div>
    </teleport>
  </t-header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showMobileMenu = ref<boolean>(false);
const isDarkMode = ref<boolean>(false);

// 初始化主题
onMounted(() => {
  // 检查用户之前的选择或者系统偏好
  const savedTheme = localStorage.getItem('theme-mode');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
  } else {
    isDarkMode.value = systemPrefersDark;
  }
  
  // 应用初始主题
  applyTheme(isDarkMode.value ? 'dark' : 'light');
});

// 切换主题函数
const toggleTheme = function(): void {
  isDarkMode.value = !isDarkMode.value;
  const newTheme: 'light' | 'dark' = isDarkMode.value ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('theme-mode', newTheme);
};

// 应用主题函数
const applyTheme = function(theme: 'light' | 'dark'): void {
  if (theme === 'dark') {
    document.documentElement.setAttribute('theme-mode', 'dark');
  } else {
    document.documentElement.removeAttribute('theme-mode');
  }
};
</script>