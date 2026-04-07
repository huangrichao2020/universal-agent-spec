## 2026-04-08
- 改动：为 `chapter.js` 的中英文内容新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 字段，补写 `PLAN.md`，并重写 `CHAPTER.md` 顶部维护信息和文件说明。
- 原因：Phase B 需要让记忆架构章节不仅解释存储形态，还能表达 2026 年的写入治理、污染控制与章节串联关系。
- 自测：执行 `node --check chapters/24-memory-arch/chapter.js` 做真实语法校验；随后刷新本地页面确认章节注册与渲染正常。
- 风险/踩坑：原 `CHAPTER.md` 信息极少，本次是增量补全而非删逻辑；新增字段暂未必被 UI 渲染，重点先保证数据兼容。
