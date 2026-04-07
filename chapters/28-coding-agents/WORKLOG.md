## 2026-04-08
- 改动：为 `chapter.js` 的中英文内容新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 字段，补写 `PLAN.md`，并重写 `CHAPTER.md` 顶部维护信息与文件说明。
- 原因：Phase B 需要让编程 Agent 章节补上 2026 年委派、沙箱、上下文压缩和验证闭环的工程视角，而不只保留工具列表。
- 自测：执行 `node --check chapters/28-coding-agents/chapter.js` 做真实语法校验；随后刷新本地页面确认章节注册与渲染正常。
- 风险/踩坑：原 `CHAPTER.md` 过于简略，本次是在不删原逻辑的前提下补全文档；新增字段当前主要服务于后续渲染扩展。
