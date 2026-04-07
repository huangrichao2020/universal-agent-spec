(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '37-cost-routing',
    order: 37,

    nav:      { en: 'Cost Routing', zh: '成本路由' },
    title:    { en: 'Cost <span class="accent">Routing</span>', zh: '成本 <span class="accent">路由</span>' },
    subtitle: { en: 'Cache · Cheap Model · Expensive Model', zh: 'Cache · Cheap Model · Expensive Model' },
    tag:      { en: 'Pattern', zh: '模式' },
    tagClass: 'tag-pattern',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      let svg = '';

      svg += S.box(48, 130, 120, 52, S.c.cyan,
        t(lang, 'Request', '请求'),
        t(lang, 'task + budget', '任务 + 预算'));
      svg += S.arrow(168, 156, 288, 156, S.c.cyan);

      svg += S.box(288, 130, 160, 52, S.c.amber,
        t(lang, 'Router', '路由器'),
        t(lang, 'cache / risk / confidence', '缓存 / 风险 / 置信度'));

      svg += S.arrow(448, 156, 598, 90, S.c.green,
        t(lang, 'hit', '命中'));
      svg += S.arrow(448, 156, 598, 156, S.c.purple,
        t(lang, 'easy', '简单'));
      svg += S.arrow(448, 156, 598, 222, S.c.red,
        t(lang, 'hard', '复杂'));

      svg += S.box(572, 58, 140, 48, S.c.green,
        t(lang, 'Cache', '缓存'),
        t(lang, 'semantic / exact', '语义 / 精确'));
      svg += S.box(572, 132, 140, 48, S.c.purple,
        t(lang, 'Cheap Model', '便宜模型'),
        t(lang, 'gate / classify', '把关 / 分类'));
      svg += S.box(572, 206, 140, 48, S.c.red,
        t(lang, 'Expensive Model', '昂贵模型'),
        t(lang, 'reason / recover', '推理 / 兜底'));

      svg += S.label(380, 286,
        t(lang, 'The cheapest successful path is usually cache -> small model -> strong model, not strong model every time.',
                '最便宜且可成功的路径通常是 cache -> 小模型 -> 强模型，而不是每次都直接上强模型。'),
        S.c.textDim, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, cost control in agent systems is no longer an optimization after launch. It is part of the architecture from day one. Long-running coding agents, research pipelines, and support agents all learned the same lesson: if every step uses the strongest model, you will hit a cost wall before you hit product-market fit.',
        definition: 'Cost routing is the practice of <strong>sending each request to the cheapest path that can still meet the quality bar</strong>, usually by combining caches, smaller models, larger models, and escalation rules.',
        essence: `<strong>Routing is more than model choice:</strong> the first branch is often not "cheap model vs expensive model" but "cache vs compute." If a request is repetitive or semantically similar to prior work, a cache can answer faster and cheaper than any model call.\n\n<strong>Cascaded routing:</strong> many systems first ask a cheap model to classify intent, estimate difficulty, or perform a narrow extraction. Only uncertain, high-risk, or failed cases escalate to the stronger model.\n\n<strong>Risk-sensitive upgrades:</strong> cost routing should account for failure cost, not just token cost. A support summary can be cheap. A code migration plan, payment action, or security review may deserve a stronger model earlier.\n\n<strong>Semantic cache:</strong> exact string caches help, but the bigger win is caching based on meaning or prior resolved states. The key is invalidation: caches must expire when tools, data, or policies change.\n\n<strong>Real cases:</strong> <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noreferrer">Anthropic's agent guidance</a> keeps returning to simplicity and composability, while <a href="https://openai.com/blog" target="_blank" rel="noreferrer">OpenAI's product work</a> shows that stronger models are best used where planning, recovery, or ambiguity actually justify the spend.`,
        insight: 'The goal is not to minimize model size. The goal is to minimize cost per successful outcome.',
        pitfalls: [
          'Optimizing only for per-call cost while ignoring the downstream cost of failures, retries, and human cleanup.',
          'Routing without an evaluation set. If thresholds are not measured, teams end up guessing where to escalate.',
          'Building a cache with no invalidation strategy, which turns yesterday\'s answer into today\'s bug.'
        ],
        furtherReading: [
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' },
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' }
        ],
        crossRefs: [
          {
            chapterId: '10-light-heavy',
            reason: 'Light vs heavy models is the conceptual precursor; cost routing operationalizes that choice per request.'
          },
          {
            chapterId: '15-plan-execute',
            reason: 'Plan-and-execute is a concrete routing pattern: strong planner, cheaper executor, selective re-planning.'
          },
          {
            chapterId: '27-evaluation',
            reason: 'You cannot tune routing thresholds responsibly without evaluation data on quality, cost, and latency.'
          }
        ],
        code: `<span class="cmt"># Run: python3 route_cost.py</span>
<span class="kw">def</span> route(cache_hit, risk, confidence):
    <span class="kw">if</span> cache_hit:
        <span class="kw">return</span> <span class="str">'cache'</span>
    <span class="kw">if</span> risk == <span class="str">'low'</span> <span class="kw">and</span> confidence >= <span class="str">0.85</span>:
        <span class="kw">return</span> <span class="str">'cheap-model'</span>
    <span class="kw">return</span> <span class="str">'expensive-model'</span>

task = {<span class="str">'cache_hit'</span>: <span class="kw">False</span>, <span class="str">'risk'</span>: <span class="str">'low'</span>, <span class="str">'confidence'</span>: <span class="str">0.91</span>}
<span class="kw">print</span>(route(task[<span class="str">'cache_hit'</span>], task[<span class="str">'risk'</span>], task[<span class="str">'confidence'</span>]))`,
        table: {
          title: 'Routing stages',
          headers: ['Stage', 'Use it when', 'Why'],
          rows: [
            ['Cache', 'Request is repetitive', 'Zero or near-zero marginal cost'],
            ['Cheap model', 'Task is narrow or low risk', 'Fast gating and extraction'],
            ['Expensive model', 'Task is ambiguous or costly to fail', 'Better reasoning and recovery'],
            ['Human escalation', 'Residual risk remains high', 'Bound irreversible mistakes'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，Agent 系统里的成本控制已经不是上线后的附加优化，而是从第一天就要写进架构里的约束。长程编码 Agent、研究流水线和支持型 Agent 都学到了同一个教训：如果每一步都调用最强模型，你会先撞上成本墙，再谈不上产品市场匹配。',
        definition: 'Cost Routing 是指把每个请求都送到<strong>满足质量门槛的最便宜路径</strong>上，通常通过缓存、小模型、大模型和升级规则组合实现。',
        essence: `<strong>路由不只是选模型：</strong>第一层分支往往不是“便宜模型还是昂贵模型”，而是“先查缓存还是直接计算”。如果请求高度重复或与历史结果语义相近，缓存会比任何模型调用都更快、更便宜。\n\n<strong>级联路由：</strong>很多系统会先让便宜模型做意图分类、难度估计或窄任务抽取。只有不确定、高风险或已经失败的情况，才升级到更强模型。\n\n<strong>按风险升级：</strong>成本路由不能只看 token 成本，还要看失败成本。客服摘要可以走便宜路径；代码迁移计划、支付动作或安全审查，往往应该更早进入强模型。\n\n<strong>语义缓存：</strong>精确字符串缓存当然有用，但更大的收益来自按语义或按“已解决状态”缓存。难点在于失效策略：只要工具、数据或策略变化，缓存就必须过期。\n\n<strong>真实案例：</strong><a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noreferrer">Anthropic 的 Agent 指南</a>反复强调简单与可组合，而 <a href="https://openai.com/blog" target="_blank" rel="noreferrer">OpenAI 的产品工作</a> 也说明：真正值得高价模型出手的，是规划、恢复和高歧义任务，而不是一切请求。`,
        insight: '目标不是把模型尺寸压到最低，而是把“每个成功结果的成本”压到最低。',
        pitfalls: [
          '只优化单次调用成本，却忽略失败、重试和人工收尾带来的总成本。',
          '没有评测集就调路由阈值，最后只能凭感觉猜哪里该升级。',
          '做了缓存却没有失效机制，结果把昨天的答案变成今天的 bug。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' },
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' }
        ],
        crossRefs: [
          {
            chapterId: '10-light-heavy',
            reason: '轻模型 vs 重模型是概念前置，而成本路由把这个选择细化到每一次请求。'
          },
          {
            chapterId: '15-plan-execute',
            reason: 'Plan-and-Execute 本身就是一种具体路由模式：强规划器、便宜执行器、按需重规划。'
          },
          {
            chapterId: '27-evaluation',
            reason: '没有质量、成本和延迟评测数据，就不可能负责任地调好路由阈值。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 route_cost.py</span>
<span class="kw">def</span> route(cache_hit, risk, confidence):
    <span class="kw">if</span> cache_hit:
        <span class="kw">return</span> <span class="str">'cache'</span>
    <span class="kw">if</span> risk == <span class="str">'low'</span> <span class="kw">and</span> confidence >= <span class="str">0.85</span>:
        <span class="kw">return</span> <span class="str">'cheap-model'</span>
    <span class="kw">return</span> <span class="str">'expensive-model'</span>

task = {<span class="str">'cache_hit'</span>: <span class="kw">False</span>, <span class="str">'risk'</span>: <span class="str">'low'</span>, <span class="str">'confidence'</span>: <span class="str">0.91</span>}
<span class="kw">print</span>(route(task[<span class="str">'cache_hit'</span>], task[<span class="str">'risk'</span>], task[<span class="str">'confidence'</span>]))`,
        table: {
          title: '路由层级',
          headers: ['阶段', '什么时候用', '原因'],
          rows: [
            ['缓存', '请求高度重复', '边际成本接近零'],
            ['便宜模型', '任务窄且低风险', '适合快速把关和抽取'],
            ['昂贵模型', '任务歧义高或失败代价高', '推理和恢复能力更强'],
            ['人工升级', '残余风险仍高', '约束不可逆错误'],
          ]
        }
      }
    }
  });
})();
