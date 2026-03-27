(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '00-llm-api',
    order: 0,

    nav:      { en: 'LLM API',      zh: '大模型 API' },
    title:    { en: 'LLM <span class="accent">API</span>', zh: '大模型 <span class="accent">API</span>' },
    subtitle: { en: 'Infrastructure Layer · Stateless Function', zh: 'Large Language Model API · 基础设施层' },
    tag:      { en: 'Infrastructure', zh: '基础设施' },
    tagClass: 'tag-infra',

    viewBox: '0 0 760 210',

    getSvg(lang) {
      return `
        <ellipse cx="380" cy="85" rx="130" ry="52"
          fill="#a78bfa18" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4 3"/>
        <text x="380" y="80" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="14" font-weight="500">
          ${t(lang, 'LLM API', '大模型 API')}
        </text>
        <text x="380" y="100" text-anchor="middle" fill="#a78bfa88"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'Stateless · Each call independent', '无状态 · 每次独立')}
        </text>

        ${S.box(55, 148, 130, 42, '#00c8ff', t(lang, 'Your App', '你的程序'))}
        ${S.box(315, 148, 90, 42, '#ffb800', 'curl', '')}
        ${S.box(575, 148, 130, 42, '#00e599', t(lang, 'Any Client', '任何客户端'))}

        <line x1="120" y1="148" x2="330" y2="110"
          stroke="#00c8ff" stroke-width="1.5" marker-end="url(#arrC)"/>
        <line x1="360" y1="148" x2="368" y2="112"
          stroke="#ffb800" stroke-width="1.5" marker-end="url(#arrA)"/>
        <line x1="640" y1="148" x2="450" y2="110"
          stroke="#00e599" stroke-width="1.5" marker-end="url(#arr)"/>

        ${S.label(380, 205,
          t(lang, 'POST /v1/messages → Input → Process → Output → Each call is independent',
                  'POST /v1/messages → 输入→处理→输出 → 每次调用完全独立'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'An HTTP endpoint exposed by LLM providers (OpenAI, Anthropic, Alibaba Cloud, etc.) that accepts text input and returns text output. <strong>It is a stateless function</strong> — it has no memory of you; every call starts from zero.',
        essence: 'Many people think "integrating the GPT API" gives them an AI assistant. In reality, they are just making a memoryless phone call each time. <em>The model itself has no memory, no state, no will.</em> It is an extraordinarily complex "text continuation function." The entire purpose of Agent architecture is to build <strong>continuity, specialization, and executability</strong> on top of this stateless function.',
        insight: 'Statelessness is a deliberate design choice for LLM APIs, not a flaw. It enables millions of concurrent requests. The Agent layer solves the "stateful" problem.',
        table: {
          title: 'LLM API vs Traditional API',
          headers: ['Dimension', 'Traditional API', 'LLM API'],
          rows: [
            ['Input', 'Structured parameters', 'Natural language text'],
            ['Output', 'Deterministic result', 'Probabilistic generated text'],
            ['State', 'Optional', '<strong>Always stateless</strong>'],
            ['Cost model', 'Per call', 'Per token'],
          ]
        }
      },
      zh: {
        definition: '大模型厂商（OpenAI / Anthropic / 阿里云等）暴露的 HTTP 接口。接收文本输入，返回文本输出。<strong>本质是一个无状态函数</strong>——不记得你，每次调用都从零开始。',
        essence: '很多人以为"接入了 GPT API"就拥有了一个 AI 助手，其实只是每次打了一个无记忆的电话。<em>大模型本身没有记忆、没有状态、没有意志</em>。它只是一个极其复杂的"文字续写函数"。Agent 架构的全部意义，就是在这个无状态函数之外，构建出<strong>持续性、专业性、可执行性</strong>。',
        insight: '无状态是大模型 API 的设计选择，不是缺陷。正是这种无状态性，让它可以并发处理数百万请求。Agent 层负责解决"有状态"的问题。',
        table: {
          title: '与传统 API 的对比',
          headers: ['维度', '传统业务 API', '大模型 API'],
          rows: [
            ['输入', '结构化参数', '自然语言文本'],
            ['输出', '确定性结果', '概率性生成文本'],
            ['状态', '可有可无', '<strong>永远无状态</strong>'],
            ['成本模型', '按调用次数', '按 Token 数量'],
          ]
        }
      }
    }
  });
})();
