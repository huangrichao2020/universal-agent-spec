# Chapter 17 — A2A Protocol / A2A 协议

上次更新：2026-04-08

## 变更说明

- Phase B 升级：新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 四类字段。
- 补全原先未展开的 `CHAPTER.md` 占位模板，保留本章基础设施定位，不改章节代码结构。

## 内容概述

- **定义**：A2A 是让不同框架、不同厂商 Agent 之间发现能力、委派任务和交换产物的协议
- **核心机制**：Agent Card 做能力发现，Task 做工作单元，Message / Artifact 做通信与产出
- **SVG 图**：上方展示 Agent A / A2A Protocol / Agent B，中下方展示 Agent Card 与 Task 生命周期
- **关键边界**：A2A 解决 Agent 间协作，不等同于 MCP 这类工具接入协议

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据（自注册 IIFE） |
| `CHAPTER.md` | 本文件，修改手册 |

## 修改注意

- SVG 中所有文字必须用 `t(lang, en, zh)` 双语处理
- `tagClass` 使用 `tag-infra`
- 本章强调 Agent Card、Task 生命周期与协议边界，避免和工具协议混写
