# Chapter 01b · Memory Files

## 文件说明

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据与 SVG 图示（双语） |
| `CHAPTER.md` | 本手册 |

## 修改指南

### 修改文字内容
编辑 `chapter.js` 中的 `content.en` 或 `content.zh`。

### 修改 SVG 图示
编辑 `getSvg(lang)` 函数，所有文字通过 `t(lang, 'EN', '中文')` 处理。

## 注意事项
- `order: 1.5` 使本章插在 01 和 02 之间，无需修改其他章节编号
- OpenClaw 案例在 insight 和 essence 中均有引用，如需替换案例直接修改对应字段
