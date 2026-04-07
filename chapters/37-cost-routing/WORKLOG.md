## 2026-04-08
- 改动：新增 `37-cost-routing` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要补上 2025-2026 年 Agent 产品里极其现实的课题：如何在质量、延迟和 token 成本之间做路由。
- 自测：计划执行 `node --check chapters/37-cost-routing/chapter.js`，并在浏览器里用外部 `registry.js + helpers.js + chapter.js` 验证注册和 SVG。
- 风险/踩坑：本章容易落成“便宜模型推荐清单”，因此内容重点放在路由原则、缓存和评测闭环，而不是品牌比较。
