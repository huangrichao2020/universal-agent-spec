## 2026-04-07
- 改动：为 `chapter.js` 新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 双语字段，并更新 `CHAPTER.md` 顶部维护信息，补写 `PLAN.md`。
- 原因：Phase B 需要把基础概念章节补成可持续迭代的数据结构，为后续统一渲染和章节串联预留字段。
- 自测：计划执行后运行 `node --check chapters/00-llm-api/chapter.js` 做真实语法检查。
- 风险/踩坑：当前渲染层尚未消费这些新字段，因此本次先保证数据结构正确，不改动全局渲染逻辑。
