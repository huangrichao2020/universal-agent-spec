# Chapter 18 — AG-UI Protocol / AG-UI 协议

上次更新：2026-04-08

## 变更说明

- Phase B 升级：新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 四类字段。
- 补全原先未展开的 `CHAPTER.md` 占位模板，保留本章基础设施定位，不改章节代码结构。

## 内容概述

- **定义**：AG-UI 是让 Agent 与前端用户界面标准化通信的协议
- **核心能力**：统一生命周期、消息、工具调用、状态同步与审批暂停等事件
- **SVG 图**：上方展示 Agent Backend / AG-UI Event Stream / Frontend UI，下方展示事件类型矩阵
- **关键边界**：AG-UI 解决 Agent 到用户界面的交互，不等同于 MCP 或 A2A

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据（自注册 IIFE） |
| `CHAPTER.md` | 本文件，修改手册 |

## 修改注意

- SVG 中所有文字必须用 `t(lang, en, zh)` 双语处理
- `tagClass` 使用 `tag-infra`
- 本章强调事件流、状态同步和审批暂停，不退化成“只是流式文本”
