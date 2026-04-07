# Chapter 35 · long-horizon-tasks

上次更新：2026-04-08
变更说明：Phase C 新增章节，覆盖多日任务、checkpoint、resume 与进度追踪。

## 定位

解释为什么长程任务的本质不是“模型多聪明”，而是系统能否把状态写下来、停下来、再继续。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `06-handoff`
- 再读本章
- 然后读 `23-graph-orchestration` 与 `25-observability`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.timeline / S.box / S.label`
- 被依赖：`39-swe-bench`、`41-team-topology` 可继续引用本章关于恢复点和人工接管的定义

## 扩展点

- 可继续补充 heartbeat schema、retry policy、任务租约和暂停原因枚举

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
