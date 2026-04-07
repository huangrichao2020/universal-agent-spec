(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '21-lowcode',
    order: 21,
    nav:      { en: 'Low-Code',        zh: '低代码平台' },
    title:    { en: 'Low-Code <span class="accent">Platforms</span>', zh: '低代码 <span class="accent">平台</span>' },
    subtitle: { en: 'Dify · Coze · n8n · Visual Agent Building', zh: 'Dify · Coze · n8n · 可视化 Agent 构建' },
    tag:      { en: 'Infrastructure',  zh: '基础设施' },
    tagClass: 'tag-infra',
    viewBox: '0 0 760 260',
    getSvg(lang) {
      const platforms = [
        { x: 40, color: '#0071e3', name: 'Dify', stars: '111k+', sub: t(lang, 'Full-featured', '全功能') },
        { x: 280, color: '#ff4d6d', name: 'Coze', stars: t(lang, 'ByteDance', '字节跳动'), sub: t(lang, 'No-code chatbot', '零代码聊天机器人') },
        { x: 520, color: '#ffb800', name: 'n8n', stars: '60k+', sub: t(lang, 'Workflow automation', '工作流自动化') },
      ];
      let svg = '';
      platforms.forEach(p => {
        svg += S.box(p.x, 20, 200, 50, p.color, p.name, p.sub);
        svg += `<text x="${p.x + 100}" y="90" text-anchor="middle" fill="${p.color}88" font-family="'JetBrains Mono',monospace" font-size="8">⭐ ${p.stars}</text>`;
      });
      // Features comparison
      const features = [
        { y: 110, label: t(lang, 'Visual workflow', '可视化工作流'), dify: '●', coze: '●', n8n: '●' },
        { y: 128, label: t(lang, 'Built-in RAG', '内置 RAG'), dify: '●', coze: '●', n8n: '○' },
        { y: 146, label: t(lang, 'Self-hosted', '可自部署'), dify: '●', coze: '○', n8n: '●' },
        { y: 164, label: t(lang, 'Code extensible', '代码可扩展'), dify: '●', coze: '△', n8n: '●' },
        { y: 182, label: t(lang, 'Model support', '模型支持'), dify: t(lang, 'All', '全部'), coze: t(lang, 'Top-tier', '头部'), n8n: t(lang, 'All', '全部') },
      ];
      features.forEach(f => {
        svg += `<text x="40" y="${f.y}" fill="#6b84a8" font-family="'JetBrains Mono',monospace" font-size="9">${f.label}</text>`;
        svg += `<text x="340" y="${f.y}" text-anchor="middle" fill="#0071e3" font-family="'JetBrains Mono',monospace" font-size="9">${f.dify}</text>`;
        svg += `<text x="480" y="${f.y}" text-anchor="middle" fill="#ff4d6d" font-family="'JetBrains Mono',monospace" font-size="9">${f.coze}</text>`;
        svg += `<text x="620" y="${f.y}" text-anchor="middle" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="9">${f.n8n}</text>`;
      });
      svg += S.label(380, 216,
        t(lang, 'Low-code for speed, code-first for control. Most teams need both.',
                '低代码求速度，代码优先求控制。大多数团队两者都需要。'),
        '#6b84a8', 10);
      svg += S.label(380, 236,
        t(lang, 'Dify: production AI apps | Coze: chatbots | n8n: automation workflows',
                'Dify：生产级 AI 应用 | Coze：聊天机器人 | n8n：自动化工作流'),
        '#6b84a8', 10);
      return svg;
    },
    content: {
      en: {
        definition: 'Low-code agent platforms provide <strong>visual interfaces</strong> for building AI agents without deep coding. They trade customization for speed, enabling non-engineers to build and iterate on agent workflows.',
        essence: '<strong>Dify</strong> (111k+ GitHub stars) — The most complete open-source platform. Visual workflow builder + built-in RAG engine + agent orchestration. Supports all major model providers including self-hosted. Best for complex production AI applications.\n\n<strong>Coze</strong> (ByteDance) — No-code chatbot builder with drag-and-drop interface. Coze Studio open-sourced July 2025. Integrates top-tier models. Best for task-specific automated chatbots. Domestic version supports Chinese models.\n\n<strong>n8n</strong> (60k+ GitHub stars) — Open-source workflow automation. More technical than Dify/Coze, requiring some scripting. Alternative to Zapier with AI agent capabilities. Best for connecting existing tools and APIs.\n\n<strong>When to choose low-code vs code-first:</strong>\n— Low-code: rapid prototyping, business user enablement, simple integrations, demo-ready in hours\n— Code-first: custom orchestration, complex state management, fine-grained control, production reliability\n— Most mature teams use both: low-code for exploration, code-first for production',
        insight: 'The gap between low-code and code-first is shrinking fast. Dify\'s workflow builder can handle surprisingly complex agent logic. But when you need custom state machines, checkpointing, or unusual orchestration patterns, you\'ll outgrow visual builders.',
        perspective2026: 'By 2026, low-code agent platforms have become a collaboration surface between product, operations, and engineering teams rather than just a demo builder. The real differentiators are governance, approval checkpoints, MCP connectivity, deployment controls, and whether workflows can graduate cleanly into code-managed production systems.',
        pitfalls: [
          'Treating low-code as a way to avoid architecture. Visual blocks still hide decisions about state, retries, auth, and failure recovery.',
          'Forcing complex state machines into a canvas that was designed for linear workflows, which creates fragile flows that are hard to debug.',
          'Ignoring versioning, test environments, and release discipline because the interface feels simple. Operational debt still accumulates.'
        ],
        furtherReading: [
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '20-frameworks',
            reason: 'Low-code and code-first frameworks solve overlapping problems, but they diverge in how much orchestration control and runtime ownership a team keeps.'
          },
          {
            chapterId: '16-mcp',
            reason: 'MCP is increasingly the cleanest way for low-code platforms to connect external tools without bespoke per-platform integrations.'
          },
          {
            chapterId: '25-observability',
            reason: 'Visual workflows still need traces, cost attribution, and failure analysis once they move beyond toy demos.'
          }
        ],
        table: {
          title: 'Low-code platform comparison',
          headers: ['Platform', 'Best For', 'Self-hosted', 'RAG', 'Coding Need'],
          rows: [
            ['Dify',  'Production AI apps',     'Yes (OSS)',   'Built-in',    'Optional'],
            ['Coze',  'Chatbots',               'No (SaaS)',   'Built-in',    'None'],
            ['n8n',   'Workflow automation',     'Yes (OSS)',   'Via plugins', 'Some scripting'],
          ]
        }
      },
      zh: {
        definition: '低代码 Agent 平台提供<strong>可视化界面</strong>来构建 AI Agent，无需深入编码。它们用定制化换取速度，让非工程师也能构建和迭代 Agent 工作流。',
        essence: '<strong>Dify</strong>（111k+ GitHub Stars）— 最完整的开源平台。可视化工作流 + 内置 RAG 引擎 + Agent 编排。支持所有主流模型提供商包括自部署。最适合复杂的生产级 AI 应用。\n\n<strong>Coze</strong>（字节跳动）— 零代码聊天机器人构建器。Coze Studio 2025年7月开源。集成头部模型。最适合任务特定的自动化聊天机器人。国内版支持中文模型。\n\n<strong>n8n</strong>（60k+ GitHub Stars）— 开源工作流自动化。比 Dify/Coze 更技术化，需要一些脚本编写。Zapier 的 AI 替代品。最适合连接现有工具和 API。\n\n<strong>何时选择低代码 vs 代码优先：</strong>\n— 低代码：快速原型、业务用户赋能、简单集成、数小时内可演示\n— 代码优先：自定义编排、复杂状态管理、精细控制、生产可靠性\n— 大多数成熟团队两者都用：低代码探索，代码优先上生产',
        insight: '低代码和代码优先之间的差距在快速缩小。Dify 的工作流构建器能处理出人意料的复杂 Agent 逻辑。但当你需要自定义状态机、检查点或特殊编排模式时，你会超越可视化构建器的能力。',
        perspective2026: '到了 2026 年，低代码 Agent 平台已经从“做 demo 的工具”升级成产品、运营、工程协作的工作台。真正拉开差距的，不再只是能不能拖拉拽，而是治理能力、审批节点、MCP 连接方式、部署边界，以及流程能否平滑升级到代码托管的生产系统。',
        pitfalls: [
          '把低代码理解成“免架构”。可视化节点背后依然有状态、重试、鉴权和失败恢复等系统决策。',
          '把复杂状态机硬塞进本来只适合线性流程的画布，最终得到脆弱且难调试的流程图。',
          '因为界面简单就忽视版本管理、测试环境和发布纪律，结果运维债务照样持续累积。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '20-frameworks',
            reason: '低代码平台和代码优先框架解决的问题有重叠，但它们在编排控制权和运行时归属上的取舍完全不同。'
          },
          {
            chapterId: '16-mcp',
            reason: '随着工具连接标准化，MCP 正在成为低代码平台接外部工具时比平台私有插件更干净的路径。'
          },
          {
            chapterId: '25-observability',
            reason: '一旦低代码流程离开玩具 demo 阶段，同样需要链路、成本归因和故障分析。'
          }
        ],
        table: {
          title: '低代码平台对比',
          headers: ['平台', '最适场景', '可自部署', 'RAG', '编码需求'],
          rows: [
            ['Dify',  '生产级 AI 应用',  '是（开源）', '内置',     '可选'],
            ['Coze',  '聊天机器人',       '否（SaaS）','内置',     '无需'],
            ['n8n',   '工作流自动化',     '是（开源）', '通过插件', '需少量脚本'],
          ]
        }
      }
    }
  });
})();
