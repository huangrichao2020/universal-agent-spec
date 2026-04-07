## 2026-04-08
- 改动：为 `chapter.js` 的中英文内容新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 字段，补写 `PLAN.md`，并重写 `CHAPTER.md` 顶部维护信息与文件说明。
- 原因：Phase B 要让评估章节覆盖 2026 年持续回归、线上回放、成本与安全并行考核的实践，而不只停留在 benchmark 概览。
- 自测：执行 `node --check chapters/27-evaluation/chapter.js` 做真实语法校验；随后刷新本地页面确认章节注册与渲染正常。
- 风险/踩坑：原 `CHAPTER.md` 信息极少，本次是在不删原逻辑前提下补全维护文档；新增字段当前主要供后续渲染扩展使用。
