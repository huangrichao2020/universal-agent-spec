# 通用 Agent 定义规范 · 项目架构手册

## 目录结构

```
agent-spec-v2/
├── index.html              # 主框架壳（只负责加载，不含内容）
├── manifest.js             # 章节注册表（唯一的耦合点）
├── core/
│   ├── styles.css          # 全局样式
│   ├── helpers.js          # SVG 绘图工具函数（S.box / S.label 等）
│   └── registry.js         # 章节注册器 + i18n 工具
├── chapters/
│   └── XX-name/
│       ├── chapter.js      # 章节数据（自注册）
│       └── CHAPTER.md      # 章节说明手册
├── DESIGN.md               # 本文件：架构说明
└── CONTRIBUTING.md         # 新增章节操作手册
```

---

## 架构原则

### 1. 松耦合
`index.html` 不直接引用任何章节文件。
章节通过 `manifest.js` 声明，由框架动态加载。
章节之间完全独立，互不引用。

### 2. 自注册模式
每个 `chapter.js` 调用 `window.AgentSpec.register(chapter)` 完成注册。
框架只需等所有脚本加载完毕，读取注册结果即可渲染。

### 3. i18n 优先
每个章节的所有文本（包括 SVG 内部文字）均分 `en` / `zh` 两套。
SVG 通过 `getSvg(lang)` 函数按语言返回不同内容。
默认语言：**English**。

### 4. 扩展点
- 新增章节：见 `CONTRIBUTING.md`
- 新增语言：在 `core/registry.js` 中的 `LANGS` 常量增加语言代码，各章节 `chapter.js` 补充对应文本
- 修改样式：只改 `core/styles.css`，不影响任何章节
- 修改 SVG 工具函数：只改 `core/helpers.js`

---

## 数据流

```
manifest.js（章节路径列表）
    ↓ index.html 动态插入 <script>
chapter.js × N（各章节自注册）
    ↓ AgentSpec.register()
window.AgentSpec.chapters[]（有序章节数组）
    ↓ Vue app 读取
渲染 → 响应语言切换 → 重渲染
```

---

## 章节数据结构

```js
{
  id: '00-llm-api',       // 唯一 ID，与目录名一致
  order: 0,               // 排序号

  // 导航标签（双语）
  nav:      { en: 'LLM API',    zh: '大模型 API' },

  // 卡片标题（可含 HTML）
  title:    { en: '...', zh: '...' },
  subtitle: { en: '...', zh: '...' },

  // 标签样式
  tag:      { en: 'Infrastructure', zh: '基础设施' },
  tagClass: 'tag-infra',

  // SVG 图示（双语，函数形式）
  viewBox: '0 0 760 300',
  getSvg(lang),  // lang: 'en' | 'zh'，返回 SVG 内容字符串

  // 正文内容（双语）
  content: {
    en: {
      definition: '',   // 核心定义（HTML）
      essence:    '',   // 本质解析（HTML）
      insight:    '',   // 洞见（HTML）
      code:       '',   // 代码块（可选，HTML with spans）
      table: {          // 对比表格（可选）
        title: '',
        headers: [],
        rows: []
      }
    },
    zh: { /* 同结构 */ }
  }
}
```
