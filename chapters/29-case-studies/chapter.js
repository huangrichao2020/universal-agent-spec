(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;
  window.AgentSpec.register({
    id: '29-case-studies', order: 29,
    nav:      { en: 'Case Studies', zh: '实战案例' },
    title:    { en: 'Case <span class="accent">Studies</span>', zh: '实战 <span class="accent">案例</span>' },
    subtitle: { en: 'Customer Service · Research · Data Analysis', zh: '客服 · 研究 · 数据分析' },
    tag:      { en: 'Business', zh: '商业' }, tagClass: 'tag-biz',
    viewBox: '0 0 760 260',
    getSvg(lang) {
      let svg = '';
      // Three case study cards
      const cases = [
        { x: 40, color: '#0071e3', name: t(lang, 'Customer Service', '客服 Agent'),
          pattern: t(lang, 'Routing + Specialists', '路由 + 专家'),
          arch: t(lang, 'Supervisor + Pipeline', 'Supervisor + 流水线') },
        { x: 280, color: '#1a8a3a', name: t(lang, 'Research Agent', '研究 Agent'),
          pattern: t(lang, 'Plan-Execute + Memory', '规划执行 + 记忆'),
          arch: t(lang, 'Hierarchical + Parallel', '层级 + 并行') },
        { x: 520, color: '#a78bfa', name: t(lang, 'Data Analysis', '数据分析 Agent'),
          pattern: t(lang, 'Code Exec + RAG', '代码执行 + RAG'),
          arch: t(lang, 'ReAct + Tool-augmented', 'ReAct + 工具增强') },
      ];
      cases.forEach(c => {
        svg += `
          <rect x="${c.x}" y="20" width="200" height="100" rx="5" fill="${c.color}08" stroke="${c.color}" stroke-width="1.5"/>
          <text x="${c.x+100}" y="42" text-anchor="middle" fill="${c.color}" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">${c.name}</text>
          <text x="${c.x+15}" y="62" fill="${c.color}88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Pattern:', '模式：')} ${c.pattern}</text>
          <text x="${c.x+15}" y="78" fill="${c.color}88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Arch:', '架构：')} ${c.arch}</text>
          <text x="${c.x+15}" y="94" fill="${c.color}88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Human-in-loop:', '人机协作：')} ${t(lang, 'Escalation', '升级')}</text>
        `;
      });
      // Common patterns across
      svg += `
        <rect x="40" y="140" width="680" height="50" rx="5" fill="#ffb80012" stroke="#ffb800" stroke-width="1"/>
        <text x="380" y="158" text-anchor="middle" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Common Patterns Across All Case Studies', '所有案例的共同模式')}
        </text>
        <text x="380" y="178" text-anchor="middle" fill="#ffb80088" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Guardrails + Observability + Evaluation + Human Escalation = Production Readiness',
                  '护栏 + 可观测性 + 评估 + 人工升级 = 生产就绪')}
        </text>
      `;
      svg += S.label(380, 216, t(lang, 'Every production agent combines multiple patterns from this spec', '每个生产 Agent 都组合了本规范中的多种模式'), '#6b84a8', 10);
      svg += S.label(380, 236, t(lang, 'The architecture choice depends on: task structure, risk level, latency requirements', '架构选择取决于：任务结构、风险等级、延迟要求'), '#0071e3', 10);
      svg += S.label(380, 256, t(lang, 'Start with the simplest architecture that works. Add complexity only when measured.', '从最简能用的架构开始。只在有度量依据时增加复杂度。'), '#ff4d6d', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Real-world agent deployments combine multiple patterns from this specification. Three case studies — customer service, research, and data analysis — illustrate how patterns compose in production.',
        essence: '<strong>Customer Service Agent:</strong>\n— Architecture: Routing classifier + specialist agents (billing, tech support, escalation)\n— Pattern: Supervisor dispatches to specialized workers\n— Guardrails: Brand safety, sentiment detection, compliance logging\n— Human-in-the-loop: Escalation to human agents for edge cases\n\n<strong>Research Agent:</strong>\n— Architecture: Plan-and-Execute with parallel information gathering\n— Pattern: Strong model plans research steps, fast models execute searches in parallel\n— Memory: Working memory (scratchpad) for plan persistence beyond context limit\n— Example: Anthropic\'s multi-agent researcher uses Memory tool to persist plans\n\n<strong>Data Analysis Agent:</strong>\n— Architecture: ReAct with code execution environment\n— Pattern: Agent writes and runs analytical code (SQL, pandas), iterates on results\n— Tools: Code interpreters, SQL execution, chart generation\n— Guardrails: SQL injection prevention, read-only database access\n\n<strong>Common production patterns:</strong> All three deploy guardrails (Ch 26), observability (Ch 25), evaluation (Ch 27), and human escalation. These are not optional.',
        insight: 'The best architecture for your agent is the one that matches your task\'s structure. Customer service = routing (predictable intent categories). Research = plan-execute (long-horizon, parallel). Data analysis = ReAct (iterative exploration). Let the task shape drive your pattern choice.',
        perspective2026: 'By 2026, the strongest case studies all converge on the same lesson: production agents are hybrids. They mix routing, planning, tools, memory, evaluation, and human escalation according to task shape and risk. The differentiator is not having a flashy architecture diagram, but knowing where the system must remain simple, where it must branch, and where humans must stay in control.',
        pitfalls: [
          'Copying another team’s architecture because the surface domain looks similar. Customer support, research, and data analysis fail for different reasons.',
          'Shipping a “case study” without human fallback paths. Real deployments need escalation points when confidence or policy boundaries are unclear.',
          'Ignoring data access, permissions, and integration friction. Many case studies fail operationally before the model becomes the bottleneck.'
        ],
        furtherReading: [
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' },
          { title: 'SWE-bench', url: 'https://www.swebench.com' }
        ],
        crossRefs: [
          {
            chapterId: '22-arch-patterns',
            reason: 'These case studies are concrete examples of how architecture patterns combine differently depending on task structure.'
          },
          {
            chapterId: '25-observability',
            reason: 'Production case studies only stay reliable when traces, cost attribution, and failure analysis are part of the deployment from day one.'
          },
          {
            chapterId: '26-guardrails',
            reason: 'Each real-world case needs domain-specific guardrails, especially when actions affect customers, databases, or external systems.'
          }
        ],
        table: {
          title: 'Case study architecture mapping',
          headers: ['Domain', 'Primary Pattern', 'Architecture', 'Key Challenge'],
          rows: [
            ['Customer Service', 'Routing + Specialist', 'Supervisor',      'Brand safety at scale'],
            ['Research',         'Plan-Execute + Parallel','Hierarchical',  'Context window limits'],
            ['Data Analysis',    'ReAct + Code Exec',    'Single agent',    'SQL safety + iteration'],
            ['Coding',           'All patterns combined', 'Multi-agent',    'Context management'],
          ]
        }
      },
      zh: {
        definition: '真实世界的 Agent 部署组合了本规范中的多种模式。三个案例——客服、研究、数据分析——展示了模式如何在生产中组合。',
        essence: '<strong>客服 Agent：</strong>\n— 架构：路由分类器 + 专家 Agent（账单、技术支持、升级）\n— 模式：Supervisor 分发到专业工作者\n— 护栏：品牌安全、情感检测、合规日志\n— 人机协作：边缘情况升级到人工客服\n\n<strong>研究 Agent：</strong>\n— 架构：规划执行 + 并行信息收集\n— 模式：强模型规划研究步骤，快速模型并行执行搜索\n— 记忆：工作记忆（草稿本）用于超出上下文限制的计划持久化\n— 示例：Anthropic 的多 Agent 研究者使用 Memory 工具持久化计划\n\n<strong>数据分析 Agent：</strong>\n— 架构：ReAct + 代码执行环境\n— 模式：Agent 编写并运行分析代码（SQL、pandas），迭代结果\n— 工具：代码解释器、SQL 执行、图表生成\n— 护栏：SQL 注入防护、只读数据库访问\n\n<strong>共同的生产模式：</strong>三者都部署了护栏（第 26 章）、可观测性（第 25 章）、评估（第 27 章）和人工升级。这些不是可选的。',
        insight: '最好的 Agent 架构是匹配你任务结构的那个。客服 = 路由（可预测的意图类别）。研究 = 规划执行（长周期、并行）。数据分析 = ReAct（迭代探索）。让任务形状驱动你的模式选择。',
        perspective2026: '到了 2026 年，最强的真实案例都在说明同一件事：生产 Agent 基本都是混合体。它们会根据任务形状和风险等级组合路由、规划、工具、记忆、评估和人工升级。真正的分水岭，不是画出一张炫目的架构图，而是知道哪些地方必须保持简单，哪些地方必须分支，哪些地方必须保留人工控制。',
        pitfalls: [
          '因为表面领域相似，就直接照搬别人的案例架构。客服、研究和数据分析的失败模式完全不同。',
          '做“案例”时没有人工兜底路径。真实部署必须有在置信度不足或策略边界不清时的升级点。',
          '忽略数据访问、权限和集成阻力。很多案例在模型成为瓶颈之前，就先死在运维和接入层。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' },
          { title: 'SWE-bench', url: 'https://www.swebench.com' }
        ],
        crossRefs: [
          {
            chapterId: '22-arch-patterns',
            reason: '这些案例就是架构模式如何根据任务结构不同而被混合使用的具体样本。'
          },
          {
            chapterId: '25-observability',
            reason: '真实案例只有从第一天就接入链路、成本归因和故障分析，才能长期可靠运行。'
          },
          {
            chapterId: '26-guardrails',
            reason: '每一种真实业务场景都需要自己的领域护栏，尤其当动作会触达客户、数据库或外部系统时。'
          }
        ],
        table: {
          title: '案例架构映射',
          headers: ['领域', '主要模式', '架构', '关键挑战'],
          rows: [
            ['客服',     '路由 + 专家',       'Supervisor', '大规模品牌安全'],
            ['研究',     '规划执行 + 并行',   '层级式',     '上下文窗口限制'],
            ['数据分析', 'ReAct + 代码执行',  '单 Agent',   'SQL 安全 + 迭代'],
            ['编程',     '所有模式组合',       '多 Agent',   '上下文管理'],
          ]
        }
      }
    }
  });
})();
