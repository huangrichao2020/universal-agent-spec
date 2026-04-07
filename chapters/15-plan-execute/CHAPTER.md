# Chapter 15 — Plan & Execute / 规划与执行

上次更新：2026-04-08

## 变更说明

- Phase B 升级：新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 四类字段。
- 保留原有 Planner / Executor / Re-Planner 结构图与对比表，不改既有逻辑。

本章介绍规划与执行模式——将战略规划和战术执行分离。

## 内容概述

- **定义**：强模型负责规划，快模型负责执行，重规划者监控调整
- **SVG 图**：左侧 Planner + Plan，中间 Executor 逐步执行，右侧 Re-Planner 反馈
- **对比表**：Plan & Execute vs ReAct 五维度对比
- **核心洞见**：如同人类团队——架构师设计、开发者实现

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据（自注册 IIFE） |
| `CHAPTER.md` | 本文件，修改手册 |
