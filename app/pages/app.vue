<template>
  <div class="w-full h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <!-- 页面标题 -->
    <div class="container mx-auto px-4 py-4">
      <h1 class="text-2xl font-bold">统计分析应用</h1>
    </div>
    
    <!-- 工具栏 -->
    <div class="bg-white dark:bg-gray-800 shadow-sm p-2 border-b">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap gap-2">
          <t-button variant="outline" size="small">
            <t-icon name="upload" class="mr-1" />
            导入
          </t-button>
          <t-button variant="outline" size="small">
            <t-icon name="download" class="mr-1" />
            导出
          </t-button>
          <t-button variant="outline" size="small">
            <t-icon name="save" class="mr-1" />
            保存
          </t-button>
          <t-button variant="outline" size="small">
            <t-icon name="search" class="mr-1" />
            查找
          </t-button>
          <t-button variant="outline" size="small">
            <t-icon name="exchange" class="mr-1" />
            替换
          </t-button>
          <t-button variant="outline" size="small">
            <t-icon name="add" class="mr-1" />
            新建列
          </t-button>
          <t-button variant="outline" size="small">
            <t-icon name="delete" class="mr-1" />
            删除列
          </t-button>
          <div class="ml-auto">
            <div class="flex items-center gap-2">
              <span class="text-sm">项目ID:</span>
              <t-input v-model="projectId" readonly placeholder="未选择项目" size="small" />
              <span class="text-sm">引擎:</span>
              <t-tag :theme="selectedEngine === 'js' ? 'default' : selectedEngine === 'r' ? 'primary' : 'success'">
                {{ selectedEngine.toUpperCase() }}
              </t-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 主内容区：表格和右侧功能菜单 -->
    <div class="flex-1 flex overflow-hidden">
      <!-- 左侧：数据表格 -->
      <div class="flex-1 overflow-hidden">
        <div class="h-full">
          <ag-grid-vue3 
            style="width: 100%; height: 100%" 
            class="ag-theme-alpine-dark" 
            :columnDefs="columnDefs" 
            :rowData="rowData" 
            :defaultColDef="defaultColDef"
            :rowSelection="'multiple'"
          >
          </ag-grid-vue3>
        </div>
      </div>
      
      <!-- 右侧：功能菜单 -->
      <div 
        ref="sidebarRef" 
        class="w-80 bg-white dark:bg-gray-800 border-l overflow-y-auto flex-shrink-0"
        :style="{ width: `${sidebarWidth}px` }"
      >
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-4">统计功能</h3>
          
          <!-- 功能菜单折叠面板 -->
          <t-collapse v-model="activeNames">
            <!-- 描述统计 -->
            <t-collapse-panel name="descriptive" header="描述统计">
              <div class="p-4 space-y-4">
                <t-form layout="vertical">
                  <t-form-item label="选择变量">
                    <t-select v-model="selectedVariables" mode="multiple" placeholder="请选择要分析的变量">
                      <t-option 
                        v-for="col in columnDefs" 
                        :key="col.field" 
                        :value="col.field" 
                        :label="col.headerName"
                      />
                    </t-select>
                  </t-form-item>
                  <div class="flex justify-end gap-2 mt-4">
                    <t-button variant="outline" @click="runDescriptiveStats">运行</t-button>
                  </div>
                </t-form>
              </div>
            </t-collapse-panel>
            
            <!-- T检验 -->
            <t-collapse-panel name="t-test" header="T检验">
              <div class="p-4 space-y-4">
                <p>单样本T检验、独立样本T检验、配对样本T检验</p>
                <div class="flex justify-end gap-2">
                  <t-button variant="outline" @click="runTTest">运行</t-button>
                </div>
              </div>
            </t-collapse-panel>
            
            <!-- 方差分析 -->
            <t-collapse-panel name="anova" header="方差分析">
              <div class="p-4 space-y-4">
                <p>单因素方差分析、多因素方差分析、重复测量方差分析</p>
                <div class="flex justify-end gap-2">
                  <t-button variant="outline" @click="runAnova">运行</t-button>
                </div>
              </div>
            </t-collapse-panel>
            
            <!-- 回归分析 -->
            <t-collapse-panel name="regression" header="回归分析">
              <div class="p-4 space-y-4">
                <p>线性回归、逻辑回归、多元回归</p>
                <div class="flex justify-end gap-2">
                  <t-button variant="outline" @click="runRegression">运行</t-button>
                </div>
              </div>
            </t-collapse-panel>
          </t-collapse>
        </div>
      </div>
      
      <!-- 侧边栏调整手柄 -->
      <div 
        class="w-1 bg-gray-300 dark:bg-gray-700 cursor-col-resize hover:bg-primary" 
        @mousedown="startResize"
      ></div>
    </div>
    
    <!-- 结果对话框 -->
    <t-dialog 
      v-model:visible="showResultDialog" 
      title="分析结果" 
      :width="800"
    >
      <div class="h-96">
        <t-tabs v-model:active="activeTab" type="card">
          <t-tab-panel label="格式化结果" name="formatted">
            <div class="p-4">
              <!-- 格式化结果显示 -->
              <div v-if="analysisResult" class="space-y-4">
                <h4 class="font-semibold">分析结果</h4>
                <div class="overflow-x-auto">
                  <table class="w-full border-collapse">
                    <thead>
                      <tr class="bg-gray-100 dark:bg-gray-800">
                        <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">变量</th>
                        <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">均值</th>
                        <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">中位数</th>
                        <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">标准差</th>
                        <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">最小值</th>
                        <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">最大值</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr 
                        v-for="(result, varName) in analysisResult" 
                        :key="varName"
                        class="border-b border-gray-300 dark:border-gray-700"
                      >
                        <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">{{ varName }}</td>
                        <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">{{ result.mean.toFixed(4) }}</td>
                        <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">{{ result.median.toFixed(4) }}</td>
                        <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">{{ result.standardDeviation.toFixed(4) }}</td>
                        <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">{{ result.minimum.toFixed(4) }}</td>
                        <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">{{ result.maximum.toFixed(4) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </t-tab-panel>
          <t-tab-panel label="原始输出" name="raw">
            <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <pre class="whitespace-pre-wrap text-sm">{{ rawOutput }}</pre>
            </div>
          </t-tab-panel>
        </t-tabs>
      </div>
    </t-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { AgGridVue3 } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine-dark.css'
