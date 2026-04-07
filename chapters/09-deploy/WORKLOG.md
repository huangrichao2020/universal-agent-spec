## 2026-04-07
- 改动：为 `chapter.js` 新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 双语字段，更新 `CHAPTER.md` 顶部说明，并新增 `PLAN.md`。
- 原因：补齐部署章节的 2026 语境和相邻概念关系，让“本地 vs 云端”不只是静态对照，而是可继续扩展的结构化内容。
- 自测：执行 `node --check chapters/09-deploy/chapter.js`，确认语法通过。
- 风险/踩坑：本章没有代码块或表格，因此新增内容集中在结构化字段，不引入新的展示复杂度。
