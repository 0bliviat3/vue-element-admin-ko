<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="openCreateDialog">Create Board</el-button>

    <el-table :data="boardList" style="width: 100%; margin-top: 20px">
      <el-table-column prop="title" label="Board Name" />
      <el-table-column prop="description" label="Description" />
      <el-table-column label="Actions" width="180">
        <template #default="{ row }">
          <el-button type="primary" size="mini" @click="openEditDialog(row)">Edit</el-button>
          <el-button type="danger" size="mini" @click="deleteBoard(row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Kanban Builder Dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="80%">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Meta Info" name="meta">
          <BoardMetaDialog ref="boardMeta" :init-data="editingBoard" />
        </el-tab-pane>
        <el-tab-pane label="Layout Builder" name="builder">
          <BoardBuilderDialog ref="boardBuilder" :init-data="editingLayout" />
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSaveBoard">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BoardBuilderDialog from './BoardBuilderDialog.vue'
import BoardMetaDialog from './BoardMetaDialog.vue'
import { getBoardList, saveBoard, updateBoard, deleteBoardById } from '@/api/board'

export default {
  components: { BoardBuilderDialog, BoardMetaDialog },
  data() {
    return {
      boardList: [],
      dialogVisible: false,
      dialogTitle: 'Create Board',
      editingBoard: null,
      editingLayout: null,
      activeTab: 'meta' // 탭 기본값
    }
  },
  created() {
    this.fetchBoards()
  },
  methods: {
    fetchBoards() {
      getBoardList().then(res => {
        this.boardList = res.content
      })
    },
    openCreateDialog() {
      this.dialogTitle = 'Create Board'
      this.editingBoard = null
      this.editingLayout = null
      this.dialogVisible = true
      this.activeTab = 'meta'
    },
    openEditDialog(board) {
      this.dialogTitle = 'Edit Board'
      this.editingBoard = board
      this.editingLayout = JSON.parse(board.formDefinitionJson)
      this.dialogVisible = true
      this.activeTab = 'meta'
    },
    async handleSaveBoard() {
      // 메타데이터 가져오기
      const metaData = this.$refs.boardMeta.getData()
      // 레이아웃 가져오기
      const layoutData = this.$refs.boardBuilder.getData()

      const payload = {
        ...metaData,
        formDefinitionJson: JSON.stringify(layoutData)
      }

      console.log(payload)

      const apiCall = this.editingBoard ? updateBoard : saveBoard
      apiCall(payload).then(() => {
        this.$message.success('Board saved successfully!')
        this.dialogVisible = false
        this.fetchBoards()
      })
    },
    deleteBoard(id) {
      deleteBoardById(id).then(() => {
        this.$message.success('Board deleted')
        this.fetchBoards()
      })
    }
  }
}
</script>
