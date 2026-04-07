## 2026-04-08
- 改动：补充本章的 2026 视角、常见误区、延伸阅读、交叉引用，并更新章节交接文档。
- 原因：对齐 Phase B 新数据结构，确保内容深挖章节在前端渲染层有统一元信息。
- 自测：执行 `node --check chapters/12-tool-use/chapter.js`；启动 `python3 -m http.server 8000` 后用 `curl -I http://127.0.0.1:8000/chapters/12-tool-use/chapter.js` 确认静态文件可访问；再用 Node `vm` 按 `window.AgentSpec.register()` 方式真实执行章节文件，确认能成功注册、返回 SVG，并包含新增四类字段。
- 风险/踩坑：需避免破坏原有字段顺序与字符串转义，尤其是 HTML 字符串和 JSON 片段示例。
