(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '01b-memory-files',
    order: 1.5,

    nav:      { en: 'Memory Files',   zh: '记忆文件' },
    title:    { en: 'Memory <span class="accent">Files</span>', zh: '记忆 <span class="accent">文件</span>' },
    subtitle: { en: 'Why they were invented · How Agents use them', zh: '为什么会被发明 · Agent 怎么使用它' },
    tag:      { en: 'Core Concept',   zh: '核心概念' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 300',

    getSvg(lang) {
      const files = [
        ['#ff4d6d', t(lang, 'persona.md',    '人格定义.md'),    t(lang, 'Who am I?',         '我是谁？')],
        ['#00c8ff', t(lang, 'knowledge.md',  '行业记忆.md'),    t(lang, 'What do I know?',   '我知道什么？')],
        ['#ffb800', t(lang, 'skill_A.md',    'skill_A.md'),     t(lang, 'How do I act?',     '我怎么做？')],
        ['#00e599', t(lang, 'worklog.md',    '工作日志.md'),    t(lang, 'What did I do?',    '我做了什么？')],
        ['#a78bfa', t(lang, 'handoff.md',    '交接手册.md'),    t(lang, 'Where am I now?',   '我在哪里？')],
      ];

      const fileCards = files.map(([c, name, desc], i) => {
        const x = 38 + i * 140;
        return `
          <rect x="${x}" y="30" width="122" height="72" rx="5"
            fill="${c}12" stroke="${c}" stroke-width="1.5"/>
          <rect x="${x}" y="30" width="122" height="22" rx="5" fill="${c}25" stroke="none"/>
          <text x="${x+61}" y="46" text-anchor="middle" fill="${c}"
            font-family="'JetBrains Mono',monospace" font-size="9" font-weight="500">${name}</text>
          <text x="${x+61}" y="72" text-anchor="middle" fill="${c}99"
            font-family="'JetBrains Mono',monospace" font-size="9">${desc}</text>
          <line x1="${x+61}" y1="102" x2="${x+61}" y2="130"
            stroke="${c}55" stroke-width="1.2" stroke-dasharray="3 2"/>
        `;
      }).join('');

      // Arrow: files → pack → API → response
      return `
        ${fileCards}

        <!-- Pack box -->
        <rect x="170" y="130" width="420" height="44" rx="5"
          fill="#1e3058" stroke="#2a4578" stroke-width="1.5"/>
        <text x="380" y="148" text-anchor="middle" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'UI interface bundles memory files + current task', 'UI 界面程序打包：记忆文件 + 当前任务')}
        </text>
        <text x="380" y="163" text-anchor="middle" fill="#6b84a888"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, '→ constructs context window', '→ 构造 context window 发给大模型')}
        </text>

        <!-- Arrow down to API -->
        <line x1="380" y1="174" x2="380" y2="198"
          stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>

        <!-- LLM box -->
        <rect x="260" y="198" width="240" height="42" rx="5"
          fill="#a78bfa18" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="380" y="224" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">
          ${t(lang, 'LLM API (stateless)', '大模型 API（无状态）')}
        </text>

        <!-- Arrow down to write back -->
        <line x1="380" y1="240" x2="380" y2="262"
          stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>

        <!-- Write back box -->
        <rect x="220" y="262" width="320" height="38" rx="5"
          fill="#00e59912" stroke="#00e599" stroke-width="1.5"/>
        <text x="380" y="286" text-anchor="middle" fill="#00e599"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'Results written back → memory files updated', '结果写回 → 记忆文件更新 → Agent 成长')}
        </text>

        ${S.label(380, 292,
          '',
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'Memory files are a collection of plain text documents (usually Markdown) that together define an Agent\'s identity, knowledge, skills, and work history. <strong>They are the only thing that makes an Agent persistent across invocations.</strong>',

        essence: 'The LLM API is stateless — it forgets everything the moment a call ends. This is great for scalability, but terrible for anything that needs to "know" something over time.\n\nMemory files were invented to solve this: <em>instead of the model holding state, the files hold state.</em> Before each invocation, the UI interface program reads the relevant memory files and injects them into the context window alongside the current task. The model "wakes up" already knowing who it is, what it knows, and what it was doing.\n\n<strong>OpenClaw is a real-world example.</strong> It is a heavy-Agent product built on GLM. Its memory is split into layers:\n— A persona file defines its personality and values\n— An industry memory file holds accumulated domain expertise (A-share trading methodology, sector rotation rules, stock pool)\n— Skill files describe exactly how to call AKShare, Tushare, 东方财富妙想\n— A worklog records every trade decision and outcome\n\nEvery time OpenClaw is invoked, these files are loaded into context. It "remembers" 6 months of trading experience in seconds.',

        insight: 'The most valuable memory file is the one that took the longest to build — the domain knowledge file. A persona takes 10 minutes to write. A skill takes an hour. But a domain memory file that captures real expertise? That takes months of real work. <strong>That is the moat.</strong>',

        table: {
          title: 'Memory File Types',
          headers: ['File', 'Answers', 'Example content', 'How it grows'],
          rows: [
            ['persona.md',   'Who am I?',       'Personality, values, communication style', 'Written once, rarely changed'],
            ['knowledge.md', 'What do I know?', 'Domain expertise, rules, case studies',    'Grows with every task'],
            ['skill_X.md',   'How do I act?',   'Step-by-step procedures for specific tasks', 'Added as new capabilities needed'],
            ['worklog.md',   'What did I do?',  'Task history, decisions, outcomes',         'Appended after every session'],
            ['handoff.md',   'Where am I?',     'Current state, in-progress tasks, next steps', 'Updated every session'],
          ]
        }
      },

      zh: {
        definition: '记忆文件是一组纯文本文档（通常是 Markdown），合在一起定义了一个 Agent 的身份、知识、技能和工作历史。<strong>它们是让 Agent 在多次调用之间保持持续性的唯一载体。</strong>',

        essence: '大模型 API 是无状态的——调用结束就忘得一干二净。这对并发性能很好，但对任何需要"记住事情"的场景来说是灾难。\n\n记忆文件就是为解决这个问题而发明的：<em>与其让模型持有状态，不如让文件持有状态。</em>每次调用前，UI 界面程序读取相关记忆文件，连同当前任务一起打包进 context window 发给大模型。模型"醒来"时已经知道自己是谁、知道什么、在做什么。\n\n<strong>OpenClaw 是一个真实案例。</strong>它是一个基于 GLM 构建的重 Agent 产品，记忆分层设计如下：\n— 人格文件：定义性格与价值观\n— 行业记忆文件：积累的 A 股交易方法论、板块轮动规则、股票池\n— Skill 文件：精确描述如何调用 AKShare、Tushare、东方财富妙想\n— 工作日志：记录每一次交易决策和结果\n\n每次激活 OpenClaw，这些文件被加载进 context，它在几秒内"想起"了 6 个月的交易经验。',

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
