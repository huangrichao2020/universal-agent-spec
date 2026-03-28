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
        <!-- Light Agent pie — circle + two sectors -->
        <circle cx="200" cy="124" r="94" fill="#f0f4ff" stroke="#0050a0" stroke-width="2"/>
        <!-- 90% code sector: top (200,30) clockwise 324° to (144.7,48) -->
        <path d="M200,124 L200,30 A94,94 0 1,1 144.7,48 Z" fill="#0050a0" opacity="0.85"/>
        <!-- 10% AI sector: (144.7,48) clockwise 36° back to top (200,30) -->
        <path d="M200,124 L144.7,48 A94,94 0 0,1 200,30 Z" fill="#92400e" opacity="0.85"/>
        <text x="210" y="120" text-anchor="middle" fill="#ffffff"
          font-family="'JetBrains Mono',monospace" font-size="26" font-weight="700">90%</text>
        <text x="210" y="138" text-anchor="middle" fill="#ffffffcc"
          font-family="'JetBrains Mono',monospace" font-size="11">
          ${t(lang, 'Code logic', '代码逻辑')}
        </text>
        <text x="160" y="50" text-anchor="middle" fill="#ffffff"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="700">10%</text>
        <text x="155" y="64" text-anchor="middle" fill="#ffffffcc"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'AI', 'AI')}
        </text>
        <text x="200" y="238" text-anchor="middle" fill="#0050a0"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="600">
          ${t(lang, 'Light Agent', '轻 Agent')}
        </text>

        <!-- Divider -->
        <line x1="380" y1="16" x2="380" y2="242" stroke="#aeaeb2" stroke-width="1" stroke-dasharray="5 4"/>

        <!-- Heavy Agent pie — circle + two sectors -->
        <circle cx="560" cy="124" r="94" fill="#fdf4ff" stroke="#5b21b6" stroke-width="2"/>
        <!-- 10% code sector: top (560,30) clockwise 36° to (615.3,48) -->
        <path d="M560,124 L560,30 A94,94 0 0,1 615.3,48 Z" fill="#0050a0" opacity="0.85"/>
        <!-- 90% AI sector: (615.3,48) clockwise 324° back to top (560,30) -->
        <path d="M560,124 L615.3,48 A94,94 0 1,1 560,30 Z" fill="#5b21b6" opacity="0.85"/>
        <text x="548" y="148" text-anchor="middle" fill="#ffffff"
          font-family="'JetBrains Mono',monospace" font-size="26" font-weight="700">90%</text>
        <text x="548" y="166" text-anchor="middle" fill="#ffffffcc"
          font-family="'JetBrains Mono',monospace" font-size="11">
          ${t(lang, 'Agent interaction', 'Agent 交互')}
        </text>
        <text x="600" y="50" text-anchor="middle" fill="#ffffff"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="700">10%</text>
        <text x="606" y="64" text-anchor="middle" fill="#ffffffcc"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'UI', 'UI')}
        </text>
        <text x="560" y="238" text-anchor="middle" fill="#5b21b6"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="600">
          ${t(lang, 'Heavy Agent', '重 Agent')}
        </text>
      `;
    },

    content: {
      en: {
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
        insight: 'Most products should start as Light Agents. Heavy Agents require mature workflow design skills and a clear understanding of where AI judgment actually adds value over coded logic.'
      },
      zh: {
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
        insight: '大多数产品应该从轻 Agent 起步。重 Agent 需要成熟的工作流设计能力，以及对"哪些地方 AI 判断真的优于代码逻辑"的清晰认知。'
      }
    }
  });
})();
