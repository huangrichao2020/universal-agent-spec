## 2026-04-08
- 改动：为 `chapter.js` 的中英文内容新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 字段，补写 `PLAN.md`，并更新 `CHAPTER.md` 顶部维护信息。
- 原因：Phase B 要把章节从静态对比升级为可持续演进的数据结构，补齐 2026 视角与章节串联能力。
- 自测：执行 `node --check chapters/20-frameworks/chapter.js` 做真实语法校验；随后起本地静态服务，在浏览器中打开章节确认能正常注册与渲染。
- 风险/踩坑：当前渲染层未必消费新增字段，因此本次重点是保证数据结构、链接真实性和章节元信息一致性。
