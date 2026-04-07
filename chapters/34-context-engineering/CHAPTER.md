# Chapter 34 · context-engineering

上次更新：2026-04-08
变更说明：Phase C 新增章节，覆盖上下文窗口管理、压缩与检索注入。

## 定位

说明为什么现代 Agent 的关键工作不只是“写好 prompt”，而是持续管理有限上下文预算。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `01b-memory-files`
- 再读本章
- 然后读 `24-memory-arch` 与 `28-coding-agents`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.timeline / S.box / S.label`
- 被依赖：`35-long-horizon-tasks`、`40-failure-modes` 可复用本章关于压缩和上下文腐化的描述

## 扩展点

- 后续可继续补充 token budgeting、memory compaction 和 retrieval ranking 的更细分策略

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
