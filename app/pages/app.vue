<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">统计分析应用</h1>
        
        <!-- 应用导航 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8">
          <div class="flex flex-wrap gap-2">
            <t-button 
              v-for="item in appNav" 
              :key="item.key"
              :theme="activeNav === item.key ? 'primary' : 'default'"
              variant="outline"
              @click="activeNav = item.key"
            >
              {{ item.label }}
            </t-button>
          </div>
        </div>
        
        <!-- 应用内容区 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 左侧面板：项目管理 -->
          <div class="lg:col-span-1 space-y-6">
            <!-- 项目列表 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">我的项目</h2>
                <t-button variant="outline" size="small" @click="showCreateProjectModal = true">
                  <t-icon name="add" class="mr-1" />
                  新建
                </t-button>
              </div>
              <div class="space-y-2">
                <!-- 项目列表项示例 -->
                <div 
                  v-for="project in projects" 
                  :key="project.id"
                  class="p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  :class="activeProject === project.id ? 'bg-primary/10 dark:bg-primary/20' : ''"
                  @click="activeProject = project.id"
                >
                  <div class="font-medium">{{ project.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ project.description }}</div>
                </div>
              </div>
            </div>
            
            <!-- 数据管理 -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 class="text-xl font-semibold mb-4">数据管理</h2>
              <div class="space-y-2">
                <t-button variant="outline" block>
                  <t-icon name="upload" class="mr-2" />
                  上传数据
                </t-button>
                <t-button variant="outline" block>
                  <t-icon name="database" class="mr-2" />
                  数据列表
                </t-button>
              </div>
            </div>
          </div>
          
          <!-- 右侧面板：主要内容 -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 class="text-2xl font-semibold mb-4">欢迎使用Andstats统计分析工具</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                选择左侧的项目，或者创建一个新项目，开始您的数据分析之旅。
              </p>
              
              <!-- 功能卡片 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">描述性统计</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    计算基本统计指标，如均值、中位数、标准差等。
                  </p>
                </div>
                <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">推断统计</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    进行假设检验、置信区间估计等推断统计分析。
                  </p>
                </div>
                <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">回归分析</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    进行线性回归、逻辑回归等回归分析。
                  </p>
                </div>
                <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 class="text-lg font-semibold mb-2">数据可视化</h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">
                    生成各种图表，如柱状图、折线图、散点图等。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 创建项目模态框 -->
    <t-modal 
      v-model:visible="showCreateProjectModal" 
      title="创建新项目"
      :footer="false"
    >
      <div class="p-4">
        <t-form layout="vertical">
          <t-form-item label="项目名称" required>
            <t-input v-model="newProject.name" placeholder="请输入项目名称" />
          </t-form-item>
          <t-form-item label="项目描述">
            <t-textarea v-model="newProject.description" placeholder="请输入项目描述" :rows="3" />
          </t-form-item>
          <div class="flex justify-end gap-3 mt-6">
            <t-button @click="showCreateProjectModal = false">取消</t-button>
            <t-button theme="primary" @click="createProject">创建</t-button>
          </div>
        </t-form>
      </div>
    </t-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 应用导航
const appNav = [
  { key: 'dashboard', label: '仪表盘' },
  { key: 'analysis', label: '统计分析' },
  { key: 'visualization', label: '数据可视化' },
  { key: 'reports', label: '报告生成' }
]

const activeNav = ref('dashboard')

// 项目管理
const projects = ref([
  { id: 1, name: '项目1', description: '我的第一个统计项目' },
  { id: 2, name: '项目2', description: '销售数据分析' }
])

const activeProject = ref(1)

// 创建项目
const showCreateProjectModal = ref(false)
const newProject = ref({ name: '', description: '' })

const createProject = () => {
  // 项目创建逻辑，当前仅模拟
  const id = projects.value.length + 1
  projects.value.push({ id, ...newProject.value })
  activeProject.value = id
  showCreateProjectModal.value = false
  newProject.value = { name: '', description: '' }
}
</script>

