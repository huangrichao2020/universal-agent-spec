## 2026-04-08
- 改动：补充本章的 2026 视角、常见误区、延伸阅读、交叉引用，并更新章节交接文档。
- 原因：让推理模式章节在 Phase B 中具备统一的新元数据结构，并与相邻章节建立导航关系。
- 自测：执行 `node --check chapters/13-reasoning/chapter.js`；通过 `curl -I http://127.0.0.1:8000/chapters/13-reasoning/chapter.js` 确认静态文件可访问；再用 Node `vm` 按 `window.AgentSpec.register()` 方式真实执行章节文件，确认能成功注册、返回 SVG，并包含新增四类字段。
- 风险/踩坑：需区分“推理模式”与“推理+行动框架”，避免把 ReAct/Plan-and-Execute 的内容提前塞进本章。
