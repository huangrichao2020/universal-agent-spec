## 2026-04-07
- 改动：为 `chapter.js` 增加 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 双语字段，更新 `CHAPTER.md` 顶部维护说明，并新增 `PLAN.md`。
- 原因：将 Agent 章节从单纯定义说明扩展为带有 2026 语境和上下游导航能力的结构化节点。
- 自测：运行 `node --check chapters/03-agent/chapter.js`，语法检查通过后再提交。
- 风险/踩坑：本章已经较重，因此新增信息避免重复既有“成熟度”和“常驻指令”部分，只补当前缺失字段。
