## 2026-04-07
- 改动：为 `chapter.js` 新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 双语字段，更新 `CHAPTER.md` 顶部说明，并新增 `PLAN.md`。
- 原因：把多 Agent 通信章节补成可结构化导航的数据节点，特别强化对“不是群聊而是交接”的认知。
- 自测：执行 `node --check chapters/08-multi-agent/chapter.js`，确认语法通过。
- 风险/踩坑：本章最容易落入概念拟人化，因此新增误区专门压实“显式契约 + 工作流搬运”的主线。
