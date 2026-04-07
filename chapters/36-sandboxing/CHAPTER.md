# Chapter 36 · sandboxing

上次更新：2026-04-08
变更说明：Phase C 新增章节，覆盖安全执行、权限模型和文件系统 / 网络隔离。

## 定位

解释为什么 Agent 一旦具备 shell、浏览器或代码执行能力，就必须把“隔离”当成默认前提，而不是可选增强。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `04-shell`
- 再读本章
- 然后读 `26-guardrails` 与 `32-computer-use`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.box / S.arrow / S.dashed / S.label`
- 被依赖：`38-agent-harness`、`40-failure-modes` 可复用本章关于信任边界和执行隔离的定义

## 扩展点

- 可继续补充 secret redaction、network allowlist、mount policy 和 approval escalation

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
