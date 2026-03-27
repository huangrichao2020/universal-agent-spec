# 新增章节操作手册

## 三步完成新增

### Step 1 — 创建章节目录和文件

```bash
mkdir chapters/12-your-topic
touch chapters/12-your-topic/chapter.js
touch chapters/12-your-topic/CHAPTER.md
```

### Step 2 — 编写 chapter.js

复制以下模板，填写内容：

```js
(function () {
  window.AgentSpec.register({
    id: '12-your-topic',
    order: 12,

    nav:      { en: 'Your Topic', zh: '你的主题' },
    title:    { en: 'Your <span class="accent">Topic</span>', zh: '你的<span class="accent">主题</span>' },
    subtitle: { en: 'Subtitle in English', zh: '副标题中文' },
    tag:      { en: 'Category', zh: '分类' },
    tagClass: 'tag-core',  // tag-infra / tag-core / tag-system / tag-pattern / tag-biz

    viewBox: '0 0 760 300',

    getSvg(lang) {
      const S = window.AgentSpecHelpers;
      const t = (en, zh) => lang === 'zh' ? zh : en;
      return `
        <!-- 在这里写 SVG 内容，使用 S.box() / S.label() / S.arrow() -->
        ${S.box(100, 100, 160, 60, '#00c8ff', t('Your Box', '你的框'))}
        ${S.label(380, 260, t('Bottom caption', '底部说明'), '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'One sentence definition in <strong>English</strong>.',
        essence:    'Deeper explanation. Can use <em>emphasis</em> and <strong>bold</strong>.',
        insight:    'Key insight for developers.',
        // code: `optional code block with <span class="kw">keywords</span>`,
        // table: { title: '', headers: [], rows: [] }
      },
      zh: {
        definition: '一句话定义（中文）。',
        essence:    '深入解析。',
        insight:    '给开发者的洞见。',
      }
    }
  });
})();
```

### Step 3 — 注册到 manifest.js

打开 `manifest.js`，在 `chapters` 数组末尾添加：

```js
{ id: '12-your-topic', path: 'chapters/12-your-topic/chapter.js' },
```

**完成。** 刷新页面即可看到新章节。

---

## SVG 绘图 API（window.AgentSpecHelpers）

| 函数 | 参数 | 说明 |
|------|------|------|
| `S.box(x,y,w,h,color,text,sub?)` | x/y/w/h 坐标尺寸，color 主色，text 主文字，sub 副文字 | 绘制一个圆角矩形 + 文字 |
| `S.label(x,y,text,color,size?)` | 坐标、文字、颜色、字号 | 绘制单行文字 |
| `S.arrow(x1,y1,x2,y2,color?,label?)` | 起终点坐标、颜色、标签 | 带箭头的连线 |

箭头 marker ID（全局定义，可直接引用）：
- `url(#arr)`  → 灰色箭头
- `url(#arrC)` → 青色箭头
- `url(#arrA)` → 橙色箭头

---

## tagClass 可选值

| 值 | 颜色 | 适用场景 |
|---|---|---|
| `tag-infra`   | 紫色 | 基础设施类概念 |
| `tag-core`    | 青色 | 核心概念 |
| `tag-system`  | 橙色 | 系统/架构概念 |
| `tag-pattern` | 绿色 | 设计模式 |
| `tag-biz`     | 红色 | 商业模式 |

---

## 注意事项

- `order` 决定侧边栏和内容区的排序，数字可不连续
- SVG `viewBox` 高度建议 260~340，框架会自动在上下各加 40px 呼吸空间
- 所有 SVG 内文字**必须**通过 `t(en, zh)` 函数做双语处理，不得硬编码中文或英文
- 修改现有章节内容只需编辑对应 `chapter.js`，无需改动任何其他文件
