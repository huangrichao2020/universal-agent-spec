(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '33-skills-system',
    order: 33,

    nav:      { en: 'Skills System', zh: 'Skills 体系' },
    title:    { en: 'Skills <span class="accent">System</span>', zh: 'Skills <span class="accent">体系</span>' },
    subtitle: { en: 'Skill · Plugin · Subagent · Permission', zh: 'Skill · Plugin · Subagent · Permission' },
    tag:      { en: 'Core', zh: '核心' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      let svg = '';

      svg += S.box(280, 28, 200, 54, S.c.amber,
        t(lang, 'Skill Package', 'Skill 包'),
        t(lang, 'SKILL.md + examples', 'SKILL.md + 示例'));
      svg += S.arrow(380, 82, 380, 120, S.c.amber,
        t(lang, 'discover + match', '发现 + 匹配'));

      svg += S.box(280, 120, 200, 54, S.c.cyan,
        t(lang, 'Agent Loader', 'Agent 加载器'),
        t(lang, 'description + frontmatter', '描述 + frontmatter'));
      svg += S.arrow(380, 174, 380, 212, S.c.cyan,
        t(lang, 'tool grants', '工具授权'));

      svg += S.box(280, 212, 200, 54, S.c.green,
        t(lang, 'Shell Runtime', 'Shell 运行时'),
        t(lang, 'tools + permissions', '工具 + 权限'));

      svg += S.box(40, 120, 180, 54, S.c.purple,
        t(lang, 'Plugin / Registry', 'Plugin / 注册表'),
        t(lang, 'share across teams', '团队共享分发'));
      svg += S.arrow(220, 147, 280, 147, S.c.purple,
        t(lang, 'reuse', '复用'));

      svg += S.box(540, 120, 180, 54, S.c.red,
        t(lang, 'Forked Subagent', 'Fork 子 Agent'),
        t(lang, 'isolated context', '隔离上下文'));
      svg += S.arrow(480, 147, 540, 147, S.c.red,
        t(lang, 'context: fork', 'context: fork'));

      svg += S.label(380, 296,
        t(lang, 'A modern skills system is not one markdown file; it is a discovery, permission, and reuse runtime.',
                '现代 Skills 体系不是一个 markdown 文件，而是一整套发现、授权和复用运行时。'),
        S.c.textDim, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, the competitive edge of agent products is no longer just the base model. It is the capability packaging layer around the model: how skills are discovered, how safely they are loaded, how teams distribute them, and when the system forks a focused subagent instead of bloating one giant prompt.',
        definition: 'A skills system is the <strong>runtime architecture for packaging, discovering, loading, permissioning, and reusing agent capabilities</strong>. It turns isolated instructions into composable operational assets.',
        essence: `<strong>From file to system:</strong> chapter 02 explains what a Skill document is. This chapter is about everything around it: search paths, metadata, relevance matching, permission boundaries, and execution routing.\n\n<strong>Discovery and loading:</strong> mature systems scan personal, project, and shared registries. The short description stays cheap and always visible; the full Skill content is loaded only when the task matches. That keeps context windows from filling with irrelevant procedures.\n\n<strong>Plugin and registry layer:</strong> once teams have dozens or hundreds of skills, they need packaging, versioning, and sharing. A plugin or registry gives a distribution channel so the same release checklist, incident workflow, or research playbook can be reused across shells and projects.\n\n<strong>Permissions and shell boundary:</strong> a Skill should not implicitly inherit every tool. Strong systems bind tool grants explicitly, let some Skills run in read-only mode, and reserve broader permissions for trusted workflows.\n\n<strong>Subagent reuse:</strong> the strongest Skills no longer only tell one agent what to do. They can also fork a narrower subagent with isolated context for a bounded task, then merge the result back. That is how reuse scales without turning the main agent into a context swamp.\n\n<strong>Real cases:</strong> <a href="https://www.anthropic.com/news/skills" target="_blank" rel="noreferrer">Anthropic's Skills launch</a> reframed skills as open, shareable capability units, while <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code documentation</a> shows the practical layer around discovery, tool permissions, and subagent execution.`,
        insight: 'Your moat is not a single clever prompt. It is the operating model that decides which capability package to load, with what permissions, and in which execution context.',
        pitfalls: [
          'Treating a skills system as a folder full of markdown files with no metadata, versioning, or permission rules.',
          'Loading every Skill into every run. That destroys context efficiency and makes behavior less predictable.',
          'Letting reusable Skills execute with overly broad tool access, which turns convenience into an attack surface.'
        ],
        furtherReading: [
          { title: 'Anthropic: Skills', url: 'https://www.anthropic.com/news/skills' },
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' }
        ],
        crossRefs: [
          {
            chapterId: '02-skill',
            reason: 'The earlier Skill chapter defines the document itself; this chapter explains the runtime system that makes many Skills manageable.'
          },
          {
            chapterId: '08-multi-agent',
            reason: 'Subagent execution is a controlled handoff pattern, not a free-form agent conversation.'
          },
          {
            chapterId: '16-mcp',
            reason: 'Skills package operating knowledge, while MCP standardizes external tool contracts. Mature systems usually need both.'
          }
        ],
        code: `<span class="cmt"># Run inside a project root</span>
<span class="fn">mkdir</span> -p .claude/skills/release-readiness
<span class="fn">cat</span> > .claude/skills/release-readiness/SKILL.md <<'<span class="str">EOF</span>'
---
name: release-readiness
description: Review release risk before shipping
allowed-tools: Read, Grep, Glob
disable-model-invocation: true
---

Review the release for $ARGUMENTS.
1. Read changelog, tests, and migration notes.
2. Summarize blockers and approvals needed.
3. Stop if required evidence is missing.
<span class="str">EOF</span>`,
        table: {
          title: 'Skills system layers',
          headers: ['Layer', 'Owns', 'Why it exists'],
          rows: [
            ['Skill file', 'Procedure + examples', 'Package expertise'],
            ['Plugin / registry', 'Distribution + versioning', 'Share across teams'],
            ['Subagent', 'Isolated task context', 'Bound long or deep work'],
            ['Shell runtime', 'Tools + permissions', 'Execute safely'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，Agent 产品真正拉开差距的已经不只是底层模型，而是模型之外的能力打包层：Skill 如何被发现、如何安全加载、如何在团队里分发、以及系统何时应该 fork 一个聚焦子 Agent，而不是把所有东西硬塞进一个巨型 prompt。',
        definition: 'Skills 体系是把 Agent 能力做成<strong>可打包、可发现、可加载、可授权、可复用</strong>资产的运行时架构。它让零散指令升级为可组合的组织能力单元。',
        essence: `<strong>从文件到系统：</strong>第 2 章讲的是 Skill 文档本身；本章讲的是围绕它的整套机制：搜索路径、元数据、相关性匹配、权限边界和执行路由。\n\n<strong>发现与加载：</strong>成熟系统会扫描个人级、项目级和共享级 registry。简短描述长期驻留，完整 Skill 内容只在任务匹配时按需加载，这样上下文窗口不会被无关流程塞满。\n\n<strong>Plugin / Registry 层：</strong>当团队积累到几十上百个 Skill 后，必须引入打包、版本化和分发机制。Plugin 或 registry 提供统一通道，让同一套发布检查、事故处理或研究流程可以跨项目、跨 shell 复用。\n\n<strong>权限与 Shell 边界：</strong>Skill 不应该天然继承所有工具。强系统会显式绑定可用工具，让一部分 Skill 保持只读，把更高权限留给受信任流程。\n\n<strong>Subagent 复用：</strong>最强的 Skill 已经不只是告诉一个 Agent 怎么做，它还可以为特定子任务 fork 一个更窄、更干净的子 Agent，上下文隔离完成后再回收结果。这样复用才能扩展，而不会把主 Agent 变成上下文沼泽。\n\n<strong>真实案例：</strong><a href="https://www.anthropic.com/news/skills" target="_blank" rel="noreferrer">Anthropic Skills 发布</a>把 Skill 重新定义成开放、可共享的能力单元，而 <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code 文档</a> 则展示了发现、工具权限和子 Agent 执行这些运行时层面的具体实践。`,
        insight: '真正的护城河不是某一段聪明 prompt，而是你能否建立一套稳定的操作模型：什么时候加载哪个能力包，用什么权限，在什么执行上下文里跑。',
        pitfalls: [
          '把 Skills 体系理解成一个 markdown 文件夹，却没有元数据、版本管理和权限规则。',
          '每次运行都把所有 Skill 一次性装进上下文，导致窗口浪费且行为变得不可预测。',
          '为了图方便，让可复用 Skill 拿到过宽的工具权限，把复用层直接变成攻击面。'
        ],
        furtherReading: [
          { title: 'Anthropic：Skills', url: 'https://www.anthropic.com/news/skills' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' }
        ],
        crossRefs: [
          {
            chapterId: '02-skill',
            reason: '前一章定义了 Skill 文档本身，而本章解释如何把大量 Skill 管理成真正可用的运行时系统。'
          },
          {
            chapterId: '08-multi-agent',
            reason: '子 Agent 执行本质上是受控交接，而不是多个 Agent 随意闲聊。'
          },
          {
            chapterId: '16-mcp',
            reason: 'Skill 打包的是操作知识，MCP 标准化的是外部工具契约；成熟系统通常两者都需要。'
          }
        ],
        code: `<span class="cmt"># 在项目根目录执行</span>
<span class="fn">mkdir</span> -p .claude/skills/release-readiness
<span class="fn">cat</span> > .claude/skills/release-readiness/SKILL.md <<'<span class="str">EOF</span>'
---
name: release-readiness
description: 发版前检查风险
allowed-tools: Read, Grep, Glob
disable-model-invocation: true
---

Review the release for $ARGUMENTS.
1. Read changelog, tests, and migration notes.
2. Summarize blockers and approvals needed.
3. Stop if required evidence is missing.
<span class="str">EOF</span>`,
        table: {
          title: 'Skills 体系分层',
          headers: ['层级', '负责什么', '存在意义'],
          rows: [
            ['Skill 文件', '流程 + 示例', '封装专业知识'],
            ['Plugin / Registry', '分发 + 版本化', '跨团队共享'],
            ['Subagent', '隔离任务上下文', '承接深度或长任务'],
            ['Shell 运行时', '工具 + 权限', '安全执行'],
          ]
        }
      }
    }
  });
})();
