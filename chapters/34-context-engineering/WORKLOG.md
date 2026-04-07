## 2026-04-08
- 改动：新增 `34-context-engineering` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要把 2025-2026 年被广泛讨论的 Context Engineering 单独成章，补上窗口预算、压缩和检索注入的工程视角。
- 自测：计划执行 `node --check chapters/34-context-engineering/chapter.js`，并通过浏览器临时执行 `registry.js + helpers.js + chapter.js` 验证注册与 SVG。
- 风险/踩坑：本章和 Prompt Engineering 容易被混淆，因此内容刻意围绕“预算管理与上下文装配”而非“文案技巧”展开。
