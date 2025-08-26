<template>
  <el-form ref="menuFormRef" :model="menuForm" :rules="rules" label-width="120px">
    <el-form-item label="메뉴 이름" prop="name">
      <el-input v-model="menuForm.name" />
    </el-form-item>

    <el-form-item label="타입" prop="type">
      <el-select v-model="menuForm.type" placeholder="타입 선택">
        <el-option label="디렉토리" value="DIR" />
        <el-option label="프로그램" value="PROGRAM" />
      </el-select>
    </el-form-item>

    <el-form-item v-if="menuForm.type === 'PROGRAM'" label="프로그램" prop="programId">
      <el-select v-model="menuForm.programId" placeholder="프로그램 선택">
        <el-option v-for="program in programs" :key="program.id" :label="program.name" :value="program.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="상위 메뉴">
      <el-select v-model="menuForm.parentId" placeholder="상위 메뉴 선택" clearable>
        <el-option v-for="menu in flatMenuList" :key="menu.id" :label="menu.name" :value="menu.id" />
      </el-select>
    </el-form-item>

    <el-form-item label="아이콘">
      <el-select v-model="menuForm.icon" filterable placeholder="아이콘 선택">
        <el-option v-for="icon in iconOptions" :key="icon.value" :label="icon.label" :value="icon.value">
          <i :class="icon.value" style="margin-right: 8px;" />{{ icon.label }}
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="권한" prop="roles">
      <el-select v-model="menuForm.roles" placeholder="권한 선택">
        <el-option label="admin" value="admin" />
        <el-option label="guest" value="guest" />
      </el-select>
    </el-form-item>

    <el-form-item label="활성화">
      <el-switch v-model="menuForm.ableState" active-value="ABLE" inactive-value="DISABLE" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit">저장</el-button>
      <el-button @click="handleCancel">취소</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchProgramList } from '@/api/program'
import { getMenu } from '@/api/menu'
import { extractElIcons } from '@/utils/iconHelper'

export default {
  name: 'MenuForm',
  props: {
    menuData: {
      type: Object,
      default: () => ({})
    },
    selectedNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      menuForm: {
        id: null,
        name: '',
        type: 'DIR',
        programId: null,
        parentId: null,
        icon: '',
        roles: 'guest',
        ableState: 'ABLE'
      },
      programs: [],
      allMenus: [], // 전체 메뉴 리스트,
      iconOptions: [],
      rules: {
        name: [{ required: true, message: '메뉴 이름을 입력하세요', trigger: 'blur' }],
        type: [{ required: true, message: '타입을 선택하세요', trigger: 'change' }],
        programId: [
          { required: function() { return this.menuForm.type === 'PROGRAM' }, message: '프로그램 선택 필수', trigger: 'change' }
        ],
        roles: [{ required: true, message: '권한 선택 필수', trigger: 'change' }]
      }
    }
  },
  computed: {
    flatMenuList() {
      // DTO 리스트에서 id와 name만 추출
      return this.allMenus.map(m => ({ id: m.id, name: m.name }))
    }
  },
  watch: {
    menuData: {
      immediate: true, // 컴포넌트 생성 시에도 반영
      deep: true, // 객체 내부 속성도 감시
      handler(newVal) {
        // prop이 바뀔 때마다 내부 상태 초기화
        this.menuForm = { ...newVal }
      }
    },
    selectedNode: {
      immediate: true, // 컴포넌트 생성 시에도 반영
      deep: true, // 객체 내부 속성도 감시
      handler(newVal) {
        // prop이 바뀔 때마다 내부 상태 초기화
        if (!newVal || this.menuForm.id) return
        this.menuForm.parentId = this.selectedNode.menuDTO.id
      }
    }
  },
  mounted() {
    this.fetchPrograms()
    this.fetchMenus()
    this.iconOptions = extractElIcons()
  },
  methods: {
    async fetchPrograms() {
      try {
        const res = await fetchProgramList()
        this.programs = res.content
      } catch (err) {
        this.$message.error('프로그램 목록을 불러오는데 실패했습니다.')
      }
    },
    async fetchMenus() {
      try {
        const res = await getMenu()
        this.allMenus = res // axios response 기준
      } catch (err) {
        this.$message.error('메뉴 목록을 불러오는데 실패했습니다.')
      }
    },
    handleSubmit() {
      this.$refs.menuFormRef.validate(valid => {
        if (!valid) return
        this.$emit('submit', { ...this.menuForm })
      })
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
