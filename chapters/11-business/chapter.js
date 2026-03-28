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
        <text x="68" y="${118 + i*16}" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="9">· ${s}</text>
      `).join('');

      const tocRows = tocItems.map((s, i) => `
        <text x="432" y="${118 + i*16}" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="9">· ${s}</text>
      `).join('');

      return `
        <!-- ToB panel -->
        <rect x="28" y="22" width="328" height="238" rx="8"
          fill="#00c8ff08" stroke="#00c8ff40" stroke-width="1.5"/>
        <text x="192" y="46" text-anchor="middle" fill="#00c8ff"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="500">
          ToB · ${t(lang, 'Sell the Agent', '卖 Agent 本体')}
        </text>
        <rect x="52" y="58" width="280" height="100" rx="5" fill="#0d1526" stroke="#1e3058"/>
        <text x="68" y="78" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="9">
          📦 ${t(lang, 'Deliverables', '交付物')}
        </text>
        ${tobRows}
        <text x="192" y="175" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'One-time purchase · User brings compute', '一次性买断 · 买家自接大模型算力')}
        </text>
        <text x="192" y="193" text-anchor="middle" fill="#00e59988"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Moat: exclusive domain memory', '护城河：独家行业记忆')}
        </text>
        <text x="192" y="246" text-anchor="middle" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Best for: vertical industry Agent sales', '适合：垂直行业 Agent 出售')}
        </text>

        <!-- ToC panel -->
        <rect x="404" y="22" width="328" height="238" rx="8"
          fill="#a78bfa08" stroke="#a78bfa40" stroke-width="1.5"/>
        <text x="568" y="46" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="500">
          ToC · ${t(lang, 'Sell the service', '卖产品服务')}
        </text>
        <rect x="428" y="58" width="280" height="100" rx="5" fill="#0d1526" stroke="#1e3058"/>
        <text x="444" y="78" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="9">
          💻 ${t(lang, 'Model', '模式')}
        </text>
        ${tocRows}
        <text x="568" y="175" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Subscription / usage · You pay compute', '订阅 / 按量 · 你承担算力成本')}
        </text>
        <text x="568" y="193" text-anchor="middle" fill="#00e59988"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Moat: product UX + user habit', '护城河：产品体验 + 用户习惯')}
        </text>
        <text x="568" y="246" text-anchor="middle" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Best for: consumer-facing AI products', '适合：面向消费者的 AI 产品')}
        </text>
      `;
    },

    content: {
      en: {
        definition: 'Two business routes: <strong>ToB</strong> — sell the Agent itself (shell + memory files), one-time purchase, user brings their own compute; <strong>ToC</strong> — sell product service, Agent runs on your server, users pay for usage.',
        essence: 'The core difference is <em>who bears compute cost</em> and <em>where the moat comes from</em>.\n\nToB moat: <strong>Domain memory.</strong> An Agent with accumulated expertise in medicine, law, finance — expertise a buyer cannot quickly replicate — is truly valuable.\n\nToC moat: <strong>Product UX + user habit.</strong> Compute cost is your burden, but scale effects and user stickiness are your barriers.\n\nNote: ToB is not "selling a Prompt collection." The real value is the <em>domain memory files</em> — the professionally validated knowledge base built from extensive practice.',
        insight: 'In the Agent era, ToB business sells not software features but "a copy of an expert\'s brain." Selling a top-tier sales Agent\'s memory to 100 companies is more scalable than training 100 salespeople.'
      },
      zh: {
        definition: '两条商业路线：<strong>ToB</strong>——你是卖家，卖 Agent 本体（UI 界面 + 记忆文件），一次性买断，买家自己接入算力大模型使用 Agent；<strong>ToC</strong>——卖产品服务，Agent 在你的服务器，算力和大模型也用你自己的，用户充值使用。',
        essence: '两条路线的核心差异是<em>谁承担算力成本</em>和<em>护城河来自哪里</em>。\n\nToB 的护城河：<strong>行业记忆</strong>。一个在医疗、法律、金融等垂直领域积累了大量专业记忆的 Agent，其价值是买家无法自己快速复制的。\n\nToC 的护城河：<strong>产品体验 + 用户习惯</strong>。算力成本是你的负担，但规模效应和用户粘性是壁垒。\n\n注意：ToB 不是"卖 Prompt 合集"，真正的价值在于<em>行业记忆文件</em>——那些经过大量实践验证、积累的专业知识库。',
        insight: 'Agent 时代的 ToB 生意，卖的不是软件功能，卖的是"专家大脑的副本"。把一个顶级销售 Agent 的记忆卖给 100 个公司，比培养 100 个销售更可扩展。'
      }
    }
  });
})();
