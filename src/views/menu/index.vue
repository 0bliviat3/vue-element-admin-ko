<template>
  <div>
    <el-button type="primary" @click="openForm()">메뉴 생성</el-button>

    <el-tree
      :data="menus"
      :props="treeProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      @node-drop="handleNodeDrop"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node flex items-center justify-between px-2 py-1 rounded-md hover:bg-gray-100">
          <!-- 왼쪽: 아이콘 + 메뉴명 + 경로 -->
          <div class="flex items-center gap-2">
            <!-- 아이콘 (DB에 icon 필드 있으면 사용) -->
            <i
              :class="data.menuDTO.type === 'DIR' ? 'el-icon-folder' : 'el-icon-monitor'"
              class="text-blue-500"
            />
            <span class="font-medium text-gray-800">{{ data.menuDTO.name }}</span>
          </div>

          <!-- 오른쪽: 상태 + 액션버튼 -->
          <div class="flex items-center gap-2">
            <!-- 활성/비활성 뱃지 -->
            <el-tag size="mini" :type="data.menuDTO.ableState ? 'success' : 'info'">
              {{ data.menuDTO.ableState === 'ABLE' ? '활성' : '비활성' }}
            </el-tag>

            <!-- 액션 버튼 -->
            <el-button type="text" size="mini" @click.stop="openForm(data)">
              <i class="el-icon-edit text-blue-600" />
            </el-button>
            <el-button type="text" size="mini" @click.stop="deleteMenu(data)">
              <i class="el-icon-delete text-red-600" />
            </el-button>
          </div>
        </div>
      </template>
    </el-tree>

    <!-- 메뉴 폼 모달 -->
    <el-dialog :title="formTitle" :visible.sync="formVisible" width="500px">
      <MenuForm
        :menu-data="selectedMenu"
        :selected-node="selectedNode"
        @submit="handleFormSubmit"
        @cancel="formVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script>
import MenuForm from './MenuForm'
import { getMenuTree, createMenu, updateMenu, deleteMenu } from '@/api/menu'

export default {
  name: 'MenuTreeManagement',
  components: { MenuForm },
  data() {
    return {
      menus: [],
      formVisible: false,
      selectedMenu: null,
      selectedNode: null, // 새 메뉴 생성 시 자동 부모 매핑용
      formTitle: '메뉴 생성',
      treeProps: {
        children: 'children',
        label: 'menuDTO.name'
      }
    }
  },
  mounted() {
    this.fetchMenus()
  },
  methods: {
    async fetchMenus() {
      try {
        const res = await getMenuTree()
        this.menus = [res] // 루트 노드
      } catch (err) {
        this.$message.error('메뉴 목록을 불러오는데 실패했습니다.')
      }
    },
    openForm(node = null) {
      this.selectedMenu = node ? node.menuDTO : null
      this.selectedNode = node // 새 메뉴 생성 시 부모 선택용
      this.formTitle = node ? '메뉴 수정' : '메뉴 생성'
      this.formVisible = true
    },
    async handleFormSubmit(formData) {
      try {
        if (formData.id) {
          await updateMenu(formData.id, formData)
          this.$message.success('메뉴가 수정되었습니다.')
        } else {
          // 새 메뉴 생성 시 선택된 노드를 부모로 지정
          if (this.selectedNode) {
            formData.parentId = this.selectedNode.menuDTO.id
          }
          await createMenu(formData)
          this.$message.success('메뉴가 생성되었습니다.')
        }
        this.formVisible = false
        this.fetchMenus()
      } catch (err) {
        this.$message.error(err.response?.data?.message || '저장 실패')
      }
    },
    async deleteMenu(node) {
      try {
        await deleteMenu(node.menuDTO.id)
        this.$message.success('메뉴가 삭제되었습니다.')
        this.fetchMenus()
      } catch (err) {
        this.$message.error('삭제 실패')
      }
    },
    handleNodeDrop(draggingNode, dropNode, type) {
      const dragged = draggingNode.data.menuDTO
      const dropped = dropNode.data.menuDTO

      let newParentId = null
      if (type === 'inner') {
        newParentId = dropped.id
      } else {
        newParentId = dropped.parentId
      }

      updateMenu(dragged.id, { parentId: newParentId })
        .then(() => {
          this.$message.success('메뉴 위치가 변경되었습니다.')
          this.fetchMenus()
        })
        .catch(() => {
          this.$message.error('메뉴 이동 실패')
        })
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
