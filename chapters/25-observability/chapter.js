(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;
  window.AgentSpec.register({
    id: '25-observability', order: 25,
    nav:      { en: 'Observability',   zh: '可观测性' },
    title:    { en: '<span class="accent">Observability</span>', zh: '<span class="accent">可观测性</span>' },
    subtitle: { en: 'Traces · Tokens · Latency · Decision Audit', zh: '链路追踪 · Token · 延迟 · 决策审计' },
    tag:      { en: 'System', zh: '系统' }, tagClass: 'tag-system',
    viewBox: '0 0 760 260',
    getSvg(lang) {
      let svg = '';
      svg += S.box(40, 20, 160, 44, '#ff4d6d', t(lang, 'Agent Run', 'Agent 运行'), t(lang, 'Non-deterministic', '非确定性'));
      svg += S.arrow(200, 42, 260, 42, '#6b84a8');
      svg += S.box(260, 20, 200, 44, '#0071e3', t(lang, 'Observability Layer', '可观测层'), t(lang, 'Every step logged', '每步都记录'));
      svg += S.arrow(460, 42, 520, 42, '#6b84a8');
      svg += S.box(520, 20, 200, 44, '#1a8a3a', t(lang, 'Dashboard', '仪表盘'), t(lang, 'Traces, costs, errors', '链路、成本、错误'));
      // Four pillars
      const pillars = [
        { x: 40, color: '#a78bfa', name: t(lang, 'Trace', '链路'), desc: t(lang, 'Every step', '每个步骤') },
        { x: 220, color: '#ffb800', name: t(lang, 'Tokens', 'Token'), desc: t(lang, 'Cost per trace', '每条链路成本') },
        { x: 400, color: '#ff4d6d', name: t(lang, 'Latency', '延迟'), desc: t(lang, 'Per step timing', '每步耗时') },
        { x: 580, color: '#0071e3', name: t(lang, 'Decisions', '决策'), desc: t(lang, 'Audit trail', '审计轨迹') },
      ];
      pillars.forEach(p => {
        svg += S.box(p.x, 90, 140, 36, p.color, p.name, p.desc);
      });
      // Tools
      svg += `
        <rect x="40" y="150" width="680" height="36" rx="5" fill="#1a8a3a12" stroke="#1a8a3a" stroke-width="1"/>
        <text x="380" y="172" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Tools: LangSmith · Langfuse (OSS) · Braintrust · Arize Phoenix · Fiddler',
                  '工具：LangSmith · Langfuse（开源）· Braintrust · Arize Phoenix · Fiddler')}
        </text>
      `;
      svg += S.label(380, 210, t(lang, '62% of production teams plan to improve observability as top priority', '62% 的生产团队将提升可观测性列为首要优先级'), '#6b84a8', 10);
      svg += S.label(380, 230, t(lang, 'If you can\'t see what the agent decided and why, you can\'t fix it', '如果看不到 Agent 的决策及原因，就无法修复它'), '#ff4d6d', 10);
      svg += S.label(380, 250, t(lang, 'Non-negotiable for production. Add observability before adding features.', '生产必备。先加可观测性，再加功能。'), '#0071e3', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Observability for agents means <strong>tracing every step, tracking token costs, measuring latency, and maintaining decision audit trails</strong>. It is non-negotiable for production — without it, debugging nondeterministic agent behavior is archaeology.',
        essence: '<strong>Why it\'s critical:</strong> LLM-based agents are nondeterministic. The same input can produce different tool calls, different reasoning paths, and different outputs. You need to see not just whether the API responded, but <em>what decisions the agent made and why</em>.\n\n<strong>Four pillars:</strong>\n1. <em>Trace-level logging</em> — Record every agent step: input, reasoning, tool calls, outputs. This is your debugging foundation.\n2. <em>Token usage & cost attribution</em> — Track tokens per trace and per step. Attribute costs to specific features or users.\n3. <em>Latency monitoring</em> — Measure time per tool call, per LLM call, per end-to-end trace. Identify bottlenecks.\n4. <em>Decision audit trail</em> — Why did the agent choose tool A over tool B? What was in the context when it decided?\n\n<strong>Tools:</strong> LangSmith (LangChain ecosystem, most integrated), Langfuse (open-source, fastest growing), Braintrust (evaluation-focused), Arize Phoenix (OSS), Fiddler (end-to-end lifecycle).\n\n<strong>The "AI archaeology" problem:</strong> In multi-agent systems, errors can be buried in long execution traces across multiple agents. Good observability tools let you trace across agent boundaries.',
        insight: 'Add observability before you add features. The first thing you build after "hello world agent" should be trace logging. Every bug you encounter later will be 10x harder to fix without it.',
        perspective2026: 'By 2026, observability for agents is no longer just a nicer logging dashboard. Mature teams expect cross-agent traces, replayable execution context, per-run cost budgets, and audit trails that connect user request, tool calls, approvals, and final output. The operational question is not “did it fail?” but “where did quality, latency, or cost drift start?”',
        pitfalls: [
          'Logging only the final response. Without step-level traces, most agent failures remain impossible to localize.',
          'Tracking traces without cost and latency attribution. A system can be accurate and still operationally broken.',
          'Collecting everything without redaction, retention rules, or access control. Observability data can become a compliance problem if unmanaged.'
        ],
        furtherReading: [
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' },
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '24-memory-arch',
            reason: 'Memory retrieval and write-back decisions should be visible in traces, otherwise bad memory behavior is nearly impossible to debug.'
          },
          {
            chapterId: '26-guardrails',
            reason: 'Guardrails need observability hooks so safety decisions, denials, and overrides are auditable instead of opaque.'
          },
          {
            chapterId: '27-evaluation',
            reason: 'Evaluation tells you whether quality changed; observability helps explain where and why the regression happened.'
          }
        ],
        table: {
          title: 'Observability tools',
          headers: ['Tool', 'Type', 'Key Strength', 'Open Source'],
          rows: [
            ['LangSmith',    'Full platform',   'LangChain integration', 'No'],
            ['Langfuse',     'Full platform',   'Self-hostable, growing fast', 'Yes'],
            ['Braintrust',   'Eval-focused',    'Evaluation + observability', 'No'],
            ['Arize Phoenix','Tracing',         'OSS, lightweight', 'Yes'],
          ]
        }
      },
      zh: {
        definition: 'Agent 可观测性意味着<strong>追踪每个步骤、跟踪 Token 成本、测量延迟、维护决策审计轨迹</strong>。生产环境必备——没有它，调试非确定性 Agent 行为就是考古。',
        essence: '<strong>为什么至关重要：</strong>基于 LLM 的 Agent 是非确定性的。相同输入可能产生不同的工具调用、不同的推理路径和不同的输出。你需要看到的不只是 API 是否响应，而是<em>Agent 做了什么决策、为什么</em>。\n\n<strong>四大支柱：</strong>\n1. <em>链路级日志</em>——记录每个 Agent 步骤：输入、推理、工具调用、输出。这是调试的基础。\n2. <em>Token 用量与成本归因</em>——追踪每条链路和每步的 Token。将成本归因到具体功能或用户。\n3. <em>延迟监控</em>——测量每次工具调用、LLM 调用、端到端链路的时间。识别瓶颈。\n4. <em>决策审计轨迹</em>——Agent 为什么选择工具 A 而不是工具 B？决策时上下文里有什么？\n\n<strong>工具：</strong>LangSmith（LangChain 生态，集成最好）、Langfuse（开源，增长最快）、Braintrust（评估导向）、Arize Phoenix（开源）、Fiddler（全生命周期）。\n\n<strong>"AI 考古"问题：</strong>在多 Agent 系统中，错误可能埋在跨多个 Agent 的长执行链路中。好的可观测工具让你能跨 Agent 边界追踪。',
        insight: '先加可观测性，再加功能。你在 "hello world agent" 之后第一件要构建的就是链路日志。以后遇到的每个 bug，没有可观测性都会难 10 倍修复。',
        perspective2026: '到了 2026 年，Agent 可观测性已经不只是“更好看的日志面板”。成熟团队要求的是跨 Agent 链路、可回放执行上下文、单次运行成本预算，以及能把用户请求、工具调用、审批动作和最终输出串起来的审计轨迹。运维真正关心的问题不再是“有没有失败”，而是“质量、延迟或成本的漂移从哪里开始”。',
        pitfalls: [
          '只记录最终回复，不记录中间步骤。没有逐步链路，大多数 Agent 故障都无法定位。',
          '有追踪却没有成本和延迟归因。一个系统即使结果正确，也可能在运维层面已经失控。',
          '什么都采集，却没有脱敏、保留期限和访问控制。可观测数据本身会变成合规风险。'
        ],
        furtherReading: [
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' },
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '24-memory-arch',
            reason: '记忆检索和写回决策如果不进入链路追踪，记忆系统一旦出错几乎无法调试。'
          },
          {
            chapterId: '26-guardrails',
            reason: '护栏需要可观测性挂钩，这样拒绝、放行和人工覆盖才是可审计的，而不是黑箱。'
          },
          {
            chapterId: '27-evaluation',
            reason: '评估负责告诉你质量有没有变化，可观测性负责解释问题究竟从哪一步开始。'
          }
        ],
        table: {
          title: '可观测工具',
          headers: ['工具', '类型', '核心优势', '开源'],
          rows: [
            ['LangSmith',    '全平台',    'LangChain 集成',    '否'],
            ['Langfuse',     '全平台',    '可自部署、增长快',  '是'],
            ['Braintrust',   '评估导向',  '评估 + 可观测',     '否'],
            ['Arize Phoenix','链路追踪',  '开源、轻量',       '是'],
          ]
        }
      }
    }
  });
})();
