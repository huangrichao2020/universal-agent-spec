## 2026-04-07
- 改动：在 `chapter.js` 中新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 双语字段，并更新 `CHAPTER.md` 顶部说明，新增 `PLAN.md`。
- 原因：补齐 Shell Program 章节的 2026 背景和前后章节关系，使它从“定义说明”升级为可串联的结构化节点。
- 自测：执行 `node --check chapters/04-shell/chapter.js`，确认语法有效。
- 风险/踩坑：本章没有现成代码块，因此本次聚焦结构化字段补齐，不额外引入新的展示类型。
