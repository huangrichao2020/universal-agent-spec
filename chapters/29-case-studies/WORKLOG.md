## 2026-04-08
- 改动：为 `chapter.js` 的中英文内容新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 字段，补写 `PLAN.md`，并重写 `CHAPTER.md` 顶部维护信息与文件说明。
- 原因：Phase B 需要让案例章节不仅罗列场景，还能表达 2026 年真实落地中的共性约束、复用方法和跨章节链接。
- 自测：执行 `node --check chapters/29-case-studies/chapter.js` 做真实语法校验；随后刷新本地页面确认章节注册与渲染正常。
- 风险/踩坑：原 `CHAPTER.md` 信息极简，本次是在不删原逻辑前提下补全维护文档；新增字段当前主要供后续渲染扩展使用。
