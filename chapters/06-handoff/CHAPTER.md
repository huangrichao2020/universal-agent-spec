# Chapter 06 · handoff

上次更新：2026-04-07
变更说明：Phase B 升级，补充 2026 视角、常见误区、延伸阅读与交叉引用数据。

## 文件说明

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据与 SVG 图示（双语） |
| `CHAPTER.md` | 本手册 |

## 修改指南

### 修改文字内容
编辑 `chapter.js` 中的 `content.en` 或 `content.zh` 对应字段：
- `definition`：核心定义（支持 HTML）
- `essence`：本质解析（支持 HTML）
- `insight`：洞见提示
- `code`：代码块（可选）
- `table`：对比表格（可选）

### 修改 SVG 图示
编辑 `chapter.js` 中的 `getSvg(lang)` 函数。
- 所有文字必须通过 `t(lang, 'English', '中文')` 函数处理
- 使用 `window.AgentSpecHelpers` 提供的绘图工具
- viewBox 高度修改后，框架会自动上下各加 40px 呼吸空间

### 修改导航标签 / 标题 / 标签
直接修改 `chapter.js` 顶部的 `nav` / `title` / `subtitle` / `tag` 字段。

## 注意事项
- 修改此章节**无需改动** `index.html`、`manifest.js` 或其他章节文件
- `id` 和 `order` 字段不要随意修改，会影响导航排序和 URL 定位
