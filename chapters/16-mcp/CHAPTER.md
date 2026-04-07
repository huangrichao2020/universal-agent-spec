# Chapter 16 — MCP Protocol / MCP 协议

上次更新：2026-04-08

## 变更说明

- Phase B 升级：新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 四类字段。
- 补全原先未展开的 `CHAPTER.md` 占位模板，保留本章基础设施定位，不改章节代码结构。

## 内容概述

- **定义**：MCP 是让 LLM 宿主与外部工具/数据源标准化互联的开放协议
- **核心价值**：从 `N × M` 的定制集成降到 `N + M` 的协议化接入
- **SVG 图**：左侧 MCP Server，中部 Agent，右侧 MCP Client，下方多服务端扇入
- **关键边界**：MCP 解决工具接入，不等同于 A2A 这类 Agent 间任务协作协议

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据（自注册 IIFE） |
| `CHAPTER.md` | 本文件，修改手册 |

## 修改注意

- SVG 中所有文字必须用 `t(lang, en, zh)` 双语处理
- `tagClass` 使用 `tag-infra`
- 本章强调协议职责边界，避免把工具协议与 Agent 协议混写
