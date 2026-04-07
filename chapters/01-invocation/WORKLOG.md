## 2026-04-07
- 改动：为 `chapter.js` 追加 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 双语字段，并更新 `CHAPTER.md` 头部信息，新增 `PLAN.md`。
- 原因：让“单次调用”章节具备与前后章节串联的结构化数据，为 Phase B 后续统一展示与知识导航打基础。
- 自测：执行 `node --check chapters/01-invocation/chapter.js`，确认文件语法有效。
- 风险/踩坑：新增字段当前不会被全局渲染层展示，因此重点是保证命名和双语结构一致。