import * as ss from 'simple-statistics'

// 应用导航
const appNav = [
  { key: 'dashboard', label: '仪表盘' },
  { key: 'analysis', label: '统计分析' },
  { key: 'visualization', label: '数据可视化' },
  { key: 'reports', label: '报告生成' }
]

const activeNav = ref('dashboard')

// 获取路由参数
const route = useRoute()

// 从URL参数获取项目ID和引擎
const projectId = computed(() => route.query.projectId as string || '')
const selectedEngine = computed(() => (route.query.engine as 'js' | 'r' | 'python') || 'js')

// 数据表格配置
const columnDefs = ref([
  { field: 'col1', headerName: '列1', editable: true },
  { field: 'col2', headerName: '列2', editable: true },
  { field: 'col3', headerName: '列3', editable: true },
  { field: 'col4', headerName: '列4', editable: true },
  { field: 'col5', headerName: '列5', editable: true }
])

// 模拟数据
const rowData = ref([
  { col1: 1, col2: 2, col3: 3, col4: 4, col5: 5 },
  { col1: 6, col2: 7, col3: 8, col4: 9, col5: 10 },
  { col1: 11, col2: 12, col3: 13, col4: 14, col5: 15 },
  { col1: 16, col2: 17, col3: 18, col4: 19, col5: 20 },
  { col1: 21, col2: 22, col3: 23, col4: 24, col5: 25 }
])

