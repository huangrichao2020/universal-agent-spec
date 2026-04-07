(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;
  window.AgentSpec.register({
    id: '26-guardrails', order: 26,
    nav:      { en: 'Guardrails', zh: '护栏' },
    title:    { en: '<span class="accent">Guardrails</span>', zh: '<span class="accent">护栏</span>' },
    subtitle: { en: 'Input · Output · Tool Auth · Human Approval', zh: '输入 · 输出 · 工具权限 · 人工审批' },
    tag:      { en: 'System', zh: '系统' }, tagClass: 'tag-system',
    viewBox: '0 0 760 260',
    getSvg(lang) {
      let svg = '';
      // Three guard layers
      svg += S.box(40, 20, 200, 50, '#ff4d6d', t(lang, 'Input Guards', '输入护栏'), t(lang, 'Filter harmful requests', '过滤有害请求'));
      svg += S.arrow(240, 45, 280, 45, '#6b84a8');
      svg += S.box(280, 20, 200, 50, '#0071e3', t(lang, 'Agent Execution', 'Agent 执行'), t(lang, 'Tool auth + spend limits', '工具权限 + 花费限制'));
      svg += S.arrow(480, 45, 520, 45, '#6b84a8');
      svg += S.box(520, 20, 200, 50, '#1a8a3a', t(lang, 'Output Guards', '输出护栏'), t(lang, 'Safety + compliance', '安全 + 合规'));
      // Human-in-the-loop
      svg += `
        <rect x="280" y="90" width="200" height="40" rx="5" fill="#ffb80012" stroke="#ffb800" stroke-width="1.5"/>
        <text x="380" y="115" text-anchor="middle" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="500">
          ${t(lang, 'Human-in-the-Loop Checkpoints', '人机审批检查点')}
        </text>
        ${S.arrow(380, 70, 380, 90, '#ffb800')}
      `;
      // Guardrail types
      const guards = [
        { x: 40, y: 155, color: '#ff4d6d', title: t(lang, 'Input Validation', '输入验证'),
          items: [t(lang, 'Prompt injection detection', '提示注入检测'), t(lang, 'Scope enforcement', '范围限制'), t(lang, 'PII filtering', 'PII 过滤')] },
        { x: 280, y: 155, color: '#0071e3', title: t(lang, 'Execution Limits', '执行限制'),
          items: [t(lang, 'Max steps per run', '每次最大步数'), t(lang, 'Spend caps ($)', '花费上限($)'), t(lang, 'Tool allowlists', '工具白名单')] },
        { x: 520, y: 155, color: '#1a8a3a', title: t(lang, 'Output Validation', '输出验证'),
          items: [t(lang, 'Brand safety checks', '品牌安全检查'), t(lang, 'Factual grounding', '事实依据'), t(lang, 'Compliance logging', '合规日志')] },
      ];
      guards.forEach(g => {
        svg += `<rect x="${g.x}" y="${g.y}" width="200" height="65" rx="5" fill="${g.color}08" stroke="${g.color}80" stroke-width="1"/>`;
        svg += `<text x="${g.x+100}" y="${g.y+15}" text-anchor="middle" fill="${g.color}" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="600">${g.title}</text>`;
        g.items.forEach((item, i) => {
          svg += `<text x="${g.x+15}" y="${g.y+30+i*14}" fill="${g.color}88" font-family="'JetBrains Mono',monospace" font-size="8">• ${item}</text>`;
        });
      });
      svg += S.label(380, 240, t(lang, 'Defense in depth: validate inputs, constrain execution, check outputs', '纵深防御：验证输入、约束执行、检查输出'), '#6b84a8', 10);
      svg += S.label(380, 258, t(lang, 'Set execution limits to avoid infinite loops. Cap per-run spend.', '设置执行限制避免无限循环。限制单次运行花费。'), '#ff4d6d', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Guardrails are <strong>defense-in-depth controls</strong> that constrain agent behavior: input validation (filtering harmful requests), execution limits (max steps, spend caps, tool permissions), output validation (safety, compliance), and human-in-the-loop checkpoints.',
        essence: '<strong>Three layers of defense:</strong>\n\n1. <em>Input guards</em> — Before the agent sees user input:\n   • Prompt injection detection (the #1 threat to agents)\n   • Scope enforcement: reject requests outside the agent\'s domain\n   • PII filtering: strip sensitive data before it enters the LLM\n\n2. <em>Execution limits</em> — During agent execution:\n   • Max steps per run (prevent infinite ReAct loops)\n   • Spend caps: set dollar limits per run and per user\n   • Tool allowlists: restrict which tools the agent can call\n   • Timeout policies: kill runs that exceed time limits\n\n3. <em>Output guards</em> — Before results reach the user:\n   • Brand safety: ensure responses align with company voice\n   • Factual grounding: cross-reference claims with sources\n   • Compliance logging: record all outputs for audit\n\n<strong>Human-in-the-loop:</strong> The most powerful guardrail. Pause execution before irreversible actions (deleting files, sending emails, financial transactions). Let the human approve, modify, or reject.\n\n<strong>The threat landscape:</strong> 96% of enterprise employees use gen AI; 38% input sensitive data into unauthorized apps. Advanced models remain vulnerable to 87% of tested jailbreak prompts.',
        insight: 'Guardrails are not optional for production agents. Start with execution limits (easiest to implement, highest impact). Add input/output validation next. Add human-in-the-loop for high-stakes actions.',
        perspective2026: 'By 2026, guardrails are increasingly implemented as a runtime policy layer rather than a few prompt-time filters. Mature systems combine step limits, budget caps, tool-scoped permissions, approval checkpoints, and audit logging so that risky behavior is constrained even when prompts, models, or tools change underneath the application.',
        pitfalls: [
          'Focusing only on input filtering. Many expensive failures happen during execution, after the model has already chosen tools or entered loops.',
          'Running agents without hard limits on steps, time, or spend. Cost explosions are a safety issue, not just a finance issue.',
          'Allowing destructive or externally visible actions without approval gates or reversible workflows.'
        ],
        furtherReading: [
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '23-graph-orchestration',
            reason: 'Approval checkpoints and gated branches are often easiest to express in graph-based workflows.'
          },
          {
            chapterId: '25-observability',
            reason: 'Guardrails need traces and audit hooks so blocked actions, overrides, and policy hits are diagnosable.'
          },
          {
            chapterId: '27-evaluation',
            reason: 'Safety controls must be evaluated continuously, otherwise teams overestimate how well their guardrails actually hold up.'
          }
        ],
        table: {
          title: 'Guardrail implementation priority',
          headers: ['Guardrail', 'Effort', 'Impact', 'Priority'],
          rows: [
            ['Max steps limit',        'Low',    'High',   '1 — Do first'],
            ['Spend cap per run',      'Low',    'High',   '2 — Do first'],
            ['Tool allowlist',         'Medium', 'High',   '3 — Essential'],
            ['Prompt injection detection','Medium','High',  '4 — Essential'],
            ['Human approval for destructive ops','Medium','Critical','5 — For production'],
            ['Output compliance logging','Medium','Medium', '6 — For enterprise'],
          ]
        }
      },
      zh: {
        definition: '护栏是约束 Agent 行为的<strong>纵深防御控制</strong>：输入验证（过滤有害请求）、执行限制（最大步数、花费上限、工具权限）、输出验证（安全、合规）和人机审批检查点。',
        essence: '<strong>三层防御：</strong>\n\n1. <em>输入护栏</em>——Agent 看到用户输入之前：\n   • 提示注入检测（Agent 的头号威胁）\n   • 范围限制：拒绝超出 Agent 领域的请求\n   • PII 过滤：在数据进入 LLM 前剥离敏感信息\n\n2. <em>执行限制</em>——Agent 执行过程中：\n   • 每次运行最大步数（防止 ReAct 无限循环）\n   • 花费上限：设置每次运行和每用户的美元限制\n   • 工具白名单：限制 Agent 可调用的工具\n   • 超时策略：终止超时运行\n\n3. <em>输出护栏</em>——结果到达用户之前：\n   • 品牌安全：确保回复符合公司调性\n   • 事实依据：将声明与来源交叉验证\n   • 合规日志：记录所有输出供审计\n\n<strong>人机协作：</strong>最强大的护栏。在不可逆操作（删除文件、发送邮件、金融交易）前暂停执行，让人类批准、修改或拒绝。\n\n<strong>威胁态势：</strong>96% 的企业员工使用生成式 AI；38% 将敏感数据输入未授权应用。先进模型对 87% 的测试越狱提示仍然脆弱。',
        insight: '生产 Agent 的护栏不是可选的。从执行限制开始（最容易实现、影响最大）。然后加输入/输出验证。最后对高风险操作加人机审批。',
        perspective2026: '到了 2026 年，护栏越来越像一个运行时策略层，而不只是几条提示词过滤规则。成熟系统会把步数上限、预算封顶、工具级权限、审批检查点和审计日志绑在一起，这样即使底层提示、模型或工具发生变化，风险行为仍然会被系统性约束住。',
        pitfalls: [
          '只盯着输入过滤。很多昂贵的事故发生在执行阶段，也就是模型已经开始选工具、进入循环之后。',
          '运行 Agent 时没有硬性的步数、时间或花费上限。成本失控本身就是安全问题，不只是财务问题。',
          '对破坏性动作或对外可见动作不设置审批门，也不设计可回滚流程。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '23-graph-orchestration',
            reason: '审批节点和受控分支通常最适合用图工作流表达。'
          },
          {
            chapterId: '25-observability',
            reason: '护栏必须挂接链路和审计，否则命中、拦截和人工覆盖都无法诊断。'
          },
          {
            chapterId: '27-evaluation',
            reason: '安全控制需要持续评估，否则团队很容易高估自己护栏的真实有效性。'
          }
        ],
        table: {
          title: '护栏实施优先级',
          headers: ['护栏', '工作量', '影响', '优先级'],
          rows: [
            ['最大步数限制',      '低',   '高',   '1 — 先做'],
            ['单次运行花费上限',  '低',   '高',   '2 — 先做'],
            ['工具白名单',        '中',   '高',   '3 — 必要'],
            ['提示注入检测',      '中',   '高',   '4 — 必要'],
            ['破坏性操作人工审批', '中',   '关键', '5 — 生产必备'],
            ['输出合规日志',      '中',   '中',   '6 — 企业需要'],
          ]
        }
      }
    }
  });
})();
