(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;
  window.AgentSpec.register({
    id: '28-coding-agents', order: 28,
    nav:      { en: 'Coding Agents', zh: '编程 Agent' },
    title:    { en: 'Coding <span class="accent">Agents</span>', zh: '编程 <span class="accent">Agent</span>' },
    subtitle: { en: 'Cursor · Codex · Devin · Claude Code', zh: 'Cursor · Codex · Devin · Claude Code' },
    tag:      { en: 'Business', zh: '商业' }, tagClass: 'tag-biz',
    viewBox: '0 0 760 260',
    getSvg(lang) {
      const agents = [
        { x: 40, color: '#0071e3', name: 'Cursor', type: t(lang, 'IDE-native', 'IDE 原生'), score: '~45%' },
        { x: 220, color: '#1a8a3a', name: 'Codex', type: t(lang, 'Cloud sandbox', '云沙箱'), score: '~70%' },
        { x: 400, color: '#ff4d6d', name: 'Devin', type: t(lang, 'Full autonomy', '完全自主'), score: '67% merge' },
        { x: 580, color: '#a78bfa', name: 'Claude Code', type: t(lang, 'Terminal agent', '终端 Agent'), score: '80.9%' },
      ];
      let svg = '';
      agents.forEach(a => {
        svg += S.box(a.x, 20, 140, 44, a.color, a.name, a.type);
        svg += `<text x="${a.x+70}" y="82" text-anchor="middle" fill="${a.color}" font-family="'JetBrains Mono',monospace" font-size="9">${t(lang, 'SWE-bench:', 'SWE-bench：')} ${a.score}</text>`;
      });
      // Key lessons
      svg += `
        <rect x="40" y="100" width="680" height="90" rx="5" fill="#ffb80008" stroke="#ffb80080" stroke-width="1"/>
        <text x="380" y="118" text-anchor="middle" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Key Lessons from Coding Agents', '编程 Agent 的关键教训')}
        </text>
        <text x="55" y="138" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
          1. ${t(lang, 'No single tool dominates. Most devs combine IDE agent + terminal agent.', '没有一个工具统治一切。大多数开发者组合使用 IDE Agent + 终端 Agent。')}
        </text>
        <text x="55" y="155" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
          2. ${t(lang, '"Fire and forget" is the aspiration, but human oversight remains essential.', '"一键搞定"是目标，但人工监督仍然必要。')}
        </text>
        <text x="55" y="172" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
          3. ${t(lang, 'Multi-agent coding (delegate sub-tasks) shipped across all major tools in early 2026.', '多 Agent 编程（委派子任务）2026 年初在所有主要工具中上线。')}
        </text>
        <text x="55" y="189" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
          4. ${t(lang, 'Context management (compaction, memory) is the key differentiator for long tasks.', '上下文管理（压缩、记忆）是长任务的关键差异化因素。')}
        </text>
      `;
      svg += S.label(380, 218, t(lang, 'Coding agents are the most mature and commercially successful agent category', '编程 Agent 是最成熟、商业上最成功的 Agent 类别'), '#6b84a8', 10);
      svg += S.label(380, 238, t(lang, 'They demonstrate every pattern: ReAct, Plan-Execute, tool use, memory, multi-agent', '它们展示了所有模式：ReAct、规划执行、工具调用、记忆、多 Agent'), '#0071e3', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Coding agents are <strong>the most mature and commercially successful category</strong> of AI agents. They demonstrate every agent pattern in practice: ReAct loops, tool use, plan-and-execute, memory management, and multi-agent delegation.',
        essence: '<strong>Cursor</strong> — IDE-native. Autocomplete + in-editor chat. Strong on small-to-medium tasks. Moved to credit-based pricing mid-2025. Best for: daily coding assistance.\n\n<strong>OpenAI Codex</strong> — Cloud sandbox agent. Operates in isolated containers with no internet. Context compaction for long tasks. Best for: batch refactoring, test writing, autonomous multi-file changes.\n\n<strong>Devin</strong> (Cognition) — Most autonomous. Full sandbox environment (IDE + browser + terminal). Devin 2.0: Interactive Planning + Devin Wiki. 67% PR merge rate. Pricing dropped from $500 to $20/mo + $2.25/ACU. Best for: well-defined, independent tasks.\n\n<strong>Claude Code</strong> (Anthropic) — Terminal-native agent. 80.9% on SWE-bench (highest). Deep reasoning and debugging. Multi-agent sub-task delegation. Best for: complex debugging, architectural changes, large refactors.\n\n<strong>Key trend: Multi-agent coding.</strong> All major tools now support delegating sub-tasks to parallel agents. This mirrors Plan & Execute (Ch 15) — a strong model plans, lightweight agents execute specific files.',
        insight: 'Coding agents are the "model organism" for studying agent architecture. Every challenge in agent design (context management, tool selection, plan revision, cost control, human-in-the-loop) shows up most clearly here because code is objectively testable.',
        perspective2026: 'By 2026, coding agents have become the clearest proving ground for modern agent architecture: delegated sub-agents, sandboxed execution, context compaction, resumable work, and verification loops all show up here first. The biggest practical differentiators are no longer just headline benchmark scores, but how reliably a tool recovers from failure, keeps context coherent across long tasks, and proves that its edits are actually safe.',
        pitfalls: [
          'Comparing tools only by a single benchmark number. Real productivity also depends on context handling, review ergonomics, and recovery from bad plans.',
          'Treating the agent as a replacement for tests, code review, or sandbox discipline. Autonomous edits still need verification.',
          'Optimizing for “full autonomy” demos while ignoring the cost and latency of repeated failed attempts.'
        ],
        furtherReading: [
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'SWE-bench', url: 'https://www.swebench.com' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '23-graph-orchestration',
            reason: 'Complex coding agents increasingly behave like graph workflows with checkpoints, approvals, and resumable branches.'
          },
          {
            chapterId: '24-memory-arch',
            reason: 'Long coding tasks stress memory design through context compaction, retrieval of prior decisions, and persistent task state.'
          },
          {
            chapterId: '27-evaluation',
            reason: 'Coding agents are where evaluation is most concrete because code changes can be tested, replayed, and benchmarked objectively.'
          }
        ],
        table: {
          title: 'Coding agent comparison',
          headers: ['Agent', 'Environment', 'SWE-bench', 'Multi-Agent', 'Best For'],
          rows: [
            ['Cursor',      'IDE plugin',     '~45%', 'Tab-based',  'Daily coding assistance'],
            ['Codex',       'Cloud sandbox',   '~70%', 'Yes (2026)', 'Batch refactoring'],
            ['Devin',       'Full sandbox',    '67% merge', 'Yes', 'Independent tasks'],
            ['Claude Code', 'Terminal',        '80.9%','Yes (delegate)', 'Complex debugging'],
          ]
        }
      },
      zh: {
        definition: '编程 Agent 是<strong>最成熟、商业上最成功</strong>的 AI Agent 类别。它们在实践中展示了所有 Agent 模式：ReAct 循环、工具调用、规划执行、记忆管理和多 Agent 委派。',
        essence: '<strong>Cursor</strong>——IDE 原生。自动补全 + 编辑器内对话。擅长中小型任务。2025 年中转向积分制定价。最适合：日常编码辅助。\n\n<strong>OpenAI Codex</strong>——云沙箱 Agent。在隔离容器中运行，无互联网。支持上下文压缩。最适合：批量重构、写测试、自主多文件修改。\n\n<strong>Devin</strong>（Cognition）——最自主。完整沙箱环境（IDE + 浏览器 + 终端）。Devin 2.0：交互式规划 + Devin Wiki。67% PR 合并率。价格从 $500 降至 $20/月 + $2.25/ACU。最适合：明确定义的独立任务。\n\n<strong>Claude Code</strong>（Anthropic）——终端原生 Agent。SWE-bench 80.9%（最高）。深度推理和调试。支持多 Agent 子任务委派。最适合：复杂调试、架构变更、大型重构。\n\n<strong>关键趋势：多 Agent 编程。</strong>所有主要工具现在都支持将子任务委派给并行 Agent。这就是规划与执行（第 15 章）的实践——强模型规划，轻量 Agent 执行具体文件。',
        insight: '编程 Agent 是研究 Agent 架构的"模式生物"。Agent 设计中的每个挑战（上下文管理、工具选择、计划修改、成本控制、人机协作）在这里表现最清楚，因为代码是可以客观测试的。',
        perspective2026: '到了 2026 年，编程 Agent 已经成了现代 Agent 架构最清晰的试验场：子 Agent 委派、沙箱执行、上下文压缩、可恢复执行、验证闭环都最先在这里成熟。真正拉开差距的，不再只是 headline benchmark 分数，而是工具在失败后能否恢复、能否在长任务中保持上下文一致，以及能否证明自己的改动真的安全。',
        pitfalls: [
          '只用一个 benchmark 数字比较工具。真实生产力还取决于上下文管理、审查体验和坏计划后的恢复能力。',
          '把 Agent 当成测试、代码评审或沙箱纪律的替代品。自主改代码之后仍然需要验证。',
          '追求“全自动”演示效果，却忽略反复失败尝试带来的成本和延迟。'
        ],
        furtherReading: [
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'SWE-bench', url: 'https://www.swebench.com' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '23-graph-orchestration',
            reason: '复杂编程 Agent 越来越像带检查点、审批节点和可恢复分支的图工作流。'
          },
          {
            chapterId: '24-memory-arch',
            reason: '长程编码任务会把记忆设计压到极限：上下文压缩、历史决策检索和持久任务状态缺一不可。'
          },
          {
            chapterId: '27-evaluation',
            reason: '编程 Agent 是评估最容易客观化的领域，因为代码改动可以被测试、回放和 benchmark。'
          }
        ],
        table: {
          title: '编程 Agent 对比',
          headers: ['Agent', '环境', 'SWE-bench', '多 Agent', '最适场景'],
          rows: [
            ['Cursor',      'IDE 插件',   '~45%',     'Tab 级',     '日常编码辅助'],
            ['Codex',       '云沙箱',     '~70%',     '是（2026）', '批量重构'],
            ['Devin',       '完整沙箱',   '67% merge','是',         '独立任务'],
            ['Claude Code', '终端',       '80.9%',    '是（委派）', '复杂调试'],
          ]
        }
      }
    }
  });
})();
