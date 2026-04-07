## 2026-04-08
- 改动：补充本章的 2026 视角、常见误区、延伸阅读、交叉引用，修复占位版 `CHAPTER.md`，并新增 `PLAN.md`。
- 原因：让 A2A 章节对齐 Phase B 数据结构，同时把 Agent 间协作与工具接入的职责边界写清楚。
- 自测：执行 `node --check chapters/17-a2a/chapter.js`；通过 `curl -I http://127.0.0.1:8000/chapters/17-a2a/chapter.js` 确认静态文件可访问；再用 Node `vm` 按 `window.AgentSpec.register()` 方式真实执行章节文件，确认能成功注册、返回 SVG，并包含新增四类字段。
- 风险/踩坑：需避免把 A2A 讲成“远程函数调用换皮”，否则会削弱 Agent Card、Task 生命周期和信任边界这些真正关键点。
