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
  ],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  eslint: {
    config: {
      standalone: false, // <---
    },
  },
  unocss: {
    nuxtLayers: true,
  },
  sitemap: {
    zeroRuntime: true,
  },
});
