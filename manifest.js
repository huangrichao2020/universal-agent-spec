/**
 * manifest.js — 章节注册表
 *
 * 这是整个项目唯一的耦合点。
 * 新增章节只需在此数组末尾添加一条记录。
 * 框架会按 order 字段排序，与数组顺序无关。
 */
window.AGENT_SPEC_MANIFEST = {
  version: '2.0.0',
  chapters: [
    { id: '00-llm-api',      path: 'chapters/00-llm-api/chapter.js' },
    { id: '01-invocation',   path: 'chapters/01-invocation/chapter.js' },
    { id: '02-skill',        path: 'chapters/02-skill/chapter.js' },
    { id: '03-agent',        path: 'chapters/03-agent/chapter.js' },
    { id: '04-shell',        path: 'chapters/04-shell/chapter.js' },
    { id: '05-workflow',     path: 'chapters/05-workflow/chapter.js' },
    { id: '06-handoff',      path: 'chapters/06-handoff/chapter.js' },
    { id: '07-aware',        path: 'chapters/07-aware/chapter.js' },
    { id: '08-multi-agent',  path: 'chapters/08-multi-agent/chapter.js' },
    { id: '09-deploy',       path: 'chapters/09-deploy/chapter.js' },
    { id: '10-light-heavy',  path: 'chapters/10-light-heavy/chapter.js' },
    { id: '11-business',     path: 'chapters/11-business/chapter.js' },
  ]
};
