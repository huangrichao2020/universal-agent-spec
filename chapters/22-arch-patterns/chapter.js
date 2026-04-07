(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '22-arch-patterns',
    order: 22,
    nav:      { en: 'Architecture',    zh: '架构模式' },
    title:    { en: 'Architecture <span class="accent">Patterns</span>', zh: '架构 <span class="accent">模式</span>' },
    subtitle: { en: 'Supervisor · Hierarchical · Swarm · Mesh · Pipeline', zh: 'Supervisor · 层级 · 群体 · 网格 · 流水线' },
    tag:      { en: 'Design Pattern',  zh: '设计模式' },
    tagClass: 'tag-pattern',
    viewBox: '0 0 760 300',
    getSvg(lang) {
      let svg = '';
      // 5 architecture patterns in a grid
      // Row 1: Supervisor, Hierarchical, Swarm
      // Supervisor
      svg += `
        <rect x="20" y="20" width="220" height="110" rx="5" fill="#0071e308" stroke="#0071e380" stroke-width="1"/>
        <text x="130" y="38" text-anchor="middle" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Supervisor', 'Supervisor 模式')}
        </text>
        ${S.box(80, 48, 100, 24, '#0071e3', t(lang, 'Orchestrator', '编排者'), '')}
        ${S.arrow(100, 72, 60, 88, '#0071e380')}
        ${S.arrow(130, 72, 130, 88, '#0071e380')}
        ${S.arrow(160, 72, 200, 88, '#0071e380')}
        ${S.box(30, 90, 60, 22, '#0071e3', 'W1', '')}
        ${S.box(100, 90, 60, 22, '#0071e3', 'W2', '')}
        ${S.box(170, 90, 60, 22, '#0071e3', 'W3', '')}
      `;
      // Hierarchical
      svg += `
        <rect x="270" y="20" width="220" height="110" rx="5" fill="#a78bfa08" stroke="#a78bfa80" stroke-width="1"/>
        <text x="380" y="38" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Hierarchical', '层级模式')}
        </text>
        ${S.box(340, 48, 80, 20, '#a78bfa', 'Boss', '')}
        ${S.arrow(360, 68, 320, 78, '#a78bfa80')}
        ${S.arrow(400, 68, 440, 78, '#a78bfa80')}
        ${S.box(290, 80, 60, 18, '#a78bfa', 'Lead', '')}
        ${S.box(420, 80, 60, 18, '#a78bfa', 'Lead', '')}
        ${S.arrow(310, 98, 300, 106, '#a78bfa60')}
        ${S.arrow(330, 98, 340, 106, '#a78bfa60')}
        ${S.box(280, 106, 40, 16, '#a78bfa', 'W', '')}
        ${S.box(325, 106, 40, 16, '#a78bfa', 'W', '')}
      `;
      // Swarm
      svg += `
        <rect x="520" y="20" width="220" height="110" rx="5" fill="#ff4d6d08" stroke="#ff4d6d80" stroke-width="1"/>
        <text x="630" y="38" text-anchor="middle" fill="#ff4d6d" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Swarm', '群体模式')}
        </text>
        <circle cx="590" cy="70" r="10" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <circle cx="630" cy="55" r="10" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <circle cx="670" cy="70" r="10" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <circle cx="610" cy="95" r="10" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <circle cx="650" cy="95" r="10" fill="#ff4d6d18" stroke="#ff4d6d" stroke-width="1"/>
        <line x1="600" y1="70" x2="620" y2="57" stroke="#ff4d6d40" stroke-width="1"/>
        <line x1="640" y1="57" x2="660" y2="70" stroke="#ff4d6d40" stroke-width="1"/>
        <line x1="590" y1="80" x2="610" y2="85" stroke="#ff4d6d40" stroke-width="1"/>
        <line x1="670" y1="80" x2="650" y2="85" stroke="#ff4d6d40" stroke-width="1"/>
        <line x1="620" y1="95" x2="640" y2="95" stroke="#ff4d6d40" stroke-width="1"/>
        <text x="630" y="120" text-anchor="middle" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="7">
          ${t(lang, 'shared state / no central control', '共享状态 / 无中心控制')}
        </text>
      `;

      // Row 2: Mesh, Pipeline
      svg += `
        <rect x="100" y="150" width="220" height="100" rx="5" fill="#ffb80008" stroke="#ffb80080" stroke-width="1"/>
        <text x="210" y="168" text-anchor="middle" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Mesh (P2P)', '网格 (P2P)')}
        </text>
        <circle cx="170" cy="200" r="12" fill="#ffb80018" stroke="#ffb800" stroke-width="1"/>
        <circle cx="250" cy="200" r="12" fill="#ffb80018" stroke="#ffb800" stroke-width="1"/>
        <circle cx="210" cy="230" r="12" fill="#ffb80018" stroke="#ffb800" stroke-width="1"/>
        <line x1="182" y1="200" x2="238" y2="200" stroke="#ffb800" stroke-width="1.2"/>
        <line x1="175" y1="210" x2="200" y2="225" stroke="#ffb800" stroke-width="1.2"/>
        <line x1="245" y1="210" x2="220" y2="225" stroke="#ffb800" stroke-width="1.2"/>
      `;
      svg += `
        <rect x="420" y="150" width="280" height="100" rx="5" fill="#1a8a3a08" stroke="#1a8a3a80" stroke-width="1"/>
        <text x="560" y="168" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Pipeline (Sequential)', '流水线（顺序）')}
        </text>
        ${S.box(435, 190, 60, 24, '#1a8a3a', 'Step1', '')}
        ${S.arrow(495, 202, 515, 202, '#1a8a3a')}
        ${S.box(515, 190, 60, 24, '#1a8a3a', 'Step2', '')}
        ${S.arrow(575, 202, 595, 202, '#1a8a3a')}
        ${S.box(595, 190, 60, 24, '#1a8a3a', 'Step3', '')}
        ${S.arrow(655, 202, 675, 202, '#1a8a3a')}
        ${S.box(675, 190, 20, 24, '#1a8a3a', '→', '')}
      `;

      svg += S.label(380, 272,
        t(lang, 'Most production systems are hybrids: supervisor at top, pipeline within teams',
                '大多数生产系统是混合的：顶层 Supervisor，团队内流水线'),
        '#6b84a8', 10);
      svg += S.label(380, 290,
        t(lang, 'Patterns are composable. Match the pattern to your problem shape.',
                '模式可组合。将模式与你的问题形状匹配。'),
        '#ff4d6d', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Multi-agent architecture patterns define <strong>how agents are organized, communicate, and coordinate</strong>. Five fundamental patterns — each with distinct tradeoffs in control, flexibility, and complexity.',
        essence: '<strong>Supervisor (Orchestrator-Worker)</strong> — One orchestrator decomposes tasks, assigns to workers, aggregates results. Workers don\'t talk to each other. Most widely deployed. Simple to debug.\n\n<strong>Hierarchical</strong> — Multiple layers of supervisors. Each manages a team. Enables layered delegation and fault isolation. Used when a single supervisor can\'t manage all workers effectively.\n\n<strong>Swarm (Decentralized)</strong> — No central control. Agents coordinate through shared state (blackboard). Roles are fluid — agents switch tasks based on needs. Self-healing and auto-scaling. Hardest to debug.\n\n<strong>Mesh (P2P)</strong> — Agents maintain persistent connections to specific peers. Topology defined at design time. Good for stable, well-known collaborations.\n\n<strong>Pipeline (Sequential)</strong> — Tasks flow through stages. Simple, predictable. Best for well-defined processing chains.\n\n<strong>Hybrid is the norm:</strong> Production systems combine patterns. A hierarchical system where leaf teams use pipelines. A supervisor that launches a swarm for parallel data collection.',
        insight: 'Start with Supervisor — it solves 80% of multi-agent needs. Only add Hierarchical when you have too many workers for one supervisor. Only add Swarm when you need self-healing and don\'t need deterministic debugging.',
        perspective2026: 'By 2026, architecture selection is less about “how many agents can I spin up?” and more about recovery, supervision, and evaluation boundaries. The winning designs are the ones that make failure visible, let humans step in at the right checkpoints, and keep cost explosions contained when long-running tasks fan out.',
        pitfalls: [
          'Adding more agents before proving that the task actually decomposes cleanly. Extra coordination often adds more failure modes than capability.',
          'Mapping the company org chart directly onto runtime architecture. Team boundaries and execution boundaries are related, but not identical.',
          'Choosing swarm or mesh because they sound advanced, even when a supervisor or pipeline would be faster, cheaper, and easier to debug.'
        ],
        furtherReading: [
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'ReAct: Synergizing Reasoning and Acting in Language Models', url: 'https://arxiv.org/abs/2210.03629' },
          { title: 'Plan-and-Solve Prompting', url: 'https://arxiv.org/abs/2305.04091' }
        ],
        crossRefs: [
          {
            chapterId: '20-frameworks',
            reason: 'Architecture patterns explain the problem shape; frameworks are the implementation surface that makes those patterns concrete.'
          },
          {
            chapterId: '23-graph-orchestration',
            reason: 'Graph orchestration is often the execution substrate that turns hybrid architecture patterns into debuggable workflows.'
          },
          {
            chapterId: '29-case-studies',
            reason: 'Real production cases show that most successful systems mix supervisor, pipeline, and specialist patterns instead of staying pure.'
          }
        ],
        table: {
          title: 'Architecture pattern comparison',
          headers: ['Pattern', 'Control', 'Flexibility', 'Debuggability', 'Best For'],
          rows: [
            ['Supervisor',   'Centralized',   'Medium',  'High',   'Most multi-agent tasks'],
            ['Hierarchical', 'Layered',       'Medium',  'Medium', 'Large teams, dept isolation'],
            ['Swarm',        'Decentralized', 'Highest', 'Low',    'Self-healing, auto-scaling'],
            ['Mesh',         'Peer-to-peer',  'Medium',  'Medium', 'Stable collaborations'],
            ['Pipeline',     'Sequential',    'Low',     'Highest','Processing chains'],
          ]
        }
      },
      zh: {
        definition: '多 Agent 架构模式定义了<strong>Agent 如何组织、通信和协调</strong>。五种基础模式——各有不同的控制力、灵活性和复杂度权衡。',
        essence: '<strong>Supervisor（编排者-工作者）</strong>— 一个编排者分解任务、分配给工作者、汇总结果。工作者之间不通信。最广泛部署。易于调试。\n\n<strong>层级模式</strong>— 多层 Supervisor。每层管理一个团队。实现分层委派和故障隔离。当单个 Supervisor 无法有效管理所有工作者时使用。\n\n<strong>群体模式（去中心化）</strong>— 无中心控制。Agent 通过共享状态（黑板）协调。角色流动——Agent 根据需要切换任务。自愈和自动扩展。最难调试。\n\n<strong>网格模式（P2P）</strong>— Agent 与特定对等方保持持久连接。拓扑在设计时定义。适合稳定、已知的协作。\n\n<strong>流水线（顺序）</strong>— 任务流经各阶段。简单、可预测。最适合明确的处理链。\n\n<strong>混合是常态：</strong>生产系统组合多种模式。层级系统内叶子团队用流水线。Supervisor 启动群体做并行数据收集。',
        insight: '从 Supervisor 开始——它解决 80% 的多 Agent 需求。只在一个 Supervisor 管不过来时才加层级。只在需要自愈且不需要确定性调试时才用群体。',
        perspective2026: '到了 2026 年，架构选型已经不再围绕“能起多少个 Agent”，而是围绕恢复能力、人工监督和评测边界展开。真正胜出的设计，是那些能让失败可见、能在关键检查点插入人类、并且在长程任务扇出时仍能控制成本爆炸的系统。',
        pitfalls: [
          '还没证明任务可以被清晰拆分，就先增加 Agent 数量。额外协作往往带来更多失败模式，而不是更多能力。',
          '把公司的组织结构直接映射成运行时架构。团队边界和执行边界有关，但绝不完全等价。',
          '因为 swarm 或 mesh 听起来高级，就过早采用它们，忽略了 supervisor 或 pipeline 往往更快、更便宜、更好调试。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'ReAct 论文', url: 'https://arxiv.org/abs/2210.03629' },
          { title: 'Plan-and-Solve 论文', url: 'https://arxiv.org/abs/2305.04091' }
        ],
        crossRefs: [
          {
            chapterId: '20-frameworks',
            reason: '架构模式描述问题形状，框架则是把这些模式落地成运行系统的实现载体。'
          },
          {
            chapterId: '23-graph-orchestration',
            reason: '图编排常常是把混合架构模式变成可调试工作流的执行底座。'
          },
          {
            chapterId: '29-case-studies',
            reason: '真实生产案例会证明，大多数成功系统都会混合 supervisor、pipeline 与专用子模式，而不是保持纯单一形态。'
          }
        ],
        table: {
          title: '架构模式对比',
          headers: ['模式', '控制方式', '灵活性', '可调试性', '最适场景'],
          rows: [
            ['Supervisor', '中心化',   '中等', '高',   '大多数多 Agent 任务'],
            ['层级模式',    '分层',     '中等', '中等', '大团队、部门隔离'],
            ['群体模式',    '去中心化', '最高', '低',   '自愈、自动扩展'],
            ['网格模式',    '对等',     '中等', '中等', '稳定协作'],
            ['流水线',      '顺序',     '低',   '最高', '处理链'],
          ]
        }
      }
    }
  });
})();
