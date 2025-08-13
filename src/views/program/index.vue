<template>
  <div class="app-container">
    <!-- 필터 영역 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="프로그램명"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.ableState" placeholder="사용 여부" clearable class="filter-item" style="width: 140px;">
        <el-option label="활성" value="ABLE" />
        <el-option label="비활성" value="DISABLE" />
      </el-select>
      <el-button type="primary" icon="el-icon-search" class="filter-item" @click="handleFilter">검색</el-button>
      <el-button type="primary" icon="el-icon-plus" class="filter-item" @click="handleCreate">추가</el-button>
    </div>

    <!-- 테이블 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="name" label="프로그램명" min-width="150" />
      <el-table-column prop="frontPath" label="프론트 경로" min-width="150" />
      <el-table-column prop="path" label="백엔드 서비스" min-width="150" />
      <el-table-column prop="apiKey" label="API Key" min-width="150" />
      <el-table-column prop="description" label="설명" min-width="200" />
      <el-table-column prop="ableState" label="사용 여부" width="100" />
      <el-table-column label="작업" width="180" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">수정</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row, $index)">삭제</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 페이징 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <!-- 등록/수정 다이얼로그 -->
    <el-dialog :title="dialogStatus === 'create' ? '프로그램 등록' : '프로그램 수정'" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-width="120px">
        <el-form-item label="프로그램명" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="프론트 경로" prop="frontPath">
          <el-input v-model="temp.frontPath" />
        </el-form-item>
        <el-form-item label="백엔드 서비스" prop="path">
          <el-input v-model="temp.path" />
        </el-form-item>
        <el-form-item label="API Key" prop="apiKey">
          <el-input v-model="temp.apiKey" />
        </el-form-item>
        <el-form-item label="설명" prop="description">
          <el-input v-model="temp.description" type="textarea" />
        </el-form-item>
        <el-form-item label="사용 여부" prop="ableState">
          <el-select v-model="temp.ableState" placeholder="선택">
            <el-option label="활성" value="ABLE" />
            <el-option label="비활성" value="DISABLE" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">취소</el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">저장</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchProgramList, createProgram, updateProgram, deleteProgram } from '@/api/program'
import Pagination from '@/components/Pagination'

export default {
  name: 'ProgramManagement',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageSize: 10,
        name: '',
        ableState: ''
      },
      temp: {
        id: undefined,
        name: '',
        frontPath: '',
        path: '',
        apiKey: '',
        description: '',
        ableState: 'DISABLE'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: '프로그램명을 입력하세요', trigger: 'blur' }],
        frontPath: [{ required: true, message: '프론트 경로를 입력하세요', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchProgramList({
        page: this.listQuery.page - 1, // 백엔드 page 0부터 시작
        pageSize: this.listQuery.pageSize
      }).then(res => {
        this.list = res.content
        this.total = res.totalElements
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        frontPath: '',
        path: '',
        apiKey: '',
        description: '',
        ableState: 'DISABLE'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          createProgram(this.temp).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$message.success('프로그램이 생성되었습니다.')
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          updateProgram(this.temp).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$message.success('프로그램이 수정되었습니다.')
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('이 프로그램을 삭제하시겠습니까?', '확인', {
        type: 'warning'
      }).then(() => {
        deleteProgram(row.id).then(() => {
          this.$message.success('삭제되었습니다.')
          this.getList()
        })
      })
    }
  }
}
</script>
