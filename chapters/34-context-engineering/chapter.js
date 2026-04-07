(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '34-context-engineering',
    order: 34,

    nav:      { en: 'Context Eng', zh: '上下文工程' },
    title:    { en: 'Context <span class="accent">Engineering</span>', zh: '上下文 <span class="accent">工程</span>' },
    subtitle: { en: 'Prompt Budget · Compression · Retrieval Injection', zh: 'Prompt Budget · Compression · Retrieval Injection' },
    tag:      { en: 'Pattern', zh: '模式' },
    tagClass: 'tag-pattern',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      let svg = '';

      svg += S.timeline(90, 92, 580, [
        { label: t(lang, 'Prompt', 'Prompt'), sub: t(lang, 'base task', '基础任务') },
        { label: t(lang, 'Compress', 'Compress'), sub: t(lang, 'summaries', '摘要压缩') },
        { label: t(lang, 'Inject', 'Inject'), sub: t(lang, 'retrieve slices', '检索片段') },
        { label: t(lang, 'Generate', 'Generate'), sub: t(lang, 'bounded output', '受限生成') },
      ], S.c.cyan);

      svg += S.box(54, 145, 150, 52, S.c.amber,
        t(lang, 'Full Text', '全文塞入'),
        t(lang, 'works when small', '仅适合小语料'));
      svg += S.box(305, 145, 150, 52, S.c.green,
        t(lang, 'Working Summary', '工作摘要'),
        t(lang, 'keep decisions', '保留关键决策'));
      svg += S.box(556, 145, 150, 52, S.c.purple,
        t(lang, 'RAG Slice', 'RAG 片段'),
        t(lang, 'just-in-time', '按需注入'));

      svg += S.label(380, 255,
        t(lang, 'Context engineering is budget allocation: what stays resident, what gets compressed, and what is fetched on demand.',
                '上下文工程本质上是预算分配：哪些常驻，哪些压缩，哪些按需取回。'),
        S.c.textDim, 10);
      svg += S.label(380, 275,
        t(lang, 'The strongest agents do not stuff everything into the window; they curate the window every turn.',
                '最强的 Agent 不是把一切塞进窗口，而是每一轮都主动整理窗口。'),
        S.c.red, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, context engineering has become more important than prompt cleverness. Long-running coding agents, research agents, and operator systems all hit the same limit: the context window is expensive, finite, and easy to poison with stale or irrelevant material. Teams that manage context deliberately often outperform teams that simply buy larger models.',
        definition: 'Context engineering is the discipline of deciding <strong>what enters the model context, in what format, and at what moment</strong>. It is prompt construction plus compression, retrieval, and state curation under a strict token budget.',
        essence: `<strong>Prompt is only the first layer:</strong> the base instructions and user task matter, but they are just the opening allocation. Real agent systems then decide what prior work to summarize, which memory artifacts to reload, and which external documents to inject only when needed.\n\n<strong>Compression:</strong> long histories should not be replayed verbatim forever. Mature systems distill them into compact working summaries that preserve decisions, assumptions, unresolved questions, and next steps. Good compression keeps operational state while dropping narration.\n\n<strong>Retrieval injection:</strong> RAG is one tool inside context engineering, not the whole field. Retrieval shines when the source corpus is large and only a few slices are relevant. The hard part is ranking the right evidence and keeping noisy matches out.\n\n<strong>RAG vs full text:</strong> if the source is short, stable, and critical, full text may be better than retrieval. If the source is large, changing, or weakly relevant, selective injection wins. Most production agents use a hybrid: compact resident state + fetched evidence + a few raw artifacts.\n\n<strong>Real cases:</strong> <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code</a> popularized compaction and focused file loading in long coding sessions, while <a href="https://www.anthropic.com/engineering" target="_blank" rel="noreferrer">Anthropic engineering writing</a> repeatedly shows that strong agents succeed by curating context, not by keeping every trace resident forever.`,
        insight: 'A better context pack often beats a stronger model. Reducing ambiguity, duplication, and stale state improves reasoning quality more reliably than adding more raw tokens.',
        pitfalls: [
          'Replaying entire transcripts and repositories on every turn. Bigger context windows do not remove the need for selection.',
          'Compressing aggressively but dropping the decisions and constraints that actually govern the next step.',
          'Treating RAG as automatically helpful. Low-quality retrieval often pollutes the window more than it helps.'
        ],
        furtherReading: [
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' }
        ],
        crossRefs: [
          {
            chapterId: '01b-memory-files',
            reason: 'Memory files are one durable source that context engineering can summarize, reload, and trim across turns.'
          },
          {
            chapterId: '24-memory-arch',
            reason: 'Context engineering decides what to inject now; memory architecture decides where the longer-lived state resides.'
          },
          {
            chapterId: '28-coding-agents',
            reason: 'Coding agents make context pressure obvious because repository state, diffs, logs, and plans compete for the same window.'
          }
        ],
        code: `<span class="cmt"># Run: python3 pack_context.py</span>
budget = <span class="str">900</span>
chunks = [
    (<span class="str">'system'</span>, <span class="str">180</span>),
    (<span class="str">'task'</span>, <span class="str">140</span>),
    (<span class="str">'summary'</span>, <span class="str">120</span>),
    (<span class="str">'repo_notes'</span>, <span class="str">210</span>),
    (<span class="str">'full_logs'</span>, <span class="str">500</span>),
]

packed = []
used = <span class="str">0</span>

<span class="kw">for</span> name, cost <span class="kw">in</span> chunks:
    <span class="kw">if</span> used + cost > budget:
        <span class="kw">continue</span>
    packed.append(name)
    used += cost

<span class="kw">print</span>({<span class="str">'packed'</span>: packed, <span class="str">'used'</span>: used, <span class="str">'left'</span>: budget - used})`,
        table: {
          title: 'Context strategies',
          headers: ['Strategy', 'Best for', 'Strength', 'Risk'],
          rows: [
            ['Full text', 'Small critical docs', 'Maximum fidelity', 'Window blow-up'],
            ['Compression', 'Long running state', 'Cheap continuity', 'Loses detail if poor'],
            ['Retrieval', 'Large corpora', 'High relevance per token', 'Noise if ranking is weak'],
            ['Hybrid', 'Production agents', 'Balanced budget', 'More moving parts'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，Context Engineering 已经比“写一句更巧的 prompt”更重要。长程编码 Agent、研究 Agent 和操作型 Agent 都撞上了同一个限制：上下文窗口昂贵、有限，而且非常容易被陈旧或无关材料污染。能主动管理上下文的团队，往往比单纯买更大模型的团队表现更好。',
        definition: 'Context Engineering 是一门决定<strong>什么信息进入模型上下文、以什么格式进入、在什么时刻进入</strong>的工程学。它不仅包含 prompt 编写，还包含压缩、检索和在严格 token 预算下的状态整理。',
        essence: `<strong>Prompt 只是第一层：</strong>基础指令和用户任务固然重要，但那只是初始预算分配。真正的 Agent 系统还要继续决定：哪些历史工作要总结、哪些记忆载体要回装、哪些外部文档只在需要时才注入。\n\n<strong>压缩：</strong>长历史不能永远全文重放。成熟系统会把它们蒸馏成紧凑的工作摘要，保留关键决策、假设、未解问题和下一步。好的压缩保留的是“操作状态”，而不是叙事废话。\n\n<strong>检索注入：</strong>RAG 只是 Context Engineering 里的一个工具，不是全部。检索适合大语料里只有少量片段真正相关的场景，难点在于排到正确证据，并把噪音挡在窗口外。\n\n<strong>RAG vs 全文：</strong>如果源材料很短、很稳定、又极度关键，全文塞入可能比检索更好；如果材料很大、变化快或相关性弱，选择性注入更优。生产系统通常是混合式：压缩后的常驻状态 + 按需抓取的证据 + 少量原始关键件。\n\n<strong>真实案例：</strong><a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code</a> 把长会话里的压缩和聚焦文件加载变成常见实践，而 <a href="https://www.anthropic.com/engineering" target="_blank" rel="noreferrer">Anthropic 工程文章</a> 也反复说明：真正强的 Agent 胜在整理上下文，而不是把所有痕迹永久常驻。`,
        insight: '更好的上下文打包，很多时候比更强的模型更有效。减少歧义、重复和陈旧状态，往往比单纯塞更多 token 更稳定地提升推理质量。',
        pitfalls: [
          '每一轮都重放完整对话和整个仓库。上下文窗口变大了，也不代表你可以放弃选择。',
          '为了压缩而压缩，却把真正约束下一步的决策和边界条件一起丢掉。',
          '把 RAG 当成天然增益。低质量检索往往比没有检索更容易污染窗口。'
        ],
        furtherReading: [
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' }
        ],
        crossRefs: [
          {
            chapterId: '01b-memory-files',
            reason: '记忆文件是上下文工程可摘要、可回装、可裁剪的一类持久来源。'
          },
          {
            chapterId: '24-memory-arch',
            reason: '上下文工程解决“这一轮该注入什么”，记忆架构解决“长期状态该存在哪里”。'
          },
          {
            chapterId: '28-coding-agents',
            reason: '编码 Agent 会把上下文压力暴露得最明显，因为仓库状态、diff、日志和计划都在争抢同一个窗口。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 pack_context.py</span>
budget = <span class="str">900</span>
chunks = [
    (<span class="str">'system'</span>, <span class="str">180</span>),
    (<span class="str">'task'</span>, <span class="str">140</span>),
    (<span class="str">'summary'</span>, <span class="str">120</span>),
    (<span class="str">'repo_notes'</span>, <span class="str">210</span>),
    (<span class="str">'full_logs'</span>, <span class="str">500</span>),
]

packed = []
used = <span class="str">0</span>

<span class="kw">for</span> name, cost <span class="kw">in</span> chunks:
    <span class="kw">if</span> used + cost > budget:
        <span class="kw">continue</span>
    packed.append(name)
    used += cost

<span class="kw">print</span>({<span class="str">'packed'</span>: packed, <span class="str">'used'</span>: used, <span class="str">'left'</span>: budget - used})`,
        table: {
          title: '上下文策略对比',
          headers: ['策略', '适合场景', '优势', '风险'],
          rows: [
            ['全文塞入', '小而关键的文档', '保真度最高', '窗口迅速爆炸'],
            ['压缩摘要', '长程状态', '连续性便宜', '做得差会丢细节'],
            ['检索注入', '大语料', '单位 token 相关性高', '排序弱时噪音大'],
            ['混合式', '生产 Agent', '预算更平衡', '系统更复杂'],
          ]
        }
      }
    }
  });
})();
