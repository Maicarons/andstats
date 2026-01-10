import antfu from '@antfu/eslint-config'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default [
  // 基础配置
  ...withNuxt(antfu()),
  // 为 nuxt.config.ts 文件特别关闭 'no-undef' 规则
  {
    files: ['nuxt.config.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
]
