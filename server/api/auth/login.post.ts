export default defineEventHandler(async (event) => {
  // 获取请求体
  const body = await readBody(event)
  const { username, password } = body
  
  // 这里应该验证用户名和密码
  // 目前只是模拟实现
  if (username === 'test' && password === 'password') {
    // 设置用户会话
    await setUserSession(event, {
      user: {
        id: 1,
        username: 'test',
        email: 'test@example.com'
      },
      loggedInAt: new Date().toISOString()
    })
    
    return { success: true, message: '登录成功' }
  }
  
  // 登录失败
  throw createError({
    statusCode: 401,
    statusMessage: '用户名或密码错误'
  })
})