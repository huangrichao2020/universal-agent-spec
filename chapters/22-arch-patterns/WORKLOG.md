## 2026-04-08
- 改动：为 `chapter.js` 的中英文内容新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 字段，补写 `PLAN.md`，并更新 `CHAPTER.md` 顶部维护信息。
- 原因：Phase B 要把架构模式章节从静态分类表升级为可扩展的工程决策节点，补上 2026 视角和章节串联。
- 自测：执行 `node --check chapters/22-arch-patterns/chapter.js` 做真实语法校验；随后刷新本地页面确认章节注册与渲染正常。
- 风险/踩坑：新增字段暂未被全局 UI 消费，因此本轮优先保证结构正确、链接真实、与现有章节文案不冲突。
