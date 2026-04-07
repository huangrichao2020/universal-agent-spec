(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;
  window.AgentSpec.register({
    id: '31-learning-path', order: 31,
    nav:      { en: 'Learning Path', zh: '学习路径' },
    title:    { en: 'Learning <span class="accent">Path</span>', zh: '学习 <span class="accent">路径</span>' },
    subtitle: { en: 'Beginner → Intermediate → Advanced · Your Roadmap', zh: '入门 → 中级 → 高级 · 你的路线图' },
    tag:      { en: 'Business', zh: '商业' }, tagClass: 'tag-biz',
    viewBox: '0 0 760 290',
    getSvg(lang) {
      let svg = '';
      // Three level boxes
      svg += `
        <rect x="40" y="20" width="200" height="120" rx="8" fill="#1a8a3a12" stroke="#1a8a3a" stroke-width="2"/>
        <text x="140" y="42" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="12" font-weight="700">
          ${t(lang, 'BEGINNER', '入门')}
        </text>
        <text x="55" y="62" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">Ch 0-6: ${t(lang, 'Foundations', '基础')}</text>
        <text x="55" y="76" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">Ch 12: ${t(lang, 'Tool Use', '工具调用')}</text>
        <text x="55" y="90" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">Ch 14: ${t(lang, 'ReAct pattern', 'ReAct 模式')}</text>
        <text x="55" y="104" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Build: simple ReAct agent', '实践：简单 ReAct Agent')}</text>
        <text x="55" y="118" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Framework: CrewAI / OpenAI SDK', '框架：CrewAI / OpenAI SDK')}</text>
        <text x="55" y="132" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Time: 1-2 weeks', '时间：1-2 周')}</text>
      `;

      svg += S.arrow(240, 80, 280, 80, '#6b84a8');

      svg += `
        <rect x="280" y="20" width="200" height="120" rx="8" fill="#0071e312" stroke="#0071e3" stroke-width="2"/>
        <text x="380" y="42" text-anchor="middle" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="12" font-weight="700">
          ${t(lang, 'INTERMEDIATE', '中级')}
        </text>
        <text x="295" y="62" fill="#0071e388" font-family="'JetBrains Mono',monospace" font-size="8">Ch 13,15: ${t(lang, 'Reasoning + P&E', '推理 + 规划执行')}</text>
        <text x="295" y="76" fill="#0071e388" font-family="'JetBrains Mono',monospace" font-size="8">Ch 16: ${t(lang, 'MCP integration', 'MCP 集成')}</text>
        <text x="295" y="90" fill="#0071e388" font-family="'JetBrains Mono',monospace" font-size="8">Ch 24: ${t(lang, 'Memory (vector DB)', '记忆（向量库）')}</text>
        <text x="295" y="104" fill="#0071e388" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Build: stateful workflow agent', '实践：有状态工作流 Agent')}</text>
        <text x="295" y="118" fill="#0071e388" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Framework: LangGraph', '框架：LangGraph')}</text>
        <text x="295" y="132" fill="#0071e388" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Time: 2-4 weeks', '时间：2-4 周')}</text>
      `;

      svg += S.arrow(480, 80, 520, 80, '#6b84a8');

      svg += `
        <rect x="520" y="20" width="200" height="120" rx="8" fill="#ff4d6d12" stroke="#ff4d6d" stroke-width="2"/>
        <text x="620" y="42" text-anchor="middle" fill="#ff4d6d" font-family="'JetBrains Mono',monospace" font-size="12" font-weight="700">
          ${t(lang, 'ADVANCED', '高级')}
        </text>
        <text x="535" y="62" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">Ch 17-19: ${t(lang, 'A2A + AG-UI + Stack', 'A2A + AG-UI + 协议栈')}</text>
        <text x="535" y="76" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">Ch 22-23: ${t(lang, 'Multi-agent arch', '多 Agent 架构')}</text>
        <text x="535" y="90" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">Ch 25-27: ${t(lang, 'Obs + Guard + Eval', '观测 + 护栏 + 评估')}</text>
        <text x="535" y="104" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Build: production multi-agent', '实践：生产级多 Agent')}</text>
        <text x="535" y="118" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Framework: Custom / LangGraph', '框架：自定义 / LangGraph')}</text>
        <text x="535" y="132" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">${t(lang, 'Time: 1-3 months', '时间：1-3 个月')}</text>
      `;

      // Decision tree
      svg += `
        <rect x="40" y="160" width="680" height="65" rx="5" fill="#a78bfa12" stroke="#a78bfa" stroke-width="1"/>
        <text x="380" y="178" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Framework Selection Quick Guide', '框架选型速查')}
        </text>
        <text x="55" y="195" fill="#a78bfa88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Quick prototype → CrewAI | OpenAI ecosystem → Agents SDK | Production graphs → LangGraph',
                  '快速原型 → CrewAI | OpenAI 生态 → Agents SDK | 生产级图编排 → LangGraph')}
        </text>
        <text x="55" y="212" fill="#a78bfa88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Google ecosystem → ADK | Visual/low-code → Dify | Research → AutoGen',
                  'Google 生态 → ADK | 可视化/低代码 → Dify | 研究型 → AutoGen')}
        </text>
      `;

      svg += S.label(380, 248, t(lang, 'This spec IS the curriculum. Read chapters in order for best understanding.', '本规范就是课程。按顺序阅读章节效果最好。'), '#6b84a8', 10);
      svg += S.label(380, 266, t(lang, 'Every chapter builds on the previous. Foundations → Patterns → Protocols → Production.', '每章建立在前一章基础上。基础 → 模式 → 协议 → 生产化。'), '#0071e3', 10);
      svg += S.label(380, 284, t(lang, 'The best way to learn agents: build one, evaluate it, improve it, repeat.', '学习 Agent 的最好方式：构建一个，评估它，改进它，重复。'), '#ff4d6d', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'A structured learning path from beginner to advanced, mapping this specification\'s chapters to skill levels, practical projects, and framework recommendations.',
        essence: '<strong>Beginner (1-2 weeks):</strong>\n— Read: Ch 0-6 (LLM API, Invocation, Memory, Skill, Agent, Shell), Ch 12 (Tool Use), Ch 14 (ReAct)\n— Build: A simple ReAct agent that can search the web and answer questions\n— Framework: CrewAI (lowest barrier) or OpenAI Agents SDK (cleanest API)\n— Goal: Understand the agent loop and tool use\n\n<strong>Intermediate (2-4 weeks):</strong>\n— Read: Ch 13 (Reasoning), Ch 15 (Plan & Execute), Ch 16 (MCP), Ch 24 (Memory Architecture)\n— Build: A stateful workflow agent with vector DB memory and MCP tool integration\n— Framework: LangGraph (graph-based workflows with checkpointing)\n— Goal: Build agents that maintain state across sessions and use external tools via MCP\n\n<strong>Advanced (1-3 months):</strong>\n— Read: Ch 17-19 (A2A, AG-UI, Protocol Stack), Ch 22-23 (Architecture, Graph), Ch 25-27 (Observability, Guardrails, Evaluation)\n— Build: A production multi-agent system with observability, guardrails, and evaluation\n— Framework: LangGraph or custom + A2A for inter-agent communication\n— Goal: Ship a reliable, monitored, evaluated agent system\n\n<strong>Framework selection:</strong>\n— Quick prototype: CrewAI\n— OpenAI ecosystem: Agents SDK\n— Production graph workflows: LangGraph\n— Google ecosystem: ADK\n— Visual/low-code: Dify\n— Research/academic: AutoGen',
        insight: 'The fastest path to understanding agents: build a simple one (week 1), add memory (week 2), add MCP tools (week 3), add evaluation (week 4). Each step teaches you a fundamental concept that no amount of reading can replace.',
        perspective2026: 'By 2026, the most effective way to learn agents is no longer a linear reading list. The durable path is a loop: study one pattern, build a small system, evaluate it, inspect failures, then add the next layer. Learners who reach production competence fastest are the ones who combine protocol literacy (MCP, UI events, task models) with hands-on coding agents, evaluation habits, and safety discipline.',
        pitfalls: [
          'Reading dozens of chapters and papers without shipping anything. Agent intuition forms through build-and-debug cycles, not passive consumption.',
          'Starting with multi-agent orchestration before mastering single-agent loops, tools, and memory basics.',
          'Learning only a framework API instead of the underlying patterns. Frameworks change faster than the architectural principles.'
        ],
        furtherReading: [
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' }
        ],
        crossRefs: [
          {
            chapterId: '14-react',
            reason: 'A practical learning path should start with the smallest useful agent loop before moving into orchestration and protocols.'
          },
          {
            chapterId: '16-mcp',
            reason: 'MCP literacy is a major threshold between hobby demos and agents that can work cleanly with real external tools.'
          },
          {
            chapterId: '27-evaluation',
            reason: 'Learning accelerates once every new agent iteration is paired with evaluation instead of vague subjective impressions.'
          }
        ],
        table: {
          title: 'Learning path summary',
          headers: ['Level', 'Chapters', 'Build', 'Framework', 'Time'],
          rows: [
            ['Beginner',     '0-6, 12, 14',           'Simple ReAct agent',         'CrewAI / OpenAI SDK', '1-2 weeks'],
            ['Intermediate', '13, 15, 16, 24',        'Stateful workflow + MCP',    'LangGraph',           '2-4 weeks'],
            ['Advanced',     '17-19, 22-23, 25-27',   'Production multi-agent',     'LangGraph / Custom',  '1-3 months'],
          ]
        }
      },
      zh: {
        definition: '从入门到高级的结构化学习路径，将本规范的章节映射到技能水平、实践项目和框架推荐。',
        essence: '<strong>入门（1-2 周）：</strong>\n— 阅读：第 0-6 章（LLM API、调用、记忆、Skill、Agent、Shell）、第 12 章（工具调用）、第 14 章（ReAct）\n— 实践：构建一个能搜索网页并回答问题的简单 ReAct Agent\n— 框架：CrewAI（最低门槛）或 OpenAI Agents SDK（最干净的 API）\n— 目标：理解 Agent 循环和工具调用\n\n<strong>中级（2-4 周）：</strong>\n— 阅读：第 13 章（推理）、第 15 章（规划执行）、第 16 章（MCP）、第 24 章（记忆架构）\n— 实践：带向量库记忆和 MCP 工具集成的有状态工作流 Agent\n— 框架：LangGraph（带检查点的图编排工作流）\n— 目标：构建跨会话保持状态、通过 MCP 使用外部工具的 Agent\n\n<strong>高级（1-3 个月）：</strong>\n— 阅读：第 17-19 章（A2A、AG-UI、协议栈）、第 22-23 章（架构、图编排）、第 25-27 章（可观测、护栏、评估）\n— 实践：带可观测性、护栏和评估的生产级多 Agent 系统\n— 框架：LangGraph 或自定义 + A2A 跨 Agent 通信\n— 目标：交付一个可靠、可监控、可评估的 Agent 系统\n\n<strong>框架选型：</strong>\n— 快速原型：CrewAI\n— OpenAI 生态：Agents SDK\n— 生产级图编排：LangGraph\n— Google 生态：ADK\n— 可视化/低代码：Dify\n— 研究/学术：AutoGen',
        insight: '理解 Agent 最快的路径：第 1 周构建一个简单的，第 2 周加记忆，第 3 周加 MCP 工具，第 4 周加评估。每一步教你一个基本概念，这是再多阅读也替代不了的。',
        perspective2026: '到了 2026 年，学习 Agent 最有效的方式已经不再是线性读完一串章节，而是进入一个循环：学一个模式，做一个小系统，评估它，复盘失败，再叠下一层。真正成长最快的人，往往同时补协议素养（MCP、界面事件、任务模型）、动手做编程 Agent，并尽早养成评估和安全约束习惯。',
        pitfalls: [
          '读了很多章节和论文，却迟迟不做东西。Agent 直觉来自构建和调试循环，不来自被动阅读。',
          '在掌握单 Agent 循环、工具和记忆基础之前，就过早进入多 Agent 编排。',
          '只学某个框架 API，不学底层模式。框架会变，架构原则留得更久。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' }
        ],
        crossRefs: [
          {
            chapterId: '14-react',
            reason: '一条实用学习路径应先从最小可用的 Agent 循环开始，再逐步进入编排和协议层。'
          },
          {
            chapterId: '16-mcp',
            reason: 'MCP 素养是从爱好者 demo 走向真实工具集成 Agent 的重要分水岭。'
          },
          {
            chapterId: '27-evaluation',
            reason: '当每一次新 Agent 迭代都配上评估，而不是凭感觉判断时，学习速度会明显加快。'
          }
        ],
        table: {
          title: '学习路径总结',
          headers: ['级别', '章节', '实践', '框架', '时间'],
          rows: [
            ['入门', '0-6, 12, 14',         '简单 ReAct Agent',     'CrewAI / OpenAI SDK', '1-2 周'],
            ['中级', '13, 15, 16, 24',      '有状态工作流 + MCP',   'LangGraph',           '2-4 周'],
            ['高级', '17-19, 22-23, 25-27', '生产级多 Agent',       'LangGraph / 自定义',  '1-3 个月'],
          ]
        }
      }
    }
  });
})();
