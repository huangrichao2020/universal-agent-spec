## 2026-04-08
- 改动：新增 `35-long-horizon-tasks` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要补上 2025-2026 年 Agent 系统里极其关键的“可中断、可恢复、可追踪”的长程任务能力。
- 自测：计划执行 `node --check chapters/35-long-horizon-tasks/chapter.js`，并在浏览器里执行外部 `registry.js + helpers.js + chapter.js` 做真实注册与 SVG 验证。
- 风险/踩坑：本章与图编排、记忆、handoff 都有重合，因此文案聚焦在“任务生命周期和恢复语义”上，而不是重复状态机基础概念。
