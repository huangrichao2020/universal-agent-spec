# core/ 目录交接手册

## 定位

项目的基础设施层——提供 SVG 绘图工具、章节注册机制和全局样式，被所有 `chapters/XX/chapter.js` 依赖。

## 文件清单

| 文件 | 职责 | 全局对象 | 扩展点 |
|------|------|----------|--------|
| `helpers.js` | SVG 绘图工具函数（box/label/arrow/dashed/timeline/layerStack/stateMachine/sequence）+ 颜色常量 | `window.AgentSpecHelpers` | 在 H 对象中新增方法 |
| `registry.js` | 章节自注册器 + i18n 工具（register/getChapters/t）+ 语言列表 | `window.AgentSpec` | 在 LANGS 数组中新增语言 |
| `styles.css` | 全局样式 token（部分样式仍内联在 index.html 中） | — | 新增 CSS 变量或 class |

## 依赖关系

```
index.html
  └─ <script src="core/registry.js">   → window.AgentSpec
  └─ <script src="core/helpers.js">     → window.AgentSpecHelpers
  └─ <link href="core/styles.css">
  └─ <script src="manifest.js">         → window.AGENT_SPEC_MANIFEST
  └─ chapters/XX/chapter.js             → 调用 AgentSpec.register() + AgentSpecHelpers.*
```

- **被依赖方**：所有 `chapters/XX/chapter.js`、`index.html`
- **依赖方**：无（core 是最底层）

## 扩展指南

### 新增 SVG helper
在 `helpers.js` 的 H 对象中添加方法，方法内可通过 `this.box()` / `this.arrow()` 复用已有 helper。

### 新增颜色常量
在 `helpers.js` 的 `H.c` 对象中添加键值对。

### 新增语言
1. 在 `registry.js` 的 `LANGS` 数组中添加语言代码（如 `'ja'`）
2. 在 `LANG_NAMES` 中添加显示名
3. 所有 `chapters/XX/chapter.js` 的文本字段补充对应语言键

### 修改样式
只改 `styles.css`，不影响任何章节文件。注意 `index.html` 中也有内联样式，两者存在部分重复。

## 未完成 TODO

- [ ] `styles.css` 与 `index.html` 内联样式有大量重复，待整合
- [ ] 考虑将 `index.html` 中的 Vue 渲染逻辑抽到独立 `core/app.js`

## 维护人 / 上次更新

- 上次更新：2026-04-07
- 变更说明：Phase A 地基加固，新增交接手册，helpers.js 新增 4 个复合 SVG 函数