// 默认列配置
const defaultColDef = ref({
  flex: 1,
  minWidth: 100,
  editable: true,
  resizable: true
})

// 右侧功能菜单
const activeNames = ref(['descriptive'])
const selectedVariables = ref<string[]>([])

// 分析结果
const analysisResult = ref<any>(null)
const rawOutput = ref('')
const showResultDialog = ref(false)
const activeTab = ref('formatted')

// 侧边栏调整
const sidebarWidth = ref(320)
const sidebarRef = ref<any>(null)
const isResizing = ref(false)



// 统计分析功能
// 运行描述统计
const runDescriptiveStats = async () => {
  if (!selectedVariables.value.length) {
    // 没有选择变量，使用所有变量
    selectedVariables.value = columnDefs.value.map(col => col.field!)
  }
  
  let results: any = {}
  let rawOutputText = ''
  
  try {
    switch (selectedEngine.value) {
      case 'js':
        // 使用JavaScript的simple-statistics库
        results = runDescriptiveStatsJS(selectedVariables.value)
        rawOutputText = JSON.stringify(results, null, 2)
        break
      case 'r':
        // 使用R语言
        results = await runDescriptiveStatsR(selectedVariables.value)
        break
      case 'python':
        // 使用Python语言
        results = await runDescriptiveStatsPython(selectedVariables.value)
        break
      default:
        results = runDescriptiveStatsJS(selectedVariables.value)
        rawOutputText = JSON.stringify(results, null, 2)
    }
    
    analysisResult.value = results
    rawOutput.value = rawOutputText
    showResultDialog.value = true
  } catch (error) {
    console.error('运行统计分析失败:', error)
    rawOutput.value = `Error: ${error instanceof Error ? error.message : String(error)}`
    showResultDialog.value = true
  }
}

// JavaScript描述统计
const runDescriptiveStatsJS = (variables: string[]) => {
  const results: any = {}
  
  variables.forEach(varName => {
    // 提取变量数据
    const data = rowData.value.map(row => parseFloat(row[varName]))
    
    // 计算统计量
    results[varName] = {
      mean: ss.mean(data),
      median: ss.median(data),
      standardDeviation: ss.standardDeviation(data),
      minimum: ss.min(data),
      maximum: ss.max(data),
      variance: ss.variance(data),
      range: ss.max(data) - ss.min(data),
      count: data.length
    }
  })
  
  return results
}

// R语言描述统计
const runDescriptiveStatsR = async (variables: string[]) => {
  // 这里将来会集成R语言的webr库
  // 目前先用JavaScript实现
  const results = runDescriptiveStatsJS(variables)
  return results
}

// Python描述统计
const runDescriptiveStatsPython = async (variables: string[]) => {
  // 这里将来会集成Python的pyodide库
  // 目前先用JavaScript实现
  const results = runDescriptiveStatsJS(variables)
  return results
}

// 运行T检验
const runTTest = () => {
  // 简化实现，显示提示
  rawOutput.value = 'T检验功能开发中...'
  showResultDialog.value = true
}

// 运行方差分析
const runAnova = () => {
  // 简化实现，显示提示
  rawOutput.value = '方差分析功能开发中...'
  showResultDialog.value = true
}

// 运行回归分析
const runRegression = () => {
  // 简化实现，显示提示
  rawOutput.value = '回归分析功能开发中...'
  showResultDialog.value = true
}

// 侧边栏调整
const startResize = (e: MouseEvent) => {
  isResizing.value = true
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

const resize = (e: MouseEvent) => {
  if (!isResizing.value || !sidebarRef.value) return
  
  const containerWidth = sidebarRef.value.parentElement.offsetWidth
  const newWidth = containerWidth - (e.clientX - sidebarRef.value.parentElement.getBoundingClientRect().left)
  
  // 设置最小和最大宽度
  sidebarWidth.value = Math.max(200, Math.min(500, newWidth))
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}
</script>