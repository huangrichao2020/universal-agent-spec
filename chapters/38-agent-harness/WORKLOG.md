## 2026-04-08
- 改动：新增 `38-agent-harness` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要把“Agent 产品差异”从模型对比提升到 harness 对比，解释执行环境为何决定可用性。
- 自测：计划执行 `node --check chapters/38-agent-harness/chapter.js`，并在浏览器中用外部 `registry.js + helpers.js + chapter.js` 验证注册和 SVG。
- 风险/踩坑：本章容易和第 28 章重复，因此特意把焦点放在环境、权限、恢复和 review surface，而不是 benchmark 分数。
