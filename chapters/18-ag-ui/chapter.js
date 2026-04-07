(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '18-ag-ui',
    order: 18,

    nav:      { en: 'AG-UI',           zh: 'AG-UI 协议' },
    title:    { en: '<span class="accent">AG-UI</span> Protocol', zh: '<span class="accent">AG-UI</span> 协议' },
    subtitle: { en: 'Agent-to-User Interface · Bridging Agents & Frontend', zh: 'Agent-to-User · 连接 Agent 与前端' },
    tag:      { en: 'Infrastructure',  zh: '基础设施' },
    tagClass: 'tag-infra',

    viewBox: '0 0 760 280',

    getSvg(lang) {
      // Agent backend
      const agent = S.box(40, 30, 180, 50, '#a78bfa',
        t(lang, 'Agent Backend', 'Agent 后端'),
        t(lang, 'Any framework', '任意框架'));

      // AG-UI stream
      const stream = S.box(280, 30, 200, 50, '#0071e3',
        t(lang, 'AG-UI Event Stream', 'AG-UI 事件流'),
        t(lang, 'HTTP + streaming JSON', 'HTTP + 流式 JSON'));

      // Frontend
      const ui = S.box(540, 30, 180, 50, '#1a8a3a',
        t(lang, 'Frontend UI', '前端界面'),
        t(lang, 'React / Vue / Any', 'React / Vue / 任意'));

      const a1 = S.arrow(220, 55, 280, 55, '#6b84a8');
      const a2 = S.arrow(480, 55, 540, 55, '#6b84a8');

      // Event types grid
      const events = `
        <rect x="40" y="110" width="680" height="100" rx="5" fill="#f0f4ff" stroke="#0071e380" stroke-width="1"/>
        <text x="380" y="128" text-anchor="middle" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, '~16 Event Types', '约 16 种事件类型')}
        </text>

        ${S.box(50, 138, 100, 28, '#a78bfa', 'RUN_STARTED', '')}
        ${S.box(160, 138, 100, 28, '#0071e3', 'TEXT_MESSAGE', '')}
        ${S.box(270, 138, 100, 28, '#ff4d6d', 'TOOL_CALL', '')}
        ${S.box(380, 138, 110, 28, '#ffb800', 'STATE_DELTA', '')}
        ${S.box(500, 138, 110, 28, '#1a8a3a', 'STEP_STARTED', '')}
        ${S.box(620, 138, 90, 28, '#0050a0', 'CUSTOM', '')}

        <text x="380" y="190" text-anchor="middle" fill="#6b84a888" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Lifecycle | Messages | Tool Calls | State | Steps | Special Events',
                  '生命周期 | 消息 | 工具调用 | 状态 | 步骤 | 特殊事件')}
        </text>
      `;

      return `
        ${agent}${stream}${ui}${a1}${a2}${events}

        ${S.label(380, 232,
          t(lang, 'AG-UI standardizes how agents talk to user interfaces',
                  'AG-UI 标准化 Agent 与用户界面的通信'),
          '#6b84a8', 10)}
        ${S.label(380, 250,
          t(lang, 'Supports: text streaming, tool call visualization, state sync, approval pauses',
                  '支持：文本流、工具调用可视化、状态同步、审批暂停'),
          '#0071e3', 10)}
        ${S.label(380, 268,
          t(lang, 'MCP: agent↔tool | A2A: agent↔agent | AG-UI: agent↔user',
                  'MCP：Agent↔工具 | A2A：Agent↔Agent | AG-UI：Agent↔用户'),
          '#ff4d6d', 10)}
      `;
    },

    content: {
      en: {
        perspective2026: 'In 2026, agent UX is no longer just a chat box streaming tokens. Users expect to see steps, tool calls, approvals, resumable runs, and synchronized task state across tabs and devices. AG-UI matters because trust in agents is built through visibility and control. A frontend that only renders text cannot explain what a modern agent is actually doing.',
        definition: 'AG-UI (Agent-User Interaction Protocol) is an <strong>open-source protocol</strong> that standardizes how AI agents communicate with frontend user interfaces. It defines ~16 event types covering lifecycle, messages, tool calls, state management, and approval flows.',

        essence: '<strong>The problem:</strong> Every agent framework renders its output differently. LangGraph has its own streaming format. CrewAI has another. Building a universal agent UI means handling N different output formats.\n\n<strong>AG-UI solves this</strong> with a single streaming event protocol:\n\n— <em>Lifecycle events:</em> RUN_STARTED, RUN_FINISHED, RUN_ERROR, STEP_STARTED, STEP_FINISHED\n— <em>Message events:</em> TEXT_MESSAGE_START, TEXT_MESSAGE_CONTENT (streaming text), TEXT_MESSAGE_END\n— <em>Tool events:</em> TOOL_CALL_START, TOOL_CALL_ARGS, TOOL_CALL_END\n— <em>State events:</em> STATE_SNAPSHOT (full state), STATE_DELTA (incremental update)\n— <em>Special events:</em> CUSTOM (extensible), MESSAGES_SNAPSHOT\n\n<strong>Key feature: STATE_DELTA.</strong> The agent can push incremental state updates to the frontend, enabling real-time collaboration. The frontend knows exactly what the agent is thinking and doing.\n\n<strong>Key feature: Approval pauses.</strong> The agent can pause execution at critical points (e.g., before deleting files) and wait for user approval via the UI.',

        insight: 'AG-UI completes the protocol stack: MCP connects agents to tools (vertical), A2A connects agents to agents (horizontal), AG-UI connects agents to users (upward). Together, they form a complete communication layer for the agent ecosystem.',

        pitfalls: [
          '把 AG-UI 当成“文本流协议”。如果只渲染聊天文本而忽略<strong>state、tool、approval、resume</strong> 事件，前端就失去了协议的核心价值。',
          '把内部推理或危险操作无筛选地全部展示给用户。可观察性很重要，但暴露边界、权限提示和 UI 文案同样重要。',
          '只做首屏流式效果，不做断线恢复与状态快照。真实长任务里，刷新页面或切设备之后还能恢复上下文，才算可用。'
        ],

        furtherReading: [
          { title: 'AG-UI Documentation', url: 'https://docs.ag-ui.com' },
          { title: 'Claude Code Documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],

        crossRefs: [
          {
            chapterId: '14-react',
            reason: 'AG-UI is one of the cleanest ways to surface a ReAct loop to the user as visible steps, tool traces, and approvals.'
          },
          {
            chapterId: '19-protocol-stack',
            reason: 'The protocol-stack chapter shows AG-UI as the top layer that connects the agent system to humans.'
          }
        ],

        table: {
          title: 'AG-UI event categories',
          headers: ['Category', 'Events', 'Purpose'],
          rows: [
            ['Lifecycle',  'RUN_STARTED/FINISHED/ERROR, STEP_*',     'Track agent execution progress'],
            ['Messages',   'TEXT_MESSAGE_START/CONTENT/END',          'Stream text output to UI'],
            ['Tool Calls', 'TOOL_CALL_START/ARGS/END',               'Visualize tool usage in real-time'],
            ['State',      'STATE_SNAPSHOT, STATE_DELTA',             'Sync agent state with frontend'],
            ['Special',    'CUSTOM, MESSAGES_SNAPSHOT',               'Extension point + bulk sync'],
          ]
        }
      },

      zh: {
        perspective2026: '到了 2026 年，Agent 的用户体验早就不只是“聊天框里流式吐字”。用户希望看到步骤、工具调用、审批节点、可恢复的运行状态，以及跨标签页/跨设备同步的任务状态。AG-UI 重要，不是因为它能多传几个事件，而是因为用户对 Agent 的信任，建立在可见性与可控性之上。一个只会渲染文本的前端，根本解释不了现代 Agent 在做什么。',
        definition: 'AG-UI（Agent-User Interaction Protocol）是一个<strong>开源协议</strong>，标准化 AI Agent 与前端用户界面的通信。它定义了约 16 种事件类型，涵盖生命周期、消息、工具调用、状态管理和审批流程。',

        essence: '<strong>问题：</strong>每个 Agent 框架渲染输出的方式不同。LangGraph 有自己的流式格式，CrewAI 有另一种。构建通用 Agent UI 意味着处理 N 种不同的输出格式。\n\n<strong>AG-UI 用单一流式事件协议解决：</strong>\n\n— <em>生命周期事件：</em>RUN_STARTED、RUN_FINISHED、RUN_ERROR、STEP_STARTED、STEP_FINISHED\n— <em>消息事件：</em>TEXT_MESSAGE_START、TEXT_MESSAGE_CONTENT（流式文本）、TEXT_MESSAGE_END\n— <em>工具事件：</em>TOOL_CALL_START、TOOL_CALL_ARGS、TOOL_CALL_END\n— <em>状态事件：</em>STATE_SNAPSHOT（全量状态）、STATE_DELTA（增量更新）\n— <em>特殊事件：</em>CUSTOM（可扩展）、MESSAGES_SNAPSHOT\n\n<strong>关键特性：STATE_DELTA。</strong>Agent 可以向前端推送增量状态更新，实现实时协作。前端精确知道 Agent 在想什么、做什么。\n\n<strong>关键特性：审批暂停。</strong>Agent 可以在关键点（如删除文件前）暂停执行，通过 UI 等待用户批准。',

        insight: 'AG-UI 完成了协议栈：MCP 连接 Agent 与工具（纵向），A2A 连接 Agent 与 Agent（横向），AG-UI 连接 Agent 与用户（向上）。三者共同构成 Agent 生态系统的完整通信层。',

        pitfalls: [
          '把 AG-UI 当成“文本流协议”。如果只渲染聊天文本而忽略<strong>state、tool、approval、resume</strong> 事件，前端就失去了协议的核心价值。',
          '把内部推理或危险操作无筛选地全部展示给用户。可观察性很重要，但暴露边界、权限提示和 UI 文案同样重要。',
          '只做首屏流式效果，不做断线恢复与状态快照。真实长任务里，刷新页面或切设备之后还能恢复上下文，才算可用。'
        ],

        furtherReading: [
          { title: 'AG-UI 文档', url: 'https://docs.ag-ui.com' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic：构建高效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],

        crossRefs: [
          {
            chapterId: '14-react',
            reason: 'AG-UI 是把 ReAct 循环暴露给用户的理想方式之一，能把步骤、工具轨迹和审批节点清楚呈现出来。'
          },
          {
            chapterId: '19-protocol-stack',
            reason: '协议栈一章会把 AG-UI 放在最上层，说明它如何把 Agent 系统连接到人类用户。'
          }
        ],

        table: {
          title: 'AG-UI 事件分类',
          headers: ['类别', '事件', '用途'],
          rows: [
            ['生命周期', 'RUN_STARTED/FINISHED/ERROR, STEP_*',     '追踪 Agent 执行进度'],
            ['消息',     'TEXT_MESSAGE_START/CONTENT/END',          '向 UI 流式输出文本'],
            ['工具调用', 'TOOL_CALL_START/ARGS/END',               '实时可视化工具使用'],
            ['状态',     'STATE_SNAPSHOT, STATE_DELTA',             'Agent 状态与前端同步'],
            ['特殊',     'CUSTOM, MESSAGES_SNAPSHOT',               '扩展点 + 批量同步'],
          ]
        }
      }
    }
  });
})();
