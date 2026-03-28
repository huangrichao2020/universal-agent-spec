(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '01b-memory-files',
    order: 1.1,

    nav:      { en: 'Memory Files',  zh: '1.1 记忆文件' },
    title:    { en: 'Memory <span class="accent">Files</span>', zh: '记忆 <span class="accent">文件</span>' },
    subtitle: { en: 'Why they were invented · How Agents use them', zh: '为什么被发明 · Agent 怎么使用它' },
    tag:      { en: 'Core Concept',  zh: '核心概念' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 290',

    getSvg(lang) {
      const files = [
        ['#ff4d6d', t(lang, 'persona.md',   '人格定义.md'),  t(lang, 'Who am I?',  '我是谁？')],
        ['#00c8ff', t(lang, 'knowledge.md', '行业记忆.md'),  t(lang, 'What I know','我知道什么')],
        ['#ffb800', t(lang, 'skill_A.md',   'skill_A.md'),   t(lang, 'How I act',  '我怎么做')],
        ['#1a8a3a', t(lang, 'worklog.md',   '工作日志.md'),  t(lang, 'What I did', '我做了什么')],
        ['#a78bfa', t(lang, 'handoff.md',   '交接手册.md'),  t(lang, 'Where I am', '我在哪里')],
      ];

      const cards = files.map(([c, name, desc], i) => {
        const x = 38 + i * 140;
        return `
          <rect x="${x}" y="20" width="122" height="66" rx="5" fill="${c}12" stroke="${c}" stroke-width="1.5"/>
          <rect x="${x}" y="20" width="122" height="20" rx="5" fill="${c}28" stroke="none"/>
          <text x="${x+61}" y="35" text-anchor="middle" fill="${c}" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="500">${name}</text>
          <text x="${x+61}" y="62" text-anchor="middle" fill="${c}99" font-family="'JetBrains Mono',monospace" font-size="9">${desc}</text>
          <line x1="${x+61}" y1="86" x2="${x+61}" y2="108" stroke="${c}44" stroke-width="1.2" stroke-dasharray="3 2"/>
        `;
      }).join('');

      return `
        ${cards}

        <rect x="150" y="108" width="460" height="38" rx="5" fill="#f0f4ff" stroke="#0071e3" stroke-width="1.5"/>
        <text x="380" y="123" text-anchor="middle" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="500">
          ${t(lang, 'UI program: memory files + task → context window → LLM', 'UI 界面程序：记忆文件 + 当前任务 → context window → 大模型')}
        </text>
        <text x="380" y="138" text-anchor="middle" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Model "wakes up" knowing who it is and what it was doing', '模型"醒来"时已知道自己是谁、在做什么')}
        </text>

        <line x1="380" y1="146" x2="380" y2="164" stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>

        <rect x="240" y="164" width="280" height="40" rx="5" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="380" y="180" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="500">
          ${t(lang, 'LLM API (stateless)', '大模型 API（无状态）')}
        </text>
        <text x="380" y="196" text-anchor="middle" fill="#a78bfa88" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'forgets everything — memory files are the only persistence', '调用结束即遗忘 — 记忆文件是唯一的持续性来源')}
        </text>

        <line x1="380" y1="204" x2="380" y2="222" stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>

        <rect x="210" y="222" width="340" height="36" rx="5" fill="#1a8a3a12" stroke="#1a8a3a" stroke-width="1.5"/>
        <text x="380" y="245" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'Results written back → memory grows → Agent compounds', '结果写回 → 记忆成长 → Agent 越用越聪明')}
        </text>

        ${S.label(380, 276,
          t(lang, 'OpenClaw: persona + trading methodology + skills + 6mo worklog',
                  'OpenClaw：人格 + 交易方法论 + Skills + 6个月日志'),
          '#6b84a8', 11)}
        ${S.label(380, 290,
          t(lang, '→ all loaded into context on every invocation',
                  '→ 每次调用全部加载进 context'),
          '#6b84a8', 10)}
      `;
    },

    content: {
      en: {
        definition: 'Memory files are plain text documents (usually Markdown) that define an Agent\'s identity, knowledge, skills, and history. <strong>They are the only thing that gives an Agent continuity across invocations.</strong>',

        essence: 'The LLM API is stateless — it forgets everything the moment a call ends. Memory files solve this: <em>instead of the model holding state, the files hold state.</em> The UI program reads memory files, packs them with the current task, and sends the whole bundle as the context window. The model wakes up knowing who it is and what it was doing.\n\n<strong>OpenClaw is a real-world example.</strong> It is a heavy-Agent product built on GLM. Its memory is split into layers:\n— A persona file defines its personality and values\n— An industry memory file holds accumulated domain expertise (A-share trading methodology, sector rotation rules, stock pool)\n— Skill files describe exactly how to call AKShare, Tushare, 东方财富妙想\n— A worklog records every trade decision and outcome\n\nEvery time OpenClaw is invoked, these files are loaded into context. It "remembers" 6 months of trading experience in seconds.',

        insight: 'The most valuable memory file is the one that took the longest to build — the domain knowledge file. A persona takes 10 minutes to write. A skill takes an hour. But a domain memory file that captures real expertise? That takes months of real work. <strong>That is the moat.</strong>',

        table: {
          title: 'Memory file types',
          headers: ['File', 'Answers', 'Example content', 'How it grows'],
          rows: [
            ['persona.md',   'Who am I?',       'Personality, values, communication style', 'Written once, rarely changed'],
            ['knowledge.md', 'What do I know?', 'Domain expertise, rules, case studies',    'Grows with every task'],
            ['skill_X.md',   'How do I act?',   'Step-by-step procedures for specific tasks','Added as new capabilities needed'],
            ['worklog.md',   'What did I do?',  'Task history, decisions, outcomes',         'Appended after every session'],
            ['handoff.md',   'Where am I?',     'Current state, in-progress tasks, next steps','Updated every session'],
          ]
        }
      },

      zh: {
        definition: '记忆文件是一组纯文本文档（通常是 Markdown），定义了 Agent 的身份、知识、技能和历史。<strong>它们是 Agent 跨调用保持持续性的唯一载体。</strong>',

        essence: '大模型 API 是无状态的——调用结束就忘得一干二净。记忆文件为此而生：<em>与其让模型持有状态，不如让文件持有状态。</em>UI 界面程序读取记忆文件，和当前任务打包成 context window 发给大模型，模型"醒来"就知道自己是谁、在做什么。\n\n<strong>OpenClaw 是一个真实案例。</strong>它是一个基于 GLM 构建的重 Agent 产品，记忆分层设计如下：\n— 人格文件：定义性格与价值观\n— 行业记忆文件：积累的 A 股交易方法论、板块轮动规则、股票池\n— Skill 文件：精确描述如何调用 AKShare、Tushare、东方财富妙想\n— 工作日志：记录每一次交易决策和结果\n\n每次激活 OpenClaw，这些文件被加载进 context，它在几秒内"想起"了 6 个月的交易经验。',

        insight: '最有价值的记忆文件，是花时间最长建立的那个——行业知识文件。人格文件 10 分钟写完，Skill 文件一小时搞定。但一份真正沉淀了领域专业知识的记忆文件？那需要几个月的真实工作。<strong>这才是护城河。</strong>',

        table: {
          title: '记忆文件类型',
          headers: ['文件', '回答的问题', '典型内容', '如何成长'],
          rows: [
            ['persona.md',   '我是谁？',     '性格、价值观、沟通风格',             '写一次，很少改动'],
            ['knowledge.md', '我知道什么？', '领域知识、规则、案例',               '每次任务后积累'],
            ['skill_X.md',   '我怎么做？',   '特定任务的分步操作流程',             '需要新能力时新增'],
            ['worklog.md',   '我做了什么？', '任务历史、决策记录、结果复盘',       '每次会话后追加'],
            ['handoff.md',   '我在哪里？',   '当前状态、进行中的任务、下一步计划', '每次会话后更新'],
          ]
        }
      }
    }
  });
})();
