## 2026-04-08
- 改动：补充本章的 2026 视角、常见误区、延伸阅读、交叉引用，修复占位版 `CHAPTER.md`，并新增 `PLAN.md`。
- 原因：让 AG-UI 章节对齐 Phase B 数据结构，同时把“事件流 UI 协议”的独特价值与边界写清楚。
- 自测：执行 `node --check chapters/18-ag-ui/chapter.js`；通过 `curl -I http://127.0.0.1:8000/chapters/18-ag-ui/chapter.js` 确认静态文件可访问；再用 Node `vm` 按 `window.AgentSpec.register()` 方式真实执行章节文件，确认能成功注册、返回 SVG，并包含新增四类字段。
- 风险/踩坑：需避免把 AG-UI 降格成“只是文本流”，忽略状态同步、审批暂停和恢复语义这些真正决定体验的能力。
