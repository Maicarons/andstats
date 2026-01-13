<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <!-- 登录表单 -->
      <div class="text-center">
        <h1 class="text-3xl font-bold">Andstats</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">欢迎回来，请登录您的账号</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- 邮箱输入 -->
        <div>
          <t-form-item label="邮箱" required>
            <t-input
              v-model="form.email"
              type="email"
              placeholder="请输入邮箱地址"
              clearable
              :rules="[{ required: true, message: '请输入邮箱地址' }, { type: 'email', message: '请输入正确的邮箱格式' }]"
            />
          </t-form-item>
        </div>

        <!-- 密码输入 -->
        <div>
          <t-form-item label="密码" required>
            <t-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              :show-password-toggle="true"
              :rules="[{ required: true, message: '请输入密码' }, { min: 6, message: '密码长度不能少于6位' }]"
            />
          </t-form-item>
        </div>

        <!-- 记住我和忘记密码 -->
        <div class="flex items-center justify-between">
          <t-checkbox v-model="form.rememberMe">记住我</t-checkbox>
          <a href="#" class="text-primary hover:underline text-sm">忘记密码？</a>
        </div>

        <!-- 登录按钮 -->
        <div>
          <t-button
            type="submit"
            theme="primary"
            block
            size="large"
            :loading="isLoading"
          >
            登录
          </t-button>
        </div>
      </form>

      <!-- 注册链接 -->
      <div class="text-center text-sm">
        <span class="text-gray-600 dark:text-gray-300">还没有账号？</span>
        <NuxtLink to="/register" class="ml-1 text-primary hover:underline">立即注册</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

// 路由实例
const router = useRouter();

// 用户store
const userStore = useUserStore();

// 登录表单数据
const form = ref({
  email: '',
  password: '',
  rememberMe: false
});

// 加载状态
const isLoading = ref(false);

// 登录处理函数
const handleLogin = async () => {
  isLoading.value = true;
  try {
    // 调用登录API
    const success = await userStore.login(form.value.email, form.value.password);
    if (success) {
      // 登录成功，跳转到首页或应用页面
      router.push('/app');
    }
  } catch (error) {
    console.error('登录失败:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>