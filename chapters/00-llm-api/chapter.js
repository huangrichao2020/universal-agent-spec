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

        ${S.box(55, 148, 130, 42, '#0050a0', t(lang, 'Your App', '你的程序'))}
        ${S.box(315, 148, 90, 42, '#ffb800', 'curl', '')}
        ${S.box(575, 148, 130, 42, '#1a8a3a', t(lang, 'Any Client', '任何客户端'))}

        <line x1="120" y1="148" x2="330" y2="110"
          stroke="#0050a0" stroke-width="1.5" marker-end="url(#arrC)"/>
        <line x1="360" y1="148" x2="368" y2="112"
          stroke="#ffb800" stroke-width="1.5" marker-end="url(#arrA)"/>
        <line x1="640" y1="148" x2="450" y2="110"
          stroke="#1a8a3a" stroke-width="1.5" marker-end="url(#arr)"/>

        ${S.label(380, 205,
          t(lang, 'POST /v1/messages → Input → Process → Output → Each call is independent',
                  'POST /v1/messages → 输入→处理→输出 → 每次调用完全独立'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        perspective2026: 'Over the last 12 months, LLM APIs have added longer context windows, multimodal inputs, structured output modes, and richer tool-calling surfaces. But the core contract has not changed: every request is still an isolated invocation unless your application explicitly reloads the right state.',
        definition: 'An HTTP endpoint exposed by LLM providers (OpenAI, Anthropic, Alibaba Cloud, etc.) that accepts text input and returns text output. <strong>It is a stateless function</strong> — it has no memory of you; every call starts from zero.',
        essence: 'Many people think "integrating the GPT API" gives them an AI assistant. In reality, they are just making a memoryless phone call each time. <em>The model itself has no memory, no state, no will.</em> It is an extraordinarily complex "text continuation function." The entire purpose of Agent architecture is to build <strong>continuity, specialization, and executability</strong> on top of this stateless function.',
        insight: 'Statelessness is a deliberate design choice for LLM APIs, not a flaw. It enables millions of concurrent requests. The Agent layer solves the "stateful" problem.',
        pitfalls: [
          'Treating a chat transcript as provider-side memory. If your application does not resend the required context, the model does not remember it.',
          'Expecting deterministic API behavior like a traditional CRUD endpoint. LLM outputs require validation, retries, and guardrails.',
          'Assuming a stronger model eliminates architecture work. State, tools, auth, and observability still belong to your application layer.'
        ],
        furtherReading: [
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' },
          { title: 'Anthropic Research', url: 'https://www.anthropic.com/research' },
          { title: 'OpenAI News', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '01-invocation',
            reason: 'This chapter zooms from the provider API layer into the lifecycle of one concrete request-response turn.'
          },
          {
            chapterId: '01b-memory',
            reason: 'Once you understand the API is stateless, the next question is how an Agent reconstructs continuity across calls.'
          }
        ],
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
        perspective2026: '过去 12 个月里，大模型 API 增加了更长上下文、多模态输入、结构化输出和更丰富的工具调用接口，但底层契约并没有变：除非你的应用显式把状态重新装回上下文，否则每次请求仍然是彼此隔离的一次调用。',
        definition: '大模型厂商（OpenAI / Anthropic / 阿里云等）暴露的 HTTP 接口。接收文本输入，返回文本输出。<strong>本质是一个无状态函数</strong>——不记得你，每次调用都从零开始。',
        essence: '很多人以为"接入了 GPT API"就拥有了一个 AI 助手，其实只是每次打了一个无记忆的电话。<em>大模型本身没有记忆、没有状态、没有意志</em>。它只是一个极其复杂的"文字续写函数"。Agent 架构的全部意义，就是在这个无状态函数之外，构建出<strong>持续性、专业性、可执行性</strong>。',
        insight: '无状态是大模型 API 的设计选择，不是缺陷。正是这种无状态性，让它可以并发处理数百万请求。Agent 层负责解决"有状态"的问题。',
        pitfalls: [
          '把聊天记录误当成厂商侧记忆。只要你的应用没有把必要上下文重新发送，模型就不会“记得”之前发生过什么。',
          '把大模型 API 当成传统 CRUD 接口来期待确定性结果。LLM 输出需要校验、重试和护栏。',
          '误以为模型更强了，系统架构问题就自动消失。状态、工具、鉴权和可观测性仍然是应用层责任。'
        ],
        furtherReading: [
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' },
          { title: 'Anthropic 研究', url: 'https://www.anthropic.com/research' },
          { title: 'OpenAI 新闻与博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '01-invocation',
            reason: '这一章把视角从“厂商接口层”推进到“一次具体请求-响应”的生命周期。'
          },
          {
            chapterId: '01b-memory',
            reason: '当你确认 API 天生无状态后，下一步就是理解 Agent 如何在多次调用之间重建持续性。'
          }
        ],
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
