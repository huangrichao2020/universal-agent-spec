## 2026-04-08
- 改动：补充本章的 2026 视角、常见误区、延伸阅读、交叉引用，修复占位版 `CHAPTER.md`，并新增 `PLAN.md`。
- 原因：让 MCP 章节对齐 Phase B 数据结构，同时补齐目录级交接文档，避免协议职责边界表达含混。
- 自测：执行 `node --check chapters/16-mcp/chapter.js`；通过 `curl -I http://127.0.0.1:8000/chapters/16-mcp/chapter.js` 确认静态文件可访问；再用 Node `vm` 按 `window.AgentSpec.register()` 方式真实执行章节文件，确认能成功注册、返回 SVG，并包含新增四类字段。
- 风险/踩坑：需避免对 MCP 生态演进做过度具体且无法在本仓库内验证的断言，因此新增内容保持职责层面的稳定表述。
