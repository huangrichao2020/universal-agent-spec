# Chapter 19 — Protocol Stack / 协议栈

上次更新：2026-04-08

## 变更说明

- Phase B 升级：新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 四类字段。
- 补全原先未展开的 `CHAPTER.md` 占位模板，保留本章系统层定位，不改章节代码结构。

## 内容概述

- **定义**：本章把 MCP、A2A、AG-UI 组合成一个三层 Agent 通信栈
- **核心价值**：用分层方式解释 tool、agent、user 三类连接边界，避免协议职责混淆
- **SVG 图**：上层 AG-UI、中层 A2A、下层 MCP，底部补充 ACP/ANP/OpenAPI 等新兴方向
- **关键边界**：本章是汇总层，不重复展开单一协议细节，而是说明组合关系

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据（自注册 IIFE） |
| `CHAPTER.md` | 本文件，修改手册 |

## 修改注意

- SVG 中所有文字必须用 `t(lang, en, zh)` 双语处理
- `tagClass` 使用 `tag-system`
- 本章强调“分层组合”，避免把三个协议重新讲成三个孤立知识点
