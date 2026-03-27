/**
 * core/registry.js — 章节注册器 + i18n 工具
 *
 * 初始化 window.AgentSpec 全局对象
 * 章节通过 AgentSpec.register() 自注册
 */
(function () {
  const chapters = [];
  const registered = new Set();

  const AgentSpec = {
    /**
     * 章节注册入口
     * 每个 chapter.js 调用此方法完成注册
     */
    register(chapter) {
      if (registered.has(chapter.id)) {
        console.warn(`[AgentSpec] Duplicate chapter id: ${chapter.id}`);
        return;
      }
      chapters.push(chapter);
      registered.add(chapter.id);
    },

    /**
     * 获取按 order 排序的章节列表
     */
    getChapters() {
      return [...chapters].sort((a, b) => a.order - b.order);
    },

    /**
     * i18n 工具：根据语言取对应字段
     * 用法: AgentSpec.t(chapter.title, lang)
     */
    t(field, lang) {
      if (typeof field === 'string') return field;
      return field[lang] || field['en'] || '';
    },

    /**
     * 支持的语言列表（新增语言在此扩展）
     */
    LANGS: ['en', 'zh'],

    /**
     * 语言显示名称
     */
    LANG_NAMES: {
      en: 'EN',
      zh: '中文'
    }
  };

  window.AgentSpec = AgentSpec;
})();
