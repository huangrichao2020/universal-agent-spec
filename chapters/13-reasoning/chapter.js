(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '13-reasoning',
    order: 13,

    nav:      { en: 'Reasoning',       zh: '推理模式' },
    title:    { en: 'Reasoning <span class="accent">Patterns</span>', zh: '推理 <span class="accent">模式</span>' },
    subtitle: { en: 'CoT · ToT · GoT · How Agents Think', zh: 'CoT · ToT · GoT · Agent 如何思考' },
    tag:      { en: 'Design Pattern',  zh: '设计模式' },
    tagClass: 'tag-pattern',

    viewBox: '0 0 760 300',

    getSvg(lang) {
      // Four reasoning patterns side by side
      const patterns = [
        { x: 40,  color: '#0071e3', name: 'CoT',    zh: '思维链',
          desc: t(lang, 'Linear step-by-step', '线性逐步推理') },
        { x: 220, color: '#1a8a3a', name: 'CoT-SC', zh: '自一致性',
          desc: t(lang, 'Multiple paths → vote', '多条路径 → 投票') },
        { x: 400, color: '#ff4d6d', name: 'ToT',    zh: '思维树',
          desc: t(lang, 'Branch + backtrack', '分支 + 回溯') },
        { x: 580, color: '#a78bfa', name: 'GoT',    zh: '思维图',
          desc: t(lang, 'Merge + refine loops', '合并 + 迭代精炼') },
      ];

      let svg = '';

      patterns.forEach(p => {
        // Title box
        svg += S.box(p.x, 20, 140, 36, p.color, p.name, p.zh);

        // Description
        svg += `<text x="${p.x + 70}" y="78" text-anchor="middle" fill="${p.color}88"
          font-family="'JetBrains Mono',monospace" font-size="9">${p.desc}</text>`;
      });

      // CoT: linear chain
      svg += `
        <circle cx="110" cy="105" r="8" fill="#0071e318" stroke="#0071e3" stroke-width="1.5"/>
        <text x="110" y="109" text-anchor="middle" fill="#0071e3" font-size="8" font-family="'JetBrains Mono',monospace">1</text>
        <line x1="110" y1="113" x2="110" y2="130" stroke="#0071e3" stroke-width="1.2" marker-end="url(#arrC)"/>
        <circle cx="110" cy="140" r="8" fill="#0071e318" stroke="#0071e3" stroke-width="1.5"/>
        <text x="110" y="144" text-anchor="middle" fill="#0071e3" font-size="8" font-family="'JetBrains Mono',monospace">2</text>
        <line x1="110" y1="148" x2="110" y2="165" stroke="#0071e3" stroke-width="1.2" marker-end="url(#arrC)"/>
        <circle cx="110" cy="175" r="8" fill="#0071e318" stroke="#0071e3" stroke-width="1.5"/>
        <text x="110" y="179" text-anchor="middle" fill="#0071e3" font-size="8" font-family="'JetBrains Mono',monospace">3</text>
        <line x1="110" y1="183" x2="110" y2="200" stroke="#0071e3" stroke-width="1.2" marker-end="url(#arrC)"/>
        <rect x="90" y="205" width="40" height="20" rx="4" fill="#0071e3" stroke="none"/>
        <text x="110" y="219" text-anchor="middle" fill="white" font-size="8" font-family="'JetBrains Mono',monospace">A</text>
      `;

      // CoT-SC: three parallel paths converging
      svg += `
        <circle cx="260" cy="105" r="6" fill="#1a8a3a18" stroke="#1a8a3a" stroke-width="1"/>
        <line x1="260" y1="111" x2="240" y2="135" stroke="#1a8a3a" stroke-width="1" stroke-dasharray="3 2"/>
        <line x1="260" y1="111" x2="260" y2="135" stroke="#1a8a3a" stroke-width="1" stroke-dasharray="3 2"/>
        <line x1="260" y1="111" x2="280" y2="135" stroke="#1a8a3a" stroke-width="1" stroke-dasharray="3 2"/>
        <text x="240" y="150" text-anchor="middle" fill="#1a8a3a" font-size="8" font-family="'JetBrains Mono',monospace">A</text>
        <text x="260" y="150" text-anchor="middle" fill="#1a8a3a" font-size="8" font-family="'JetBrains Mono',monospace">B</text>
        <text x="280" y="150" text-anchor="middle" fill="#1a8a3a" font-size="8" font-family="'JetBrains Mono',monospace">A</text>
        <line x1="240" y1="155" x2="260" y2="178" stroke="#1a8a3a" stroke-width="1"/>
        <line x1="260" y1="155" x2="260" y2="178" stroke="#1a8a3a" stroke-width="1"/>
        <line x1="280" y1="155" x2="260" y2="178" stroke="#1a8a3a" stroke-width="1"/>
        <rect x="242" y="180" width="36" height="20" rx="4" fill="#1a8a3a" stroke="none"/>
        <text x="260" y="194" text-anchor="middle" fill="white" font-size="7" font-family="'JetBrains Mono',monospace">${t(lang, 'vote:A', '投票:A')}</text>
      `;

      // ToT: branching tree with backtrack
      svg += `
        <circle cx="470" cy="105" r="6" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <line x1="470" y1="111" x2="450" y2="130" stroke="#ff4d6d" stroke-width="1"/>
        <line x1="470" y1="111" x2="490" y2="130" stroke="#ff4d6d" stroke-width="1"/>
        <circle cx="450" cy="136" r="5" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <circle cx="490" cy="136" r="5" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <line x1="450" y1="141" x2="440" y2="158" stroke="#ff4d6d80" stroke-width="1" stroke-dasharray="3 2"/>
        <line x1="450" y1="141" x2="460" y2="158" stroke="#ff4d6d" stroke-width="1"/>
        <text x="440" y="170" text-anchor="middle" fill="#ff4d6d80" font-size="7" font-family="'JetBrains Mono',monospace">X</text>
        <circle cx="460" cy="165" r="5" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <line x1="460" y1="170" x2="460" y2="190" stroke="#ff4d6d" stroke-width="1" marker-end="url(#arr)"/>
        <rect x="442" y="192" width="36" height="20" rx="4" fill="#ff4d6d" stroke="none"/>
        <text x="460" y="206" text-anchor="middle" fill="white" font-size="8" font-family="'JetBrains Mono',monospace">A</text>
      `;

      // GoT: graph with merge loops
      svg += `
        <circle cx="630" cy="105" r="6" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1"/>
        <circle cx="660" cy="105" r="6" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1"/>
        <line x1="636" y1="105" x2="654" y2="105" stroke="#a78bfa" stroke-width="1"/>
        <line x1="630" y1="111" x2="645" y2="135" stroke="#a78bfa" stroke-width="1"/>
        <line x1="660" y1="111" x2="645" y2="135" stroke="#a78bfa" stroke-width="1"/>
        <circle cx="645" cy="140" r="6" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1"/>
        <path d="M 651 140 Q 670 140 670 125 Q 670 110 660 111" fill="none" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3 2" marker-end="url(#arr)"/>
        <text x="680" y="128" fill="#a78bfa88" font-size="7" font-family="'JetBrains Mono',monospace">${t(lang, 'refine', '精炼')}</text>
        <line x1="645" y1="146" x2="645" y2="175" stroke="#a78bfa" stroke-width="1" marker-end="url(#arr)"/>
        <rect x="627" y="178" width="36" height="20" rx="4" fill="#a78bfa" stroke="none"/>
        <text x="645" y="192" text-anchor="middle" fill="white" font-size="8" font-family="'JetBrains Mono',monospace">A</text>
      `;

      // Bottom labels
      svg += S.label(380, 248,
        t(lang, 'CoT: "Let\'s think step by step" — the foundation of all agent reasoning',
                'CoT："让我们一步一步思考" — 所有 Agent 推理的基石'),
        '#6b84a8', 10);

      svg += S.label(380, 268,
        t(lang, 'More paths = more reliable but more expensive. Choose based on task difficulty.',
                '路径越多 = 越可靠但越贵。根据任务难度选择模式。'),
        '#6b84a8', 10);

      svg += S.label(380, 288,
        t(lang, 'Complexity: CoT < CoT-SC < ToT < GoT  |  Cost scales similarly',
                '复杂度：CoT < CoT-SC < ToT < GoT ｜ 成本同比增长'),
        '#ff4d6d', 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'In 2026, reasoning is less about exposing long chains everywhere and more about allocating the right amount of test-time compute. Frontier models can spend more tokens, branch selectively, or call a dedicated reasoning mode, but the engineering question remains the same: when is extra deliberation worth the latency and cost? Strong agents treat reasoning depth as a controllable budget, not a ritual.',
        definition: 'Reasoning patterns are structured approaches that guide how an LLM <strong>thinks through problems</strong> before acting. They range from simple linear chains (CoT) to complex graphs (GoT), trading cost for reliability.',

        essence: '<strong>Chain-of-Thought (CoT)</strong> — "Let\'s think step by step." The model produces intermediate reasoning steps before answering. Dramatically improves math, logic, and multi-step performance. Cost: 1 path.\n\n<strong>Self-Consistency (CoT-SC)</strong> — Generate N reasoning paths, take the majority answer. More reliable than single CoT. Cost: N paths.\n\n<strong>Tree-of-Thoughts (ToT)</strong> — Explore multiple branches at each decision point. Can backtrack from dead ends. Best for large solution spaces. Cost: branching factor × depth.\n\n<strong>Graph-of-Thoughts (GoT)</strong> — Extend ToT with arbitrary connections: thoughts can merge, loop, and refine. Best for complex synthesis. Cost: highest.\n\n<em>The key tradeoff:</em> More exploration = more reliable answers, but exponentially higher token cost. CoT is the sweet spot for 90% of Agent tasks.',

        insight: 'CoT is not just a prompting trick — it is the cognitive architecture of every Agent. When an Agent "reasons about what tool to call next," it is doing CoT. ToT and GoT are for specialized scenarios (theorem proving, creative writing, complex planning). Start with CoT; add complexity only when needed.',

        pitfalls: [
          '把“让我们一步一步思考”当成万能开关。<strong>简单任务也强行长链推理</strong>，只会增加延迟、成本和偏航机会。',
          '把可见推理文本等同于正确性。链路写得很像回事，不代表结论一定对，关键还是要靠外部校验、投票或工具验证。',
          '一上来就上 ToT 或 GoT。多数生产任务先用 CoT 就够了，复杂搜索结构只应留给高价值、难搜索的问题。'
        ],

        furtherReading: [
          { title: 'ReAct: Synergizing Reasoning and Acting in Language Models', url: 'https://arxiv.org/abs/2210.03629' },
          { title: 'Plan-and-Solve Prompting', url: 'https://arxiv.org/abs/2305.04091' },
          { title: 'Reflexion: Language Agents with Verbal Reinforcement Learning', url: 'https://arxiv.org/abs/2303.11366' }
        ],

        crossRefs: [
          {
            chapterId: '12-tool-use',
            reason: 'Reasoning patterns determine whether the agent should answer directly or spend compute deciding which tool to call.'
          },
          {
            chapterId: '14-react',
            reason: 'ReAct operationalizes reasoning by interleaving thoughts with actions and observations in a concrete execution loop.'
          }
        ],

        table: {
          title: 'Reasoning pattern comparison',
          headers: ['Pattern', 'Structure', 'Best For', 'Token Cost', 'Reliability'],
          rows: [
            ['CoT',    'Linear chain',           'Most tasks, math, logic',     '1x',       'Good'],
            ['CoT-SC', 'N parallel chains + vote','Critical decisions',         'Nx',       'Better'],
            ['ToT',    'Branching tree + backtrack','Large solution spaces',    '10-100x',  'High'],
            ['GoT',    'Arbitrary graph + merge', 'Complex synthesis, creative','100x+',    'Highest'],
          ]
        }
      },

      zh: {
        perspective2026: '到了 2026 年，推理这件事已经不再等同于“把长长的思维链全都吐出来”，而更像是在分配合适的 test-time compute。前沿模型可以按需花更多 token、选择性分支，或者切到专门的 reasoning mode，但工程上的核心问题没变：这一步额外思考，值不值得付出延迟和成本？成熟 Agent 会把推理深度当成可控预算，而不是机械仪式。',
        definition: '推理模式是引导大模型在行动前<strong>如何思考问题</strong>的结构化方法。从简单的线性链（CoT）到复杂的图（GoT），用成本换取可靠性。',

        essence: '<strong>思维链（CoT）</strong>——"让我们一步一步思考。"模型在给出答案前产生中间推理步骤，大幅提升数学、逻辑和多步骤推理能力。成本：1 条路径。\n\n<strong>自一致性（CoT-SC）</strong>——生成 N 条推理路径，取多数答案。比单条 CoT 更可靠。成本：N 条路径。\n\n<strong>思维树（ToT）</strong>——在每个决策点探索多个分支，可以从死路回溯。适合大搜索空间。成本：分支因子 × 深度。\n\n<strong>思维图（GoT）</strong>——扩展 ToT，思维可以合并、循环、精炼。适合复杂综合。成本：最高。\n\n<em>核心权衡：</em>探索越多 = 答案越可靠，但 Token 成本指数级增长。CoT 是 90% Agent 任务的最优选。',

        insight: 'CoT 不只是一个提示词技巧——它是每个 Agent 的认知架构。当 Agent "推理下一步该调用什么工具"时，它就在做 CoT。ToT 和 GoT 适用于特殊场景（定理证明、创意写作、复杂规划）。从 CoT 开始，只在必要时增加复杂度。',

        pitfalls: [
          '把“让我们一步一步思考”当成万能开关。<strong>简单任务也强行拉长推理链</strong>，只会增加延迟、成本和偏航机会。',
          '把可见推理文本等同于正确性。推理写得很像回事，不代表结论一定正确，关键还是要靠外部校验、投票或工具验证。',
          '一上来就上 ToT 或 GoT。多数生产任务先用 CoT 就够了，复杂搜索结构只应留给高价值、难搜索的问题。'
        ],

        furtherReading: [
          { title: 'ReAct 论文', url: 'https://arxiv.org/abs/2210.03629' },
          { title: 'Plan-and-Solve Prompting 论文', url: 'https://arxiv.org/abs/2305.04091' },
          { title: 'Reflexion 论文', url: 'https://arxiv.org/abs/2303.11366' }
        ],

        crossRefs: [
          {
            chapterId: '12-tool-use',
            reason: '推理模式决定了 Agent 是该直接回答，还是该多花一点算力判断要不要调用工具。'
          },
          {
            chapterId: '14-react',
            reason: 'ReAct 把推理模式进一步落成“思考-行动-观察”的执行循环，是本章的直接延伸。'
          }
        ],

        table: {
          title: '推理模式对比',
          headers: ['模式', '结构', '适用场景', 'Token 成本', '可靠性'],
          rows: [
            ['CoT',    '线性链',              '大多数任务、数学、逻辑',  '1x',       '良好'],
            ['CoT-SC', 'N 条并行链 + 投票',    '关键决策',              'Nx',       '更好'],
            ['ToT',    '分支树 + 回溯',        '大搜索空间',            '10-100x',  '高'],
            ['GoT',    '任意图 + 合并',        '复杂综合、创意',        '100x+',    '最高'],
          ]
        }
      }
    }
  });
})();
