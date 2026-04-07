(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '38-agent-harness',
    order: 38,

    nav:      { en: 'Agent Harness', zh: 'Agent 外壳' },
    title:    { en: 'Agent <span class="accent">Harness</span>', zh: 'Agent <span class="accent">外壳</span>' },
    subtitle: { en: 'Claude Code · Codex · Cursor Agent · Devin', zh: 'Claude Code · Codex · Cursor Agent · Devin' },
    tag:      { en: 'Business', zh: '商业' },
    tagClass: 'tag-biz',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      const cards = [
        { x: 30,  color: S.c.cyan,   name: 'Claude Code', sub: t(lang, 'terminal-native', '终端原生') },
        { x: 210, color: S.c.purple, name: 'Codex',       sub: t(lang, 'cloud sandbox', '云沙箱') },
        { x: 390, color: S.c.green,  name: 'Cursor Agent',sub: t(lang, 'IDE native', 'IDE 原生') },
        { x: 570, color: S.c.red,    name: 'Devin',       sub: t(lang, 'full runtime', '完整运行时') },
      ];

      let svg = '';
      cards.forEach((card) => {
        svg += S.box(card.x, 56, 160, 60, card.color, card.name, card.sub);
      });

      svg += S.label(110, 170, t(lang, 'shell + repo', 'shell + 仓库'), S.c.cyan, 10);
      svg += S.label(290, 170, t(lang, 'task runner', '任务执行器'), S.c.purple, 10);
      svg += S.label(470, 170, t(lang, 'editor loop', '编辑器回路'), S.c.green, 10);
      svg += S.label(650, 170, t(lang, 'browser + IDE', '浏览器 + IDE'), S.c.red, 10);

      svg += S.label(380, 248,
        t(lang, 'Harness determines what the model can see, touch, and recover from.',
                'Harness 决定了模型能看到什么、能触达什么、失败后如何恢复。'),
        S.c.textDim, 10);
      svg += S.label(380, 270,
        t(lang, 'The product difference is often execution surface and review loop, not just model quality.',
                '产品差异很多时候来自执行表面和 review loop，而不只是模型质量。'),
        S.c.red, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, users compare agent products less by raw model branding and more by the harness around the model. Terminal-native, IDE-native, cloud-sandbox, and full-runtime products each feel like different species because the harness decides context access, tool reach, approval flow, and how gracefully the system recovers from failure.',
        definition: 'An agent harness is the <strong>execution envelope around the model</strong>: UI surface, tool access, sandbox, persistence model, review flow, and autonomy controls. It is what turns a model into a usable product.',
        essence: `<strong>Why harness matters:</strong> the same reasoning model behaves very differently in an IDE tab, a terminal, a cloud batch runner, or a browser-plus-IDE runtime. Harness design decides what the model can inspect, how it acts, and how a human supervises it.\n\n<strong>Claude Code:</strong> terminal-native, close to the repository, shell tools, and explicit review discipline. Strong for debugging and deep engineering tasks where humans stay near the loop.\n\n<strong>Codex:</strong> sandboxed task execution emphasizes bounded work, reproducibility, and separation from the developer's live machine. Strong when teams want task isolation and batched change generation.\n\n<strong>Cursor Agent:</strong> IDE-native interaction keeps edits close to the editor loop. Fast for iterative coding, short feedback cycles, and human-in-the-middle refinement.\n\n<strong>Devin:</strong> fuller runtime environments push autonomy further by combining browser, terminal, and coding surfaces. That increases task independence, but it also raises the importance of checkpointing, observability, and trust boundaries.\n\n<strong>Real cases:</strong> <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code docs</a> expose the terminal-native harness shape clearly, while <a href="https://openai.com/blog" target="_blank" rel="noreferrer">OpenAI's coding and agent work</a> highlights sandboxed execution as a product boundary rather than a mere implementation detail.`,
        insight: 'A slightly weaker model in the right harness can outperform a stronger model in the wrong harness because execution surface and review ergonomics dominate real productivity.',
        pitfalls: [
          'Comparing products only by model name or benchmark score while ignoring tool reach, review UX, and failure recovery.',
          'Using a high-autonomy harness for tiny interactive edits where a fast IDE loop would be cheaper and better.',
          'Ignoring the security model. More autonomy without stronger sandboxing is not maturity; it is just more blast radius.'
        ],
        furtherReading: [
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' },
          { title: 'SWE-bench', url: 'https://www.swebench.com' }
        ],
        crossRefs: [
          {
            chapterId: '28-coding-agents',
            reason: 'The coding-agent chapter compares the category; this chapter isolates the execution harness as the real differentiator.'
          },
          {
            chapterId: '35-long-horizon-tasks',
            reason: 'Harness differences become obvious on long tasks because checkpointing and resume quality vary widely.'
          },
          {
            chapterId: '36-sandboxing',
            reason: 'Autonomy comparisons are incomplete unless you also compare the sandbox and permission model that contain each harness.'
          }
        ],
        code: `<span class="cmt"># Run: python3 pick_harness.py</span>
harnesses = {
    <span class="str">'terminal'</span>: {<span class="str">'interactive'</span>: <span class="kw">False</span>, <span class="str">'browser'</span>: <span class="kw">False</span>, <span class="str">'sandbox'</span>: <span class="kw">True</span>},
    <span class="str">'ide'</span>: {<span class="str">'interactive'</span>: <span class="kw">True</span>, <span class="str">'browser'</span>: <span class="kw">False</span>, <span class="str">'sandbox'</span>: <span class="kw">False</span>},
    <span class="str">'full-runtime'</span>: {<span class="str">'interactive'</span>: <span class="kw">False</span>, <span class="str">'browser'</span>: <span class="kw">True</span>, <span class="str">'sandbox'</span>: <span class="kw">True</span>},
}

task = {<span class="str">'needs_browser'</span>: <span class="kw">True</span>, <span class="str">'needs_live_review'</span>: <span class="kw">False</span>}

choice = <span class="str">'full-runtime'</span> <span class="kw">if</span> task[<span class="str">'needs_browser'</span>] <span class="kw">else</span> <span class="str">'ide'</span>
<span class="kw">print</span>(choice, harnesses[choice])`,
        table: {
          title: 'Harness comparison',
          headers: ['Harness', 'Primary surface', 'Environment', 'Autonomy pattern', 'Best for'],
          rows: [
            ['Claude Code', 'Terminal', 'Local repo + shell', 'Human-nearby autonomy', 'Debugging, deep refactors'],
            ['Codex', 'Task runner', 'Sandboxed execution', 'Bounded batch work', 'Isolated coding tasks'],
            ['Cursor Agent', 'IDE', 'Editor-native', 'Interactive loop', 'Daily coding assistance'],
            ['Devin', 'Browser + IDE', 'Full runtime', 'Longer independent runs', 'Defined end-to-end tasks'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，用户比较 Agent 产品时，越来越少只看底层模型品牌，越来越多看模型外面的 harness。终端原生、IDE 原生、云沙箱和完整运行时之所以像四个物种，是因为 harness 决定了上下文可见范围、工具触达面、审批流以及系统失败后的恢复方式。',
        definition: 'Agent Harness 是包在模型外侧的<strong>执行包络</strong>：UI 表面、工具访问、沙箱、持久化模型、review 流和自主性控制。它才是把模型变成产品的那一层。',
        essence: `<strong>为什么 harness 重要：</strong>同一个推理模型，放在 IDE 标签页、终端、云端批处理 runner 或浏览器 + IDE 一体运行时里，行为会完全不同。Harness 设计决定了模型能检查什么、怎么动手，以及人类如何监督。\n\n<strong>Claude Code：</strong>终端原生，离仓库、shell 工具和人工 review 都很近。特别适合调试和深度工程任务，人类通常贴着回路工作。\n\n<strong>Codex：</strong>沙箱化任务执行更强调边界清晰、结果可复现，以及和开发者真实机器分离。适合需要任务隔离、批量产出改动的团队。\n\n<strong>Cursor Agent：</strong>IDE 原生交互让改动紧贴编辑器回路。适合高频短反馈、交互式编码和人机共编。\n\n<strong>Devin：</strong>更完整的运行时把浏览器、终端和编码表面组合在一起，把自主性推得更远；与此同时，checkpoint、可观测性和信任边界也变得更重要。\n\n<strong>真实案例：</strong><a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code 文档</a> 很清楚地展示了终端原生 harness 的形状，而 <a href="https://openai.com/blog" target="_blank" rel="noreferrer">OpenAI 的编码 / Agent 工作</a> 也说明：沙箱执行是产品边界，不只是实现细节。`,
        insight: '一个稍弱一点的模型，只要放进更合适的 harness，完全可能比放错场景的更强模型更高效，因为真正支配生产力的往往是执行表面和 review 体验。',
        pitfalls: [
          '只按模型名或 benchmark 分数比较产品，却忽略工具触达面、review UX 和失败恢复能力。',
          '把高自主 harness 用在很小的交互式编辑任务上，结果成本更高、反馈更慢。',
          '忽略安全模型。自主性更强但沙盒更弱，并不叫成熟，只叫更大的爆炸半径。'
        ],
        furtherReading: [
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' },
          { title: 'SWE-bench', url: 'https://www.swebench.com' }
        ],
        crossRefs: [
          {
            chapterId: '28-coding-agents',
            reason: '第 28 章比较的是编程 Agent 这个类别，而本章把真正拉开差距的 harness 单独拆出来看。'
          },
          {
            chapterId: '35-long-horizon-tasks',
            reason: '一到长任务，checkpoint 和 resume 做得好不好，harness 之间的差异就会非常明显。'
          },
          {
            chapterId: '36-sandboxing',
            reason: '如果不比较沙箱和权限模型，只谈自主性高低，其实是不完整的。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 pick_harness.py</span>
harnesses = {
    <span class="str">'terminal'</span>: {<span class="str">'interactive'</span>: <span class="kw">False</span>, <span class="str">'browser'</span>: <span class="kw">False</span>, <span class="str">'sandbox'</span>: <span class="kw">True</span>},
    <span class="str">'ide'</span>: {<span class="str">'interactive'</span>: <span class="kw">True</span>, <span class="str">'browser'</span>: <span class="kw">False</span>, <span class="str">'sandbox'</span>: <span class="kw">False</span>},
    <span class="str">'full-runtime'</span>: {<span class="str">'interactive'</span>: <span class="kw">False</span>, <span class="str">'browser'</span>: <span class="kw">True</span>, <span class="str">'sandbox'</span>: <span class="kw">True</span>},
}

task = {<span class="str">'needs_browser'</span>: <span class="kw">True</span>, <span class="str">'needs_live_review'</span>: <span class="kw">False</span>}

choice = <span class="str">'full-runtime'</span> <span class="kw">if</span> task[<span class="str">'needs_browser'</span>] <span class="kw">else</span> <span class="str">'ide'</span>
<span class="kw">print</span>(choice, harnesses[choice])`,
        table: {
          title: 'Harness 对比',
          headers: ['Harness', '主要表面', '环境', '自主模式', '适合场景'],
          rows: [
            ['Claude Code', '终端', '本地仓库 + shell', '人类贴近回路', '调试、深度重构'],
            ['Codex', '任务执行器', '沙箱执行', '边界清晰的批处理', '隔离编码任务'],
            ['Cursor Agent', 'IDE', '编辑器原生', '交互式回路', '日常编码协助'],
            ['Devin', '浏览器 + IDE', '完整运行时', '更长时间独立运行', '定义清晰的端到端任务'],
          ]
        }
      }
    }
  });
})();
