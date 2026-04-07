## 2026-04-08
- 改动：新增 `36-sandboxing` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要把 2025-2026 年编程 Agent 和屏幕级 Agent 里最关键的“安全执行边界”单独讲清楚。
- 自测：计划执行 `node --check chapters/36-sandboxing/chapter.js`，并用浏览器临时执行外部 `registry.js + helpers.js + chapter.js` 验证注册和 SVG。
- 风险/踩坑：本章容易沦为安全口号，因此内容尽量落到最小权限、目录白名单、网络隔离和审批节点这些具体机制。
