(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '19-protocol-stack',
    order: 19,

    nav:      { en: 'Protocol Stack',  zh: '协议栈' },
    title:    { en: 'Protocol <span class="accent">Stack</span>', zh: '协议 <span class="accent">栈</span>' },
    subtitle: { en: 'MCP + A2A + AG-UI · The Complete Communication Layer', zh: 'MCP + A2A + AG-UI · 完整通信层' },
    tag:      { en: 'System',          zh: '系统' },
    tagClass: 'tag-system',

    viewBox: '0 0 760 300',

    getSvg(lang) {
      // Three-layer stack
      // Top: User layer (AG-UI)
      const userLayer = `
        <rect x="180" y="20" width="400" height="50" rx="8" fill="#1a8a3a12" stroke="#1a8a3a" stroke-width="2"/>
        <text x="380" y="42" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="12" font-weight="600">
          ${t(lang, 'AG-UI · Agent ↔ User', 'AG-UI · Agent ↔ 用户')}
        </text>
        <text x="380" y="60" text-anchor="middle" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Streaming events, state sync, approval flows', '流式事件、状态同步、审批流')}
        </text>
      `;

      // User icon
      const user = `
        <circle cx="100" cy="45" r="15" fill="#1a8a3a18" stroke="#1a8a3a" stroke-width="1.5"/>
        <text x="100" y="50" text-anchor="middle" fill="#1a8a3a" font-size="14">👤</text>
        ${S.arrow(115, 45, 180, 45, '#1a8a3a')}
      `;

      // Middle: Agent layer (A2A)
      const agentLayer = `
        <rect x="180" y="90" width="400" height="50" rx="8" fill="#a78bfa12" stroke="#a78bfa" stroke-width="2"/>
        <text x="380" y="112" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="12" font-weight="600">
          ${t(lang, 'A2A · Agent ↔ Agent', 'A2A · Agent ↔ Agent')}
        </text>
        <text x="380" y="130" text-anchor="middle" fill="#a78bfa88" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Agent Cards, task delegation, cross-framework', 'Agent Card、任务委派、跨框架')}
        </text>
      `;

      // Agent icons
      const agents = `
        <rect x="60" y="95" width="60" height="36" rx="5" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1"/>
        <text x="90" y="117" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="8">Agent</text>
        ${S.arrow(120, 113, 180, 113, '#a78bfa')}
        <rect x="640" y="95" width="60" height="36" rx="5" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1"/>
        <text x="670" y="117" text-anchor="middle" fill="#a78bfa" font-family="'JetBrains Mono',monospace" font-size="8">Agent</text>
        ${S.arrow(580, 113, 640, 113, '#a78bfa')}
      `;

      // Bottom: Tool layer (MCP)
      const toolLayer = `
        <rect x="180" y="160" width="400" height="50" rx="8" fill="#0071e312" stroke="#0071e3" stroke-width="2"/>
        <text x="380" y="182" text-anchor="middle" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="12" font-weight="600">
          ${t(lang, 'MCP · Agent ↔ Tool', 'MCP · Agent ↔ 工具')}
        </text>
        <text x="380" y="200" text-anchor="middle" fill="#0071e388" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'JSON-RPC, tool manifest, resource access', 'JSON-RPC、工具清单、资源访问')}
        </text>
      `;

      // Tool icons
      const tools = `
        ${S.box(60, 165, 60, 36, '#0071e3', 'Tools', '')}
        ${S.arrow(120, 183, 180, 183, '#0071e3')}
      `;

      // Emerging protocols sidebar
      const emerging = `
        <rect x="40" y="230" width="680" height="40" rx="5" fill="#ffb80012" stroke="#ffb800" stroke-width="1" stroke-dasharray="4 3"/>
        <text x="380" y="248" text-anchor="middle" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="500">
          ${t(lang, 'Emerging: ACP (REST messaging) · ANP (decentralized P2P) · OpenAPI (tool specs from existing APIs)',
                  '新兴协议：ACP（REST 消息传递）· ANP（去中心化 P2P）· OpenAPI（从已有 API 生成工具定义）')}
        </text>
      `;

      return `
        ${userLayer}${user}${agentLayer}${agents}${toolLayer}${tools}${emerging}

        ${S.label(380, 288,
          t(lang, 'Three protocols, three connection types. Together: a complete agent communication stack.',
                  '三个协议，三种连接类型。合在一起：完整的 Agent 通信栈。'),
          '#6b84a8', 10)}
      `;
    },

    content: {
      en: {
        perspective2026: 'In 2026, the ecosystem is converging on a layered view of agent interoperability. Teams no longer expect one universal protocol to handle tools, delegation, and user interfaces equally well. Instead, they compose specialized layers, add gateways where needed, and optimize around portability, observability, and governance. The stack matters because production agent systems fail at the boundaries between layers, not inside a single happy-path demo.',
        definition: 'The Agent protocol stack is a <strong>three-layer communication architecture</strong>: MCP (agent↔tool), A2A (agent↔agent), AG-UI (agent↔user). Each protocol specializes in one connection type; together they form a complete communication layer for production agent systems.',

        essence: '<strong>The stack:</strong>\n\n<em>Layer 1 — MCP (Bottom):</em> Connects agents to tools and data sources. Any MCP server can expose tools to any agent. Think: "What can I do?"\n\n<em>Layer 2 — A2A (Middle):</em> Connects agents to other agents across frameworks. Agents discover each other via Agent Cards and delegate tasks. Think: "Who can help me?"\n\n<em>Layer 3 — AG-UI (Top):</em> Connects agents to human users via streaming events. The frontend knows exactly what the agent is doing and can approve/reject actions. Think: "How do I show the user what I\'m doing?"\n\n<strong>Why three protocols instead of one?</strong>\n\nEach connection type has fundamentally different requirements:\n— Tool connections need schema validation and deterministic execution\n— Agent connections need capability discovery and task lifecycle management\n— User connections need streaming, state sync, and approval workflows\n\nOne protocol trying to do all three would be overloaded. Composability wins.\n\n<strong>Emerging additions:</strong>\n— ACP: REST-native multi-part messaging for multimodal agents\n— ANP: Decentralized P2P for open-internet agent discovery\n— OpenAPI: Auto-generating tool schemas from existing API documentation',

        insight: 'Don\'t reinvent these wheels. Before writing custom agent communication code, check if MCP (for tools), A2A (for agent coordination), or AG-UI (for user interaction) already solves your problem. The ecosystem is converging on these standards.',

        pitfalls: [
          '执着于寻找“一个统一协议搞定全部问题”。<strong>工具、Agent、用户</strong> 三种连接关系的约束完全不同，强行合一通常会让协议臃肿失焦。',
          '把所有调用都塞进同一层。例如把远端 Agent 当工具调，或者把 UI 事件流当后端编排总线，都会让模型和系统边界变得混乱。',
          '只画分层图，不做跨层治理。认证、审计、重试、幂等和可观测性，必须在层与层的交界处真正落地。'
        ],

        furtherReading: [
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'A2A Protocol', url: 'https://google.github.io/A2A' },
          { title: 'AG-UI Documentation', url: 'https://docs.ag-ui.com' }
        ],

        crossRefs: [
          {
            chapterId: '16-mcp',
            reason: 'MCP defines the bottom layer of the stack and is the foundation for standardized tool access.'
          },
          {
            chapterId: '17-a2a',
            reason: 'A2A defines the middle layer where agents discover and delegate work to other agents.'
          },
          {
            chapterId: '18-ag-ui',
            reason: 'AG-UI defines the top layer that exposes execution state, approvals, and outputs to users.'
          }
        ],

        table: {
          title: 'Protocol comparison',
          headers: ['Protocol', 'Connection', 'Created By', 'Transport', 'Key Concept'],
          rows: [
            ['MCP',   'Agent ↔ Tool',   'Anthropic', 'JSON-RPC / HTTP+SSE',   'Tool Manifest'],
            ['A2A',   'Agent ↔ Agent',  'Google',    'HTTP + SSE + JSON-RPC', 'Agent Card + Task'],
            ['AG-UI', 'Agent ↔ User',   'CopilotKit','HTTP + streaming JSON', 'Event Stream'],
            ['ACP',   'Agent messaging', 'Community', 'REST + streaming',      'Multi-part messages'],
            ['ANP',   'Agent discovery', 'Community', 'P2P / decentralized',   'Autonomous discovery'],
          ]
        }
      },

      zh: {
        perspective2026: '到了 2026 年，Agent 互操作生态正在收敛到一种分层视角。团队已经不再期待“一个万能协议”同时优雅地处理工具接入、任务委派和用户界面，而是会组合多个专用层，在必要时加上网关，并围绕可移植性、可观测性和治理能力做优化。协议栈重要，不是因为图好看，而是因为生产级 Agent 系统往往死在层与层之间的边界上，而不是单个 happy path demo 里。',
        definition: 'Agent 协议栈是一个<strong>三层通信架构</strong>：MCP（Agent↔工具）、A2A（Agent↔Agent）、AG-UI（Agent↔用户）。每个协议专注一种连接类型，合在一起构成生产级 Agent 系统的完整通信层。',

        essence: '<strong>协议栈：</strong>\n\n<em>第一层 — MCP（底层）：</em>连接 Agent 与工具和数据源。任何 MCP 服务端都能向任何 Agent 暴露工具。思考："我能做什么？"\n\n<em>第二层 — A2A（中间层）：</em>跨框架连接 Agent 与其他 Agent。Agent 通过 Agent Card 发现彼此并委派任务。思考："谁能帮我？"\n\n<em>第三层 — AG-UI（顶层）：</em>通过流式事件连接 Agent 与用户。前端精确知道 Agent 在做什么，可以批准/拒绝操作。思考："我如何展示给用户看？"\n\n<strong>为什么三个协议而不是一个？</strong>\n\n每种连接类型有根本不同的需求：\n— 工具连接需要 Schema 验证和确定性执行\n— Agent 连接需要能力发现和任务生命周期管理\n— 用户连接需要流式传输、状态同步和审批工作流\n\n一个协议试图做所有事情会过载。可组合性胜出。\n\n<strong>新兴补充：</strong>\n— ACP：REST 原生多部分消息，支持多模态 Agent\n— ANP：去中心化 P2P，用于开放互联网 Agent 发现\n— OpenAPI：从已有 API 文档自动生成工具 Schema',

        insight: '不要重新发明轮子。在写自定义 Agent 通信代码之前，先检查 MCP（工具）、A2A（Agent 协调）或 AG-UI（用户交互）是否已经解决了你的问题。生态系统正在向这些标准收敛。',

        pitfalls: [
          '执着于寻找“一个统一协议搞定全部问题”。<strong>工具、Agent、用户</strong> 三种连接关系的约束完全不同，强行合一通常会让协议臃肿失焦。',
          '把所有调用都塞进同一层。例如把远端 Agent 当工具调，或者把 UI 事件流当后端编排总线，都会让模型与系统边界变得混乱。',
          '只画分层图，不做跨层治理。认证、审计、重试、幂等和可观测性，必须在层与层的交界处真正落地。'
        ],

        furtherReading: [
          { title: 'Model Context Protocol 官网', url: 'https://modelcontextprotocol.io' },
          { title: 'A2A 协议', url: 'https://google.github.io/A2A' },
          { title: 'AG-UI 文档', url: 'https://docs.ag-ui.com' }
        ],

        crossRefs: [
          {
            chapterId: '16-mcp',
            reason: 'MCP 定义了协议栈的底层，是标准化工具接入的基础。'
          },
          {
            chapterId: '17-a2a',
            reason: 'A2A 定义了中间层，让 Agent 能发现和委派给其他 Agent。'
          },
          {
            chapterId: '18-ag-ui',
            reason: 'AG-UI 定义了最上层，把执行状态、审批节点和结果暴露给用户。'
          }
        ],

        table: {
          title: '协议对比',
          headers: ['协议', '连接类型', '创建方', '传输层', '核心概念'],
          rows: [
            ['MCP',   'Agent ↔ 工具',   'Anthropic', 'JSON-RPC / HTTP+SSE',   '工具清单'],
            ['A2A',   'Agent ↔ Agent',  'Google',    'HTTP + SSE + JSON-RPC', 'Agent Card + Task'],
            ['AG-UI', 'Agent ↔ 用户',   'CopilotKit','HTTP + 流式 JSON',      '事件流'],
            ['ACP',   'Agent 消息传递',  '社区',       'REST + 流式',           '多部分消息'],
            ['ANP',   'Agent 发现',      '社区',       'P2P / 去中心化',        '自主发现'],
          ]
        }
      }
    }
  });
})();
