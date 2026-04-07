## 2026-04-07
- 改动：为 `chapter.js` 增加 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 双语字段，更新 `CHAPTER.md` 顶部维护说明，并新增 `PLAN.md`。
- 原因：把“记忆文件”从描述性章节升级为带延伸阅读和关系指针的结构化内容节点，方便后续统一展示。
- 自测：执行 `node --check chapters/01b-memory-files/chapter.js`，确认语法通过。
- 风险/踩坑：本章与 `01b-memory` 概念接近，因此交叉引用中刻意强调“文件落地层”和“抽象策略层”的区别。
