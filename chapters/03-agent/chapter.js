(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '03-agent',
    order: 3,

    nav:      { en: 'Agent',       zh: 'Agent 智能体' },
    title:    { en: '<span class="accent">Agent</span>',  zh: '<span class="accent">Agent</span> 智能体' },
    subtitle: { en: 'Shell Program + Memory File Collection', zh: '外壳程序 + 记忆文件集合' },
    tag:      { en: 'Core Concept', zh: '核心概念' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 295',

    getSvg(lang) {
      const memFiles = [
        ['#ff4d6d', t(lang, 'persona.md',   '人格定义.md'),   t(lang, 'who am I',       'who am I')],
        ['#00c8ff', t(lang, 'knowledge.md', '行业记忆.md'),   t(lang, 'what I know',     'what I know')],
        ['#ffb800', t(lang, 'skill_A.md',   'skill_A.md'),    t(lang, 'what I can do',   'what I can do')],
        ['#00e599', t(lang, 'worklog.md',   '工作日志.md'),   t(lang, 'what I did',      'what I did')],
        ['#a78bfa', t(lang, 'handoff.md',   '交接手册.md'),   t(lang, 'current state',   'current state')],
      ];

      const shellSteps = [
        t(lang, 'Read memory files', '读取记忆文件'),
        t(lang, 'Build API request', '构造 API 请求'),
        t(lang, 'Execute actions',   '执行返回动作'),
        t(lang, 'Update memory',     '更新记忆文件'),
      ];

      const memBoxes = memFiles.map(([c,n,s], i) => `
        <rect x="${303 + Math.floor(i/3)*200}" y="${110 + (i%3)*52}"
          width="178" height="40" rx="4" fill="${c}12" stroke="${c}30" stroke-width="1"/>
        <text x="${392 + Math.floor(i/3)*200}" y="${133 + (i%3)*52}"
          text-anchor="middle" fill="${c}"
          font-family="'JetBrains Mono',monospace" font-size="11">${n}</text>
        <text x="${392 + Math.floor(i/3)*200}" y="${148 + (i%3)*52}"
          text-anchor="middle" fill="${c}88"
          font-family="'JetBrains Mono',monospace" font-size="9">${s}</text>
      `).join('');

      const shellBoxes = shellSteps.map((step, i) => `
        <rect x="75" y="${108 + i*38}" width="152" height="28" rx="3"
          fill="#a78bfa12" stroke="#a78bfa30" stroke-width="1"/>
        <text x="151" y="${127 + i*38}" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="10">${step}</text>
      `).join('');

      return `
        <!-- Outer Agent boundary -->
        <rect x="38" y="24" width="688" height="252" rx="10"
          fill="#00c8ff08" stroke="#00c8ff" stroke-width="2"/>
        <text x="380" y="18" text-anchor="middle" fill="#00c8ff"
          font-family="'JetBrains Mono',monospace" font-size="12" font-weight="500">Agent</text>

        <!-- Shell program panel -->
        <rect x="58" y="48" width="185" height="212" rx="6"
          fill="#0d1526" stroke="#2a4578" stroke-width="1.5"/>
        <text x="151" y="74" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">
          ${t(lang, 'Shell Program', '外壳程序')}
        </text>
        <text x="151" y="91" text-anchor="middle" fill="#a78bfa88"
          font-family="'JetBrains Mono',monospace" font-size="9">Shell Program</text>
        ${shellBoxes}

        <!-- Memory files panel -->
        <rect x="285" y="48" width="430" height="212" rx="6"
          fill="#0d1526" stroke="#2a4578" stroke-width="1.5"/>
        <text x="500" y="74" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">
          ${t(lang, 'Memory Files', '记忆文件集合')}
        </text>
        <text x="500" y="91" text-anchor="middle" fill="#ffb80088"
          font-family="'JetBrains Mono',monospace" font-size="9">Memory Files</text>
        ${memBoxes}
      `;
    },

    content: {
      en: {
        definition: '<strong>Agent = Shell Program + Memory File Collection (including Skills).</strong> The shell program handles API calls; memory files provide continuity and specialized context. Neither works without the other.',
        essence: 'An Agent has three states:<br><br><strong>① Dormant:</strong> Just a pile of files, no consciousness — like a closed book.<br><strong>② Active:</strong> The shell program is triggered, bundles memory files + current task, sends to the LLM API. The Agent "temporarily wakes up," reasons, and acts.<br><strong>③ Archived:</strong> Results are written back to memory files. The Agent becomes dormant again.\n\n<em>Key insight:</em> An Agent is not "a living program." It is a combination of "files + invocation program." The LLM API produces the intelligence; the Agent provides <strong>continuity</strong> and <strong>specialized context</strong>.',
        insight: 'An Agent\'s most valuable asset is its <strong>domain memory</strong> — the knowledge, experiences, and patterns accumulated in a specific field. An Agent with 6 months of deep domain memory far outvalues any Prompt template. That is the real moat.'
      },
      zh: {
        definition: '<strong>Agent = 外壳程序 + 长期记忆文件集合（含 Skills）</strong>。外壳程序负责调用 API；记忆文件负责提供持续性和专业上下文。两者缺一不可。',
        essence: 'Agent 有三种状态：<br><br><strong>① 静止态</strong>：只是一堆文件，没有意识，像一本合上的书。<br><strong>② 激活态</strong>：外壳程序被触发，将记忆文件 + 当前任务打包发给大模型 API，Agent "临时清醒"，产生推理和行动。<br><strong>③ 归档态</strong>：工作成果写回记忆文件，Agent 再次静止。\n\n<em>关键认知</em>：Agent 本质不是"活的程序"，而是"文件 + 调用程序"的组合。真正产生智能的是大模型 API，Agent 提供的是<strong>持续性</strong>和<strong>专业化上下文</strong>。',
        insight: 'Agent 最值钱的是<strong>行业记忆</strong>——那些在特定领域积累的知识、经验、处理模式。一个有 6 个月深度工作记忆的 Agent，其价值远超任何 Prompt 模板。这才是真正的护城河。'
      }
    }
  });
})();
