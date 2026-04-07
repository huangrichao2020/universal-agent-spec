# Chapter 40 · failure-modes

上次更新：2026-04-08
变更说明：Phase C 新增章节，覆盖 Agent 的常见失败模式及恢复策略。

## 定位

把“Agent 为什么坏掉”从模糊印象变成可识别、可预防、可恢复的图谱。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `25-observability`
- 再读本章
- 然后读 `26-guardrails` 与 `34-context-engineering`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.stateMachine / S.label`
- 被依赖：`41-team-topology` 可复用本章关于何时应人工接管失败任务的判断

## 扩展点

- 可继续补充工具 schema drift、approval fatigue、stale checkpoint 等更细 failure class

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
