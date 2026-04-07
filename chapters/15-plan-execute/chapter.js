(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '15-plan-execute',
    order: 15,

    nav:      { en: 'Plan & Execute',  zh: '规划与执行' },
    title:    { en: 'Plan <span class="accent">&</span> Execute', zh: '规划 <span class="accent">&</span> 执行' },
    subtitle: { en: 'Separate Thinking from Doing', zh: '将思考与行动分离' },
    tag:      { en: 'Design Pattern',  zh: '设计模式' },
    tagClass: 'tag-pattern',

    viewBox: '0 0 760 310',

    getSvg(lang) {
      // Planner (strong model)
      const planner = S.box(40, 20, 200, 50, '#a78bfa',
        t(lang, 'Planner (Strong Model)', '规划者（强模型）'),
        t(lang, 'GPT-4 / Claude Opus', 'GPT-4 / Claude Opus'));

      // Plan output
      const planBox = S.box(40, 100, 200, 80, '#0071e3',
        t(lang, 'Plan', '计划'));

      const planSteps = `
        <text x="60" y="132" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="9">
          1. ${t(lang, 'Search for user data', '搜索用户数据')}
        </text>
        <text x="60" y="147" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="9">
          2. ${t(lang, 'Analyze patterns', '分析模式')}
        </text>
        <text x="60" y="162" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="9">
          3. ${t(lang, 'Generate report', '生成报告')}
        </text>
      `;

      // Arrow from planner to plan
      const a1 = S.arrow(140, 70, 140, 100, '#6b84a8');

      // Executor (fast model)
      const executor = S.box(340, 20, 200, 50, '#ff4d6d',
        t(lang, 'Executor (Fast Model)', '执行者（快模型）'),
        t(lang, 'GPT-4o-mini / Haiku', 'GPT-4o-mini / Haiku'));

      // Arrow from plan to executor
      const a2 = S.arrow(240, 140, 340, 45, '#6b84a8',
        t(lang, 'step by step', '逐步'));

      // Execution steps
      const execSteps = `
        ${S.box(340, 100, 200, 36, '#1a8a3a',
          t(lang, 'Step 1: Execute', '步骤 1：执行'),
          t(lang, 'search("user data")', 'search("用户数据")'))}
        ${S.arrow(440, 136, 440, 152, '#6b84a8')}
        ${S.box(340, 152, 200, 36, '#1a8a3a',
          t(lang, 'Step 2: Execute', '步骤 2：执行'),
          t(lang, 'analyze(results)', 'analyze(results)'))}
        ${S.arrow(440, 188, 440, 204, '#6b84a8')}
        ${S.box(340, 204, 200, 36, '#1a8a3a',
          t(lang, 'Step 3: Execute', '步骤 3：执行'),
          t(lang, 'generate_report()', 'generate_report()'))}
      `;

      // Re-planner feedback loop
      const replan = `
        ${S.box(600, 100, 140, 50, '#ffb800',
          t(lang, 'Re-Planner', '重规划者'),
          t(lang, 'Adjust if stuck', '卡住时调整'))}
        <path d="M 540 170 L 580 170 Q 600 170 600 150"
          fill="none" stroke="#ffb800" stroke-width="1.2" stroke-dasharray="4 3"
          marker-end="url(#arrA)"/>
        <path d="M 600 100 L 600 80 Q 600 70 590 70 L 250 70 Q 240 70 240 80 L 240 100"
          fill="none" stroke="#ffb800" stroke-width="1.2" stroke-dasharray="4 3"
          marker-end="url(#arrA)"/>
        <text x="420" y="66" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'update plan if execution diverges', '执行偏离时更新计划')}
        </text>
      `;

      return `
        ${planner}${a1}${planBox}${planSteps}
        ${executor}${a2}${execSteps}${replan}

        ${S.label(380, 265,
          t(lang, 'Strong model plans once, cheap model executes many times → cost efficient',
                  '强模型规划一次，便宜模型执行多次 → 成本高效'),
          '#6b84a8', 10)}
        ${S.label(380, 283,
          t(lang, 'Re-planner watches for deviations and adjusts. No blind execution.',
                  '重规划者监控偏差并调整。不盲目执行。'),
          '#ffb800', 10)}
        ${S.label(380, 301,
          t(lang, 'Best for long-horizon goals with 5+ steps. Overkill for simple tasks.',
                  '最适合 5 步以上的长期目标。简单任务用它是杀鸡用牛刀。'),
          '#ff4d6d', 10)}
      `;
    },

    content: {
      en: {
        perspective2026: 'In 2026, strong planning is less about producing a giant static checklist and more about maintaining a durable plan state across long-running work. Modern coding agents checkpoint plans, repair them after failed steps, and resume execution hours later. The winning pattern is not "plan once and pray" but "plan, execute, inspect, and re-plan at controlled boundaries."',
        definition: 'Plan & Execute separates <strong>strategic planning</strong> (done by a strong reasoning model) from <strong>tactical execution</strong> (done by a fast, cheap model). A re-planner adjusts the plan when execution results diverge from expectations.',

        essence: '<strong>Why separate planning from execution?</strong>\n\nIn ReAct, the same model does both thinking and acting at every step. This is fine for short tasks, but for long-horizon goals (10+ steps), the model loses track of the big picture.\n\nPlan & Execute solves this:\n1. <em>Planner</em> (strong model like GPT-4/Opus) creates a high-level plan: "Step 1: gather data. Step 2: analyze. Step 3: report."\n2. <em>Executor</em> (fast model like GPT-4o-mini/Haiku) carries out each step, calling tools as needed\n3. <em>Re-Planner</em> reviews execution results after each step and updates the plan if needed\n\n<strong>Cost advantage:</strong> The expensive model is called once (planning) or occasionally (re-planning). The cheap model handles the bulk of work. For a 20-step task, this can be 5-10x cheaper than ReAct with a strong model.\n\n<strong>When to use:</strong> Tasks with 5+ steps, clear sub-goals, and where the planner can reason about the full task upfront. Not suitable for highly unpredictable environments where every step depends on the last.',

        insight: 'This is how human teams work: a senior architect designs the system, junior developers implement it, and the architect reviews progress. The same principle applies to agents — let the best model do what it\'s best at (reasoning), and let the fast model do what it\'s best at (execution).',

        pitfalls: [
          '把规划写成一串模糊口号。没有<strong>可执行的 step、预期产物、失败条件</strong>，执行器很快就会迷失方向。',
          '生成计划后从不重规划。长任务里环境、上下文和中间结果都会变化，不设置 checkpoint 的计划通常很快过期。',
          '简单任务也硬套 Plan-and-Execute。只有 1 到 3 步的小任务往往直接用 ReAct 更快，额外规划层会徒增开销。'
        ],

        furtherReading: [
          { title: 'Plan-and-Solve Prompting', url: 'https://arxiv.org/abs/2305.04091' },
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code Documentation', url: 'https://docs.claude.com/en/docs/claude-code' }
        ],

        crossRefs: [
          {
            chapterId: '14-react',
            reason: 'ReAct is the baseline loop to compare against when deciding whether the task needs explicit up-front planning.'
          },
          {
            chapterId: '16-mcp',
            reason: 'Most executors still depend on a reliable tool substrate, and MCP is the standard way to expose those tools cleanly.'
          }
        ],

        table: {
          title: 'Plan & Execute vs ReAct',
          headers: ['Dimension', 'ReAct', 'Plan & Execute'],
          rows: [
            ['Planning',      'Implicit, per-step',      'Explicit, upfront'],
            ['Model usage',   'Same model throughout',   'Strong planner + cheap executor'],
            ['Cost (20 steps)', 'High (20 strong calls)', 'Low (1-3 strong + 20 cheap)'],
            ['Adaptability',  'High (re-thinks each step)','Medium (re-plan on deviation)'],
            ['Best for',      'Short tasks (1-10 steps)', 'Long tasks (5-50+ steps)'],
          ]
        }
      },

      zh: {
        perspective2026: '到了 2026 年，强规划已经不再是“先吐出一份超长清单”这么简单，而是要在长任务中维护一份可持续的计划状态。现代编程 Agent 会对计划做 checkpoint、在步骤失败后修复计划，并在数小时后恢复执行。真正有效的模式不是“计划一次然后祈祷”，而是“规划、执行、检查、在受控边界重规划”。',
        definition: '规划与执行将<strong>战略规划</strong>（由强推理模型完成）与<strong>战术执行</strong>（由快速便宜模型完成）分离。重规划者在执行结果偏离预期时调整计划。',

        essence: '<strong>为什么要将规划和执行分离？</strong>\n\n在 ReAct 中，同一个模型在每一步都既思考又行动。对短任务没问题，但对长周期目标（10+ 步），模型会失去全局视野。\n\n规划与执行解决了这个问题：\n1. <em>规划者</em>（强模型如 GPT-4/Opus）创建高层计划："步骤 1：收集数据。步骤 2：分析。步骤 3：报告。"\n2. <em>执行者</em>（快模型如 GPT-4o-mini/Haiku）逐步执行，按需调用工具\n3. <em>重规划者</em>在每步执行后审查结果，必要时更新计划\n\n<strong>成本优势：</strong>昂贵模型只调用一次（规划）或偶尔调用（重规划），便宜模型处理大量工作。对 20 步任务，这可以比 ReAct + 强模型便宜 5-10 倍。\n\n<strong>适用场景：</strong>5 步以上、有明确子目标、规划者能预先推理全部任务的场景。不适合每步都高度依赖上一步的不可预测环境。',

        insight: '这就是人类团队的工作方式：高级架构师设计系统，初级开发者实现它，架构师审查进展。Agent 也一样——让最好的模型做它最擅长的（推理），让快速模型做它最擅长的（执行）。',

        pitfalls: [
          '把规划写成一串模糊口号。没有<strong>可执行步骤、预期产物和失败条件</strong>，执行器很快就会迷失方向。',
          '生成计划后从不重规划。长任务里环境、上下文和中间结果都会变化，不设置 checkpoint 的计划通常很快过期。',
          '简单任务也硬套 Plan-and-Execute。只有 1 到 3 步的小任务，往往直接用 ReAct 更快，额外规划层会徒增开销。'
        ],

        furtherReading: [
          { title: 'Plan-and-Solve Prompting 论文', url: 'https://arxiv.org/abs/2305.04091' },
          { title: 'Anthropic：构建高效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' }
        ],

        crossRefs: [
          {
            chapterId: '14-react',
            reason: '当你判断任务是否需要显式前置规划时，ReAct 是最关键的基准对照。'
          },
          {
            chapterId: '16-mcp',
            reason: '执行器大多仍然依赖可靠的工具层，而 MCP 正是把这些工具接口标准化的主流方案。'
          }
        ],

        table: {
          title: '规划与执行 vs ReAct',
          headers: ['维度', 'ReAct', '规划与执行'],
          rows: [
            ['规划',        '隐式、逐步',              '显式、预先'],
            ['模型使用',    '全程同一模型',            '强规划者 + 便宜执行者'],
            ['成本（20步）', '高（20 次强模型调用）',   '低（1-3 次强 + 20 次便宜）'],
            ['适应性',      '高（每步重新思考）',       '中等（偏离时重规划）'],
            ['适合',        '短任务（1-10 步）',       '长任务（5-50+ 步）'],
          ]
        }
      }
    }
  });
})();
