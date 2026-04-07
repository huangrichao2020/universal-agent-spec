(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;
  window.AgentSpec.register({
    id: '27-evaluation', order: 27,
    nav:      { en: 'Evaluation', zh: '评估' },
    title:    { en: '<span class="accent">Evaluation</span>', zh: '<span class="accent">评估</span>' },
    subtitle: { en: 'Benchmarks · Metrics · Evaluation-Driven Development', zh: '基准测试 · 指标 · 评估驱动开发' },
    tag:      { en: 'System', zh: '系统' }, tagClass: 'tag-system',
    viewBox: '0 0 760 260',
    getSvg(lang) {
      let svg = '';
      // Eval loop
      svg += S.box(40, 20, 160, 44, '#0071e3', t(lang, 'Agent Run', 'Agent 运行'), '');
      svg += S.arrow(200, 42, 260, 42, '#6b84a8');
      svg += S.box(260, 20, 200, 44, '#ff4d6d', t(lang, 'Evaluation', '评估'), t(lang, 'Score against criteria', '按标准评分'));
      svg += S.arrow(460, 42, 520, 42, '#6b84a8');
      svg += S.box(520, 20, 200, 44, '#1a8a3a', t(lang, 'Feedback Loop', '反馈循环'), t(lang, 'Improve prompts/tools', '优化提示词/工具'));
      // Loop back
      svg += `<path d="M 620 64 L 620 80 Q 620 90 610 90 L 130 90 Q 120 90 120 80 L 120 64"
        fill="none" stroke="#a78bfa" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arr)"/>`;
      // Metrics grid
      const metrics = [
        { x: 40, color: '#0071e3', name: t(lang, 'Completion', '完成率'), desc: t(lang, 'Task success %', '任务成功率 %') },
        { x: 190, color: '#ff4d6d', name: t(lang, 'Quality', '质量'), desc: t(lang, 'Output accuracy', '输出准确性') },
        { x: 340, color: '#ffb800', name: t(lang, 'Tool Accuracy', '工具准确度'), desc: t(lang, 'Right tool chosen', '选对工具') },
        { x: 490, color: '#1a8a3a', name: t(lang, 'Cost / Latency', '成本/延迟'), desc: t(lang, 'Token & time efficiency', 'Token 与时间效率') },
      ];
      metrics.forEach(m => {
        svg += S.box(m.x, 110, 140, 36, m.color, m.name, m.desc);
      });
      // Benchmarks
      svg += `
        <rect x="40" y="165" width="680" height="36" rx="5" fill="#a78bfa12" stroke="#a78bfa" stroke-width="1"/>
        <text x="380" y="187" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Benchmarks: SWE-bench (code) · GAIA (general) · AgentBench (multi-env) · HumanEval (generation)',
                  '基准：SWE-bench（代码）· GAIA（通用）· AgentBench（多环境）· HumanEval（生成）')}
        </text>
      `;
      svg += S.label(380, 222, t(lang, 'Evaluation-driven development: define metrics BEFORE building features', '评估驱动开发：先定义指标，再构建功能'), '#0071e3', 10);
      svg += S.label(380, 240, t(lang, 'Gartner: 40% of agentic AI projects will be canceled by 2027 due to reliability concerns', 'Gartner：到 2027 年 40% 的 Agent AI 项目将因可靠性问题被取消'), '#ff4d6d', 10);
      svg += S.label(380, 258, t(lang, 'The teams that evaluate rigorously are the ones that ship reliably', '严格评估的团队才能可靠交付'), '#1a8a3a', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Agent evaluation is the <strong>systematic measurement of agent performance</strong> across completion rate, output quality, tool accuracy, cost, and latency. Evaluation-driven development treats eval as the foundation, not an afterthought.',
        essence: '<strong>Evaluation dimensions:</strong>\n1. <em>Task completion rate</em> — What percentage of tasks does the agent successfully complete? The primary metric.\n2. <em>Output quality</em> — Are the outputs correct, complete, and well-formatted? Requires domain-specific scoring.\n3. <em>Tool selection accuracy</em> — Does the agent choose the right tool at each step? Wrong tool = wasted tokens + wrong results.\n4. <em>Cost efficiency</em> — Tokens consumed per successful task. Multi-agent systems multiply costs.\n5. <em>Latency distribution</em> — P50/P95/P99 response times. Users abandon at ~30 seconds.\n\n<strong>Benchmarks:</strong>\n— SWE-bench: Real GitHub issues. The gold standard for coding agents. Claude: 80.9%.\n— GAIA: General AI assistant tasks across 466 questions, 3 difficulty levels.\n— AgentBench: Tests agents across 8 environments (OS, DB, web, etc.).\n— HumanEval: Code generation correctness.\n\n<strong>Evaluation-driven development:</strong>\n1. Define your eval criteria before writing agent code\n2. Build a test suite of representative tasks\n3. Run evals after every change\n4. Track trends over time — not just pass/fail\n5. Use eval results to prioritize improvements',
        insight: 'Evaluation is becoming a competitive moat. The teams that invest in rigorous evaluation ship faster and more reliably. The teams that skip evaluation spend all their time firefighting production issues.',
        perspective2026: 'By 2026, strong teams treat evaluation as a continuous system rather than a one-off benchmark run. Offline suites, replayed production traces, human spot checks, cost ceilings, and safety regressions all feed the same release decision. The goal is not just proving that an agent can succeed once, but knowing whether it stays reliable as prompts, tools, models, and traffic change.',
        pitfalls: [
          'Relying only on public benchmarks. They are useful for orientation, but they rarely cover your actual workflow, constraints, and failure cases.',
          'Scoring only the final answer. Tool choice, recovery behavior, and policy compliance often matter as much as end output.',
          'Running evals without a frozen baseline set or trend tracking. Without stable comparisons, teams confuse noise for improvement.'
        ],
        furtherReading: [
          { title: 'SWE-bench', url: 'https://www.swebench.com' },
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '25-observability',
            reason: 'Evaluation tells you outcomes, but observability is what lets you inspect the trace that produced the score.'
          },
          {
            chapterId: '26-guardrails',
            reason: 'Safety and policy checks need to be part of the eval suite, otherwise teams optimize only for capability.'
          },
          {
            chapterId: '28-coding-agents',
            reason: 'Coding agents make evaluation concrete because benchmarks like SWE-bench provide objective, executable outcomes.'
          }
        ],
        table: {
          title: 'Agent benchmarks',
          headers: ['Benchmark', 'Tests', 'Domain', 'Key Insight'],
          rows: [
            ['SWE-bench',   'Real GitHub issues',      'Coding',   'Gold standard for code agents'],
            ['GAIA',        '466 questions, 3 levels', 'General',  'Tests real-world assistant tasks'],
            ['AgentBench',  '8 environments',          'Multi-env','Cross-environment performance'],
            ['HumanEval',   'Code problems',           'Code gen', 'Functional correctness'],
          ]
        }
      },
      zh: {
        definition: 'Agent 评估是对 Agent 性能的<strong>系统化测量</strong>，涵盖完成率、输出质量、工具准确度、成本和延迟。评估驱动开发将评估作为基础而非事后补充。',
        essence: '<strong>评估维度：</strong>\n1. <em>任务完成率</em>——Agent 成功完成多少百分比的任务？最核心指标。\n2. <em>输出质量</em>——输出是否正确、完整、格式良好？需要领域特定评分。\n3. <em>工具选择准确度</em>——Agent 每步是否选对了工具？选错 = 浪费 Token + 错误结果。\n4. <em>成本效率</em>——每个成功任务消耗的 Token。多 Agent 系统倍增成本。\n5. <em>延迟分布</em>——P50/P95/P99 响应时间。用户在约 30 秒时放弃。\n\n<strong>基准测试：</strong>\n— SWE-bench：真实 GitHub issue。编程 Agent 的黄金标准。Claude：80.9%。\n— GAIA：通用 AI 助手任务，466 题，3 个难度级别。\n— AgentBench：在 8 个环境（OS、DB、Web 等）中测试 Agent。\n— HumanEval：代码生成正确性。\n\n<strong>评估驱动开发：</strong>\n1. 在写 Agent 代码之前先定义评估标准\n2. 构建代表性任务的测试套件\n3. 每次改动后运行评估\n4. 追踪趋势——不只是通过/失败\n5. 用评估结果确定改进优先级',
        insight: '评估正在成为竞争护城河。投资严格评估的团队交付更快、更可靠。跳过评估的团队把所有时间花在救生产火上。',
        perspective2026: '到了 2026 年，强团队已经把评估当成持续运行的系统，而不是一次性的 benchmark 测试。离线测试集、生产链路回放、人工抽检、成本上限和安全回归会一起进入发布决策。目标不再只是证明 Agent 能成功一次，而是确认在提示词、工具、模型和流量变化后它依然可靠。',
        pitfalls: [
          '只依赖公开 benchmark。它们适合定方向，但很少覆盖你的真实工作流、约束条件和失败模式。',
          '只给最终答案打分，不评估过程。工具选择、恢复行为和策略合规往往和终态结果一样重要。',
          '跑评估时没有冻结基线集，也不追踪长期趋势。没有稳定对照，团队很容易把噪声误判成进步。'
        ],
        furtherReading: [
          { title: 'SWE-bench', url: 'https://www.swebench.com' },
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '25-observability',
            reason: '评估告诉你结果如何，可观测性则帮助你看到这个分数究竟是怎么产生的。'
          },
          {
            chapterId: '26-guardrails',
            reason: '安全和策略检查必须进入评估集，否则团队只会朝着“能力更强”而不是“更安全”优化。'
          },
          {
            chapterId: '28-coding-agents',
            reason: '编码 Agent 让评估最容易落地，因为 SWE-bench 这类基准提供了可执行、可复验的客观结果。'
          }
        ],
        table: {
          title: 'Agent 基准测试',
          headers: ['基准', '测试内容', '领域', '关键发现'],
          rows: [
            ['SWE-bench',   '真实 GitHub issue',    '编程',   '编程 Agent 黄金标准'],
            ['GAIA',        '466 题，3 个级别',     '通用',   '测试真实助手任务'],
            ['AgentBench',  '8 个环境',             '多环境', '跨环境性能'],
            ['HumanEval',   '编程题',               '代码生成','功能正确性'],
          ]
        }
      }
    }
  });
})();
