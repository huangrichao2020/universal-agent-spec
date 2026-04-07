## 2026-04-08
- 改动：为 `chapter.js` 的中英文内容新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 字段，补写 `PLAN.md`，并重写 `CHAPTER.md` 顶部维护信息与文件说明。
- 原因：Phase B 需要让学习路径章节从静态阅读清单升级为 2026 年更贴近真实成长方式的“学习 + 构建 + 评估”路线图。
- 自测：执行 `node --check chapters/31-learning-path/chapter.js` 做真实语法校验；随后刷新本地页面确认章节注册与渲染正常。
- 风险/踩坑：原 `CHAPTER.md` 信息极少，本次是在不删除原逻辑的前提下补全文档；新增字段当前主要供后续渲染扩展使用。
