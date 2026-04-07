# Chapter 12 — Tool Use / 工具调用

上次更新：2026-04-08

## 变更说明

- Phase B 升级：新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 四类字段。
- 保留原有工具调用定义、SVG、代码示例与多厂商对比表，不改既有逻辑。

本章介绍工具调用（Function Calling）的核心机制——Agent 从"能想"到"能做"的关键一步。

## 内容概述

- **定义**：工具调用是 LLM 调用外部函数而非生成文本的机制
- **工作循环**：定义 → 注入 prompt → 模型决策 → JSON 调用 → 执行 → 结果回传 → 循环
- **SVG 图**：展示 LLM 决策分叉（文本 vs 工具调用）和执行循环
- **对比表**：OpenAI / Anthropic / Google / MCP 四家工具调用格式对比
- **代码示例**：JSON Schema 工具定义和调用示例

## 修改注意事项

- SVG 中所有文字必须用 `t(lang, en, zh)` 双语处理
- `viewBox` 高度 320，图示内容较丰富
- `tagClass` 使用 `tag-core`（核心概念）
- 代码块使用 `<span class="str">` / `<span class="cmt">` / `<span class="kw">` 做语法高亮

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据（自注册 IIFE） |
| `CHAPTER.md` | 本文件，修改手册 |
