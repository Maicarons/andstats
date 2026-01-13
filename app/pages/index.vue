<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 英雄区 -->
    <section class="py-20 md:py-32">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Andstats
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
            基于Web的在线统计学工具，让数据分析变得简单高效
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/app">
              <t-button theme="primary" size="large" block>
                开始使用
                <t-icon name="chevron-right" class="ml-2" />
              </t-button>
            </NuxtLink>
            <NuxtLink to="/features">
              <t-button variant="outline" size="large" block>
                了解功能
              </t-button>
            </NuxtLink>
          </div>
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div class="text-2xl font-bold text-primary mb-2">全面</div>
              <div class="text-gray-600 dark:text-gray-400">丰富的统计分析功能</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div class="text-2xl font-bold text-primary mb-2">易用</div>
              <div class="text-gray-600 dark:text-gray-400">直观的用户界面</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div class="text-2xl font-bold text-primary mb-2">高效</div>
              <div class="text-gray-600 dark:text-gray-400">快速的数据分析速度</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性展示区 -->
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold mb-12 text-center">主要功能</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 功能卡片 -->
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-6 transition-transform hover:-translate-y-1">
              <div class="text-4xl mb-4 text-primary">📊</div>
              <h3 class="text-xl font-semibold mb-3">统计分析</h3>
              <p class="text-gray-600 dark:text-gray-400">
                提供全面的统计分析功能，包括描述性统计、推断统计、回归分析等。
              </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-6 transition-transform hover:-translate-y-1">
              <div class="text-4xl mb-4 text-primary">🎨</div>
              <h3 class="text-xl font-semibold mb-3">数据可视化</h3>
              <p class="text-gray-600 dark:text-gray-400">
                丰富的数据可视化选项，支持多种图表类型，帮助您直观理解数据。
              </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-6 transition-transform hover:-translate-y-1">
              <div class="text-4xl mb-4 text-primary">📤</div>
              <h3 class="text-xl font-semibold mb-3">数据导入导出</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持多种数据格式的导入导出，方便您与其他工具协同工作。
              </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-6 transition-transform hover:-translate-y-1">
              <div class="text-4xl mb-4 text-primary">🔄</div>
              <h3 class="text-xl font-semibold mb-3">实时计算</h3>
              <p class="text-gray-600 dark:text-gray-400">
                实时处理数据并生成分析结果，无需等待。
              </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-6 transition-transform hover:-translate-y-1">
              <div class="text-4xl mb-4 text-primary">🤝</div>
              <h3 class="text-xl font-semibold mb-3">团队协作</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持多人协作，方便团队成员共享和编辑项目。
              </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-6 transition-transform hover:-translate-y-1">
              <div class="text-4xl mb-4 text-primary">🔒</div>
              <h3 class="text-xl font-semibold mb-3">数据安全</h3>
              <p class="text-gray-600 dark:text-gray-400">
                严格的数据安全措施，保护您的隐私和数据安全。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始区 -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-12 text-center">快速开始</h2>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <ol class="space-y-6">
              <li class="flex">
                <div class="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">创建账号</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    访问<a href="/register" class="text-primary hover:underline">注册页面</a>，填写必要信息创建您的账号。
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">登录系统</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    使用您的账号登录Andstats系统，开始使用统计分析功能。
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">创建项目</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    在应用页面点击"创建新项目"按钮，填写项目信息。
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">上传数据</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    选择您要分析的数据文件，支持CSV、Excel等多种格式。
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">开始分析</h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    选择合适的分析方法，配置参数，点击"开始分析"按钮获取结果。
                  </p>
                </div>
              </li>
            </ol>
            <div class="mt-8 text-center">
              <NuxtLink to="/features" class="inline-block">
                <t-button theme="primary" size="large">
                  了解更多功能
                  <t-icon name="chevron-right" class="ml-2" />
                </t-button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区 -->
    <section class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6">准备好开始您的数据分析之旅了吗？</h2>
          <p class="text-lg mb-8">
            Andstats将为您提供强大的统计分析工具，帮助您更好地理解数据。
          </p>
          <NuxtLink to="/app">
            <t-button theme="light" variant="default" size="large">
              立即开始
              <t-icon name="chevron-right" class="ml-2" />
            </t-button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// 主页逻辑
</script>


