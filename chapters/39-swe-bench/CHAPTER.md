# Chapter 39 · swe-bench

上次更新：2026-04-08
变更说明：Phase C 新增章节，覆盖 Agent benchmark 全景与评测组合。

## 定位

解释为什么公开 benchmark 很重要，但永远只是代理指标，而不是生产可靠性的直接替代品。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `27-evaluation`
- 再读本章
- 然后读 `28-coding-agents` 与 `29-case-studies`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.timeline / S.box / S.label`
- 被依赖：`40-failure-modes` 可借用本章关于 failure clustering 和评测盲区的说明

## 扩展点

- 可继续补充私有回放集、线上回归、运行预算和 harness disclosure 模板

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
