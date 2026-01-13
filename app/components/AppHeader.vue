<template>
  <t-header>
    <t-head-menu height="80px" theme="light" :value="activeMenu">
      <template #logo>
        <t-link  href="/">
          <span class="tracking-wide flex items-center text-lg font-bold text-primary">Andstats</span>
        </t-link>
      </template>
      
      <!-- PC端菜单项 -->
      <div class="hidden md:flex">
        <t-menu-item value="home">
          <t-link href="/">首页</t-link>
        </t-menu-item>
        <t-menu-item value="features">
          <t-link href="/features">功能</t-link>
        </t-menu-item>
        <t-menu-item value="about">
          <t-link href="/about">关于</t-link>
        </t-menu-item>
      </div>
      
      <template #operations>
        <!-- 夜间模式切换按钮 -->
        <t-button 
          class="mr-2 hidden md:block"
          shape="circle" 
          variant="text"
          @click="configStore.toggleTheme"
        >
          <t-icon :name="configStore.theme === 'dark' ? 'sunny' : 'moon'" />
        </t-button>
        
        <!-- 用户区域：根据登录状态显示不同内容 -->
        <template v-if="!userStore.isLoggedIn">
          <!-- 未登录状态：显示登录和注册按钮 -->
          <t-button class="hidden md:block" variant="text" @click="router.push('/login')">登录</t-button>
          <t-button class="hidden md:block ml-2" variant="outline" @click="router.push('/register')">注册</t-button>
        </template>
        <template v-else>
          <!-- 已登录状态：显示用户头像下拉菜单 -->
          <t-dropdown :show-arrow="false" trigger="click">
            <template #content>
              <div class="relative cursor-pointer">
                <t-avatar 
                  :size="'small'"
                  :image="userStore.userAvatar"
                  :alt="userStore.userName"
                  class="border-2 border-gray-200 dark:border-gray-700"
                />
              </div>
            </template>
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item @click="goToProfile">
                  <t-icon name="user" class="mr-2" />
                  个人中心
                </t-dropdown-item>
                <t-dropdown-item @click="goToMyProjects">
                  <t-icon name="folder" class="mr-2" />
                  我的项目
                </t-dropdown-item>
                <t-dropdown-item @click="goToSettings">
                  <t-icon name="setting" class="mr-2" />
                  偏好设置
                </t-dropdown-item>
                <t-divider />
                <t-dropdown-item @click="logout" theme="danger">
                  <t-icon name="logout" class="mr-2" />
                  退出登录
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </template>
        
        <!-- 移动端菜单按钮 -->
        <t-button class="md:hidden" variant="text" @click="showMobileMenu = !showMobileMenu">
          <t-icon :name="showMobileMenu ? 'close' : 'menu'" />
        </t-button>
      </template>
    </t-head-menu>
    
    <!-- 移动端菜单 -->
    <teleport v-if="showMobileMenu" to="body">
      <div class="fixed inset-0 z-40 bg-black bg-opacity-50" @click="showMobileMenu = false"/>
      <div :class="[configStore.theme === 'dark' ? 'bg-gray-900' : 'bg-white']"
           class="fixed top-0 right-0 bottom-0 z-50 w-64 p-6 duration-300 ease-in-out">
        <div class="flex flex-col h-full">
          <div class="flex justify-between items-center mb-8">
            <t-link class="flex items-center text-lg font-bold text-primary" href="/">
              <t-icon class="mr-2" name="home" />
              andstats
            </t-link>
            
            <!-- 移动端夜间模式切换按钮 -->
            <div class="flex items-center">
              <t-button 
                class="mr-2"
                shape="circle" 
                variant="text"
                @click="configStore.toggleTheme"
              >
                <t-icon :name="configStore.theme === 'dark' ? 'sunny' : 'moon'"  />
              </t-button>
              <t-button variant="text" @click="showMobileMenu = false">
                <t-icon name="close" />
              </t-button>
            </div>
          </div>

          <nav class="flex-1 flex flex-col space-y-4">
            <t-link href="/" @click="showMobileMenu = false">首页</t-link>
            <t-link href="/features" @click="showMobileMenu = false">功能</t-link>
            <t-link href="/about" @click="showMobileMenu = false">关于</t-link>

            <div :class="[configStore.theme === 'dark' ? 'border-gray-700' : 'border-gray-200']" class="pt-8 border-t">
              <template v-if="!userStore.isLoggedIn">
                <!-- 未登录状态 -->
                <t-button block class="mb-3" variant="outline" @click="router.push('/login')">登录</t-button>
                <t-button block theme="primary" @click="router.push('/register')">注册</t-button>
              </template>
              <template v-else>
                <!-- 已登录状态 -->
                <div class="flex items-center space-x-3 mb-4">
                  <t-avatar 
                    :size="'medium'"
                    :image="userStore.userAvatar"
                    :alt="userStore.userName"
                  />
                  <div>
                    <div class="font-semibold">{{ userStore.userName }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">已登录</div>
                  </div>
                </div>
                <div class="space-y-2">
                  <t-button block variant="outline" @click="goToProfile">
                    <t-icon name="user" class="mr-2" />
                    个人中心
                  </t-button>
                  <t-button block variant="outline" @click="goToMyProjects">
                    <t-icon name="folder" class="mr-2" />
                    我的项目
                  </t-button>
                  <t-button block variant="outline" @click="goToSettings">
                    <t-icon name="setting" class="mr-2" />
                    偏好设置
                  </t-button>
                  <t-button block theme="primary" @click="logout">
                    <t-icon name="logout" class="mr-2" />
                    退出登录
                  </t-button>
                </div>
              </template>
            </div>
          </nav>
        </div>
      </div>
    </teleport>
  </t-header>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../stores/user';
import { useConfigStore } from '../stores/config';

const router = useRouter();
const route = useRoute();
const showMobileMenu = ref<boolean>(false);

// 获取store实例
const userStore = useUserStore();
const configStore = useConfigStore();

// 根据当前路由计算菜单高亮值
const activeMenu = computed(() => {
  const path = route.path;
  if (path === '/features') return 'features';
  if (path === '/about') return 'about';
  return 'home';
});

// 初始化store
onMounted(() => {
  // 初始化用户状态
  userStore.init();
  // 初始化应用配置
  configStore.init();
});

// 导航到个人中心
const goToProfile = () => {
  showMobileMenu.value = false;
  // 实际项目中，这里会导航到个人中心页面
  alert('导航到个人中心');
};

// 导航到我的项目
const goToMyProjects = () => {
  showMobileMenu.value = false;
  router.push('/app');
};

// 导航到偏好设置
const goToSettings = () => {
  showMobileMenu.value = false;
  // 实际项目中，这里会导航到偏好设置页面
  alert('导航到偏好设置');
};

// 退出登录
const logout = () => {
  showMobileMenu.value = false;
  userStore.logout();
  router.push('/');
};
</script>