## 2026-04-08
- 改动：新增 `33-skills-system` 目录及 `PLAN.md / chapter.js / CHAPTER.md / WORKLOG.md`，并在 `manifest.js` 末尾追加章节注册。
- 原因：Phase C 需要把 2025-2026 年兴起的 Skills / Plugin / Subagent 体系单独抽出来，和早期“Skill 是什么”区分开。
- 自测：计划执行 `node --check chapters/33-skills-system/chapter.js`，再通过浏览器临时加载外部 `registry.js + helpers.js + chapter.js` 验证注册、SVG 与扩展字段。
- 风险/踩坑：本章与 `02-skill` 概念相邻，因此文案重点放在“系统层”而非“单个 Skill 文件定义”，避免重复。
