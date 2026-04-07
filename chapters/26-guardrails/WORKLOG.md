## 2026-04-08
- 改动：为 `chapter.js` 的中英文内容新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 字段，补写 `PLAN.md`，并重写 `CHAPTER.md` 顶部维护信息与文件说明。
- 原因：Phase B 需要让护栏章节覆盖 2026 年运行时策略、审批治理和工具权限控制的最新实践，而不只是保留基础概念。
- 自测：执行 `node --check chapters/26-guardrails/chapter.js` 做真实语法校验；随后刷新本地页面确认章节注册与渲染正常。
- 风险/踩坑：原 `CHAPTER.md` 过于简略，本次是补全维护文档；新增字段当前未必被 UI 展示，因此优先保证结构兼容和链接真实性。
