// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "andstats",
      htmlAttrs: {
        lang: "zh-CN",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: [
    "@tdesign-vue-next/nuxt",
    "@nuxt/eslint",
    "@unocss/nuxt",
    "@nuxtjs/sitemap",
    "@pinia/nuxt",
    "nuxt-auth-utils",
  ],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  unocss: {
    nuxtLayers: true,
  },
  sitemap: {
    zeroRuntime: true,
  },
  
  // Auth配置
  auth: {
    origin: process.env.AUTH_ORIGIN || 'http://localhost:3000',
  },
  
  // 运行时配置
  runtimeConfig: {
    auth: {
      // 生成一个32字符的随机字符串作为session密码
      // 生产环境中应从环境变量获取
      sessionPassword: process.env.NUXT_SESSION_PASSWORD || 'a-very-long-password-at-least-32-characters',
    },
  },
  
});
