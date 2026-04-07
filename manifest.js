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
    { id: '12-tool-use',     path: 'chapters/12-tool-use/chapter.js' },
    { id: '13-reasoning',    path: 'chapters/13-reasoning/chapter.js' },
    { id: '14-react',        path: 'chapters/14-react/chapter.js' },
    { id: '15-plan-execute', path: 'chapters/15-plan-execute/chapter.js' },
    { id: '16-mcp',          path: 'chapters/16-mcp/chapter.js' },
    { id: '17-a2a',          path: 'chapters/17-a2a/chapter.js' },
    { id: '18-ag-ui',        path: 'chapters/18-ag-ui/chapter.js' },
    { id: '19-protocol-stack', path: 'chapters/19-protocol-stack/chapter.js' },
    { id: '20-frameworks',      path: 'chapters/20-frameworks/chapter.js' },
    { id: '21-lowcode',         path: 'chapters/21-lowcode/chapter.js' },
    { id: '22-arch-patterns',   path: 'chapters/22-arch-patterns/chapter.js' },
    { id: '23-graph-orchestration', path: 'chapters/23-graph-orchestration/chapter.js' },
    { id: '24-memory-arch',    path: 'chapters/24-memory-arch/chapter.js' },
    { id: '25-observability',  path: 'chapters/25-observability/chapter.js' },
    { id: '26-guardrails',     path: 'chapters/26-guardrails/chapter.js' },
    { id: '27-evaluation',     path: 'chapters/27-evaluation/chapter.js' },
    { id: '28-coding-agents',  path: 'chapters/28-coding-agents/chapter.js' },
    { id: '29-case-studies',   path: 'chapters/29-case-studies/chapter.js' },
    { id: '30-spec-formal',    path: 'chapters/30-spec-formal/chapter.js' },
    { id: '31-learning-path',  path: 'chapters/31-learning-path/chapter.js' },
    { id: '32-computer-use',   path: 'chapters/32-computer-use/chapter.js' },
    { id: '33-skills-system',  path: 'chapters/33-skills-system/chapter.js' },
    { id: '34-context-engineering', path: 'chapters/34-context-engineering/chapter.js' },
  ]
};
