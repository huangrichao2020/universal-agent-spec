(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '20-frameworks',
    order: 20,
    nav:      { en: 'Frameworks',      zh: 'Agent 框架' },
    title:    { en: 'Agent <span class="accent">Frameworks</span>', zh: 'Agent <span class="accent">框架</span>' },
    subtitle: { en: 'LangGraph · OpenAI SDK · CrewAI · AutoGen · Google ADK', zh: 'LangGraph · OpenAI SDK · CrewAI · AutoGen · Google ADK' },
    tag:      { en: 'Infrastructure',  zh: '基础设施' },
    tagClass: 'tag-infra',
    viewBox: '0 0 760 300',
    getSvg(lang) {
      const fw = [
        { x: 40, color: '#0071e3', name: 'LangGraph', sub: t(lang, 'Graph-based', '图编排') },
        { x: 190, color: '#1a8a3a', name: 'OpenAI SDK', sub: t(lang, 'Handoff', '交接式') },
        { x: 340, color: '#ff4d6d', name: 'CrewAI', sub: t(lang, 'Role-based', '角色驱动') },
        { x: 490, color: '#a78bfa', name: 'AutoGen', sub: t(lang, 'Conversation', '对话式') },
        { x: 640, color: '#ffb800', name: 'Google ADK', sub: t(lang, 'Hierarchical', '层级式') },
      ];
      let svg = '';
      fw.forEach(f => {
        svg += S.box(f.x, 20, 110, 44, f.color, f.name, f.sub);
      });

      // Comparison dimensions
      const dims = [
        [t(lang, 'Orchestration', '编排模型'), 'StateGraph', 'Handoffs', 'Roles/Crew', 'GroupChat', 'Agent Tree'],
        [t(lang, 'State Mgmt', '状态管理'), t(lang, 'Checkpoint', '检查点'), t(lang, 'Ephemeral', '临时'), t(lang, 'Crew state', '团队状态'), t(lang, 'Messages', '消息'), t(lang, 'Session', '会话')],
        [t(lang, 'Learning Curve', '学习曲线'), t(lang, 'Medium', '中等'), t(lang, 'Low', '低'), t(lang, 'Lowest', '最低'), t(lang, 'High', '高'), t(lang, 'Medium', '中等')],
        [t(lang, 'Best For', '最适'), t(lang, 'Complex flows', '复杂流程'), t(lang, 'Quick start', '快速起步'), t(lang, 'Prototyping', '原型'), t(lang, 'Research', '研究'), t(lang, 'Google eco', 'Google 生态')],
      ];

      dims.forEach((row, ri) => {
        const y = 100 + ri * 38;
        svg += `<text x="40" y="${y}" fill="#6b84a8" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="600">${row[0]}</text>`;
        for (let i = 1; i <= 5; i++) {
          const fx = fw[i-1].x + 55;
          svg += `<text x="${fx}" y="${y + 16}" text-anchor="middle" fill="${fw[i-1].color}88" font-family="'JetBrains Mono',monospace" font-size="8">${row[i]}</text>`;
        }
      });

      svg += S.label(380, 268,
        t(lang, 'Framework choice is an architecture decision expensive to reverse',
                '框架选择是一个昂贵的架构决策，难以逆转'),
        '#ff4d6d', 10);
      svg += S.label(380, 288,
        t(lang, 'Start with the simplest framework that meets your needs. Migrate later if needed.',
                '从满足需求的最简框架开始。需要时再迁移。'),
        '#6b84a8', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Agent frameworks provide the scaffolding for building AI agents: <strong>orchestration models, state management, tool integration, and runtime infrastructure</strong>. The five major code-first frameworks each take a fundamentally different approach.',
        essence: '<strong>LangGraph</strong> (LangChain) — Graph-based orchestration. Agents modeled as state machines with nodes and edges. Built-in checkpointing and time travel. Highest production readiness. Used at LinkedIn, Uber, 400+ companies.\n\n<strong>OpenAI Agents SDK</strong> — Handoff-based. Agents transfer control explicitly. Clean, opinionated API. Lowest barrier to entry. OpenAI models preferred.\n\n<strong>CrewAI</strong> — Role-based teams. Agents defined as specialized "crew members." Fastest prototyping (~20 lines to start). Great for demos and POCs.\n\n<strong>AutoGen</strong> (Microsoft) — Conversation-based. Everything is async messages in a GroupChat. Excels at research and quality-sensitive offline workflows. Merged into Microsoft Agent Framework.\n\n<strong>Google ADK</strong> — Hierarchical agent trees with native A2A support. Optimized for Gemini but model-agnostic. Open-source, launched at Cloud NEXT 2025.\n\n<em>Selection rule of thumb:</em> If you need production graph workflows → LangGraph. Quick prototype → CrewAI. OpenAI ecosystem → OpenAI SDK. Google ecosystem → ADK. Research/academic → AutoGen.',
        insight: 'The framework you choose determines your architecture, not just your code style. Graph-based (LangGraph) vs role-based (CrewAI) vs conversation-based (AutoGen) lead to fundamentally different system designs. Choose based on your problem shape, not hype.',
        perspective2026: 'By 2026, agent frameworks are no longer just wrappers around model calls. The differentiators are now checkpointing, human-in-the-loop controls, eval hooks, deployment boundaries, and how cleanly the framework interoperates with MCP, coding agents, and production observability. Framework choice increasingly shapes how fast a team can recover from failure, not just how fast it can demo.',
        pitfalls: [
          'Picking a framework because it is trending instead of because its <strong>state model</strong> matches the workflow you need to run.',
          'Binding too early to a heavyweight abstraction before you know whether the system should be graph-driven, handoff-driven, or mostly simple tool calls.',
          'Assuming a multi-agent framework automatically improves quality. Poor decomposition often adds latency, cost, and harder debugging.'
        ],
        furtherReading: [
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'LangGraph documentation', url: 'https://langchain-ai.github.io/langgraph' },
          { title: 'Microsoft AutoGen documentation', url: 'https://microsoft.github.io/autogen' }
        ],
        crossRefs: [
          {
            chapterId: '22-arch-patterns',
            reason: 'Framework comparison only matters after you know whether your workload fits supervisor, router, pipeline, or multi-agent architecture patterns.'
          },
          {
            chapterId: '23-graph-orchestration',
            reason: 'LangGraph and similar frameworks become easier to evaluate once you understand when graph orchestration is structurally useful.'
          },
          {
            chapterId: '28-coding-agents',
            reason: 'Coding agents stress framework limits around checkpoints, tool execution, recovery, and long-running task control.'
          }
        ],
        table: {
          title: 'Framework comparison',
          headers: ['Framework', 'Orchestration', 'State', 'Models', 'Learning Curve', 'Production Ready'],
          rows: [
            ['LangGraph',    'StateGraph',     'Checkpointed',  'Any',          'Medium', '★★★★★'],
            ['OpenAI SDK',   'Handoffs',       'Ephemeral',     'OpenAI pref.', 'Low',    '★★★★☆'],
            ['CrewAI',       'Roles/Crews',    'Crew state',    'Any',          'Lowest', '★★★☆☆'],
            ['AutoGen',      'GroupChat',      'Messages',      'Any',          'High',   '★★★★☆'],
            ['Google ADK',   'Agent Tree',     'Session',       'Gemini pref.', 'Medium', '★★★☆☆'],
          ]
        }
      },
      zh: {
        definition: 'Agent 框架提供构建 AI Agent 的脚手架：<strong>编排模型、状态管理、工具集成和运行时基础设施</strong>。五大代码优先框架各有根本不同的方法论。',
        essence: '<strong>LangGraph</strong>（LangChain）— 图编排。Agent 建模为状态机，有节点和边。内置检查点和时间旅行。生产就绪度最高。LinkedIn、Uber、400+ 公司使用。\n\n<strong>OpenAI Agents SDK</strong> — 交接式。Agent 显式转移控制权。简洁、有主见的 API。入门门槛最低。偏好 OpenAI 模型。\n\n<strong>CrewAI</strong> — 角色驱动团队。Agent 定义为专业"团队成员"。原型最快（约 20 行启动）。适合演示和 POC。\n\n<strong>AutoGen</strong>（Microsoft）— 对话式。一切都是 GroupChat 中的异步消息。擅长研究和质量敏感的离线工作流。已合并入 Microsoft Agent Framework。\n\n<strong>Google ADK</strong> — 层级式 Agent 树，原生支持 A2A。针对 Gemini 优化但模型无关。开源，Cloud NEXT 2025 发布。\n\n<em>选型经验法则：</em>需要生产级图工作流 → LangGraph。快速原型 → CrewAI。OpenAI 生态 → OpenAI SDK。Google 生态 → ADK。研究/学术 → AutoGen。',
        insight: '你选择的框架决定了你的架构，而不仅仅是代码风格。图编排（LangGraph）vs 角色驱动（CrewAI）vs 对话式（AutoGen）会导致根本不同的系统设计。根据你的问题形状选择，而非热度。',
        perspective2026: '到了 2026 年，Agent 框架已经不只是“把模型调用包一层”。真正拉开差距的是检查点、人工介入、评测挂钩、部署边界，以及它与 MCP、编码 Agent、生产可观测性的衔接方式。框架选择越来越决定团队在失败后恢复的速度，而不只是做出演示的速度。',
        pitfalls: [
          '因为框架热度而选型，却没有先判断它的<strong>状态模型</strong>是否匹配你的工作流。',
          '在需求还没稳定时就过早绑定重框架，导致后续从图编排、交接式到简单工具调用之间难以切换。',
          '误以为“多 Agent 框架”天然提升质量。拆分不当只会增加延迟、成本和调试复杂度。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'LangGraph 文档', url: 'https://langchain-ai.github.io/langgraph' },
          { title: 'Microsoft AutoGen 文档', url: 'https://microsoft.github.io/autogen' }
        ],
        crossRefs: [
          {
            chapterId: '22-arch-patterns',
            reason: '只有先明确系统更适合 supervisor、router、pipeline 还是 multi-agent 架构，框架对比才有意义。'
          },
          {
            chapterId: '23-graph-orchestration',
            reason: '理解图编排什么时候真正有结构优势后，才能更准确评估 LangGraph 一类框架。'
          },
          {
            chapterId: '28-coding-agents',
            reason: '编码 Agent 会把检查点、工具执行、失败恢复和长程任务控制这些框架能力压到极限。'
          }
        ],
        table: {
          title: '框架对比',
          headers: ['框架', '编排模型', '状态', '模型支持', '学习曲线', '生产就绪'],
          rows: [
            ['LangGraph',    'StateGraph',  '检查点',   '任意',       '中等', '★★★★★'],
            ['OpenAI SDK',   '交接式',       '临时',     'OpenAI 优先','低',   '★★★★☆'],
            ['CrewAI',       '角色/团队',    '团队状态', '任意',       '最低', '★★★☆☆'],
            ['AutoGen',      'GroupChat',   '消息',     '任意',       '高',   '★★★★☆'],
            ['Google ADK',   'Agent Tree',  '会话',     'Gemini 优先','中等', '★★★☆☆'],
          ]
        }
      }
    }
  });
})();
