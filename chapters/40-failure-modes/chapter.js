(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '40-failure-modes',
    order: 40,

    nav:      { en: 'Failure Modes', zh: '失败模式' },
    title:    { en: '<span class="accent">Failure</span> Modes', zh: '<span class="accent">失败</span> 模式' },
    subtitle: { en: 'Loop · Hallucinated Tool · Context Rot · Stale State', zh: 'Loop · Hallucinated Tool · Context Rot · Stale State' },
    tag:      { en: 'System', zh: '系统' },
    tagClass: 'tag-system',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      const states = [
        { label: t(lang, 'Loop', '循环'), col: S.c.red, angle: -90 },
        { label: t(lang, 'Fake Tool', '幻觉工具'), col: S.c.amber, angle: 0 },
        { label: t(lang, 'Ctx Rot', '上下文腐化'), col: S.c.purple, angle: 90 },
        { label: t(lang, 'Stale', '状态过期'), col: S.c.green, angle: 180 },
      ];

      const transitions = [
        { from: 0, to: 2, label: t(lang, 'repeats', '重复') },
        { from: 2, to: 1, label: t(lang, 'guess', '猜测') },
        { from: 1, to: 3, label: t(lang, 'bad action', '错误动作') },
        { from: 3, to: 0, label: t(lang, 'retry', '重试') },
      ];

      let svg = '';
      svg += S.stateMachine(380, 150, 90, states, transitions);
      svg += S.label(380, 284,
        t(lang, 'Strong systems make failures visible, bounded, and recoverable.',
                '强系统的关键不是“绝不失败”，而是让失败可见、可控、可恢复。'),
        S.c.textDim, 10);
      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, the most useful agent teams spend less time arguing whether agents fail and more time classifying how they fail. Once you have long tasks, tools, browsers, and subagents, failure becomes a systems property: loops, stale world models, context decay, tool hallucinations, and unsafe retries all recur in recognizable patterns.',
        definition: 'Failure modes are the <strong>recurring ways an agent system degrades or breaks under real execution conditions</strong>. Naming them matters because detection, prevention, and recovery differ by failure class.',
        essence: `<strong>Looping:</strong> the agent keeps repeating the same action or reasoning pattern without making progress. Usually caused by weak stop conditions, bad tool observations, or unclear success checks.\n\n<strong>Hallucinated tool use:</strong> the model invents a tool, tool argument, or environmental capability that does not exist. Strong schemas and runtime validation turn this from a silent failure into a visible one.\n\n<strong>Context rot:</strong> the run continues, but the working context gets diluted by stale, duplicated, or irrelevant material. The agent still looks active, yet its decisions become less grounded over time.\n\n<strong>Stale state:</strong> checkpoints, assumptions, or external facts expire while the run is paused. Resuming from outdated state often causes bad retries or duplicate side effects.\n\n<strong>Recovery principles:</strong> detect early, cap damage, restore from the last trustworthy state, and escalate to a human when confidence is low. The goal is not zero failure; it is failure that stays legible.\n\n<strong>Real cases:</strong> <a href="https://www.anthropic.com/engineering" target="_blank" rel="noreferrer">Anthropic engineering writing</a> and <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noreferrer">agent design guidance</a> both point to the same truth: the strongest production systems are the ones that recognize and contain failure patterns rather than hiding them.`,
        insight: 'Your first production skill is not making the agent succeed. It is making the agent fail obviously.',
        pitfalls: [
          'Treating every failure as a model-quality problem instead of checking whether the trace reveals a specific systems failure mode.',
          'Letting retries run without guardrails, which turns a small mistake into an expensive loop.',
          'Collecting logs but not building failure taxonomies, so incidents repeat with new names each week.'
        ],
        furtherReading: [
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' },
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' }
        ],
        crossRefs: [
          {
            chapterId: '25-observability',
            reason: 'You cannot classify failure modes if traces, events, and state transitions are not visible.'
          },
          {
            chapterId: '26-guardrails',
            reason: 'Guardrails are the first containment layer when failure starts heading toward unsafe actions.'
          },
          {
            chapterId: '34-context-engineering',
            reason: 'Context rot is best understood as a context-engineering failure, not just a reasoning failure.'
          }
        ],
        code: `<span class="cmt"># Run: python3 detect_failure.py</span>
trace = [<span class="str">'tool:search'</span>, <span class="str">'tool:search'</span>, <span class="str">'tool:search'</span>]
tool_exists = <span class="kw">True</span>
context_tokens = <span class="str">92000</span>
budget = <span class="str">80000</span>

<span class="kw">if</span> len(set(trace[-3:])) == <span class="str">1</span>:
    <span class="kw">print</span>(<span class="str">'loop'</span>)
<span class="kw">elif</span> <span class="kw">not</span> tool_exists:
    <span class="kw">print</span>(<span class="str">'hallucinated-tool'</span>)
<span class="kw">elif</span> context_tokens > budget:
    <span class="kw">print</span>(<span class="str">'context-rot'</span>)
<span class="kw">else</span>:
    <span class="kw">print</span>(<span class="str">'inspect-trace'</span>)`,
        table: {
          title: 'Failure mode map',
          headers: ['Failure mode', 'Signal', 'Prevention', 'Recovery'],
          rows: [
            ['Loop', 'Repeated steps, no new state', 'Step caps + progress checks', 'Interrupt and re-plan'],
            ['Hallucinated tool', 'Unknown tool or invalid args', 'Schema validation', 'Reject and regenerate'],
            ['Context rot', 'Long noisy context, drifting decisions', 'Compaction + retrieval hygiene', 'Rebuild working summary'],
            ['Stale state', 'Assumption no longer matches reality', 'Checkpoint freshness checks', 'Re-verify world before continue'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，真正做 Agent 的团队已经不再争论“Agent 会不会失败”，而是更关心“它会以哪几种方式失败”。只要系统里有长任务、工具、浏览器和子 Agent，失败就会变成一种系统属性：循环、世界模型过期、上下文衰败、工具幻觉和危险重试都会以可识别的模式反复出现。',
        definition: 'Failure Modes 是指 Agent 系统在真实执行条件下<strong>反复出现的退化或崩坏方式</strong>。把它们命名出来很重要，因为不同 failure class 的识别、预防和恢复手段完全不同。',
        essence: `<strong>Loop：</strong>Agent 一直重复同样动作或同样思路，却没有产生真正进展。常见原因是 stop condition 太弱、工具观测质量差，或成功标准不清楚。\n\n<strong>Hallucinated Tool：</strong>模型编造了不存在的工具、参数或环境能力。强 schema 和运行时校验，可以把它从“静默失败”变成“显性失败”。\n\n<strong>Context Rot：</strong>任务还在继续，但工作上下文已经被陈旧、重复或无关材料稀释。Agent 看起来很活跃，可决策依据却越来越不可靠。\n\n<strong>Stale State：</strong>checkpoint、假设或外部事实在暂停期间过期了。基于过期状态恢复，往往会触发错误重试或重复副作用。\n\n<strong>恢复原则：</strong>及早识别、尽快限损、从最后一个可信状态恢复，并在置信度不足时升级到人工。目标不是零失败，而是让失败始终可读、可解释。\n\n<strong>真实案例：</strong><a href="https://www.anthropic.com/engineering" target="_blank" rel="noreferrer">Anthropic 工程文章</a>和<a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noreferrer">Agent 设计指南</a>都指向同一事实：真正强的生产系统，不是把失败藏起来，而是能识别并收束失败模式。`,
        insight: '你的第一个生产级能力，不是让 Agent 永远成功，而是让 Agent 的失败显而易见。',
        pitfalls: [
          '把所有失败都归因于“模型不够强”，而不去检查 trace 里是否已经暴露出明确的系统性 failure mode。',
          '在没有护栏的情况下任由重试继续，把一个小错误放大成昂贵循环。',
          '虽然保留了日志，却没有形成失败分类法，结果同一种事故每周都以新名字重复上演。'
        ],
        furtherReading: [
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' },
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' }
        ],
        crossRefs: [
          {
            chapterId: '25-observability',
            reason: '如果 trace、事件和状态转换都不可见，就不可能正确给 failure mode 分类。'
          },
          {
            chapterId: '26-guardrails',
            reason: '当失败开始朝危险动作演化时，Guardrail 是第一层限损机制。'
          },
          {
            chapterId: '34-context-engineering',
            reason: 'Context Rot 更适合被理解为上下文工程失败，而不只是推理失败。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 detect_failure.py</span>
trace = [<span class="str">'tool:search'</span>, <span class="str">'tool:search'</span>, <span class="str">'tool:search'</span>]
tool_exists = <span class="kw">True</span>
context_tokens = <span class="str">92000</span>
budget = <span class="str">80000</span>

<span class="kw">if</span> len(set(trace[-3:])) == <span class="str">1</span>:
    <span class="kw">print</span>(<span class="str">'loop'</span>)
<span class="kw">elif</span> <span class="kw">not</span> tool_exists:
    <span class="kw">print</span>(<span class="str">'hallucinated-tool'</span>)
<span class="kw">elif</span> context_tokens > budget:
    <span class="kw">print</span>(<span class="str">'context-rot'</span>)
<span class="kw">else</span>:
    <span class="kw">print</span>(<span class="str">'inspect-trace'</span>)`,
        table: {
          title: '失败模式图谱',
          headers: ['失败模式', '信号', '预防', '恢复'],
          rows: [
            ['循环', '重复步骤、没有新状态', '步数上限 + 进展检查', '中断并重规划'],
            ['幻觉工具', '未知工具或非法参数', 'Schema 校验', '拒绝后重生成'],
            ['上下文腐化', '长上下文噪音过多、决策漂移', '压缩 + 检索卫生', '重建工作摘要'],
            ['状态过期', '假设不再匹配现实', 'checkpoint 新鲜度检查', '继续前重新验证世界'],
          ]
        }
      }
    }
  });
})();
