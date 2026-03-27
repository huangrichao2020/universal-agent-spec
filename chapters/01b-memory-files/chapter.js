(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '01b-memory-files',
    order: 1.5,

    nav:      { en: 'Memory Files',   zh: '记忆文件' },
    title:    { en: 'Memory <span class="accent">Files</span>', zh: '记忆 <span class="accent">文件</span>' },
    subtitle: { en: 'Why invented · Token cost · Context window matters', zh: '为什么被发明 · Token 消耗 · 上下文容量为何关键' },
    tag:      { en: 'Core Concept',   zh: '核心概念' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 310',

    getSvg(lang) {
      const files = [
        ['#ff4d6d', t(lang, 'persona.md',   '人格定义.md'),   t(lang, 'Who am I?',  '我是谁？')],
        ['#00c8ff', t(lang, 'knowledge.md', '行业记忆.md'),   t(lang, 'What I know','我知道什么')],
        ['#ffb800', t(lang, 'skill_A.md',   'skill_A.md'),    t(lang, 'How I act',  '我怎么做')],
        ['#00e599', t(lang, 'worklog.md',   '工作日志.md'),   t(lang, 'What I did', '我做了什么')],
        ['#a78bfa', t(lang, 'handoff.md',   '交接手册.md'),   t(lang, 'Where I am', '我在哪里')],
      ];

      const cards = files.map(([c, name, desc], i) => {
        const x = 38 + i * 140;
        return `
          <rect x="${x}" y="20" width="122" height="66" rx="5" fill="${c}12" stroke="${c}" stroke-width="1.5"/>
          <rect x="${x}" y="20" width="122" height="20" rx="5" fill="${c}28" stroke="none"/>
          <text x="${x+61}" y="35" text-anchor="middle" fill="${c}" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="500">${name}</text>
          <text x="${x+61}" y="62" text-anchor="middle" fill="${c}99" font-family="'JetBrains Mono',monospace" font-size="9">${desc}</text>
          <line x1="${x+61}" y1="86" x2="${x+61}" y2="108" stroke="${c}44" stroke-width="1.2" stroke-dasharray="3 2"/>
        `;
      }).join('');

      return `
        ${cards}

        <rect x="150" y="108" width="460" height="38" rx="5" fill="#1e3058" stroke="#2a4578" stroke-width="1.5"/>
        <text x="380" y="123" text-anchor="middle" fill="#6b84a8" font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'UI program: memory files + task → context window → LLM', 'UI 界面程序：记忆文件 + 当前任务 → 打包成 context window')}
        </text>
        <text x="380" y="138" text-anchor="middle" fill="#6b84a888" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Every token in memory = cost on every single invocation', '记忆文件里每一个 token，每次调用都要付费')}
        </text>

        <line x1="380" y1="146" x2="380" y2="162" stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>

        <text x="40" y="176" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Context window grows with memory:', 'Context Window 随记忆增长：')}
        </text>

        <rect x="40" y="182" width="110" height="18" rx="3" fill="#00c8ff22" stroke="#00c8ff" stroke-width="1"/>
        <text x="48" y="195" fill="#00c8ff" font-family="'JetBrains Mono',monospace" font-size="8">~2K tokens</text>
        <text x="158" y="195" fill="#00c8ff88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Day 1 · small memory · cheap call', '第1天 · 记忆少 · 便宜')}
        </text>

        <rect x="40" y="206" width="480" height="18" rx="3" fill="#ff4d6d22" stroke="#ff4d6d" stroke-width="1"/>
        <text x="48" y="219" fill="#ff4d6d" font-family="'JetBrains Mono',monospace" font-size="8">~80K tokens</text>
        <text x="528" y="219" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, '6 months · rich memory · 50x cost', '6个月后 · 记忆丰富 · 成本涨50倍')}
        </text>

        <line x1="380" y1="226" x2="380" y2="244" stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>

        <rect x="100" y="244" width="560" height="44" rx="5" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="380" y="262" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="500">
          ${t(lang, 'Richer memory → bigger context needed → choosing the right model becomes critical',
                   '记忆越丰富 → 需要的 context 越大 → 选对大模型越关键')}
        </text>
        <text x="380" y="278" text-anchor="middle" fill="#a78bfa88" font-family="'JetBrains Mono',monospace" font-size="9">
          Claude 200K · Gemini 1M · GPT-4o 128K · GLM-4 128K · Qwen-Long 1M
        </text>

        ${S.label(380, 306,
          t(lang, 'More memory = smarter Agent, higher cost per call — design carefully',
                  '记忆越多 = Agent 越聪明，每次调用成本越高 — 需要精心设计'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'Memory files are plain text documents (usually Markdown) that define an Agent\'s identity, knowledge, skills, and history. <strong>They are the only thing that gives an Agent continuity — and every word in them costs tokens on every single call.</strong>',

        essence: 'The LLM API is stateless — it forgets everything the moment a call ends. Memory files solve this: <em>instead of the model holding state, the files hold state.</em> The UI program reads memory files, packs them with the current task, and sends the whole bundle as the context window. The model wakes up knowing who it is and what it was doing.\n\n<strong>But here\'s the cost trap nobody warns you about:</strong> every token in your memory files is sent — and paid for — on every single invocation. A fresh Agent with 2K tokens of memory costs almost nothing per call. OpenClaw after 6 months of trading history? 60–100K tokens loaded every time. That\'s a 50× cost increase — unavoidable if you want the Agent to actually be that knowledgeable.\n\n<strong>This is why context window size matters enormously.</strong> Complex tasks — analyzing an entire codebase, reviewing a legal contract, running a multi-step research workflow — require holding massive amounts of information in context simultaneously. If the model\'s context window is too small, you must either truncate memory (losing expertise) or split the task (losing coherence). Neither works well.\n\n<strong>OpenClaw example:</strong> built on GLM-4 (128K context). Its memory includes A-share trading methodology, sector rotation rules, stock pool, AKShare/Tushare/东方财富妙想 skill files, and 6 months of trade decisions — all loaded on every invocation. This is exactly why the team chose GLM-4: the memory alone fills a large portion of the context window.',

        insight: 'Memory is not free. Every line you add to a memory file is a line you pay for on every call, forever. The art of Agent design is knowing <strong>what to remember and what to compress</strong> — keeping context lean without losing the expertise that makes the Agent valuable.',

        tokenSaving: {
          title: 'How engineers fight the token bill — memory optimization techniques',
          headers: ['Technique', 'How it works', 'Trade-off'],
          rows: [
            ['<strong>Memory summarization</strong>', 'Periodically compress worklog entries: replace 100 lines of raw history with a 5-line summary. A nightly job rewrites old logs into dense abstracts.', 'Lossy — fine detail is gone forever'],
            ['<strong>Tiered loading</strong>', 'Split memory into "hot" (always loaded) and "cold" (loaded only when relevant). Persona + current skills = hot. Old work history = cold, loaded on demand.', 'Requires smart retrieval logic'],
            ['<strong>RAG (Retrieval-Augmented)</strong>', 'Store the full knowledge base in a vector database. Each call retrieves only the most relevant chunks based on the current task. No full-file loading.', 'Retrieval can miss context; setup cost'],
            ['<strong>Structured compression</strong>', 'Replace prose paragraphs with tightly formatted YAML/JSON. "The user prefers concise replies" → `style: concise`. 70% fewer tokens, same meaning.', 'Harder to read and maintain'],
            ['<strong>Sliding window</strong>', 'Only keep the most recent N turns of worklog. Entries older than 30 days are archived and never loaded unless explicitly requested.', 'Agent loses older context entirely'],
            ['<strong>Cheap model for summary</strong>', 'Use a cheap model (Haiku / GLM-Flash) to compress memory every night. Use the flagship model only for real work. A 100× cost difference makes this very worthwhile.', 'Summary quality depends on the cheap model'],
          ]
        }

        table: {
          title: 'Which model for which task — context window guide',
          headers: ['Task type', 'Context needed', 'Recommended model', 'Why'],
          rows: [
            ['Simple Q&A, single-turn chat',             '&lt; 8K',  'GPT-4o mini / Haiku / GLM-4-Flash',   'Fast, cheap, context is more than enough'],
            ['Agent with light memory (~10 skills)',      '8–32K',   'GPT-4o / GLM-4 / Claude Sonnet',       'Best cost-performance balance'],
            ['Agent with rich memory (6mo+ history)',     '32–128K', 'Claude Sonnet 3.5 / GLM-4 / GPT-4o',   'Must fit all memory + task in one shot'],
            ['Full codebase analysis / long doc review',  '100K+',   'Claude 3.5 Sonnet (200K) / Gemini 1.5','Only these models have enough headroom'],
            ['Entire repo + multi-step research workflow','500K+',   'Gemini 1.5 Pro (1M) / Qwen-Long (1M)', 'Million-token context — nothing else works'],
          ]
        }
      },

      zh: {
        definition: '记忆文件是一组纯文本文档（通常是 Markdown），定义了 Agent 的身份、知识、技能和历史。<strong>它们是 Agent 跨调用保持持续性的唯一载体——文件里的每一个字，每次调用都要付费。</strong>',

        essence: '大模型 API 是无状态的——调用结束就忘得一干二净。记忆文件为此而生：<em>与其让模型持有状态，不如让文件持有状态。</em>UI 界面程序读取记忆文件，和当前任务打包成 context window 发给大模型，模型"醒来"就知道自己是谁、在做什么。\n\n<strong>但这里有个没人警告你的成本陷阱：</strong>记忆文件里的每一个 token，在每次调用时都被发送、都要付费。刚创建的 Agent 只有 2K token 的记忆，每次调用几乎不花钱。但 OpenClaw 运行 6 个月后，交易历史、方法论、股票池加起来可能 60~100K token，每次调用成本是初始的 50 倍——无法避免，因为这些记忆正是它聪明的来源。\n\n<strong>这就是为什么上下文容量极其重要。</strong>复杂任务——分析整个代码仓库、审查长篇合同、执行多步骤研究工作流——需要同时在上下文中持有海量信息。如果模型的 context window 不够大，只能二选一：截断记忆（损失专业能力）或拆分任务（损失连贯性）。两个都是坏选择。\n\n<strong>OpenClaw 真实案例：</strong>基于 GLM-4（128K 上下文）构建。其记忆包含 A 股交易方法论、板块轮动规则、股票池、AKShare/Tushare/东方财富妙想 Skill 文件，以及 6 个月的交易决策日志，每次调用全部加载。这正是团队选择 GLM-4 的原因——光记忆文件就占满了大部分上下文窗口。',

        insight: '记忆不是免费的。你往记忆文件里加的每一行，都是你每次调用永远要付的成本。Agent 设计的艺术在于：<strong>知道什么值得记忆，什么应该摘要压缩</strong>——在保持上下文精简的同时，不丢失让 Agent 有价值的专业能力。',

        tokenSaving: {
          title: '工程师为节省 Token 做了哪些努力 — 记忆优化方法论',
          headers: ['方法', '具体做法', '代价'],
          rows: [
            ['<strong>记忆摘要压缩</strong>', '定期对工作日志做压缩：把 100 行原始记录提炼成 5 行摘要。用定时任务（每晚）把旧日志重写成高密度摘要。', '有损压缩 — 细节永久丢失'],
            ['<strong>冷热分层加载</strong>', '把记忆分为"热记忆"（每次必加载：人格 + 当前 Skill）和"冷记忆"（按需加载：历史工作日志）。只在任务相关时才加载冷记忆。', '需要设计智能检索逻辑'],
            ['<strong>RAG 向量检索</strong>', '把完整知识库存入向量数据库，每次调用只检索与当前任务最相关的片段注入上下文，不再整文件加载。', '检索可能遗漏关键上下文，建设成本高'],
            ['<strong>结构化压缩</strong>', '把散文段落改成紧凑的 YAML/JSON 格式。"用户偏好简洁回复" → `style: concise`。同等语义减少 70% token。', '可读性变差，维护成本上升'],
            ['<strong>滑动窗口截断</strong>', '工作日志只保留最近 N 条记录，30 天前的存档不加载，除非被明确请求。', 'Agent 彻底失去旧上下文'],
            ['<strong>便宜模型做摘要</strong>', '用廉价模型（Haiku / GLM-Flash）每晚自动压缩记忆文件，旗舰模型只做正式工作。两者成本相差 100 倍，极为划算。', '摘要质量依赖便宜模型的能力'],
          ]
        }

        table: {
          title: '做什么事，选什么模型 — 上下文容量参考',
          headers: ['任务类型', '需要的上下文', '推荐模型', '原因'],
          rows: [
            ['简单问答、单轮对话',                '< 8K',    'GPT-4o mini / Haiku / GLM-4-Flash',   '便宜快速，上下文绰绰有余'],
            ['带轻量记忆的 Agent（~10个Skill）',  '8–32K',  'GPT-4o / GLM-4 / Claude Sonnet',       '成本与能力的最佳平衡点'],
            ['带丰富记忆的 Agent（6个月历史）',   '32–128K','Claude Sonnet 3.5 / GLM-4 / GPT-4o',   '需要一次性装下全部记忆 + 任务'],
            ['整个代码库分析 / 长文档审查',       '100K+',  'Claude 3.5 Sonnet（200K）/ Gemini 1.5','只有这些模型有足够空间'],
            ['完整仓库 + 多步骤研究工作流',       '500K+',  'Gemini 1.5 Pro（1M）/ Qwen-Long（1M）','百万 token 上下文，其他模型做不到'],
          ]
        }
      }
    }
  });
})();
