## 2026-04-08
- 改动：新增 `40-failure-modes` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要把生产 Agent 的高频失效模式系统化，避免把所有问题都简单归因于“模型不够强”。
- 自测：计划执行 `node --check chapters/40-failure-modes/chapter.js`，并在浏览器中通过外部 `registry.js + helpers.js + chapter.js` 验证注册和 SVG。
- 风险/踩坑：失败模式很容易写成空列表，本章尽量把信号、预防、恢复配成闭环，而不是只罗列坏现象。
