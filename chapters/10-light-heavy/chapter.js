(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '10-light-heavy',
    order: 10,
    nav:      { en: 'Light vs Heavy',  zh: '轻 vs 重 Agent' },
    title:    { en: 'Light <span class="accent">vs</span> Heavy Agent', zh: '轻 <span class="accent">Agent</span> vs 重 Agent' },
    subtitle: { en: 'Two software paradigms — choose wrong and it\'s all wasted', zh: '两种软件范式 · 选错了全白费' },
    tag:      { en: 'Pattern',         zh: '架构模式' },
    tagClass: 'tag-pattern',
    viewBox: '0 0 760 268',

    getSvg(lang) {
      return `
        <!-- Light Agent pie: sectors first, border circle on top -->
        <circle cx="200" cy="124" r="94" fill="#f0f4ff" stroke="none"/>
        <path d="M200,124 L200,30 A94,94 0 1,1 144.75,47.95 Z"
          fill="#0050a0" stroke="none" opacity="0.88"/>
        <path d="M200,124 L144.75,47.95 A94,94 0 0,1 200,30 Z"
          fill="#92400e" stroke="none" opacity="0.88"/>
        <circle cx="200" cy="124" r="94" fill="none" stroke="#0050a0" stroke-width="2"/>
        <text x="210" y="118" text-anchor="middle" fill="#ffffff"
          font-family="'JetBrains Mono',monospace" font-size="26" font-weight="700">90%</text>
        <text x="210" y="136" text-anchor="middle" fill="#ffffffdd"
          font-family="'JetBrains Mono',monospace" font-size="11">
          ${t(lang, 'Code logic', '代码逻辑')}
        </text>
        <text x="158" y="52" text-anchor="middle" fill="#ffffff"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="700">10%</text>
        <text x="155" y="66" text-anchor="middle" fill="#ffffffdd"
          font-family="'JetBrains Mono',monospace" font-size="9">AI</text>
        <text x="200" y="238" text-anchor="middle" fill="#0050a0"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="600">
          ${t(lang, 'Light Agent', '轻 Agent')}
        </text>

        <!-- Divider -->
        <line x1="380" y1="16" x2="380" y2="242" stroke="#aeaeb2" stroke-width="1" stroke-dasharray="5 4"/>

        <!-- Heavy Agent pie: sectors first, border circle on top -->
        <circle cx="560" cy="124" r="94" fill="#fdf4ff" stroke="none"/>
        <path d="M560,124 L560,30 A94,94 0 0,1 615.25,47.95 Z"
          fill="#0050a0" stroke="none" opacity="0.88"/>
        <path d="M560,124 L615.25,47.95 A94,94 0 1,1 560,30 Z"
          fill="#5b21b6" stroke="none" opacity="0.88"/>
        <circle cx="560" cy="124" r="94" fill="none" stroke="#5b21b6" stroke-width="2"/>
        <text x="548" y="148" text-anchor="middle" fill="#ffffff"
          font-family="'JetBrains Mono',monospace" font-size="26" font-weight="700">90%</text>
        <text x="548" y="166" text-anchor="middle" fill="#ffffffdd"
          font-family="'JetBrains Mono',monospace" font-size="11">
          ${t(lang, 'Agent interaction', 'Agent 交互')}
        </text>
        <text x="600" y="52" text-anchor="middle" fill="#ffffff"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="700">10%</text>
        <text x="606" y="66" text-anchor="middle" fill="#ffffffdd"
          font-family="'JetBrains Mono',monospace" font-size="9">UI</text>
        <text x="560" y="238" text-anchor="middle" fill="#5b21b6"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="600">
          ${t(lang, 'Heavy Agent', '重 Agent')}
        </text>
      `;
    },

    content: {
      en: {
        perspective2026: 'Over the last year, heavy-agent products have captured more attention because coding agents and autonomous work surfaces are finally useful. But most successful teams still begin with light-agent patterns and only move heavier when user value clearly depends on AI judgment staying in the loop.',
        definition: '<strong>Light Agent:</strong> 90% code + 10% AI — AI only intervenes at specific nodes. <strong>Heavy Agent:</strong> 10% code (UI + runtime) + 90% Agent interaction — humans mainly collaborate with Agents through dialogue.',
        essence: 'This is a fundamental architectural choice that determines the core product experience.\n\n<strong>Light Agent suits:</strong> Products where the core value is "functionality" — SaaS tools, content management, data processing. AI adds polish.\n\n<strong>Heavy Agent suits:</strong> Products where the core value is "judgment and execution" — professional advisors, autonomous execution systems. Claude Code itself is a canonical Heavy Agent: you just say "refactor this module" and it handles the rest.\n\n<em>Selection rule:</em> If you can spell out in code "what to do," use Light Agent. If "what to do" requires AI judgment, use Heavy Agent.',
        table: {
          title: 'Selection Reference',
          headers: ['Dimension', 'Light Agent', 'Heavy Agent'],
          rows: [
            ['AI ratio', '~10%', '~90%'],
            ['Core value', 'Product features', 'Judgment & execution'],
            ['Typical product', 'AI-enhanced SaaS', 'Claude Code / Cursor'],
            ['Dev complexity', 'Lower', 'Higher (workflow design)'],
            ['Cost structure', 'Mainly dev cost', 'Mainly compute cost'],
          ]
        },
        insight: 'Most products should start as Light Agents. Heavy Agents require mature workflow design skills and a clear understanding of where AI judgment actually adds value over coded logic.',
        pitfalls: [
          'Assuming heavy agents are automatically more advanced. Many products add complexity without adding corresponding user value.',
          'Assuming light agents do not need memory, workflows, or guardrails. They still need architecture; they just concentrate AI in fewer places.',
          'Choosing the paradigm based on hype instead of task shape. The structure of the job should dictate the AI ratio.'
        ],
        furtherReading: [
          { title: 'Claude Code Documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'OpenAI News', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '09-deploy',
            reason: 'Deployment choices constrain whether a product can support the runtime demands of heavier agent interaction.'
          },
          {
            chapterId: '11-business',
            reason: 'The light-vs-heavy choice directly shapes packaging, pricing, and where business value is captured.'
          }
        ]
      },
      zh: {
        perspective2026: '过去一年里，重 Agent 产品因为编码 Agent 和自主执行界面的成熟而获得了更多关注，但真正成功的团队依然大多从轻 Agent 起步，只有当用户价值明确依赖 AI 持续判断时，才逐步把系统做重。',
        definition: '<strong>轻 Agent</strong>：90% 代码 + 10% AI，AI 只在特定节点介入。<strong>重 Agent</strong>：10% 代码（UI + 运行环境）+ 90% Agent 交互，人类主要通过对话与 Agent 协作。',
        essence: '这是软件架构层面的根本选择，决定了产品的核心体验。\n\n<strong>轻 Agent 适合</strong>：核心价值是"功能"的产品——SaaS 工具、内容管理、数据处理。AI 锦上添花。\n\n<strong>重 Agent 适合</strong>：核心价值是"判断和执行"的产品——专业顾问、自主执行系统。Claude Code 本身就是重 Agent 的典型——你只需说"帮我重构"，其余它自己处理。\n\n<em>选型建议</em>：如果你能用代码写清楚"做什么"，就用轻 Agent；如果"做什么"本身就需要 AI 来判断，就用重 Agent。',
        table: {
          title: '选型参考',
          headers: ['维度', '轻 Agent', '重 Agent'],
          rows: [
            ['AI 占比', '~10%', '~90%'],
            ['核心价值', '产品功能', '判断与执行'],
            ['典型产品', '带 AI 的 SaaS', 'Claude Code / Cursor'],
            ['开发难度', '较低', '较高（需要工作流设计）'],
            ['成本结构', '主要是开发成本', '主要是算力成本'],
          ]
        },
        insight: '大多数产品应该从轻 Agent 起步。重 Agent 需要成熟的工作流设计能力，以及对"哪些地方 AI 判断真的优于代码逻辑"的清晰认知。',
        pitfalls: [
          '认为重 Agent 天然更高级。很多产品只是增加了复杂度，却没有增加对应用户价值。',
          '认为轻 Agent 就不需要记忆、工作流和护栏。它们仍然需要架构，只是把 AI 集中在更少节点。',
          '按 hype 选范式，而不是按任务结构选范式。真正该决定 AI 占比的是工作本身的形状。'
        ],
        furtherReading: [
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic：构建高效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'OpenAI 新闻与博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '09-deploy',
            reason: '部署形态会直接限制你是否承担得起更重的 Agent 运行时成本和交互模式。'
          },
          {
            chapterId: '11-business',
            reason: '轻/重 Agent 的选择会直接塑造产品包装、定价方式和商业价值捕获位置。'
          }
        ]
      }
    }
  });
})();
