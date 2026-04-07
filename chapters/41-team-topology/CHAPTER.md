# Chapter 41 · team-topology

上次更新：2026-04-08
变更说明：Phase C 新增章节，覆盖人机协作的组织拓扑、审批节点和信任层级。

## 定位

说明为什么“Human in the Loop”不是一个按钮，而是一套明确的职责分配和风险归属结构。

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
- 然后读 `35-long-horizon-tasks` 与 `40-failure-modes`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.sequence / S.label`
- 被依赖：后续若补组织实践或治理章节，可直接复用本章的 trust tiers 和 approval pattern

## 扩展点

- 可继续补充 team-wide review queue、ownership matrix、审批疲劳和 on-call escalation

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
