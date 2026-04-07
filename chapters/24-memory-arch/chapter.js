(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '24-memory-arch',
    order: 24,
    nav:      { en: 'Memory Architecture', zh: '记忆架构' },
    title:    { en: 'Memory <span class="accent">Architecture</span>', zh: '记忆 <span class="accent">架构</span>' },
    subtitle: { en: 'Five Memory Types · Vector · Graph · Hybrid', zh: '五种记忆类型 · 向量 · 图 · 混合' },
    tag:      { en: 'Core Concept',    zh: '核心概念' },
    tagClass: 'tag-core',
    viewBox: '0 0 760 300',
    getSvg(lang) {
      const types = [
        { x: 40,  color: '#0071e3', name: t(lang, 'Short-term', '短期'), sub: t(lang, 'Context window', '上下文窗口') },
        { x: 190, color: '#ffb800', name: t(lang, 'Working', '工作'), sub: t(lang, 'Scratchpad', '草稿本') },
        { x: 340, color: '#ff4d6d', name: t(lang, 'Episodic', '情景'), sub: t(lang, 'Past experiences', '过往经历') },
        { x: 490, color: '#1a8a3a', name: t(lang, 'Semantic', '语义'), sub: t(lang, 'Facts & relations', '事实与关系') },
        { x: 640, color: '#a78bfa', name: t(lang, 'Procedural', '程序'), sub: t(lang, 'Skills & rules', '技能与规则') },
      ];
      let svg = '';
      types.forEach(m => {
        svg += S.box(m.x, 20, 110, 44, m.color, m.name, m.sub);
      });

      // Storage technologies
      svg += `
        <rect x="40" y="90" width="320" height="65" rx="5" fill="#ff4d6d08" stroke="#ff4d6d80" stroke-width="1"/>
        <text x="200" y="108" text-anchor="middle" fill="#ff4d6d" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Vector DB', '向量数据库')}
        </text>
        <text x="55" y="125" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, '+ Fast semantic search', '+ 快速语义搜索')}
        </text>
        <text x="55" y="140" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, '- Weak at relations & time', '- 弱于关系和时间推理')}
        </text>
      `;
      svg += `
        <rect x="400" y="90" width="320" height="65" rx="5" fill="#1a8a3a08" stroke="#1a8a3a80" stroke-width="1"/>
        <text x="560" y="108" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Knowledge Graph', '知识图谱')}
        </text>
        <text x="415" y="125" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, '+ Entity relations & temporal', '+ 实体关系和时间推理')}
        </text>
        <text x="415" y="140" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, '- Complex to maintain', '- 维护复杂')}
        </text>
      `;

      // Hybrid
      svg += `
        <rect x="150" y="175" width="460" height="50" rx="5" fill="#a78bfa12" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="380" y="195" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="11" font-weight="600">
          ${t(lang, 'Hybrid Architecture (State of the Art)', '混合架构（当前最优）')}
        </text>
        <text x="380" y="215" text-anchor="middle" fill="#a78bfa88" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Vector (fast retrieval) + Graph (relationships) + SQL (structured state)',
                  '向量（快速检索）+ 图（关系）+ SQL（结构化状态）')}
        </text>
      `;

      // Consolidation arrow
      svg += `
        ${S.arrow(380, 155, 380, 175, '#6b84a8', t(lang, 'Consolidation', '巩固'))}
      `;

      svg += S.label(380, 250,
        t(lang, 'Start simple: context buffer + basic vector. Add graph only when entity relations become a bottleneck.',
                '从简单开始：上下文缓冲 + 基础向量。仅当实体关系成为瓶颈时才加图。'),
        '#6b84a8', 10);
      svg += S.label(380, 270,
        t(lang, 'Episodic-to-Semantic consolidation: raw experiences → distilled knowledge (like human sleep)',
                '情景到语义巩固：原始经历 → 提炼知识（如同人类睡眠）'),
        '#a78bfa', 10);
      svg += S.label(380, 290,
        t(lang, 'The memory file approach (Ch 1.1) IS the practical implementation of this architecture',
                '记忆文件方法（第 1.1 章）就是这个架构的实践落地'),
        '#ff4d6d', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Agent memory architecture defines <strong>five types of memory</strong> (short-term, working, episodic, semantic, procedural) and the <strong>storage technologies</strong> (vector DB, knowledge graph, hybrid) that implement them.',
        essence: '<strong>Five memory types:</strong>\n\n1. <em>Short-term</em> — The current context window. Resets each API call. 128k-200k+ tokens in frontier models.\n2. <em>Working</em> — Explicit scratchpads for multi-step planning. Agent writes intermediate results here.\n3. <em>Episodic</em> — Records of past experiences, timestamped. "What happened in the last debugging session?" Stored in vector DBs.\n4. <em>Semantic</em> — Structured facts: entities, relations, rules. "User prefers TypeScript." Stored in knowledge graphs.\n5. <em>Procedural</em> — Learned skills and behaviors. Embedded in system prompts or retrieved procedures. Our "Skill files."\n\n<strong>Storage technologies:</strong>\n— <em>Vector DB</em> (Pinecone, Chroma, Weaviate): Fast semantic search via embeddings. Struggles with temporal reasoning and entity relationships.\n— <em>Knowledge Graph</em> (Neo4j, Zep/Graphiti): Explicit entity-relation-time modeling. Complex to maintain.\n— <em>Hybrid</em> (state of the art): Vector for fast retrieval + Graph for relationships + SQL for structured state.\n\n<strong>Consolidation pattern:</strong> After sessions, a background process distills raw episodic memory into structured semantic knowledge. This mirrors human memory consolidation during sleep.',
        insight: 'Memory is the moat. Two agents with the same model and tools but different memory will perform vastly differently. The memory file approach from Chapter 1.1 IS the practical implementation of this architecture — persona.md = procedural, knowledge.md = semantic, worklog.md = episodic, handoff.md = working memory.',
        perspective2026: 'By 2026, memory design is less about storing more and more about deciding what deserves to be written, refreshed, compressed, or forgotten. The strongest agent systems treat memory as a governed data pipeline: selective writes, retrieval ranking, periodic consolidation, and rollback paths when bad memory contaminates future runs.',
        pitfalls: [
          'Treating conversation history as durable memory. Raw transcripts are not the same thing as curated state or reusable knowledge.',
          'Putting every memory problem into a vector database. Relationship-heavy, temporal, and workflow state often need graph or structured storage.',
          'Writing unverified outputs back into long-term memory. Bad writes compound quickly and can make future runs confidently wrong.'
        ],
        furtherReading: [
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Reflexion: Language Agents with Verbal Reinforcement Learning', url: 'https://arxiv.org/abs/2303.11366' },
          { title: 'Pydantic AI agents concepts', url: 'https://docs.pydantic.dev/latest/concepts/agents/' }
        ],
        crossRefs: [
          {
            chapterId: '01b-memory',
            reason: 'This chapter provides the practical file-based memory foundation that maps directly onto the broader memory architecture described here.'
          },
          {
            chapterId: '23-graph-orchestration',
            reason: 'Long-running graph workflows depend on explicit working memory, checkpoint state, and controlled write-back patterns.'
          },
          {
            chapterId: '27-evaluation',
            reason: 'Memory systems need evaluation because retrieval quality, write quality, and memory pollution directly shape agent reliability.'
          }
        ],
        table: {
          title: 'Memory type to storage mapping',
          headers: ['Memory Type', 'Answers', 'Storage', 'Growth Pattern'],
          rows: [
            ['Short-term', 'What\'s happening now?',  'Context window',  'Resets each call'],
            ['Working',    'What\'s my plan?',        'Scratchpad / file','Updated each session'],
            ['Episodic',   'What happened before?',   'Vector DB',       'Appended over time'],
            ['Semantic',   'What do I know?',         'Knowledge Graph', 'Distilled from episodes'],
            ['Procedural', 'How do I do this?',       'System prompt / skill files', 'Added per capability'],
          ]
        }
      },
      zh: {
        definition: 'Agent 记忆架构定义了<strong>五种记忆类型</strong>（短期、工作、情景、语义、程序）和实现它们的<strong>存储技术</strong>（向量库、知识图谱、混合）。',
        essence: '<strong>五种记忆类型：</strong>\n\n1. <em>短期</em>——当前上下文窗口。每次 API 调用重置。前沿模型 128k-200k+ Token。\n2. <em>工作</em>——用于多步规划的显式草稿本。Agent 在这里写中间结果。\n3. <em>情景</em>——过往经历的记录，带时间戳。"上次调试会话发生了什么？"存在向量库中。\n4. <em>语义</em>——结构化事实：实体、关系、规则。"用户偏好 TypeScript。"存在知识图谱中。\n5. <em>程序</em>——习得的技能和行为。嵌入系统提示词或检索到的操作流程。即我们的"Skill 文件"。\n\n<strong>存储技术：</strong>\n— <em>向量库</em>（Pinecone、Chroma、Weaviate）：通过嵌入向量快速语义检索。弱于时间推理和实体关系。\n— <em>知识图谱</em>（Neo4j、Zep/Graphiti）：显式的实体-关系-时间建模。维护复杂。\n— <em>混合</em>（当前最优）：向量做快速检索 + 图做关系 + SQL 做结构化状态。\n\n<strong>巩固模式：</strong>会话结束后，后台进程将原始情景记忆提炼为结构化语义知识。这模拟了人类睡眠中的记忆巩固。',
        insight: '记忆是护城河。两个使用相同模型和工具但记忆不同的 Agent，表现会天差地别。第 1.1 章的记忆文件方法就是这个架构的实践落地——persona.md = 程序记忆，knowledge.md = 语义记忆，worklog.md = 情景记忆，handoff.md = 工作记忆。',
        perspective2026: '到了 2026 年，记忆设计的重点已经不再是“能存多少”，而是“什么值得写入、何时刷新、何时压缩、何时遗忘”。最强的 Agent 系统把记忆当作一条受治理的数据管道：选择性写入、检索排序、周期性巩固，以及当错误记忆污染未来运行时的回滚路径。',
        pitfalls: [
          '把聊天记录直接当成长期记忆。原始对话并不等于经过筛选的状态，也不等于可复用知识。',
          '把所有记忆问题都塞进向量库。关系密集、带时间属性或工作流状态的数据，往往更适合图或结构化存储。',
          '把未经验证的输出直接写回长期记忆。错误写入会快速复利，让后续运行越来越自信地犯错。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Reflexion 论文', url: 'https://arxiv.org/abs/2303.11366' },
          { title: 'Pydantic AI Agents 概念文档', url: 'https://docs.pydantic.dev/latest/concepts/agents/' }
        ],
        crossRefs: [
          {
            chapterId: '01b-memory',
            reason: '本章描述的广义记忆架构，与第 1.1 章的文件型记忆实践是一一对应的落地关系。'
          },
          {
            chapterId: '23-graph-orchestration',
            reason: '长程图工作流依赖明确的工作记忆、检查点状态和受控写回策略。'
          },
          {
            chapterId: '27-evaluation',
            reason: '记忆系统必须被评估，因为检索质量、写入质量和记忆污染会直接决定 Agent 可靠性。'
          }
        ],
        table: {
          title: '记忆类型与存储映射',
          headers: ['记忆类型', '回答的问题', '存储方式', '增长模式'],
          rows: [
            ['短期', '现在发生什么？',   '上下文窗口',           '每次调用重置'],
            ['工作', '我的计划是什么？', '草稿本/文件',          '每次会话更新'],
            ['情景', '之前发生了什么？', '向量数据库',           '随时间追加'],
            ['语义', '我知道什么？',     '知识图谱',             '从情景中提炼'],
            ['程序', '我怎么做？',       '系统提示词/Skill 文件','按能力新增'],
          ]
        }
      }
    }
  });
})();
