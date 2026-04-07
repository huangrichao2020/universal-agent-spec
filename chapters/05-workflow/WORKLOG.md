## 2026-04-07
- 改动：为 `chapter.js` 新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 双语字段，更新 `CHAPTER.md` 顶部说明，并新增 `PLAN.md`。
- 原因：把工作流章节补成可结构化引用的数据节点，方便与 Shell、Handoff 等相邻章节形成连续学习路径。
- 自测：执行 `node --check chapters/05-workflow/chapter.js`，确认语法通过。
- 风险/踩坑：本章示例代码已经存在，因此本次不再引入新的展示结构，只补字段和文档。
