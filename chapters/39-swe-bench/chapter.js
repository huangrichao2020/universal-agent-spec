(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '39-swe-bench',
    order: 39,

    nav:      { en: 'Benchmarks', zh: '评测基准' },
    title:    { en: '<span class="accent">Benchmarks</span>', zh: '<span class="accent">评测基准</span>' },
    subtitle: { en: 'SWE-bench Verified · GAIA · WebArena', zh: 'SWE-bench Verified · GAIA · WebArena' },
    tag:      { en: 'System', zh: '系统' },
    tagClass: 'tag-system',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      let svg = '';

      svg += S.timeline(100, 92, 560, [
        { label: t(lang, 'Benchmark', 'Benchmark'), sub: t(lang, 'task set', '任务集') },
        { label: t(lang, 'Run', 'Run'), sub: t(lang, 'tools + budget', '工具 + 预算') },
        { label: t(lang, 'Score', 'Score'), sub: t(lang, 'headline metric', '指标结果') },
        { label: t(lang, 'Analyze', 'Analyze'), sub: t(lang, 'failure clusters', '失败聚类') },
      ], S.c.red);

      svg += S.box(64, 156, 160, 52, S.c.cyan,
        t(lang, 'Coding', '编程'),
        'SWE-bench');
      svg += S.box(300, 156, 160, 52, S.c.green,
        t(lang, 'General Assist', '通用助理'),
        'GAIA');
      svg += S.box(536, 156, 160, 52, S.c.purple,
        t(lang, 'Web Tasks', '网页任务'),
        'WebArena');

      svg += S.label(380, 274,
        t(lang, 'A benchmark score is a measurement, not a warranty. You still need private evals and production replay.',
                'Benchmark 分数是测量值，不是保修单。你仍然需要私有评测和生产回放。'),
        S.c.textDim, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, public benchmark numbers have become unavoidable in agent discussions, but serious teams no longer confuse them with production readiness. The best groups use benchmarks as comparability tools, then combine them with private replay sets, safety regressions, and workflow-specific evals to understand what a score actually means.',
        definition: 'An agent benchmark is a <strong>standardized task set plus execution rules and scoring criteria</strong> used to compare systems. SWE-bench Verified, GAIA, and WebArena each probe different slices of agent capability.',
        essence: `<strong>SWE-bench Verified:</strong> grounded in real software engineering tasks, making it one of the clearest signals for coding agents. But even here, run settings matter: tool access, patch constraints, compute budget, and harness shape all affect results.\n\n<strong>GAIA:</strong> broader real-world assistant tasks stress reasoning, retrieval, and tool use across heterogeneous knowledge problems.\n\n<strong>WebArena:</strong> web task benchmarks expose browser interaction, state tracking, and recovery behavior in UI-heavy environments.\n\n<strong>Benchmark != production:</strong> benchmarks are proxies. They are valuable because they are repeatable and public, but they almost never mirror your exact tools, data freshness, policies, or user tolerance for failure.\n\n<strong>Overfitting risk:</strong> once a benchmark becomes famous, teams start tuning toward it. Prompt hacks, harness tricks, or task-specific heuristics can inflate the score without improving the general product.\n\n<strong>Use a benchmark portfolio:</strong> a public benchmark, a private replay set, safety regressions, and representative end-to-end tasks together tell a much truer story than any single leaderboard.\n\n<strong>Real cases:</strong> <a href="https://www.swebench.com" target="_blank" rel="noreferrer">SWE-bench</a> has become the reference point for coding-agent comparison, while <a href="https://openai.com/blog" target="_blank" rel="noreferrer">OpenAI's public work</a> keeps showing how task environments and evaluation framing influence what headline numbers actually mean.`,
        insight: 'The most useful output of a benchmark run is often the failure cluster analysis, not the top-line score.',
        pitfalls: [
          'Treating one public benchmark as if it covered your full production workload.',
          'Comparing scores from runs that used different tools, budgets, or harnesses as though they were identical conditions.',
          'Optimizing for leaderboard movement while neglecting private regressions, safety drift, or user-facing latency.'
        ],
        furtherReading: [
          { title: 'SWE-bench', url: 'https://www.swebench.com' },
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '27-evaluation',
            reason: 'The evaluation chapter defines the discipline; this chapter zooms into the benchmark landscape and its limits.'
          },
          {
            chapterId: '28-coding-agents',
            reason: 'Coding agents are where benchmark numbers are most visible, especially around SWE-bench.'
          },
          {
            chapterId: '29-case-studies',
            reason: 'Case studies remind you where public benchmarks stop and domain-specific success criteria begin.'
          }
        ],
        code: `<span class="cmt"># Run: python3 score_portfolio.py</span>
scores = {<span class="str">'swebench'</span>: <span class="str">0.46</span>, <span class="str">'gaia'</span>: <span class="str">0.58</span>, <span class="str">'webarena'</span>: <span class="str">0.33</span>}
weights = {<span class="str">'swebench'</span>: <span class="str">0.5</span>, <span class="str">'gaia'</span>: <span class="str">0.3</span>, <span class="str">'webarena'</span>: <span class="str">0.2</span>}

portfolio = sum(scores[name] * weights[name] <span class="kw">for</span> name <span class="kw">in</span> scores)
<span class="kw">print</span>(round(portfolio, <span class="str">3</span>))`,
        table: {
          title: 'Benchmark landscape',
          headers: ['Benchmark', 'Domain', 'Strength', 'Blind spot'],
          rows: [
            ['SWE-bench Verified', 'Coding', 'Executable engineering tasks', 'Not all software workflows'],
            ['GAIA', 'General assistant', 'Broad reasoning + tool use', 'Less code-specific'],
            ['WebArena', 'Web interaction', 'Browser state + UI control', 'Synthetic web setup'],
            ['Private replay set', 'Your product', 'Closest to reality', 'Not publicly comparable'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，公开 benchmark 分数已经成了 Agent 讨论里绕不开的语言，但严肃团队早就不再把它和生产就绪混为一谈。最强的团队会先利用 benchmark 获得可比性，再叠加私有回放集、安全回归和工作流专属评测，去理解这个分数到底意味着什么。',
        definition: 'Agent benchmark 是由<strong>标准化任务集、运行规则和打分标准</strong>组成的比较工具。SWE-bench Verified、GAIA 和 WebArena 分别测到了不同切面的 Agent 能力。',
        essence: `<strong>SWE-bench Verified：</strong>基于真实软件工程任务，所以它对编程 Agent 尤其有代表性。但即便如此，运行条件仍然决定结果：工具权限、补丁约束、计算预算和 harness 形状都会影响分数。\n\n<strong>GAIA：</strong>覆盖更广的真实助理型任务，强调异构知识问题上的推理、检索和工具使用能力。\n\n<strong>WebArena：</strong>网页任务 benchmark 会暴露浏览器交互、状态跟踪和 UI 环境下的恢复行为。\n\n<strong>Benchmark 不等于生产：</strong>benchmark 是代理指标。它们有价值，因为可重复、可公开比较；但它们几乎从不精确映射你的真实工具、数据新鲜度、策略限制和用户容错阈值。\n\n<strong>过拟合风险：</strong>一旦 benchmark 变得有名，团队就会开始朝它调优。提示词技巧、harness 花招或任务特化 heuristics 都可能抬高分数，却不提升真实产品能力。\n\n<strong>用组合而不是单点：</strong>公开 benchmark、私有回放集、安全回归和代表性端到端任务放在一起，才会比任何单一 leaderboard 更接近真相。\n\n<strong>真实案例：</strong><a href="https://www.swebench.com" target="_blank" rel="noreferrer">SWE-bench</a> 已经成为编程 Agent 对比的参考锚点，而 <a href="https://openai.com/blog" target="_blank" rel="noreferrer">OpenAI 的公开工作</a> 也不断提醒我们：任务环境和评测 framing 会直接影响 headline 分数的解释方式。`,
        insight: '一次 benchmark run 最有价值的产出，很多时候不是总分，而是失败簇分析。',
        pitfalls: [
          '把某一个公开 benchmark 当成自己整个生产工作负载的替代品。',
          '不同工具、预算、harness 跑出来的分数混在一起比，仿佛它们在同样条件下得到。',
          '只盯 leaderboard 波动，却忽略私有回归、安全漂移和用户可感知延迟。'
        ],
        furtherReading: [
          { title: 'SWE-bench', url: 'https://www.swebench.com' },
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '27-evaluation',
            reason: '第 27 章定义了评测这门纪律，而本章进一步放大到 benchmark 全景及其局限。'
          },
          {
            chapterId: '28-coding-agents',
            reason: '编程 Agent 是 benchmark 分数最被公开讨论的领域，尤其是 SWE-bench。'
          },
          {
            chapterId: '29-case-studies',
            reason: '案例章节会提醒你：公开 benchmark 到此为止，而领域专属成功标准才刚开始。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 score_portfolio.py</span>
scores = {<span class="str">'swebench'</span>: <span class="str">0.46</span>, <span class="str">'gaia'</span>: <span class="str">0.58</span>, <span class="str">'webarena'</span>: <span class="str">0.33</span>}
weights = {<span class="str">'swebench'</span>: <span class="str">0.5</span>, <span class="str">'gaia'</span>: <span class="str">0.3</span>, <span class="str">'webarena'</span>: <span class="str">0.2</span>}

portfolio = sum(scores[name] * weights[name] <span class="kw">for</span> name <span class="kw">in</span> scores)
<span class="kw">print</span>(round(portfolio, <span class="str">3</span>))`,
        table: {
          title: 'Benchmark 全景',
          headers: ['基准', '领域', '优势', '盲区'],
          rows: [
            ['SWE-bench Verified', '编程', '可执行的软件工程任务', '不覆盖全部软件流程'],
            ['GAIA', '通用助理', '推理 + 工具使用覆盖广', '对代码不够聚焦'],
            ['WebArena', '网页交互', '浏览器状态 + UI 控制', '仍是合成环境'],
            ['私有回放集', '你的产品', '最贴近真实', '无法公开可比'],
          ]
        }
      }
    }
  });
})();
