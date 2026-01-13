import { defineStore } from 'pinia'

// 用户信息接口
export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
  createdAt: string
}

// 用户状态接口
export interface UserState {
  isLoggedIn: boolean
  userInfo: UserInfo | null
  token: string | null
}

// 定义用户状态store
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    userInfo: null,
    token: null
  }),
  
  getters: {
    // 获取用户名称
    userName: (state) => state.userInfo?.username || '用户',
    // 获取用户头像
    userAvatar: (state) => state.userInfo?.avatar || 'https://tcdn.tdesign.tencent.com/img/avatar1.png',
    // 检查是否登录
    loggedIn: (state) => state.isLoggedIn
  },
  
  actions: {
    // 设置用户登录状态
    setLoggedIn(loggedIn: boolean) {
      this.isLoggedIn = loggedIn
    },
    
    // 设置用户信息
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo
      if (userInfo) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    },
    
    // 设置token
    setToken(token: string | null) {
      this.token = token
      if (token) {
        localStorage.setItem('auth_token', token)
      } else {
        localStorage.removeItem('auth_token')
      }
    },
    
    // 登录操作
    login(userInfo: UserInfo, token: string) {
      this.setUserInfo(userInfo)
      this.setToken(token)
    },
    
    // 登出操作
    logout() {
      this.setUserInfo(null)
      this.setToken(null)
    },
    
    // 初始化用户状态
    init() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
        // 这里应该从服务器获取用户信息
        // 目前只是模拟实现
        this.isLoggedIn = true
        this.userInfo = {
          id: 1,
          username: '测试用户',
          email: 'test@example.com',
          createdAt: new Date().toISOString()
        }
      }
    }
  }
})