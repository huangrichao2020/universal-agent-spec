(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;
  window.AgentSpec.register({
    id: '30-spec-formal', order: 30,
    nav:      { en: 'Formal Spec', zh: '形式化规范' },
    title:    { en: 'Formal <span class="accent">Specification</span>', zh: '形式化 <span class="accent">规范</span>' },
    subtitle: { en: 'Agent Card · I/O Format · Tool Interface · Lifecycle Hooks', zh: 'Agent Card · 输入输出 · 工具接口 · 生命周期钩子' },
    tag:      { en: 'Core Concept', zh: '核心概念' }, tagClass: 'tag-core',
    viewBox: '0 0 760 300',
    getSvg(lang) {
      let svg = '';
      // Spec components in a structured layout
      const components = [
        { x: 40, y: 20, color: '#0071e3', name: t(lang, 'Agent Card', 'Agent Card'), desc: t(lang, 'Identity + capabilities', '身份 + 能力声明') },
        { x: 220, y: 20, color: '#ff4d6d', name: t(lang, 'I/O Format', '输入输出格式'), desc: t(lang, 'Messages + Parts', '消息 + 组件') },
        { x: 400, y: 20, color: '#1a8a3a', name: t(lang, 'Tool Interface', '工具接口'), desc: t(lang, 'MCP-compatible', 'MCP 兼容') },
        { x: 580, y: 20, color: '#a78bfa', name: t(lang, 'State Mgmt', '状态管理'), desc: t(lang, 'Checkpoints', '检查点') },
        { x: 40, y: 85, color: '#ffb800', name: t(lang, 'Lifecycle', '生命周期'), desc: t(lang, 'Hooks & Events', '钩子与事件') },
        { x: 220, y: 85, color: '#0050a0', name: t(lang, 'Task Model', '任务模型'), desc: t(lang, 'A2A-compatible', 'A2A 兼容') },
        { x: 400, y: 85, color: '#ff4d6d', name: t(lang, 'Memory API', '记忆接口'), desc: t(lang, 'Read/Write/Search', '读/写/搜索') },
        { x: 580, y: 85, color: '#1a8a3a', name: t(lang, 'Guardrail Hooks', '护栏钩子'), desc: t(lang, 'Pre/Post validation', '前后验证') },
      ];
      components.forEach(c => {
        svg += S.box(c.x, c.y, 150, 44, c.color, c.name, c.desc);
      });

      // Agent Card JSON example
      svg += `
        <rect x="40" y="150" width="680" height="100" rx="5" fill="#0071e308" stroke="#0071e380" stroke-width="1"/>
        <text x="55" y="168" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="600">
          ${t(lang, 'Agent Card Schema (JSON)', 'Agent Card Schema (JSON)')}
        </text>
        <text x="55" y="185" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
          { "name": "data-analyst", "version": "1.0",
        </text>
        <text x="55" y="198" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
            "skills": ["sql_query", "visualization", "statistical_analysis"],
        </text>
        <text x="55" y="211" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
            "input_modes": ["text", "file"], "output_modes": ["text", "file", "image"],
        </text>
        <text x="55" y="224" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
            "protocols": { "tools": "mcp/1.0", "agents": "a2a/1.0", "ui": "ag-ui/1.0" },
        </text>
        <text x="55" y="237" fill="#3a3a3c" font-family="'JetBrains Mono',monospace" font-size="8">
            "auth": { "schemes": ["oauth2"] }, "endpoint": "https://agent.example.com" }
        </text>
      `;

      svg += S.label(380, 268, t(lang, 'The spec composes with MCP, A2A, AG-UI — it does not replace them', '规范与 MCP、A2A、AG-UI 组合——而非替代它们'), '#6b84a8', 10);
      svg += S.label(380, 286, t(lang, 'Progressive complexity: simple agents need minimal spec compliance', '渐进复杂度：简单 Agent 只需最小规范合规'), '#a78bfa', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'A formal Universal Agent Specification defines <strong>8 standard interfaces</strong> that any agent should implement: Agent Card, I/O format, tool interface, state management, lifecycle hooks, task model, memory API, and guardrail hooks.',
        essence: '<strong>1. Agent Card</strong> — JSON manifest: name, version, skills, supported I/O modes, protocol versions, auth requirements, endpoint. Based on A2A Agent Cards.\n\n<strong>2. I/O Format</strong> — Standardized messages with roles, multi-modal parts (text, files, structured data), and metadata. Compatible with A2A Messages and Parts.\n\n<strong>3. Tool Interface</strong> — MCP-compatible tool definitions: name, description, JSON Schema parameters, return schema. Supports deferred loading and parallel invocation.\n\n<strong>4. State Management</strong> — Standard state representation with checkpointing and state deltas (per AG-UI STATE_DELTA). Covers conversation history, working memory, agent-specific state.\n\n<strong>5. Lifecycle Hooks</strong> — RUN_STARTED, STEP_STARTED, STEP_FINISHED, RUN_FINISHED, RUN_ERROR, TOOL_CALL_START, TOOL_CALL_END, HANDOFF, PAUSE_FOR_APPROVAL, RESUME.\n\n<strong>6. Task Model</strong> — A2A-compatible: tasks as work units with IDs, lifecycles (submitted → working → completed), and artifact outputs.\n\n<strong>7. Memory API</strong> — Standard read/write/search across memory types. Pluggable backends (vector, graph, SQL).\n\n<strong>8. Guardrail Hooks</strong> — Pre-execution input validation, post-execution output validation, tool-use authorization, spend limits.\n\n<strong>Design principles:</strong>\n— Compose with existing protocols, don\'t replace them\n— Framework-agnostic: works across LangGraph, CrewAI, custom\n— Progressive complexity: simple agents need minimal compliance\n— Stateless by default: state persistence is explicit and pluggable',
        insight: 'The spec is not a framework — it\'s a contract. It tells you what interfaces your agent should expose, not how to implement them. Think OpenAPI for APIs, but for agents.',
        perspective2026: 'By 2026, formal agent specifications matter because ecosystems are becoming heterogeneous: one agent may speak MCP for tools, emit AG-UI events for interfaces, expose an Agent Card for discovery, and still run inside a framework-specific runtime. The winning specifications focus on interoperability, capability negotiation, and versioned contracts instead of trying to force every agent into one implementation model.',
        pitfalls: [
          'Designing the spec as a “one true framework.” A useful spec composes with existing protocols rather than replacing them.',
          'Over-specifying simple agents. Minimal compliance matters because many practical agents do not need every optional interface.',
          'Ignoring versioning and backward compatibility. A spec without an evolution path breaks the interoperability it was meant to create.'
        ],
        furtherReading: [
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'Pydantic AI agents concepts', url: 'https://docs.pydantic.dev/latest/concepts/agents/' },
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],
        crossRefs: [
          {
            chapterId: '16-mcp',
            reason: 'Tool interoperability is one of the most mature parts of the emerging agent protocol stack and anchors the tool interface portion of the spec.'
          },
          {
            chapterId: '18-ag-ui',
            reason: 'Lifecycle events and state deltas become much more concrete when mapped onto AG-UI style interface events.'
          },
          {
            chapterId: '26-guardrails',
            reason: 'A serious formal spec needs explicit safety and policy hooks, not just transport and discovery contracts.'
          }
        ],
        table: {
          title: 'Spec component mapping',
          headers: ['Component', 'Based On', 'Required', 'Purpose'],
          rows: [
            ['Agent Card',       'A2A Agent Cards',  'Yes', 'Identity & discovery'],
            ['I/O Format',       'A2A Messages',     'Yes', 'Interoperability'],
            ['Tool Interface',   'MCP',              'Yes', 'Tool connectivity'],
            ['State Management', 'AG-UI STATE_DELTA','Optional', 'Persistence & debug'],
            ['Lifecycle Hooks',  'AG-UI events',     'Optional', 'Observability'],
            ['Task Model',       'A2A Tasks',        'Optional', 'Multi-agent coord'],
            ['Memory API',       'Custom',           'Optional', 'Cross-session state'],
            ['Guardrail Hooks',  'Custom',           'Recommended','Safety & compliance'],
          ]
        }
      },
      zh: {
        definition: '形式化通用 Agent 规范定义了任何 Agent 应实现的 <strong>8 个标准接口</strong>：Agent Card、输入输出格式、工具接口、状态管理、生命周期钩子、任务模型、记忆 API 和护栏钩子。',
        essence: '<strong>1. Agent Card</strong>——JSON 清单：名称、版本、技能、支持的输入输出模式、协议版本、认证要求、端点。基于 A2A Agent Card。\n\n<strong>2. 输入输出格式</strong>——带角色、多模态组件（文本、文件、结构化数据）和元数据的标准化消息。兼容 A2A Messages 和 Parts。\n\n<strong>3. 工具接口</strong>——MCP 兼容的工具定义：名称、描述、JSON Schema 参数、返回 Schema。支持延迟加载和并行调用。\n\n<strong>4. 状态管理</strong>——带检查点和状态增量（基于 AG-UI STATE_DELTA）的标准状态表示。涵盖对话历史、工作记忆、Agent 特定状态。\n\n<strong>5. 生命周期钩子</strong>——RUN_STARTED、STEP_STARTED、STEP_FINISHED、RUN_FINISHED、RUN_ERROR、TOOL_CALL_START、TOOL_CALL_END、HANDOFF、PAUSE_FOR_APPROVAL、RESUME。\n\n<strong>6. 任务模型</strong>——A2A 兼容：任务作为工作单元，有 ID、生命周期（submitted → working → completed）和产出物。\n\n<strong>7. 记忆 API</strong>——跨记忆类型的标准读/写/搜索。可插拔后端（向量、图、SQL）。\n\n<strong>8. 护栏钩子</strong>——执行前输入验证、执行后输出验证、工具使用授权、花费限制。\n\n<strong>设计原则：</strong>\n— 与现有协议组合，而非替代\n— 框架无关：适用于 LangGraph、CrewAI、自定义\n— 渐进复杂度：简单 Agent 只需最小合规\n— 默认无状态：状态持久化是显式的、可插拔的',
        insight: '规范不是框架——是契约。它告诉你 Agent 应该暴露什么接口，而不是如何实现。就像 API 有 OpenAPI，Agent 也需要一个。',
        perspective2026: '到了 2026 年，形式化 Agent 规范真正重要，是因为生态正在变得异构：一个 Agent 可能用 MCP 接工具、用 AG-UI 发界面事件、用 Agent Card 做发现，但仍运行在某个框架私有运行时里。真正有价值的规范，会把重点放在互操作、能力协商和版本化契约上，而不是强迫所有 Agent 落进同一种实现模型。',
        pitfalls: [
          '把规范设计成“大一统框架”。有用的规范应该与现有协议组合，而不是试图替代它们。',
          '对简单 Agent 过度规范化。很多实用 Agent 根本不需要实现所有可选接口，最小合规同样重要。',
          '忽略版本管理和向后兼容。没有演进路径的规范，最终会破坏它本来想建立的互操作性。'
        ],
        furtherReading: [
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'Pydantic AI Agents 概念文档', url: 'https://docs.pydantic.dev/latest/concepts/agents/' },
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],
        crossRefs: [
          {
            chapterId: '16-mcp',
            reason: '工具互操作是当前 Agent 协议栈里最成熟的部分之一，也是形式化规范中工具接口的基础锚点。'
          },
          {
            chapterId: '18-ag-ui',
            reason: '当生命周期事件和状态增量映射到 AG-UI 一类界面事件时，规范会更容易落地。'
          },
          {
            chapterId: '26-guardrails',
            reason: '严肃的形式化规范不能只有传输和发现契约，还必须给安全与策略控制留出明确钩子。'
          }
        ],
        table: {
          title: '规范组件映射',
          headers: ['组件', '基于', '是否必须', '用途'],
          rows: [
            ['Agent Card',  'A2A Agent Card', '是',   '身份与发现'],
            ['输入输出格式', 'A2A Messages',   '是',   '互操作性'],
            ['工具接口',     'MCP',            '是',   '工具连接'],
            ['状态管理',     'AG-UI STATE_DELTA','可选','持久化与调试'],
            ['生命周期钩子', 'AG-UI 事件',      '可选', '可观测性'],
            ['任务模型',     'A2A Tasks',       '可选', '多 Agent 协调'],
            ['记忆 API',    '自定义',           '可选', '跨会话状态'],
            ['护栏钩子',     '自定义',           '推荐', '安全与合规'],
          ]
        }
      }
    }
  });
})();
