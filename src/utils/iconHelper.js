// utils/iconHelper.js
export function extractElIcons() {
  const icons = []
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText && rule.selectorText.startsWith('.el-icon-')) {
          const className = rule.selectorText.split(':')[0].replace('.', '')
          icons.push({
            value: className,
            label: className.replace('el-icon-', '')
          })
        }
      }
    } catch (e) {
      // CORS 제한 걸린 외부 CSS는 무시
    }
  }
  return [...new Set(icons.map((i) => i.value))].map((v) => ({
    value: v,
    label: v.replace('el-icon-', '')
  }))
}
