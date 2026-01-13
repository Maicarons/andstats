<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold">我的项目</h1>
        <t-button theme="primary" @click="showCreateProjectModal = true">
          <t-icon name="add" class="mr-1" />
          新建项目
        </t-button>
      </div>
      
      <!-- 项目列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
          @click="openProject(project)"
        >
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ project.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description || '无描述' }}</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <t-tag :theme="project.engine === 'js' ? 'default' : project.engine === 'r' ? 'primary' : 'success'">
                  {{ project.engine.toUpperCase() }}
                </t-tag>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(project.createdAt) }}
                </span>
              </div>
              <div class="flex gap-2">
                <t-button variant="text" size="small" @click.stop="editProject(project)">
                  <t-icon name="edit" />
                </t-button>
                <t-button variant="text" size="small" @click.stop="deleteProject(project.id)">
                  <t-icon name="delete" />
                </t-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="projects.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
        <t-icon name="folder-open" size="48" class="mx-auto mb-4 text-gray-400" />
        <h3 class="text-xl font-semibold mb-2">暂无项目</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          您还没有创建任何项目，点击下方按钮创建第一个项目吧
        </p>
        <t-button theme="primary" @click="showCreateProjectModal = true">
          <t-icon name="add" class="mr-1" />
          新建项目
        </t-button>
      </div>
    </div>
    
    <!-- 新建项目模态框 -->
    <t-modal 
      v-model:visible="showCreateProjectModal" 
      title="创建新项目" 
      :footer="false"
      width="500"
    >
      <div class="p-4">
        <t-form layout="vertical" @submit="createProject">
          <t-form-item label="项目名称" required>
            <t-input v-model="newProject.name" placeholder="请输入项目名称" />
          </t-form-item>
          <t-form-item label="项目描述">
            <t-textarea v-model="newProject.description" placeholder="请输入项目描述" :rows="3" />
          </t-form-item>
          <t-form-item label="统计引擎" required>
            <t-select v-model="newProject.engine" placeholder="请选择统计引擎">
              <t-option value="js" label="JavaScript" />
              <t-option value="r" label="R" />
              <t-option value="python" label="Python" />
            </t-select>
          </t-form-item>
          <div class="flex justify-end gap-2 mt-4">
            <t-button @click="showCreateProjectModal = false">取消</t-button>
            <t-button type="submit" theme="primary">创建</t-button>
          </div>
        </t-form>
      </div>
    </t-modal>
    
    <!-- 编辑项目模态框 -->
    <t-modal 
      v-model:visible="showEditProjectModal" 
      title="编辑项目" 
      :footer="false"
      width="500"
    >
      <div class="p-4">
        <t-form layout="vertical" @submit="updateProject">
          <t-form-item label="项目名称" required>
            <t-input v-model="editingProject.name" placeholder="请输入项目名称" />
          </t-form-item>
          <t-form-item label="项目描述">
            <t-textarea v-model="editingProject.description" placeholder="请输入项目描述" :rows="3" />
          </t-form-item>
          <t-form-item label="统计引擎" required>
            <t-select v-model="editingProject.engine" placeholder="请选择统计引擎">
              <t-option value="js" label="JavaScript" />
              <t-option value="r" label="R" />
              <t-option value="python" label="Python" />
            </t-select>
          </t-form-item>
          <div class="flex justify-end gap-2 mt-4">
            <t-button @click="showEditProjectModal = false">取消</t-button>
            <t-button type="submit" theme="primary">保存</t-button>
          </div>
        </t-form>
      </div>
    </t-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const router = useRouter()

// 项目接口
interface Project {
  id: string
  name: string
  description: string
  engine: 'js' | 'r' | 'python'
  createdAt: Date
  updatedAt: Date
}

// 项目列表
const projects = ref<Project[]>([
  { 
    id: '1', 
    name: '示例项目', 
    description: '这是一个示例项目', 
    engine: 'js',
    createdAt: new Date(),
    updatedAt: new Date()
  }
])

// 新建项目
const showCreateProjectModal = ref(false)
const newProject = ref<Partial<Project>>({
  name: '',
  description: '',
  engine: 'js'
})

// 编辑项目
const showEditProjectModal = ref(false)
const editingProject = ref<Project>({
  id: '',
  name: '',
  description: '',
  engine: 'js',
  createdAt: new Date(),
  updatedAt: new Date()
})

// 格式化日期
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-CN')
}

// 创建项目
const createProject = () => {
  if (!newProject.value.name) return
  
  const project: Project = {
    id: Date.now().toString(),
    name: newProject.value.name,
    description: newProject.value.description || '',
    engine: (newProject.value.engine as 'js' | 'r' | 'python') || 'js',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  projects.value.push(project)
  
  // 重置表单
  newProject.value = {
    name: '',
    description: '',
    engine: 'js'
  }
  
  showCreateProjectModal.value = false
}

// 编辑项目
const editProject = (project: Project) => {
  editingProject.value = JSON.parse(JSON.stringify(project))
  showEditProjectModal.value = true
}

// 更新项目
const updateProject = () => {
  const index = projects.value.findIndex(p => p.id === editingProject.value.id)
  if (index !== -1) {
    projects.value[index] = {
      ...editingProject.value,
      updatedAt: new Date()
    }
  }
  showEditProjectModal.value = false
}

// 删除项目
const deleteProject = (id: string) => {
  projects.value = projects.value.filter(p => p.id !== id)
}

// 打开项目
const openProject = (project: Project) => {
  // 导航到app页面，并传递项目ID作为参数
  router.push(`/app?projectId=${project.id}&engine=${project.engine}`)
}
</script>