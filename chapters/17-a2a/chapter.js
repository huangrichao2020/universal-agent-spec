(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '17-a2a',
    order: 17,

    nav:      { en: 'A2A Protocol',    zh: 'A2A 协议' },
    title:    { en: '<span class="accent">A2A</span> Protocol', zh: '<span class="accent">A2A</span> 协议' },
    subtitle: { en: 'Agent-to-Agent · Cross-Framework Communication', zh: 'Agent-to-Agent · 跨框架通信' },
    tag:      { en: 'Infrastructure',  zh: '基础设施' },
    tagClass: 'tag-infra',

    viewBox: '0 0 760 290',

    getSvg(lang) {
      // Agent A (LangGraph)
      const agentA = S.box(40, 40, 160, 50, '#0071e3',
        t(lang, 'Agent A', 'Agent A'),
        t(lang, 'LangGraph', 'LangGraph'));

      // Agent B (CrewAI)
      const agentB = S.box(560, 40, 160, 50, '#ff4d6d',
        t(lang, 'Agent B', 'Agent B'),
        t(lang, 'CrewAI', 'CrewAI'));

      // A2A Protocol in the middle
      const proto = S.box(270, 40, 220, 50, '#a78bfa',
        t(lang, 'A2A Protocol', 'A2A 协议'),
        t(lang, 'HTTP + SSE + JSON-RPC', 'HTTP + SSE + JSON-RPC'));

      // Arrows
      const a1 = S.arrow(200, 65, 270, 65, '#6b84a8');
      const a2 = S.arrow(490, 65, 560, 65, '#6b84a8');

      // Agent Card
      const card = `
        <rect x="40" y="120" width="200" height="85" rx="5" fill="#ffb80012" stroke="#ffb800" stroke-width="1.5"/>
        <text x="140" y="138" text-anchor="middle" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Agent Card (JSON)', 'Agent Card (JSON)')}
        </text>
        <text x="55" y="155" fill="#ffb80088" font-family="'JetBrains Mono',monospace" font-size="8">name: "data-analyst"</text>
        <text x="55" y="168" fill="#ffb80088" font-family="'JetBrains Mono',monospace" font-size="8">skills: ["sql", "viz"]</text>
        <text x="55" y="181" fill="#ffb80088" font-family="'JetBrains Mono',monospace" font-size="8">url: "https://..."</text>
        <text x="55" y="194" fill="#ffb80088" font-family="'JetBrains Mono',monospace" font-size="8">auth: {schemes: ["oauth2"]}</text>
      `;

      // Task lifecycle
      const lifecycle = `
        <rect x="300" y="120" width="420" height="85" rx="5" fill="#0071e312" stroke="#0071e3" stroke-width="1.5"/>
        <text x="510" y="138" text-anchor="middle" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Task Lifecycle', '任务生命周期')}
        </text>
        ${S.box(310, 148, 80, 24, '#6b84a8', 'submitted', '')}
        ${S.arrow(390, 160, 410, 160, '#6b84a8')}
        ${S.box(410, 148, 70, 24, '#ffb800', 'working', '')}
        ${S.arrow(480, 160, 500, 160, '#6b84a8')}
        ${S.box(500, 148, 80, 24, '#1a8a3a', 'completed', '')}
        <text x="510" y="194" text-anchor="middle" fill="#6b84a888" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, '+ input-required | failed | canceled | rejected',
                  '+ input-required | failed | canceled | rejected')}
        </text>
      `;

      return `
        ${agentA}${agentB}${proto}${a1}${a2}${card}${lifecycle}

        ${S.label(380, 228,
          t(lang, 'A2A lets agents discover, delegate, and coordinate regardless of framework',
                  'A2A 让 Agent 能跨框架发现、委派和协调'),
          '#6b84a8', 10)}
        ${S.label(380, 248,
          t(lang, 'Agent Cards = capability declaration. Tasks = unit of work with lifecycle.',
                  'Agent Card = 能力声明。Task = 有生命周期的工作单元。'),
          '#a78bfa', 10)}
        ${S.label(380, 268,
          t(lang, 'MCP: agent ↔ tool (vertical)  |  A2A: agent ↔ agent (horizontal)',
                  'MCP：Agent ↔ 工具（纵向） ｜ A2A：Agent ↔ Agent（横向）'),
          '#ff4d6d', 10)}
        ${S.label(380, 286,
          t(lang, 'Created by Google · Built on HTTP, SSE, JSON-RPC',
                  'Google 创建 · 基于 HTTP、SSE、JSON-RPC'),
          '#1a8a3a', 10)}
      `;
    },

    content: {
      en: {
        perspective2026: 'In 2026, A2A matters because real agent systems are no longer single-runtime toys. Enterprises want routing between specialist agents, hosted services, and framework-specific workers without rewriting everything into one stack. The hard part is not sending JSON; it is managing trust, capability discovery, approvals, and long-running task handoffs across organizational boundaries.',
        definition: 'A2A (Agent-to-Agent) is a <strong>Google-created protocol</strong> for agents to communicate, delegate tasks, and coordinate across frameworks and vendors. It uses Agent Cards for capability discovery and Tasks as the fundamental work unit.',

        essence: '<strong>The problem:</strong> An agent built with LangGraph cannot talk to an agent built with CrewAI. They live in different frameworks with incompatible APIs. Multi-vendor agent collaboration is impossible without a shared protocol.\n\n<strong>A2A solves this with three concepts:</strong>\n\n1. <em>Agent Cards</em> — JSON manifests that declare an agent\'s name, skills, endpoint URL, and auth requirements. Client agents use these to discover and select the right agent for a task.\n\n2. <em>Tasks</em> — The fundamental unit of work. Each task has a unique ID and a lifecycle: submitted → working → completed (or failed/canceled/rejected). Tasks can be short-lived (seconds) or long-running (hours/days).\n\n3. <em>Messages & Artifacts</em> — Agents communicate via Messages (text, files, structured data). Task outputs are Artifacts.\n\n<strong>Relationship with MCP:</strong> They are complementary, not competing.\n— MCP standardizes <em>vertical</em> connections: agent ↔ tool\n— A2A standardizes <em>horizontal</em> connections: agent ↔ agent\nA production system typically uses both.',

        insight: 'A2A is for when your agent needs help from another agent — not just a tool. A tool executes a function. Another agent can reason, plan, and make judgment calls. The distinction matters: delegate to a tool for deterministic operations, delegate to an agent for open-ended reasoning.',

        pitfalls: [
          '把远端 Agent 当成“更贵的函数”。如果任务本身是确定性的 API 操作，直接走工具调用通常比 A2A 更简单、更可控。',
          '只设计消息格式，不设计<strong>身份、权限、信任边界与审批</strong>。跨组织或跨团队协作时，这些问题会先于协议细节爆炸。',
          '为了解耦而无限拆 Agent。过多委派层会让延迟、失败恢复和责任归属急剧变差，最后比单体 Agent 更难运维。'
        ],

        furtherReading: [
          { title: 'A2A Protocol', url: 'https://google.github.io/A2A' },
          { title: 'AutoGen Documentation', url: 'https://microsoft.github.io/autogen' },
          { title: 'LangGraph Documentation', url: 'https://langchain-ai.github.io/langgraph' }
        ],

        crossRefs: [
          {
            chapterId: '16-mcp',
            reason: 'MCP standardizes agent-to-tool connectivity, while A2A standardizes agent-to-agent delegation; the contrast is foundational.'
          },
          {
            chapterId: '19-protocol-stack',
            reason: 'The protocol-stack chapter shows where A2A sits relative to MCP and AG-UI in a full agent architecture.'
          }
        ],

        table: {
          title: 'A2A core concepts',
          headers: ['Concept', 'Purpose', 'Format'],
          rows: [
            ['Agent Card',  'Capability declaration & discovery',  'JSON at /.well-known/agent.json'],
            ['Task',        'Unit of work with lifecycle',         'ID + status + messages + artifacts'],
            ['Message',     'Communication between agents',        'Role + Parts (text, file, data)'],
            ['Artifact',    'Task output / deliverable',           'Named output with MIME type'],
          ]
        }
      },

      zh: {
        perspective2026: '到了 2026 年，A2A 之所以重要，是因为真实 Agent 系统早就不再是单一运行时里的小玩具。企业希望在专长 Agent、托管服务和不同框架的 worker 之间做路由，而不是把所有东西重写进同一个栈。难点从来不是“传 JSON”，而是如何跨组织边界管理信任、能力发现、审批和长任务交接。',
        definition: 'A2A（Agent-to-Agent）是 <strong>Google 创建的协议</strong>，让 Agent 能跨框架、跨厂商通信、委派任务和协调工作。它使用 Agent Card 进行能力发现，用 Task 作为基本工作单元。',

        essence: '<strong>问题：</strong>用 LangGraph 构建的 Agent 无法与用 CrewAI 构建的 Agent 对话。它们在不同框架中，API 不兼容。没有共享协议，多厂商 Agent 协作不可能实现。\n\n<strong>A2A 通过三个概念解决：</strong>\n\n1. <em>Agent Card</em>——JSON 清单，声明 Agent 的名称、技能、端点 URL 和认证要求。客户端 Agent 用它来发现和选择合适的 Agent。\n\n2. <em>Task</em>——基本工作单元。每个 Task 有唯一 ID 和生命周期：submitted → working → completed（或 failed/canceled/rejected）。Task 可以是短暂的（秒级）也可以是长时运行的（小时/天级）。\n\n3. <em>Message & Artifact</em>——Agent 通过 Message 通信（文本、文件、结构化数据），Task 的输出是 Artifact。\n\n<strong>与 MCP 的关系：</strong>互补而非竞争。\n— MCP 标准化<em>纵向</em>连接：Agent ↔ 工具\n— A2A 标准化<em>横向</em>连接：Agent ↔ Agent\n生产系统通常两者都用。',

        insight: 'A2A 用于你的 Agent 需要另一个 Agent 的帮助——而不仅仅是工具。工具执行一个函数。另一个 Agent 能推理、规划、做判断。这个区别很重要：确定性操作委派给工具，开放性推理委派给 Agent。',

        pitfalls: [
          '把远端 Agent 当成“更贵的函数”。如果任务本身是确定性的 API 操作，直接走工具调用通常比 A2A 更简单、更可控。',
          '只设计消息格式，不设计<strong>身份、权限、信任边界和审批</strong>。跨组织或跨团队协作时，这些问题通常会先于协议细节爆炸。',
          '为了解耦而无限拆 Agent。过多委派层会让延迟、失败恢复和责任归属急剧变差，最后比单体 Agent 更难运维。'
        ],

        furtherReading: [
          { title: 'A2A 协议', url: 'https://google.github.io/A2A' },
          { title: 'AutoGen 文档', url: 'https://microsoft.github.io/autogen' },
          { title: 'LangGraph 文档', url: 'https://langchain-ai.github.io/langgraph' }
        ],

        crossRefs: [
          {
            chapterId: '16-mcp',
            reason: 'MCP 负责 Agent 到工具的纵向连接，A2A 负责 Agent 到 Agent 的横向委派，这个对照关系是本章的基础。'
          },
          {
            chapterId: '19-protocol-stack',
            reason: '协议栈一章会把 A2A 放在中间层，和 MCP、AG-UI 的职责边界放到同一张图里。'
          }
        ],

        table: {
          title: 'A2A 核心概念',
          headers: ['概念', '用途', '格式'],
          rows: [
            ['Agent Card', '能力声明与发现',    'JSON，位于 /.well-known/agent.json'],
            ['Task',       '有生命周期的工作单元', 'ID + 状态 + 消息 + 产出物'],
            ['Message',    'Agent 间通信',       '角色 + Parts（文本、文件、数据）'],
            ['Artifact',   'Task 输出/交付物',   '带 MIME 类型的命名输出'],
          ]
        }
      }
    }
  });
})();
