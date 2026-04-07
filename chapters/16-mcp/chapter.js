(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '16-mcp',
    order: 16,

    nav:      { en: 'MCP Protocol',    zh: 'MCP 协议' },
    title:    { en: '<span class="accent">MCP</span> Protocol', zh: '<span class="accent">MCP</span> 协议' },
    subtitle: { en: 'Model Context Protocol · USB-C for AI Tools', zh: 'Model Context Protocol · AI 工具的 USB-C' },
    tag:      { en: 'Infrastructure',  zh: '基础设施' },
    tagClass: 'tag-infra',

    viewBox: '0 0 760 290',

    getSvg(lang) {
      // MCP Server
      const server = S.box(40, 30, 180, 50, '#1a8a3a',
        t(lang, 'MCP Server', 'MCP 服务端'),
        t(lang, 'Exposes tools via JSON-RPC', '通过 JSON-RPC 暴露工具'));

      // Tool manifest
      const manifest = `
        <rect x="40" y="100" width="180" height="70" rx="5" fill="#1a8a3a12" stroke="#1a8a3a" stroke-width="1"/>
        <text x="130" y="118" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="600">
          ${t(lang, 'Tool Manifest', '工具清单')}
        </text>
        <text x="55" y="135" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">
          tools/list → [{name, desc,
        </text>
        <text x="55" y="148" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">
          inputSchema}]
        </text>
        <text x="55" y="161" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">
          tools/call → {result}
        </text>
      `;

      // MCP Client (LLM Host)
      const client = S.box(540, 30, 180, 50, '#0071e3',
        t(lang, 'MCP Client', 'MCP 客户端'),
        t(lang, 'LLM Host (Codex, Claude...)', 'LLM 宿主 (Codex, Claude...)'));

      // Connection
      const conn = `
        ${S.arrow(220, 55, 540, 55, '#a78bfa',
          t(lang, 'JSON-RPC 2.0 / HTTP+SSE', 'JSON-RPC 2.0 / HTTP+SSE'))}
      `;

      // Multiple servers fan-in
      const servers = `
        ${S.box(40, 195, 130, 36, '#ff4d6d', 'GitHub MCP', '')}
        ${S.box(200, 195, 130, 36, '#ffb800', 'Slack MCP', '')}
        ${S.box(360, 195, 130, 36, '#0050a0', 'DB MCP', '')}
        ${S.box(520, 195, 130, 36, '#a78bfa', 'FileSystem', '')}
        ${S.arrow(105, 195, 380, 110, '#ff4d6d44')}
        ${S.arrow(265, 195, 450, 110, '#ffb80044')}
        ${S.arrow(425, 195, 520, 110, '#0050a044')}
        ${S.arrow(585, 195, 630, 80, '#a78bfa44')}
      `;

      // Agent in the middle
      const agent = S.box(340, 90, 140, 40, '#a78bfa',
        t(lang, 'Agent', 'Agent'),
        t(lang, 'connects to N servers', '连接 N 个服务'));

      return `
        ${server}${manifest}${client}${conn}${agent}${servers}

        ${S.label(380, 250,
          t(lang, 'MCP = standardized tool connectivity. One protocol, any tool, any LLM host.',
                  'MCP = 标准化工具连接。一个协议，任何工具，任何 LLM 宿主。'),
          '#6b84a8', 10)}
        ${S.label(380, 268,
          t(lang, 'Anthropic (2024) → OpenAI adopted (2025) → Linux Foundation (2025)',
                  'Anthropic (2024) → OpenAI 采用 (2025) → Linux 基金会 (2025)'),
          '#1a8a3a', 10)}
        ${S.label(380, 286,
          t(lang, 'Think of it as USB-C: plug any peripheral into any computer',
                  '可以理解为 USB-C：任何外设都能插到任何电脑上'),
          '#0071e3', 10)}
      `;
    },

    content: {
      en: {
        perspective2026: 'By 2026, MCP has shifted from a clever tool-integration idea to the default interoperability layer for serious agent hosts. The practical discussion is no longer "should we expose tools?" but "how do we standardize transport, auth, long-running tasks, resources, and prompts across many hosts and servers?" Teams adopting MCP are optimizing for portability and operational control, not just convenience.',
        definition: 'MCP (Model Context Protocol) is an <strong>open standard</strong> for connecting AI agents to external tools and data sources. It uses JSON-RPC 2.0 over HTTP to let any LLM host discover and call tools from any MCP server — like USB-C for AI.',

        essence: '<strong>Before MCP:</strong> Every tool integration was custom. Want to connect Claude to GitHub? Write custom code. Connect to Slack? Write more custom code. Connect to a database? Yet more custom code. N tools × M hosts = N×M integrations.\n\n<strong>After MCP:</strong> Each tool publishes an MCP server once. Each LLM host implements the MCP client once. N tools + M hosts = N+M integrations.\n\n<strong>How it works:</strong>\n1. MCP Server exposes a <code>tools/list</code> endpoint → returns tool names, descriptions, JSON Schema parameters\n2. MCP Client (the LLM host) fetches the tool list and injects them into the model\'s context\n3. When the model calls a tool, the client sends <code>tools/call</code> to the server\n4. Server executes and returns the result\n\n<strong>Key milestones:</strong>\n— Nov 2024: Anthropic introduces MCP\n— Mar 2025: OpenAI adopts MCP\n— Nov 2025: Major spec update (async, auth, long-running)\n— Dec 2025: Donated to Linux Foundation (AAIF)',

        insight: 'MCP is the most impactful protocol in the Agent ecosystem. It solved the "integration explosion" problem. Before building any custom tool integration, check if an MCP server already exists. There are thousands.',

        pitfalls: [
          '把 MCP 误解成“万能 Agent 协议”。MCP 主要解决的是<strong>工具与上下文接入</strong>，不是跨 Agent 任务协作的全部问题。',
          '暴露 MCP Server 就等于默认安全。鉴权、权限边界、审计日志和危险工具审批仍然要由宿主和服务端共同落实。',
          '把现有 API 机械包一层就算完成迁移。优秀的 MCP Server 还需要清晰的工具描述、稳定的输入 Schema、可恢复的错误语义。'
        ],

        furtherReading: [
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'Claude Code Documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],

        crossRefs: [
          {
            chapterId: '12-tool-use',
            reason: 'MCP becomes relevant after you understand basic tool calling, because it standardizes how those tools are exposed to hosts.'
          },
          {
            chapterId: '19-protocol-stack',
            reason: 'The protocol-stack chapter places MCP in the bottom layer and contrasts it with A2A and AG-UI.'
          }
        ],

        table: {
          title: 'MCP at a glance',
          headers: ['Aspect', 'Detail'],
          rows: [
            ['Transport',     'HTTP + SSE (streaming), also supports stdio'],
            ['Data format',   'JSON-RPC 2.0'],
            ['Tool schema',   'JSON Schema (name, description, inputSchema)'],
            ['Auth',          'OAuth 2.1 (Nov 2025 spec)'],
            ['Capabilities',  'Tools, Resources, Prompts, Sampling'],
            ['Adoption',      'Anthropic, OpenAI, Google, 1000+ community servers'],
          ]
        }
      },

      zh: {
        perspective2026: '到了 2026 年，MCP 已经从“一个聪明的工具集成想法”变成了严肃 Agent 宿主默认考虑的互操作层。大家讨论的重点不再是“要不要暴露工具”，而是“如何在多个宿主和服务端之间把传输、鉴权、长时任务、资源与提示词标准化”。采用 MCP 的团队优化的目标，是可移植性和运维控制，而不只是接入方便。',
        definition: 'MCP（Model Context Protocol）是一个连接 AI Agent 与外部工具和数据源的<strong>开放标准</strong>。它使用 HTTP 上的 JSON-RPC 2.0，让任何 LLM 宿主发现并调用任何 MCP 服务器的工具——如同 AI 的 USB-C。',

        essence: '<strong>MCP 之前：</strong>每个工具集成都是定制的。想把 Claude 连接 GitHub？写定制代码。连接 Slack？再写。连接数据库？再写。N 个工具 × M 个宿主 = N×M 个集成。\n\n<strong>MCP 之后：</strong>每个工具发布一次 MCP 服务端。每个 LLM 宿主实现一次 MCP 客户端。N 个工具 + M 个宿主 = N+M 个集成。\n\n<strong>工作原理：</strong>\n1. MCP 服务端暴露 <code>tools/list</code> 端点 → 返回工具名称、描述、JSON Schema 参数\n2. MCP 客户端（LLM 宿主）获取工具列表并注入模型上下文\n3. 模型调用工具时，客户端向服务端发送 <code>tools/call</code>\n4. 服务端执行并返回结果\n\n<strong>关键里程碑：</strong>\n— 2024年11月：Anthropic 推出 MCP\n— 2025年3月：OpenAI 采用 MCP\n— 2025年11月：重大规范更新（异步、认证、长时运行）\n— 2025年12月：捐赠给 Linux 基金会（AAIF）',

        insight: 'MCP 是 Agent 生态系统中影响力最大的协议。它解决了"集成爆炸"问题。在构建任何自定义工具集成之前，先查查是否已有 MCP 服务端。已有数千个。',

        pitfalls: [
          '把 MCP 误解成“万能 Agent 协议”。MCP 主要解决的是<strong>工具与上下文接入</strong>，不是跨 Agent 任务协作的全部问题。',
          '暴露 MCP Server 就等于默认安全。鉴权、权限边界、审计日志和危险工具审批，仍然要由宿主和服务端共同落实。',
          '把现有 API 机械包一层就算完成迁移。优秀的 MCP Server 还需要清晰的工具描述、稳定的输入 Schema 和可恢复的错误语义。'
        ],

        furtherReading: [
          { title: 'Model Context Protocol 官网', url: 'https://modelcontextprotocol.io' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic：构建高效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],

        crossRefs: [
          {
            chapterId: '12-tool-use',
            reason: '只有先理解基础工具调用，才能看明白 MCP 为什么要把工具暴露方式标准化。'
          },
          {
            chapterId: '19-protocol-stack',
            reason: '协议栈一章会把 MCP 放在最底层，并和 A2A、AG-UI 的职责边界放到同一张图里比较。'
          }
        ],

        table: {
          title: 'MCP 一览',
          headers: ['方面', '详情'],
          rows: [
            ['传输层',   'HTTP + SSE（流式），也支持 stdio'],
            ['数据格式', 'JSON-RPC 2.0'],
            ['工具定义', 'JSON Schema (name, description, inputSchema)'],
            ['认证',     'OAuth 2.1（2025年11月规范）'],
            ['能力',     '工具、资源、提示词、采样'],
            ['采用方',   'Anthropic、OpenAI、Google、1000+ 社区服务端'],
          ]
        }
      }
    }
  });
})();
