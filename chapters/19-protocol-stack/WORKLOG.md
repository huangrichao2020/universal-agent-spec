## 2026-04-08
- 改动：补充本章的 2026 视角、常见误区、延伸阅读、交叉引用，修复占位版 `CHAPTER.md`，并新增 `PLAN.md`。
- 原因：让协议栈章节对齐 Phase B 数据结构，同时把 16/17/18 三种协议的组合关系收束成统一视角。
- 自测：执行 `node --check chapters/19-protocol-stack/chapter.js`；通过 `curl -I http://127.0.0.1:8000/chapters/19-protocol-stack/chapter.js` 确认静态文件可访问；再用 Node `vm` 按 `window.AgentSpec.register()` 方式真实执行章节文件，确认能成功注册、返回 SVG，并包含新增四类字段。
- 风险/踩坑：需避免把本章写成前三章的简单拼接，因此新增内容聚焦分层边界、组合方式和跨层治理。
