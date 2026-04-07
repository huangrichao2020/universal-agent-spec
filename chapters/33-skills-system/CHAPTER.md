# Chapter 33 · skills-system

上次更新：2026-04-08
变更说明：Phase C 新增章节，覆盖 Skills、Plugin 分发、Subagent 复用与权限加载系统。

## 定位

解释“技能文件”之外的整套运行机制：技能如何被发现、何时被加载、用什么权限执行、何时切到子 Agent。

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据、双语文案与 SVG |
| `PLAN.md` | 本章新增计划 |
| `WORKLOG.md` | 改动原因与验证记录 |
| `CHAPTER.md` | 交接与维护说明 |

## 阅读顺序

- 先读 `02-skill`
- 再读本章
- 然后读 `08-multi-agent` 与 `16-mcp`

## 依赖与被依赖

- 依赖：`core/helpers.js` 的 `S.box / S.arrow / S.label`
- 被依赖：后续 `35-long-horizon-tasks`、`41-team-topology` 可借用本章关于能力复用与委派边界的定义

## 扩展点

- 可继续补充组织级 Skill Registry、Marketplace 排序和版本兼容策略

## 未完成 TODO

- 后续把本章外部文件同步到 `index.html` 内联副本

## 维护人 / 上次更新

- 维护人：Codex
- 上次更新：2026-04-08
