<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <!-- 注册表单 -->
      <div class="text-center">
        <h1 class="text-3xl font-bold">Andstats</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">创建新账号，开始使用</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- 用户名输入 -->
        <div>
          <t-form-item label="用户名" required>
            <t-input
              v-model="form.username"
              placeholder="请输入用户名"
              clearable
              :rules="[{ required: true, message: '请输入用户名' }, { min: 3, message: '用户名长度不能少于3位' }]"
            />
          </t-form-item>
        </div>

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

        <!-- 确认密码输入 -->
        <div>
          <t-form-item label="确认密码" required>
            <t-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              :show-password-toggle="true"
              :rules="[
                { required: true, message: '请确认密码' },
                { validator: validateConfirmPassword, message: '两次输入的密码不一致' }
              ]"
            />
          </t-form-item>
        </div>

        <!-- 注册按钮 -->
        <div>
          <t-button
            type="submit"
            theme="primary"
            block
            size="large"
            :loading="isLoading"
          >
            注册
          </t-button>
        </div>
      </form>

      <!-- 登录链接 -->
      <div class="text-center text-sm">
        <span class="text-gray-600 dark:text-gray-300">已经有账号？</span>
        <NuxtLink to="/login" class="ml-1 text-primary hover:underline">立即登录</NuxtLink>
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

// 注册表单数据
const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// 加载状态
const isLoading = ref(false);

// 验证确认密码
const validateConfirmPassword = () => {
  return form.value.password === form.value.confirmPassword;
};

// 注册处理函数
const handleRegister = async () => {
  isLoading.value = true;
  try {
    // 调用注册API
    const success = await userStore.register({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    });
    if (success) {
      // 注册成功，跳转到登录页面
      router.push('/login');
    }
  } catch (error) {
    console.error('注册失败:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>