(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '12-tool-use',
    order: 12,

    nav:      { en: 'Tool Use',       zh: '工具调用' },
    title:    { en: 'Tool <span class="accent">Use</span>', zh: '工具 <span class="accent">调用</span>' },
    subtitle: { en: 'Function Calling · How Agents Act on the World', zh: 'Function Calling · Agent 如何作用于世界' },
    tag:      { en: 'Core Concept',   zh: '核心概念' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      return `
        <!-- LLM center -->
        ${S.box(300, 20, 160, 50, '#a78bfa', t(lang, 'LLM', '大模型'))}

        <!-- Tool definitions arrow down -->
        ${S.arrow(380, 70, 380, 110, '#6b84a8',
          t(lang, 'Tool definitions in prompt', '工具定义注入 prompt'))}

        <!-- Decision box -->
        ${S.box(280, 110, 200, 50, '#0071e3',
          t(lang, 'Decide: text or tool call?', '决策：文本还是工具调用？'))}

        <!-- Left: text output -->
        ${S.arrow(280, 135, 140, 135, '#1a8a3a')}
        ${S.box(40, 115, 140, 42, '#1a8a3a', t(lang, 'Text Response', '文本回复'))}

        <!-- Right: tool call -->
        ${S.arrow(480, 135, 560, 135, '#ff4d6d')}
        ${S.box(560, 115, 160, 42, '#ff4d6d',
          t(lang, 'Tool Call JSON', '工具调用 JSON'),
          t(lang, '{name, arguments}', '{name, arguments}'))}

        <!-- Tool execution -->
        ${S.arrow(640, 157, 640, 195, '#ff4d6d')}
        ${S.box(560, 195, 160, 42, '#ffb800',
          t(lang, 'Execute Tool', '执行工具'),
          t(lang, 'API / DB / Shell / ...', 'API / DB / Shell / ...'))}

        <!-- Result back -->
        ${S.arrow(560, 216, 480, 216, '#ffb800')}
        ${S.box(300, 195, 180, 42, '#0050a0',
          t(lang, 'Result → back to LLM', '结果 → 返回给大模型'))}

        <!-- Loop arrow back up -->
        <path d="M 380 195 L 380 180 Q 380 170 370 170 L 250 170 Q 240 170 240 160 L 240 140 Q 240 130 250 120"
          fill="none" stroke="#6b84a8" stroke-width="1.2" stroke-dasharray="4 3"
          marker-end="url(#arr)"/>
        <text x="240" y="180" text-anchor="middle" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'loop until done', '循环直到完成')}
        </text>

        <!-- Bottom: JSON Schema -->
        ${S.label(380, 265,
          t(lang, 'Tools defined via JSON Schema: { name, description, parameters: { type, properties, required } }',
                  '工具通过 JSON Schema 定义：{ name, description, parameters: { type, properties, required } }'),
          '#6b84a8', 10)}

        ${S.label(380, 285,
          t(lang, 'The model CHOOSES which tool to call — it is not hardcoded',
                  '模型自主选择调用哪个工具 — 而非硬编码'),
          '#ff4d6d', 10)}

        ${S.label(380, 305,
          t(lang, 'Tool use is the bridge between "thinking" and "doing"',
                  '工具调用是"思考"与"行动"之间的桥梁'),
          '#0071e3', 10)}
      `;
    },

    content: {
      en: {
        perspective2026: 'In 2026, tool use is no longer a niche "function calling" feature. It is the default execution surface for serious agents: models decide among strict schemas, parallel calls, local shells, browser actions, and protocol-backed tools such as MCP. The design challenge has shifted from "can the model call a tool?" to "can the host expose the right tool contract, safety policy, and result format?"',
        definition: 'Tool use (function calling) is the mechanism by which an LLM can <strong>invoke external functions</strong> instead of generating text. The model receives tool definitions in its prompt, decides when to call a tool, emits a structured JSON call, and receives the result — forming the core action loop of every Agent.',

        essence: 'Without tool use, an LLM is a pure text generator — it can reason but cannot act. Tool use is the bridge that turns reasoning into action.\n\n<strong>How it works:</strong>\n1. You define tools via JSON Schema — each tool has a <code>name</code>, <code>description</code>, and <code>parameters</code>\n2. These definitions are injected into the system prompt\n3. The model decides: should I respond with text, or call a tool?\n4. If tool call: the model emits <code>{"name": "search", "arguments": {"query": "..."}}</code>\n5. Your code executes the tool and returns the result\n6. The result goes back into the conversation, and the model continues\n\nThis loop repeats until the model decides no more tools are needed.\n\n<strong>Key insight:</strong> The model <em>chooses</em> which tool to call based on the task. It is not hardcoded routing — it is emergent behavior from good tool descriptions. Writing clear, specific tool descriptions is the single most impactful thing you can do to improve Agent reliability.',

        insight: 'The quality of your tool descriptions matters more than the quality of your system prompt. A model with 3 well-described tools will outperform one with 30 vaguely described tools. Think of tool descriptions as API documentation written for an extremely capable but literal reader.',

        pitfalls: [
          '把工具描述写成一句模糊口号。<strong>工具名、适用边界、参数语义、失败信号</strong> 不清楚时，模型会在错误时机调用错误工具。',
          '把工具调用当成“自动正确执行”。模型只负责提出调用，真正的鉴权、幂等、防注入、重试与超时处理仍然在宿主代码里。',
          '一次性暴露过多功能相近的工具。<code>search_docs</code>、<code>search_web</code>、<code>lookup_kb</code> 如果边界重叠，调用质量通常会明显下降。'
        ],

        furtherReading: [
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code Documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' }
        ],

        crossRefs: [
          {
            chapterId: '13-reasoning',
            reason: 'Reasoning patterns decide when a tool call is necessary, how many branches to explore, and when to stop acting.'
          },
          {
            chapterId: '16-mcp',
            reason: 'MCP standardizes how tools are described and invoked across hosts, which becomes important once tool ecosystems grow.'
          }
        ],

        code: `<span class="cmt">// Tool definition (JSON Schema)</span>
{
  <span class="str">"name"</span>: <span class="str">"search_web"</span>,
  <span class="str">"description"</span>: <span class="str">"Search the web for current info. Use when the user asks about recent events or facts you are unsure about."</span>,
  <span class="str">"parameters"</span>: {
    <span class="str">"type"</span>: <span class="str">"object"</span>,
    <span class="str">"properties"</span>: {
      <span class="str">"query"</span>: { <span class="str">"type"</span>: <span class="str">"string"</span>, <span class="str">"description"</span>: <span class="str">"Search query"</span> }
    },
    <span class="str">"required"</span>: [<span class="str">"query"</span>]
  }
}

<span class="cmt">// Model emits tool call</span>
{ <span class="str">"name"</span>: <span class="str">"search_web"</span>, <span class="str">"arguments"</span>: { <span class="str">"query"</span>: <span class="str">"MCP protocol 2025"</span> } }

<span class="cmt">// Your code executes → returns result → model continues</span>`,

        table: {
          title: 'Tool Use across providers',
          headers: ['Provider', 'Feature', 'Format', 'Parallel Calls', 'Strict Schema'],
          rows: [
            ['OpenAI',    'Function calling',  'JSON Schema in tools[]',           'Yes', 'Yes (strict: true)'],
            ['Anthropic', 'Tool use',          'JSON Schema in tools[]',           'Yes', 'Yes (auto-validated)'],
            ['Google',    'Function calling',  'FunctionDeclaration in tools[]',   'Yes', 'Yes'],
            ['MCP',       'Tool manifest',     'JSON-RPC 2.0 tool definitions',    'N/A', 'Server-defined'],
          ]
        }
      },

      zh: {
        perspective2026: '到了 2026 年，工具调用已经不再只是 API 里的一个“function calling”小功能，而是严肃 Agent 的默认执行面：模型会在严格 Schema、并行调用、本地 shell、浏览器动作以及 MCP 这类协议化工具之间做选择。真正的设计重点，已经从“模型能不能调工具”转向“宿主是否暴露了正确的工具契约、安全策略和结果格式”。',
        definition: '工具调用（Function Calling）是大模型<strong>调用外部函数</strong>而非生成文本的机制。模型在 prompt 中接收工具定义，自主决定何时调用工具，发出结构化 JSON 调用，接收结果——这构成了每个 Agent 的核心行动循环。',

        essence: '没有工具调用，大模型只是一个纯文本生成器——它能推理但无法行动。工具调用是将推理转化为行动的桥梁。\n\n<strong>工作原理：</strong>\n1. 通过 JSON Schema 定义工具——每个工具有 <code>name</code>、<code>description</code>、<code>parameters</code>\n2. 这些定义被注入 system prompt\n3. 模型决策：是回复文本，还是调用工具？\n4. 如果是工具调用：模型发出 <code>{"name": "search", "arguments": {"query": "..."}}</code>\n5. 你的代码执行工具并返回结果\n6. 结果回到对话中，模型继续处理\n\n这个循环反复执行，直到模型判断不再需要工具。\n\n<strong>关键洞见：</strong>模型<em>自主选择</em>调用哪个工具。这不是硬编码路由——而是从清晰的工具描述中涌现的行为。写好工具描述，是提升 Agent 可靠性最有效的一件事。',

        insight: '工具描述的质量比系统提示词的质量更重要。一个拥有 3 个描述精准工具的模型，会胜过一个有 30 个描述模糊工具的模型。把工具描述当作写给一个极其聪明但非常较真的读者的 API 文档。',

        pitfalls: [
          '把工具描述写成一句模糊口号。<strong>工具名、适用边界、参数语义、失败信号</strong> 不清楚时，模型就会在错误时机调用错误工具。',
          '把工具调用当成“自动正确执行”。模型只负责提出调用，真正的鉴权、幂等、防注入、重试和超时处理仍然在宿主代码里。',
          '一次性暴露过多功能相近的工具。<code>search_docs</code>、<code>search_web</code>、<code>lookup_kb</code> 如果边界重叠，调用质量通常会明显下降。'
        ],

        furtherReading: [
          { title: 'Anthropic：构建高效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Model Context Protocol 官网', url: 'https://modelcontextprotocol.io' }
        ],

        crossRefs: [
          {
            chapterId: '13-reasoning',
            reason: '推理模式决定了何时需要调工具、要不要并行探索多个分支，以及什么时候停止行动。'
          },
          {
            chapterId: '16-mcp',
            reason: '当工具生态变大后，MCP 会把工具描述与调用方式标准化，减少不同宿主之间的重复适配。'
          }
        ],

        code: `<span class="cmt">// 工具定义 (JSON Schema)</span>
{
  <span class="str">"name"</span>: <span class="str">"search_web"</span>,
  <span class="str">"description"</span>: <span class="str">"搜索网络获取最新信息。当用户询问近期事件或你不确定的事实时使用。"</span>,
  <span class="str">"parameters"</span>: {
    <span class="str">"type"</span>: <span class="str">"object"</span>,
    <span class="str">"properties"</span>: {
      <span class="str">"query"</span>: { <span class="str">"type"</span>: <span class="str">"string"</span>, <span class="str">"description"</span>: <span class="str">"搜索关键词"</span> }
    },
    <span class="str">"required"</span>: [<span class="str">"query"</span>]
  }
}

<span class="cmt">// 模型发出工具调用</span>
{ <span class="str">"name"</span>: <span class="str">"search_web"</span>, <span class="str">"arguments"</span>: { <span class="str">"query"</span>: <span class="str">"MCP 协议 2025"</span> } }

<span class="cmt">// 你的代码执行 → 返回结果 → 模型继续</span>`,

        table: {
          title: '各厂商工具调用对比',
          headers: ['厂商', '功能名称', '格式', '并行调用', '严格 Schema'],
          rows: [
            ['OpenAI',    'Function calling',  'tools[] 中的 JSON Schema',          '支持', '支持 (strict: true)'],
            ['Anthropic', 'Tool use',          'tools[] 中的 JSON Schema',          '支持', '支持（自动验证）'],
            ['Google',    'Function calling',  'tools[] 中的 FunctionDeclaration',  '支持', '支持'],
            ['MCP',       '工具清单',           'JSON-RPC 2.0 工具定义',              'N/A',  '服务端定义'],
          ]
        }
      }
    }
  });
})();
