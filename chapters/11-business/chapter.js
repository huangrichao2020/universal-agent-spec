(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '11-business',
    order: 11,
    nav:      { en: 'Business Model', zh: '商业模式' },
    title:    { en: '<span class="accent">Business</span> Model', zh: '<span class="accent">商业模式</span>' },
    subtitle: { en: 'ToB vs ToC — moat determines the route', zh: 'ToB vs ToC · 护城河决定路线' },
    tag:      { en: 'Business',       zh: '商业' },
    tagClass: 'tag-biz',
    viewBox: '0 0 760 280',

    getSvg(lang) {
      const tobItems = [
        t(lang, 'Shell program',          'UI 界面程序'),
        t(lang, 'Persona file',           '人格定义文件'),
        t(lang, 'Domain memory (key!)',   '行业记忆文件（核心！）'),
        t(lang, 'Skill collection',       'Skill 集合'),
      ];
      const tocItems = [
        t(lang, 'Agent on your server',   'Agent 跑在你的服务器'),
        t(lang, 'User interacts via UI',  '用户通过界面交互'),
        t(lang, 'Subscription / per-use', '按功能/时间/量计费'),
        t(lang, 'Data on your server',    '数据在你的服务器'),
      ];

      const tobRows = tobItems.map((s, i) => `
        <text x="68" y="${116 + i*18}" fill="#1d1d1f"
          font-family="'JetBrains Mono',monospace" font-size="9">· ${s}</text>
      `).join('');

      const tocRows = tocItems.map((s, i) => `
        <text x="432" y="${116 + i*18}" fill="#1d1d1f"
          font-family="'JetBrains Mono',monospace" font-size="9">· ${s}</text>
      `).join('');

      return `
        <!-- ToB panel -->
        <rect x="28" y="22" width="328" height="248" rx="8"
          fill="#edf4ff" stroke="#0050a080" stroke-width="1.5"/>
        <text x="192" y="46" text-anchor="middle" fill="#0050a0"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="600">
          ToB · ${t(lang, 'Sell the Agent', '卖 Agent 本体')}
        </text>
        <rect x="52" y="58" width="280" height="116" rx="5" fill="#f7f3ea" stroke="#aeaeb2" stroke-width="1"/>
        <text x="68" y="78" fill="#5b21b6" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="600">
          📦 ${t(lang, 'Deliverables', '交付物')}
        </text>
        ${tobRows}
        <text x="192" y="190" text-anchor="middle" fill="#92400e"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'One-time purchase · User brings compute', '一次性买断 · 买家自接大模型算力')}
        </text>
        <text x="192" y="207" text-anchor="middle" fill="#1a8a3a"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Moat: exclusive domain memory', '护城河：独家行业记忆')}
        </text>
        <text x="192" y="256" text-anchor="middle" fill="#636366"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Best for: vertical industry Agent sales', '适合：垂直行业 Agent 出售')}
        </text>

        <!-- ToC panel -->
        <rect x="404" y="22" width="328" height="248" rx="8"
          fill="#f5f0ff" stroke="#5b21b680" stroke-width="1.5"/>
        <text x="568" y="46" text-anchor="middle" fill="#5b21b6"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="600">
          ToC · ${t(lang, 'Sell the service', '卖产品服务')}
        </text>
        <rect x="428" y="58" width="280" height="116" rx="5" fill="#f7f3ea" stroke="#aeaeb2" stroke-width="1"/>
        <text x="444" y="78" fill="#5b21b6" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="600">
          💻 ${t(lang, 'Model', '模式')}
        </text>
        ${tocRows}
        <text x="568" y="190" text-anchor="middle" fill="#92400e"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Subscription / usage · You pay compute', '订阅 / 按量 · 你承担算力成本')}
        </text>
        <text x="568" y="207" text-anchor="middle" fill="#1a8a3a"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Moat: product UX + user habit', '护城河：产品体验 + 用户习惯')}
        </text>
        <text x="568" y="256" text-anchor="middle" fill="#636366"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Best for: consumer-facing AI products', '适合：面向消费者的 AI 产品')}
        </text>
      `;
    },

    content: {
      en: {
        perspective2026: 'Over the last year, agent monetization has shifted away from "selling access to a smart model" toward selling memory, workflow integration, domain reliability, and outcome delivery. The market is learning that generic intelligence is cheap to rent; operationalized expertise is what gets paid for.',
        definition: 'Two business routes: <strong>ToB</strong> — sell the Agent itself (shell + memory files), one-time purchase, user brings their own compute; <strong>ToC</strong> — sell product service, Agent runs on your server, users pay for usage.',
        essence: 'The core difference is <em>who bears compute cost</em> and <em>where the moat comes from</em>.\n\nToB moat: <strong>Domain memory.</strong> An Agent with accumulated expertise in medicine, law, finance — expertise a buyer cannot quickly replicate — is truly valuable.\n\nToC moat: <strong>Product UX + user habit.</strong> Compute cost is your burden, but scale effects and user stickiness are your barriers.\n\nNote: ToB is not "selling a Prompt collection." The real value is the <em>domain memory files</em> — the professionally validated knowledge base built from extensive practice.',
        insight: 'In the Agent era, ToB business sells not software features but "a copy of an expert\'s brain." Selling a top-tier sales Agent\'s memory to 100 companies is more scalable than training 100 salespeople.',
        pitfalls: [
          'Treating prompt packs as a moat. Prompts are easy to copy; validated domain memory and workflow integration are not.',
          'Ignoring compute, support, and deployment cost when pricing. Agent margins collapse quickly when runtime costs are mis-modeled.',
          'Using the same pricing logic for ToB and ToC. Enterprise value capture and consumer retention operate on different economics.'
        ],
        furtherReading: [
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' },
          { title: 'Anthropic Skills', url: 'https://www.anthropic.com/news/skills' },
          { title: 'OpenAI News', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '10-light-heavy',
            reason: 'Your light-vs-heavy product choice sets the cost structure and value proposition that the business model must support.'
          },
          {
            chapterId: '12-tool-use',
            reason: 'After choosing a business route, the next layer of defensibility often comes from which tools and external systems the Agent can actually operate.'
          }
        ]
      },
      zh: {
        perspective2026: '过去一年里，Agent 商业化的重心已经从“卖一个更聪明的模型入口”转向“卖记忆、工作流集成、领域可靠性和结果交付”。市场正在认识到：通用智能可以租，真正能收费的是被运营起来的专业能力。',
        definition: '两条商业路线：<strong>ToB</strong>——你是卖家，卖 Agent 本体（UI 界面 + 记忆文件），一次性买断，买家自己接入算力大模型使用 Agent；<strong>ToC</strong>——卖产品服务，Agent 在你的服务器，算力和大模型也用你自己的，用户充值使用。',
        essence: '两条路线的核心差异是<em>谁承担算力成本</em>和<em>护城河来自哪里</em>。\n\nToB 的护城河：<strong>行业记忆</strong>。一个在医疗、法律、金融等垂直领域积累了大量专业记忆的 Agent，其价值是买家无法自己快速复制的。\n\nToC 的护城河：<strong>产品体验 + 用户习惯</strong>。算力成本是你的负担，但规模效应和用户粘性是壁垒。\n\n注意：ToB 不是"卖 Prompt 合集"，真正的价值在于<em>行业记忆文件</em>——那些经过大量实践验证、积累的专业知识库。',
        insight: 'Agent 时代的 ToB 生意，卖的不是软件功能，卖的是"专家大脑的副本"。把一个顶级销售 Agent 的记忆卖给 100 个公司，比培养 100 个销售更可扩展。',
        pitfalls: [
          '把 Prompt 包错当成护城河。Prompt 很容易复制，真正难复制的是被验证过的行业记忆和工作流集成。',
          '定价时忽视算力、交付和支持成本。只要运行时成本建模错了，Agent 毛利会很快塌掉。',
          '用同一套定价逻辑同时套 ToB 和 ToC。企业价值捕获和消费者留存遵循的是不同经济规律。'
        ],
        furtherReading: [
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' },
          { title: 'Anthropic Skills 发布', url: 'https://www.anthropic.com/news/skills' },
          { title: 'OpenAI 新闻与博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '10-light-heavy',
            reason: '你选择做轻 Agent 还是重 Agent，会直接决定商业模式要承受的成本结构和价值主张。'
          },
          {
            chapterId: '12-tool-use',
            reason: '商业路线确定后，下一层可防御性通常来自 Agent 到底能操作哪些工具和外部系统。'
          }
        ]
      }
    }
  });
})();
