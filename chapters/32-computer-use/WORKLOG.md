## 2026-04-08
- 改动：新增 `32-computer-use` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要补上 2025-2026 年最关键的新主题之一，即屏幕级 Agent 的像素交互、安全边界和成本结构。
- 自测：计划执行 `node --check chapters/32-computer-use/chapter.js`，再用浏览器加载临时验证页确认章节已注册、`getSvg()` 正常输出且控制台无错误。
- 风险/踩坑：当前 `index.html` 仍是内联旧副本，本次按要求只维护外部章节文件与注册表，因此浏览器验证改为临时加载 `registry.js + helpers.js + chapter.js` 的真实页面路径。
