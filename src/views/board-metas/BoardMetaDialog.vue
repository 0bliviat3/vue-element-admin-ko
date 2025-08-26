<template>
  <div class="board-meta-dialog">
    <el-form ref="metaForm" :model="meta" label-width="120px">
      <el-form-item label="게시판 이름" prop="title">
        <el-input v-model="meta.title" />
      </el-form-item>

      <el-form-item label="게시판 설명" prop="description">
        <el-input v-model="meta.description" type="textarea" />
      </el-form-item>

      <el-form-item label="접근 권한" prop="role">
        <el-select v-model="meta.roles" multiple placeholder="권한 선택">
          <el-option label="ROLE_USER" value="USER" />
          <el-option label="ROLE_ADMIN" value="ADMIN" />
        </el-select>
      </el-form-item>

      <el-form-item label="댓글 사용" prop="useComment">
        <el-switch v-model="meta.useComment" />
      </el-form-item>

      <el-form-item label="활성 여부" prop="ableState">
        <el-select v-model="meta.ableState" placeholder="선택">
          <el-option label="활성" value="ABLE" />
          <el-option label="비활성" value="DISABLE" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BoardMetaDialog',
  props: {
    initData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      meta: {
        title: '',
        description: '',
        roles: [],
        useComment: true,
        createdBy: '',
        ableState: 'ABLE'
      }
    }
  },
  created() {
    if (this.initData) {
      this.meta = {
        ...this.meta,
        ...this.initData,
        roles: this.initData.roles ? JSON.parse(this.initData.roles) : []
      }
    }
  },
  methods: {
    getData() {
      return {
        ...this.meta,
        roles: JSON.stringify(this.meta.roles)
      }
    }
  }
}
</script>

<style scoped>
.board-meta-dialog {
    padding: 10px;
}
</style>
