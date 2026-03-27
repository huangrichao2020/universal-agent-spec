# Chapter 01b · memory-files

## 文件说明

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据与 SVG 图示（双语） |
| `CHAPTER.md` | 本手册 |

## 定位

本章插入在「单次调用」(01) 和「Skill」(02) 之间，使用 `order: 1.5` 实现排序插入，无需修改其他章节的 order 值。

## 修改指南

### 修改文字内容
编辑 `chapter.js` 中的 `content.en` 或 `content.zh`。

### 修改 SVG 图示
编辑 `getSvg(lang)` 函数，所有文字通过 `t(lang, 'EN', '中文')` 处理。

### OpenClaw 示例
`essence` 字段中包含 OpenClaw 的真实案例说明，如需更新可直接修改对应语言的文本。
