(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '01b-memory',
    order: 1.2,

    nav:      { en: 'Saving Memory',    zh: '1.2 节约记忆文件' },
    title:    { en: '<span class="accent">Memory</span> Files', zh: '<span class="accent">记忆文件</span>' },
    subtitle: { en: 'Why stateless models need persistent memory', zh: '为什么无状态模型需要持久化记忆' },
    tag:      { en: 'Core Concept',   zh: '核心概念' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 300',

    getSvg(lang) {
      const files = [
        ['#ff4d6d', t(lang, 'persona.md',     '人格定义.md'),   t(lang, 'WHO am I',        '我是谁')],
        ['#00c8ff', t(lang, 'knowledge.md',   '行业记忆.md'),   t(lang, 'WHAT I know',     '我知道什么')],
        ['#ffb800', t(lang, 'skill_A.md',     'skill_A.md'),   t(lang, 'HOW to do X',     '怎么做 X')],
        ['#1a8a3a', t(lang, 'worklog.md',     '工作日志.md'),   t(lang, 'WHAT I did',      '我做过什么')],
        ['#a78bfa', t(lang, 'handoff.md',     '交接手册.md'),   t(lang, 'WHERE I left off','进行到哪了')],
      ];

      const fileBoxes = files.map(([c, name, sub], i) => `
        <rect x="${30 + i * 146}" y="80" width="130" height="62" rx="6"
          fill="${c}12" stroke="${c}" stroke-width="1.5"/>
        <text x="${95 + i * 146}" y="106" text-anchor="middle" fill="${c}"
          font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">${name}</text>
        <text x="${95 + i * 146}" y="123" text-anchor="middle" fill="${c}88"
          font-family="'JetBrains Mono',monospace" font-size="9">${sub}</text>
      `).join('');

      // Arrow down from files to Agent
      const arrows = files.map((_, i) => `
        <line x1="${95 + i * 146}" y1="143" x2="${95 + i * 146}" y2="178"
          stroke="#2a4578" stroke-width="1.2" marker-end="url(#arr)"/>
      `).join('');

      // Agent box
      const agentBox = `
        <rect x="120" y="180" width="520" height="58" rx="8"
          fill="#00c8ff08" stroke="#00c8ff" stroke-width="1.8"/>
        <text x="380" y="207" text-anchor="middle" fill="#00c8ff"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="500">
          ${t(lang, 'Agent  (UI interface + Memory Files)', 'Agent（UI 界面程序 + 记忆文件）')}
        </text>
        <text x="380" y="225" text-anchor="middle" fill="#00c8ff66"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Each invocation: load memory → call LLM → write back result', '每次激活：加载记忆 → 调用大模型 → 结果写回')}
        </text>
      `;

      // OpenClaw example
      const example = `
        <rect x="30" y="258" width="340" height="30" rx="4"
          fill="#a78bfa10" stroke="#a78bfa40" stroke-width="1"/>
        <text x="48" y="278" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, '💡 OpenClaw: persona.md = "龙虾" personality + Feishu skill', '💡 OpenClaw：persona.md = "龙虾"人格 + 飞书 skill')}
        </text>
        <rect x="390" y="258" width="340" height="30" rx="4"
          fill="#1a8a3a10" stroke="#1a8a3a40" stroke-width="1"/>
        <text x="408" y="278" fill="#1a8a3a"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, '💡 Without memory files: every invocation = brand new stranger', '💡 没有记忆文件：每次调用都是全新陌生人')}
        </text>
      `;

      return fileBoxes + arrows + agentBox + example +
        S.label(380, 302,
          t(lang,
            'Memory files are the "soul" of an Agent — the LLM is just the brain it borrows each time',
            '记忆文件是 Agent 的"灵魂"——大模型只是它每次借用的大脑'),
          '#6b84a8', 11);
    },

    content: {
      en: {
        definition: 'A set of plain text files (Markdown, JSON, etc.) that store everything an Agent needs to persist across invocations: identity, domain knowledge, skills, work history, and current state. <strong>Memory files are why an Agent can "remember" — the LLM itself cannot.</strong>',
        essence: 'The LLM API is stateless by design — send a request, get a response, everything vanishes. This is efficient but brutal: without memory files, every invocation starts cold. The Agent would have no name, no expertise, no idea what it did yesterday.\n\nMemory files were invented to solve exactly this: <em>wrap the stateless LLM call in a persistent context layer.</em> Before calling the API, the UI interface program reads relevant memory files and injects them into the prompt. After the call, new knowledge and results are written back. The LLM stays stateless; the Agent gains continuity.\n\nThis is why <strong>memory files are an Agent\'s most valuable asset</strong> — not the model, not the code, but the accumulated files that make a generic LLM behave like a specialist with history.',
        insight: 'OpenClaw is a good example: its "龙虾" persona isn\'t hardcoded in software — it lives in a <code>persona.md</code> file. Its Feishu-sending ability lives in a <code>skill_feishu.md</code>. Swap those files and you have a completely different Agent, running on the same codebase. The files <em>are</em> the Agent.',
        table: {
          title: 'Memory File Types',
          headers: ['File', 'Stores', 'Analogy'],
          rows: [
            ['<code>persona.md</code>', 'Identity, personality, values, communication style', 'Character'],
            ['<code>knowledge.md</code>', 'Domain expertise, industry facts, learned patterns', 'Long-term memory'],
            ['<code>skill_X.md</code>', 'Step-by-step procedures for specific task types', 'Muscle memory'],
            ['<code>worklog.md</code>', 'History of completed tasks and outcomes', 'Work diary'],
            ['<code>handoff.md</code>', 'Current task state for multi-Agent handoffs', 'Sticky note'],
          ]
        }
      },
      zh: {
        definition: '一组纯文本文件（Markdown、JSON 等），存储 Agent 在多次调用之间需要持久保留的一切：身份、领域知识、技能、工作历史和当前状态。<strong>记忆文件是 Agent 能"记住事情"的原因——大模型本身做不到。</strong>',
        essence: '大模型 API 天生无状态——发一个请求，收一个回复，一切消散。这很高效，但很残忍：没有记忆文件，每次调用都是冷启动。Agent 不知道自己叫什么、不知道自己会什么、不知道昨天干了什么。\n\n记忆文件正是为解决这个问题而被发明出来的：<em>在无状态的大模型调用外面，包一层持久化的上下文层。</em>调用 API 之前，UI 界面程序读取相关记忆文件注入 prompt；调用结束后，新的知识和结果写回文件。大模型保持无状态；Agent 获得了连续性。\n\n这就是为什么<strong>记忆文件是 Agent 最值钱的资产</strong>——不是模型，不是代码，而是那些让一个通用大模型表现得像领域专家的积累文件。\n\n以 OpenClaw 为例：它的"龙虾"人格不是硬编码在程序里的，而是存在一个 <code>persona.md</code> 文件里。它发飞书消息的能力，存在 <code>skill_feishu.md</code> 里。换掉这些文件，同一套代码就变成了完全不同的 Agent。<em>文件就是 Agent 本身。</em>',
        insight: '很多人第一次理解记忆文件时会说"那不就是 prompt 吗"——不完全是。Prompt 是单次调用时临时构造的，用完就丢。记忆文件是持久存在的，跨越无数次调用，会被读取、被更新、被积累。这一字之差，决定了 Agent 有没有"成长"的能力。',
        table: {
          title: '记忆文件类型',
          headers: ['文件', '存储内容', '类比'],
          rows: [
            ['<code>persona.md</code>', '身份、人格、价值观、沟通风格', '性格'],
            ['<code>knowledge.md</code>', '领域专业知识、行业事实、学到的模式', '长期记忆'],
            ['<code>skill_X.md</code>', '特定任务类型的分步操作流程', '肌肉记忆'],
            ['<code>worklog.md</code>', '已完成任务的历史记录和结果', '工作日记'],
            ['<code>handoff.md</code>', '当前任务状态，供多 Agent 交接', '便利贴'],
          ]
        }
      }
    }
  });
})();
