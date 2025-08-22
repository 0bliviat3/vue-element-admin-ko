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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="80%"
      destroy-on-close
    >
      <BoardBuilderDialog
        ref="boardBuilder"
        :init-data="editingBoard"
        @save="handleSaveBoard"
      />
    </el-dialog>
  </div>
</template>

<script>
import BoardBuilderDialog from './BoardBuilderDialog.vue'
import { getBoardList, saveBoard, updateBoard, deleteBoardById } from '@/api/board'

export default {
  components: { BoardBuilderDialog },
  data() {
    return {
      boardList: [],
      dialogVisible: false,
      dialogTitle: 'Create Board',
      editingBoard: null
    }
  },
  created() {
    this.fetchBoards()
  },
  methods: {
    fetchBoards() {
      getBoardList().then(res => {
        this.boardList = res.data
      })
    },
    openCreateDialog() {
      this.dialogTitle = 'Create Board'
      this.editingBoard = null
      this.dialogVisible = true
    },
    openEditDialog(board) {
      this.dialogTitle = 'Edit Board'
      this.editingBoard = board
      this.dialogVisible = true
    },
    handleSaveBoard(boardJson) {
      // boardJson은 Kanban Layout JSON
      const payload = {
        ...this.editingBoard,
        layout: boardJson
      }

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
