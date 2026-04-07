(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '03-agent',
    order: 3,

    nav:      { en: 'Agent',       zh: 'Agent 智能体' },
    title:    { en: '<span class="accent">Agent</span>',  zh: '<span class="accent">Agent</span> 智能体' },
    subtitle: { en: 'Shell Program + Memory File Collection', zh: 'UI 界面程序 + 记忆文件集合' },
    tag:      { en: 'Core Concept', zh: '核心概念' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 295',

    getSvg(lang) {
      const memFiles = [
        ['#ff4d6d', t(lang, 'persona.md',   '人格定义.md'),   t(lang, 'who am I',       'who am I')],
        ['#0050a0', t(lang, 'knowledge.md', '行业记忆.md'),   t(lang, 'what I know',     'what I know')],
        ['#ffb800', t(lang, 'skill_A.md',   'skill_A.md'),    t(lang, 'what I can do',   'what I can do')],
        ['#1a8a3a', t(lang, 'worklog.md',   '工作日志.md'),   t(lang, 'what I did',      'what I did')],
        ['#a78bfa', t(lang, 'handoff.md',   '交接手册.md'),   t(lang, 'current state',   'current state')],
      ];

      const shellSteps = [
        t(lang, 'Read memory files', '读取记忆文件'),
        t(lang, 'Build API request', '构造 API 请求'),
        t(lang, 'Execute actions',   '执行返回动作'),
        t(lang, 'Update memory',     '更新记忆文件'),
      ];

      const memBoxes = memFiles.map(([c,n,s], i) => `
        <rect x="${303 + Math.floor(i/3)*200}" y="${110 + (i%3)*52}"
          width="178" height="40" rx="4" fill="${c}12" stroke="${c}30" stroke-width="1"/>
        <text x="${392 + Math.floor(i/3)*200}" y="${133 + (i%3)*52}"
          text-anchor="middle" fill="${c}"
          font-family="'JetBrains Mono',monospace" font-size="11">${n}</text>
        <text x="${392 + Math.floor(i/3)*200}" y="${148 + (i%3)*52}"
          text-anchor="middle" fill="${c}88"
          font-family="'JetBrains Mono',monospace" font-size="9">${s}</text>
      `).join('');

      const shellBoxes = shellSteps.map((step, i) => `
        <rect x="75" y="${108 + i*38}" width="152" height="28" rx="3"
          fill="#a78bfa12" stroke="#a78bfa30" stroke-width="1"/>
        <text x="151" y="${127 + i*38}" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="10">${step}</text>
      `).join('');

      return `
        <!-- Outer Agent boundary -->
        <rect x="38" y="24" width="688" height="252" rx="10"
          fill="#0050a008" stroke="#0050a0" stroke-width="2"/>
        <text x="380" y="18" text-anchor="middle" fill="#0050a0"
          font-family="'JetBrains Mono',monospace" font-size="12" font-weight="500">Agent</text>

        <!-- Shell program panel -->
        <rect x="58" y="48" width="185" height="212" rx="6"
          fill="#0d1526" stroke="#2a4578" stroke-width="1.5"/>
        <text x="151" y="74" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">
          ${t(lang, 'Shell Program', 'UI 界面程序')}
        </text>
        <text x="151" y="91" text-anchor="middle" fill="#a78bfa88"
          font-family="'JetBrains Mono',monospace" font-size="9">Shell Program</text>
        ${shellBoxes}

        <!-- Memory files panel -->
        <rect x="285" y="48" width="430" height="212" rx="6"
          fill="#0d1526" stroke="#2a4578" stroke-width="1.5"/>
        <text x="500" y="74" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">
          ${t(lang, 'Memory Files', '记忆文件集合')}
        </text>
        <text x="500" y="91" text-anchor="middle" fill="#ffb80088"
          font-family="'JetBrains Mono',monospace" font-size="9">Memory Files</text>
        ${memBoxes}
      `;
    },

    content: {
      en: {
        perspective2026: 'Over the last 12 months, "agent" has stopped meaning a prompt-wrapped chatbot and started meaning a bounded runtime that can coordinate tools, memory, approvals, retries, and specialist sub-agents. The important shift is architectural: the model is only one component inside the agent system.',
        definition: '<strong>Agent = Shell Program + Memory File Collection (including Skills).</strong> The shell program handles API calls; memory files provide continuity and specialized context. Neither works without the other.',
        essence: 'An Agent has three states:<br><br><strong>① Dormant:</strong> Just a pile of files, no consciousness — like a closed book.<br><strong>② Active:</strong> The shell program is triggered, bundles memory files + current task, sends to the LLM API. The Agent "temporarily wakes up," reasons, and acts.<br><strong>③ Archived:</strong> Results are written back to memory files. The Agent becomes dormant again.\n\n<em>Key insight:</em> An Agent is not "a living program." It is a combination of "files + invocation program." The LLM API produces the intelligence; the Agent provides <strong>continuity</strong> and <strong>specialized context</strong>.',
        insight: 'An Agent\'s most valuable asset is its <strong>domain memory</strong> — the knowledge, experiences, and patterns accumulated in a specific field. An Agent with 6 months of deep domain memory far outvalues any Prompt template. That is the real moat.',
        pitfalls: [
          'Reducing the Agent to a single model call. An invocation is only one step inside the system that actually carries state and execution logic.',
          'Shipping a chat UI and calling it an Agent without durable memory, tool use, or update loops.',
          'Optimizing for autonomy alone. Real agents need boundaries, approvals, retries, and observability to stay reliable.'
        ],
        furtherReading: [
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code Documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'OpenAI News', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '02-skill',
            reason: 'Skills are one of the memory assets that turn a generic runtime into a capable Agent.'
          },
          {
            chapterId: '04-shell',
            reason: 'The next chapter zooms into the shell program that activates the Agent, drives tools, and writes state back.'
          }
        ],
        table: {
          title: 'Agent Maturity Levels',
          headers: ['Level', 'Characteristics', 'Memory', 'Skills'],
          rows: [
            ['L0 Bare API', 'No memory, no Skills, starts from zero each call', '0', '0'],
            ['L1 Persona', 'Knows who it is, but no specialized capabilities', '~2K tokens', '0'],
            ['L2 Skilled', 'Handles specific tasks via structured procedures', '~10K tokens', '3–10'],
            ['L3 Memory', 'Remembers past work, accumulates experience', '~30K tokens', '10–30'],
            ['L4 Collab', 'Works with other Agents via workflows', '~50K tokens', '20–50'],
            ['L5 Evolving', 'Auto-creates/modifies Skills from experience', '~100K tokens', '50+'],
          ]
        },
        code: `<span class="cmt"># Production Agent = main + specialized SubAgents</span>
main_agent = <span class="fn">create_agent</span>(
    <span class="str">"system-agent"</span>,
    sub_agents=[
        SubAgent(<span class="str">"search"</span>,   tools=[<span class="str">"web_search"</span>, <span class="str">"web_crawl"</span>]),
        SubAgent(<span class="str">"document"</span>, tools=[<span class="str">"to_pdf"</span>, <span class="str">"to_pptx"</span>]),
        SubAgent(<span class="str">"code"</span>,     tools=[<span class="str">"sandbox"</span>, <span class="str">"code_gen"</span>]),
        SubAgent(<span class="str">"devops"</span>,   tools=[<span class="str">"deploy"</span>, <span class="str">"stop"</span>]),
        SubAgent(<span class="str">"fallback"</span>, tools=<span class="kw">REMAINING</span>),
    ],
    middleware=[
        <span class="fn">SkillSearchMiddleware</span>(),    <span class="cmt"># vector-match Skills</span>
        <span class="fn">MemoryMiddleware</span>(),         <span class="cmt"># load/save files</span>
        <span class="fn">ToolRetryMiddleware</span>(),      <span class="cmt"># auto-retry on fail</span>
        <span class="fn">ClarifyMiddleware</span>(),        <span class="cmt"># ask when unclear</span>
    ]
)`,

        instructions: {
          title: 'Essential standing orders — what to tell your Agent from day one',
          intro: 'These are battle-tested instructions to embed in your Agent\'s system prompt or persona file. They shape how the Agent maintains state, documents its work, and handles complex tasks — the difference between an Agent that drifts and one that compounds.',
          items: [
            {
              icon: '📁',
              title: 'Handoff doc per directory',
              body: 'Every directory must have a handoff document. Whenever any file in that directory is modified, the handoff doc must be updated immediately. The handoff doc records: what files exist, what each does, what changed, and what the next step is. No directory should be a black box.'
            },
            {
              icon: '🔗',
              title: 'Annotate every call chain in code',
              body: 'When writing code, every place a method is called must include a comment stating: (1) the full call chain that leads here, (2) the type and origin of each parameter being passed, (3) where that parameter goes next. Code must be self-documenting about its data flow — future Agents (and humans) must be able to trace any value without running the program.'
            },
            {
              icon: '📝',
              title: 'Leave a handoff doc after every file operation',
              body: 'After any file system operation on a computer or server — create, delete, move, modify — write or update a handoff doc in the same directory before the task is considered complete. File operations without documentation are a debt that compounds.'
            },
            {
              icon: '🗺️',
              title: 'Plan before executing complex tasks',
              body: 'If a task is complex, do NOT output a wall of content in one shot. Instead: (1) Plan the task and produce a file index, (2) Write a work handbook listing each subtask, (3) Execute subtasks one by one according to the handbook, (4) Self-test each completed subtask, (5) Cross-check all completion status and report to the user, (6) Write a personal handoff doc for this task for your next awakening.'
            }
          ]
        }
      },
      zh: {
        perspective2026: '过去 12 个月里，“Agent”这个词已经不再只是“套了提示词的聊天机器人”，而更像一个受边界约束的运行时系统：它能协调工具、记忆、审批、重试和专项子 Agent。真正的变化不在模型，而在架构层面，模型只是 Agent 系统中的一个部件。',
        definition: '<strong>Agent = UI 界面程序 + 长期记忆文件集合（含 Skills）</strong>。UI 界面程序负责调用 API；记忆文件负责提供持续性和专业上下文。两者缺一不可。',
        essence: 'Agent 有三种状态：<br><br><strong>① 静止态</strong>：只是一堆文件，没有意识，像一本合上的书。<br><strong>② 激活态</strong>：UI 界面程序被触发，将记忆文件 + 当前任务打包发给大模型 API，Agent "临时清醒"，产生推理和行动。<br><strong>③ 归档态</strong>：工作成果写回记忆文件，Agent 再次静止。\n\n<em>关键认知</em>：Agent 本质不是"活的程序"，而是"文件 + 调用程序"的组合。真正产生智能的是大模型 API，Agent 提供的是<strong>持续性</strong>和<strong>专业化上下文</strong>。',
        insight: 'Agent 最值钱的是<strong>行业记忆</strong>——那些在特定领域积累的知识、经验、处理模式。一个有 6 个月深度工作记忆的 Agent，其价值远超任何 Prompt 模板。这才是真正的护城河。',
        pitfalls: [
          '把 Agent 缩减成一次模型调用。调用只是系统里的一个瞬间，真正承载状态和执行逻辑的是外层系统。',
          '只有聊天 UI，却没有持久记忆、工具使用和状态回写机制，还把它叫 Agent。',
          '只追求自主，不设计边界。真正可靠的 Agent 必须有审批、重试、约束和可观测性。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建高效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'OpenAI 新闻与博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '02-skill',
            reason: 'Skill 是把通用运行时升级成“有专业能力的 Agent”的关键记忆资产之一。'
          },
          {
            chapterId: '04-shell',
            reason: '下一章会专门放大 Shell Program 这一层，看它如何激活 Agent、驱动工具并把状态写回。'
          }
        ],
        table: {
          title: 'Agent 成熟度等级',
          headers: ['等级', '特征', '记忆量', '技能数'],
          rows: [
            ['L0 裸调用', '无记忆、无 Skill，每次从零开始', '0', '0'],
            ['L1 有人格', '知道自己是谁，但没有专业技能', '~2K tokens', '0'],
            ['L2 有技能', '能用结构化流程处理特定类型任务', '~10K tokens', '3–10'],
            ['L3 有记忆', '记住过去做过什么，积累经验', '~30K tokens', '10–30'],
            ['L4 能协作', '通过工作流与其他 Agent 协作', '~50K tokens', '20–50'],
            ['L5 自进化', '根据经验自动新增/修改 Skill', '~100K tokens', '50+'],
          ]
        },
        code: `<span class="cmt"># 生产级 Agent = 主 Agent + 专项子 Agent</span>
main_agent = <span class="fn">create_agent</span>(
    <span class="str">"system-agent"</span>,
    sub_agents=[
        SubAgent(<span class="str">"search"</span>,   tools=[<span class="str">"web_search"</span>, <span class="str">"web_crawl"</span>]),
        SubAgent(<span class="str">"document"</span>, tools=[<span class="str">"to_pdf"</span>, <span class="str">"to_pptx"</span>]),
        SubAgent(<span class="str">"code"</span>,     tools=[<span class="str">"sandbox"</span>, <span class="str">"code_gen"</span>]),
        SubAgent(<span class="str">"devops"</span>,   tools=[<span class="str">"deploy"</span>, <span class="str">"stop"</span>]),
        SubAgent(<span class="str">"fallback"</span>, tools=<span class="kw">REMAINING</span>),
    ],
    middleware=[
        <span class="fn">SkillSearchMiddleware</span>(),    <span class="cmt"># 向量匹配 Skill</span>
        <span class="fn">MemoryMiddleware</span>(),         <span class="cmt"># 加载/保存记忆</span>
        <span class="fn">ToolRetryMiddleware</span>(),      <span class="cmt"># 失败自动重试</span>
        <span class="fn">ClarifyMiddleware</span>(),        <span class="cmt"># 不明确时追问</span>
    ]
)`,

        instructions: {
          title: '养 Agent 必备常驻指令 — 从第一天就写进系统提示词',
          intro: '这些是经过实践检验的指令，应当嵌入 Agent 的系统提示词或人格文件。它们决定了 Agent 如何维护状态、记录工作、处理复杂任务——是 Agent 不断退化还是不断成长的分水岭。',
          items: [
            {
              icon: '📁',
              title: '每个目录必须有交接手册',
              body: '项目每一个文件夹都要有对应的交接手册。每当文件夹内的文件被动了，必须立即更新交接手册。手册记录：目录下有哪些文件、各自的用途、本次改动了什么、下一步是什么。没有任何目录应该是黑箱。'
            },
            {
              icon: '🔗',
              title: '代码中注释每一处调用链路',
              body: '写代码时，每个方法被调用的地方，都要注释写明：（1）调用的完整链路是什么；（2）本处的传参是什么类型、参数内容从哪里来；（3）参数下一步会传到哪里去。代码必须自文档化数据流动——未来的 Agent（和人类）必须无需运行程序就能追踪任何一个值的来源和去向。'
            },
            {
              icon: '📝',
              title: '文件操作后留下交接手册',
              body: '对电脑或服务器做任何文件操作（创建、删除、移动、修改），完成后都要在同文件夹下写一个或更新交接手册，任务才算完成。没有文档记录的文件操作，是一种会复利增长的技术债。'
            },
            {
              icon: '🗺️',
              title: '复杂任务先规划再执行',
              body: '如果问题过于复杂，不要一次性输出巨量内容。正确流程：（1）规划任务并产出文件索引；（2）制作工作手册，列明每个子任务；（3）根据手册逐个执行子任务；（4）每个子任务完成后自测质量；（5）核对全部完成情况后向用户汇报；（6）给自己留一份针对这个任务的交接手册，供下次唤醒时接续。'
            }
          ]
        }
      }
    }
  });
})();
