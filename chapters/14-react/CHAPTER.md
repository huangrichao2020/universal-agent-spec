# Chapter 14 — ReAct Pattern / ReAct 模式

上次更新：2026-04-08

## 变更说明

- Phase B 升级：新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 四类字段。
- 保留原有 ReAct 循环图、家族对比表与核心说明，不改既有逻辑。

本章介绍 ReAct 模式及其变体（ReWOO、Reflexion、LATS）。

## 内容概述

- **定义**：Reason + Act 交替循环的基础 Agent 模式
- **SVG 图**：中央 Think→Act→Observe 循环 + 右侧变体面板
- **对比表**：ReAct/ReWOO/Reflexion/LATS 四种变体对比
- **核心洞见**：80%+ 生产 Agent 使用 ReAct，务必设最大步数限制

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据（自注册 IIFE） |
| `CHAPTER.md` | 本文件，修改手册 |
