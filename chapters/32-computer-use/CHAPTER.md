# Chapter 32 · computer-use

上次更新：2026-04-08
变更说明：Phase C 新增章节，补充屏幕级 Agent、像素交互、安全边界与成本权衡。

## 定位

解释为什么“会看屏幕、会点按钮”的 Agent 是 API Agent 的补集，而不是替代品。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `12-tool-use`
- 再读本章
- 然后读 `26-guardrails` 与 `28-coding-agents`

## 依赖与被依赖

- 依赖：`core/helpers.js` 提供 `S.layerStack / S.box / S.arrow / S.dashed / S.label`
- 被依赖：后续 `36-sandboxing`、`40-failure-modes` 可复用本章关于真实界面执行的风险描述

## 扩展点

- 后续如需加入更细的 DOM / screenshot / action loop，可在 `table` 或 `code` 字段继续扩展

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
