## 2026-04-08
- 改动：新增 `41-team-topology` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 最后一章需要回答“人和 Agent 到底怎么共事”，把审批节点、信任层级和责任边界收束成组织视角。
- 自测：计划执行 `node --check chapters/41-team-topology/chapter.js`，并在浏览器中通过外部 `registry.js + helpers.js + chapter.js` 验证注册和 SVG。
- 风险/踩坑：本章容易写成管理口号，因此内容重点放在谁负责、何时审批、哪些工作该交给 Agent，而不是抽象愿景。
