# Chapter 38 · agent-harness

上次更新：2026-04-08
变更说明：Phase C 新增章节，横向比较 Claude Code、Codex、Cursor Agent 和 Devin 的执行外壳。

## 定位

说明为什么同一个底层模型放进不同 harness 里，会表现出完全不同的能力边界、延迟结构和审查体验。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `28-coding-agents`
- 再读本章
- 然后读 `35-long-horizon-tasks` 与 `36-sandboxing`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.box / S.label`
- 被依赖：`41-team-topology` 可借用本章对 review surface 和 autonomy envelope 的比较

## 扩展点

- 可继续补充 IDE 插件、terminal-native、cloud-runner、browser-runtime 的更细分维度

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
