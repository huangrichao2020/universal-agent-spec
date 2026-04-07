## 2026-04-08
- 改动：新增 `39-swe-bench` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要把 2025-2026 年 Agent 领域最常被引用的 benchmark 语境单独讲透，避免把 leaderboard 当生产结论。
- 自测：计划执行 `node --check chapters/39-swe-bench/chapter.js`，并在浏览器中用外部 `registry.js + helpers.js + chapter.js` 验证注册和 SVG。
- 风险/踩坑：本章容易和第 27 章重复，因此文案聚焦在“公开 benchmark 的作用与局限”，而不是泛化评测流程。
