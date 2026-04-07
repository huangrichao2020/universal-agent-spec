# Chapter 13 — Reasoning Patterns / 推理模式

上次更新：2026-04-08

## 变更说明

- Phase B 升级：新增 `perspective2026`、`pitfalls`、`furtherReading`、`crossRefs` 四类字段。
- 保留原有四种推理模式的 SVG、定义、核心洞见与对比表，不改既有结构。

本章介绍 Agent 推理的四种核心模式：CoT、CoT-SC、ToT、GoT。

## 内容概述

- **定义**：推理模式是引导 LLM 如何思考的结构化方法
- **四种模式**：线性链、多路径投票、分支树回溯、任意图合并
- **SVG 图**：四种模式的可视化对比（并排展示不同拓扑结构）
- **对比表**：结构、适用场景、Token 成本、可靠性
- **核心洞见**：CoT 是 90% 场景的最优选，复杂度按需递增

## 修改注意事项

- SVG 使用手工坐标绘制四种拓扑，未用 `S.box()` 画内部节点
- 底部标注使用 `S.label()` 统一风格
- `tagClass` 使用 `tag-pattern`（设计模式）

## 文件清单

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据（自注册 IIFE） |
| `CHAPTER.md` | 本文件，修改手册 |
