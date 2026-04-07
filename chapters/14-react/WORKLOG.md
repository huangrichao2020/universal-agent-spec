## 2026-04-08
- 改动：补充本章的 2026 视角、常见误区、延伸阅读、交叉引用，并更新章节交接文档。
- 原因：让 ReAct 章节对齐 Phase B 数据结构，同时为后续 `15-plan-execute` 提供清晰前置关系。
- 自测：执行 `node --check chapters/14-react/chapter.js`；通过 `curl -I http://127.0.0.1:8000/chapters/14-react/chapter.js` 确认静态文件可访问；再用 Node `vm` 按 `window.AgentSpec.register()` 方式真实执行章节文件，确认能成功注册、返回 SVG，并包含新增四类字段。
- 风险/踩坑：需避免把 ReAct 变体、纯推理模式和规划执行模式混写，导致章节边界失焦。
