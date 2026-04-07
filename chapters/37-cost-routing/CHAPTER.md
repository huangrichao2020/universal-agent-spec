# Chapter 37 · cost-routing

上次更新：2026-04-08
变更说明：Phase C 新增章节，覆盖多模型路由、缓存与成本控制。

## 定位

解释为什么生产 Agent 的成本控制不是“永远用便宜模型”，而是按风险和不确定性做分层路由。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `10-light-heavy`
- 再读本章
- 然后读 `15-plan-execute` 与 `27-evaluation`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.box / S.arrow / S.label`
- 被依赖：`38-agent-harness`、`39-swe-bench` 可继续利用本章关于成本和质量权衡的判断框架

## 扩展点

- 可继续补充置信度阈值、预算上限、语义缓存相似度和降级策略

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
