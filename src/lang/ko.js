export default {
  route: {
    dashboard: '대시보드',
    documentation: '문서 관리',
    guide: '가이드',
    permission: '권한 관리',
    pagePermission: '페이지 권한',
    rolePermission: '역할 권한',
    directivePermission: '지시어 권한',
    icons: '아이콘 관리',
    components: '컴포넌트',
    tinymce: 'tinymce 에디터',
    markdown: 'Markdown 에디터',
    jsonEditor: 'JSON 편집기',
    dndList: '드래그 리스트',
    splitPane: 'SplitPane',
    avatarUpload: '아바타 업로드',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: '카운트업',
    componentMixin: '컴포넌트 믹스인',
    backToTop: '맨 위로',
    dragDialog: '드래그 다이얼로그',
    dragSelect: '드래그 셀렉트',
    dragKanban: '드래그 칸반',
    charts: '차트',
    keyboardChart: '키보드 차트',
    lineChart: '라인 차트',
    mixChart: '믹스 차트',
    example: '예제',
    nested: '중첩 라우팅',
    menu1: '메뉴 1',
    'menu1-1': '메뉴 1-1',
    'menu1-2': '메뉴 1-2',
    'menu1-2-1': '메뉴 1-2-1',
    'menu1-2-2': '메뉴 1-2-2',
    'menu1-3': '메뉴 1-3',
    menu2: '메뉴 2',
    Table: '테이블',
    dynamicTable: '동적 테이블',
    dragTable: '드래그 테이블',
    inlineEditTable: '인라인 편집',
    complexTable: '복합 테이블',
    tab: '탭',
    form: '폼',
    createArticle: '글 작성',
    editArticle: '글 수정',
    articleList: '글 목록',
    errorPages: '에러 페이지',
    page401: '401',
    page404: '404',
    errorLog: '에러 로그',
    excel: '엑셀',
    exportExcel: '엑셀 내보내기',
    selectExcel: '선택 내보내기',
    mergeHeader: '헤더 병합',
    uploadExcel: '엑셀 업로드',
    zip: '압축',
    pdf: 'PDF',
    exportZip: 'ZIP 내보내기',
    theme: '테마',
    clipboardDemo: '클립보드',
    i18n: '다국어',
    externalLink: '외부 링크',
    profile: '프로필',
    programManagement: '프로그램 관리'
  },
  navbar: {
    dashboard: '대시보드',
    github: '깃허브',
    logOut: '로그아웃',
    profile: '프로필',
    theme: '테마',
    size: '전체 크기'
  },
  login: {
    title: '로그인 폼',
    logIn: '로그인',
    username: '아이디',
    password: '비밀번호',
    any: '아무거나',
    thirdparty: '또는 외부 계정으로 로그인',
    thirdpartyTips: '로컬에서는 제3자 로그인을 시뮬레이션할 수 없습니다. 직접 구현해 주세요.'
  },
  documentation: {
    documentation: '문서',
    github: '깃허브 저장소'
  },
  permission: {
    addRole: '새 역할 추가',
    editPermission: '권한 수정',
    roles: '내 역할',
    switchRoles: '역할 전환',
    tips: '일부 경우에는 v-permission이 작동하지 않습니다. 예: el-tab, el-table-column 같은 경우 v-if를 사용해야 합니다.',
    delete: '삭제',
    confirm: '확인',
    cancel: '취소'
  },
  guide: {
    description: '이 페이지는 프로젝트에 처음 들어온 사람들을 위한 가이드입니다. 주요 기능들을 간단히 소개할 수 있습니다.',
    button: '가이드 보기'
  },
  components: {
    documentation: '문서',
    tinymceTips: '리치 텍스트는 관리자 시스템의 핵심 기능입니다. 많은 에디터를 비교한 결과 Tinymce를 선택했습니다.',
    dropzoneTips: '비즈니스 요구사항에 맞춰 직접 구현한 이미지 업로더입니다. 상세 코드는 @/components/Dropzone 참고.',
    stickyTips: '페이지가 특정 위치에 도달하면 상단에 고정됩니다.',
    backToTopTips1: '지정 위치에 도달하면 하단에 "맨 위로" 버튼이 나타납니다.',
    backToTopTips2: '버튼 스타일, 표시 여부, 위치 등을 커스터마이징할 수 있습니다. el-tooltip과 함께 사용할 수도 있습니다.',
    imageUploadTips: 'vue@1 버전 기준으로 개발되어 mockjs와 호환되지 않아서 수정했습니다. 가능하면 공식 버전을 사용하세요.'
  },
  table: {
    dynamicTips1: '헤더 고정, 헤더 순서대로 정렬',
    dynamicTips2: '헤더 비고정, 클릭 순서대로 정렬',
    dragTips1: '기본 순서',
    dragTips2: '드래그 후 순서',
    title: '제목',
    importance: '중요도',
    type: '유형',
    remark: '비고',
    search: '검색',
    add: '추가',
    export: '내보내기',
    reviewer: '검토자',
    id: 'ID',
    date: '날짜',
    author: '작성자',
    readings: '조회수',
    status: '상태',
    actions: '작업',
    edit: '수정',
    publish: '발행',
    draft: '임시 저장',
    delete: '삭제',
    cancel: '취소',
    confirm: '확인'
  },
  example: {
    warning: '작성 및 수정 페이지는 keep-alive 캐시가 적용되지 않습니다. 캐싱이 필요하다면 localStorage 등을 활용하세요.'
  },
  errorLog: {
    tips: '오른쪽 상단의 버그 아이콘을 클릭하세요.',
    description: 'SPA 형식의 시스템에서는 사용자 경험이 향상되지만 오류 발생 시 전체 페이지가 영향을 받을 수 있습니다. Vue에서는 예외를 포착하고 처리할 수 있는 방법을 제공합니다.',
    documentation: '문서 보기'
  },
  excel: {
    export: '내보내기',
    selectedExport: '선택 항목 내보내기',
    placeholder: '파일명을 입력하세요 (기본: excel-list)'
  },
  zip: {
    export: '내보내기',
    placeholder: '파일명을 입력하세요 (기본: file)'
  },
  pdf: {
    tips: 'window.print()를 사용하여 PDF 다운로드 기능을 구현했습니다.'
  },
  theme: {
    change: '테마 변경',
    documentation: '테마 문서',
    tips: 'navbar의 테마 선택과는 다른 방식이며, 적용 시점과 대상이 다릅니다. 문서를 참고하세요.'
  },
  tagsView: {
    refresh: '새로고침',
    close: '닫기',
    closeOthers: '다른 탭 닫기',
    closeAll: '모두 닫기'
  },
  settings: {
    title: '페이지 스타일 설정',
    theme: '테마 색상',
    tagsView: 'Tags-View 켜기',
    fixedHeader: '헤더 고정',
    sidebarLogo: '사이드바 로고 표시'
  }
}
