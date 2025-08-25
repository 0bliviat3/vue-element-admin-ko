<template>
  <div class="board-builder-dialog">
    <!-- Kanban 영역 -->
    <div class="kanban-area">
      <div class="kanban-header">Board Builder</div>
      <draggable v-model="boardItems" :group="{ name: 'board', pull: true, put: true }" item-key="id">
        <div
          v-for="(element, index) in boardItems"
          :key="element.id"
          class="kanban-card"
          :style="{ gridColumn: 'span ' + element.colSpan }"
        >
          <div class="card-label">{{ element.label }}</div>
          <div class="card-actions">
            <el-button size="mini" type="primary" @click="openSettings(element)">⚙️</el-button>
            <el-button size="mini" type="danger" @click="removeItem(index)">✖️</el-button>
          </div>
        </div>
      </draggable>
    </div>

    <!-- 팔레트 영역 -->
    <div class="palette">
      <h3>Component Palette</h3>
      <draggable
        :list="paletteItems"
        :group="{ name: 'board', pull: 'clone', put: false }"
        :sort="false"
        item-key="id"
        :clone="cloneElement"
      >
        <el-card v-for="element in paletteItems" :key="element.id" class="palette-item">
          {{ element.label }}
        </el-card>
      </draggable>
    </div>

    <!-- 설정 슬라이드 패널 -->
    <el-drawer title="Settings" :visible.sync="drawerVisible" direction="rtl" size="400px" :modal="false">
      <el-form v-if="selectedElement" label-position="top" label-width="120px">
        <h4>{{ selectedElement.label }}</h4>
        <div v-if="selectedElement.type === 'input'">
          <el-form-item label="discription">
            <el-input v-model="selectedElement.settings.discription" />
          </el-form-item>
          <el-form-item label="Input Width">
            <el-input v-model="selectedElement.settings.width" />
          </el-form-item>
        </div>
        <div v-else-if="selectedElement.type === 'select'">
          <el-form-item label="discription">
            <el-input v-model="selectedElement.settings.discription" />
          </el-form-item>
          <el-form-item label="Options (comma separated)">
            <el-input v-model="selectedElement.settings.options" />
          </el-form-item>
        </div>
        <div v-else-if="selectedElement.type === 'editor'">
          <el-form-item label="discription">
            <el-input v-model="selectedElement.settings.discription" />
          </el-form-item>
          <el-form-item label="Editor Type">
            <el-select v-model="selectedElement.settings.editor">
              <el-option label="Markdown" value="markdown" />
              <el-option label="JSON" value="json" />
              <el-option label="TinyMCE" value="tinymce" />
            </el-select>
          </el-form-item>
        </div>
        <div v-else-if="selectedElement.type === 'file'">
          <el-form-item label="discription">
            <el-input v-model="selectedElement.settings.discription" />
          </el-form-item>
        </div>
      </el-form>
      <div class="drawer-footer" style="text-align: left; margin-top: 20px;">
        <el-button @click="drawerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="drawerVisible = false">OK</el-button>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'BoardBuilderDialog',
  components: { draggable },
  props: {
    initData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      boardItems: [],
      paletteItems: [
        { id: 'input', label: 'Input Box', colSpan: 1, type: 'input', defaultSettings: { width: '100%' }, settings: {}},
        { id: 'select', label: 'Select Box', colSpan: 1, type: 'select', defaultSettings: { options: '' }, settings: {}},
        { id: 'editor', label: 'Editor', colSpan: 2, type: 'editor', defaultSettings: { editor: 'markdown' }, settings: {}},
        { id: 'file', label: 'File Upload', colSpan: 2, type: 'file', defaultSettings: {}, settings: {}}
      ],
      drawerVisible: false,
      selectedElement: null
    }
  },
  created() {
    // 수정 모드일 경우 초기 데이터 세팅
    if (this.initData && this.initData.length > 0) {
      console.log('Initializing board with data:', this.initData)
      this.boardItems = this.initData
    }
  },
  methods: {
    cloneElement(element) {
      return { ...element, id: element.id + '-' + Date.now(), settings: { ...element.defaultSettings }}
    },
    openSettings(element) {
      this.selectedElement = element
      this.drawerVisible = true
    },
    removeItem(index) {
      this.boardItems.splice(index, 1)
    },
    // 👉 index.vue에서 사용할 데이터 추출 메서드
    getData() {
      return JSON.parse(JSON.stringify(this.boardItems))
    }
  }
}
</script>

<style scoped>
.board-builder-dialog {
    display: flex;
    gap: 20px;
}

.kanban-area {
    flex: 2;
    background: #f0f0f0;
    border-radius: 4px;
    padding: 10px;
}

.kanban-header {
    height: 50px;
    line-height: 50px;
    background: #333;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 3px;
}

.kanban-card {
    background: #fff;
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    cursor: grab;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    position: relative;
}

.card-actions {
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
}

.palette {
    flex: 1;
    background: #f7f7f7;
    padding: 10px;
    border-radius: 4px;
}

.palette h3 {
    text-align: center;
    margin-top: 0;
}

.palette-item {
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    padding: 5px;
}
</style>
