import { defineStore } from 'pinia'

// 主题类型
export type ThemeType = 'light' | 'dark'

// 语言类型
export type LanguageType = 'zh-CN' | 'en-US'

// 应用配置接口
export interface AppConfig {
  theme: ThemeType
  language: LanguageType
  isSidebarOpen: boolean
}

// 定义应用配置store
export const useConfigStore = defineStore('config', {
  state: (): AppConfig => ({
    theme: 'light',
    language: 'zh-CN',
    isSidebarOpen: true
  }),
  
  getters: {
    // 获取当前主题
    currentTheme: (state) => state.theme,
    // 获取当前语言
    currentLanguage: (state) => state.language,
    // 检查侧边栏是否打开
    sidebarOpen: (state) => state.isSidebarOpen
  },
  
  actions: {
    // 设置主题
    setTheme(theme: ThemeType) {
      this.theme = theme
      localStorage.setItem('theme-mode', theme)
      this.applyTheme(theme)
    },
    
    // 切换主题
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light'
      this.setTheme(newTheme)
    },
    
    // 应用主题到DOM
    applyTheme(theme: ThemeType) {
      if (theme === 'dark') {
        document.documentElement.setAttribute('theme-mode', 'dark')
      } else {
        document.documentElement.removeAttribute('theme-mode')
      }
    },
    
    // 设置语言
    setLanguage(language: LanguageType) {
      this.language = language
      localStorage.setItem('app-language', language)
      // 这里可以添加语言切换的逻辑
    },
    
    // 切换侧边栏状态
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    
    // 设置侧边栏状态
    setSidebarOpen(open: boolean) {
      this.isSidebarOpen = open
    },
    
    // 初始化配置
    init() {
      // 从localStorage获取主题设置
      const savedTheme = localStorage.getItem('theme-mode') as ThemeType | null
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        this.setTheme(savedTheme)
      } else {
        // 检查系统偏好
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.setTheme(systemPrefersDark ? 'dark' : 'light')
      }
      
      // 从localStorage获取语言设置
      const savedLanguage = localStorage.getItem('app-language') as LanguageType | null
      if (savedLanguage && ['zh-CN', 'en-US'].includes(savedLanguage)) {
        this.setLanguage(savedLanguage)
      }
    }
  }
})