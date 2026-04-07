(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '01-invocation',
    order: 1,

    nav:      { en: 'Invocation',    zh: '单次调用' },
    title:    { en: 'Single <span class="accent">Invocation</span>', zh: '单次 <span class="accent">调用</span>' },
    subtitle: { en: 'The moment an Agent wakes up', zh: 'Agent 被激活的瞬间' },
    tag:      { en: 'Foundation',    zh: '基础概念' },
    tagClass: 'tag-infra',

    viewBox: '0 0 760 215',

    getSvg(lang) {
      const phases = [
        { x: 60,  y: 72, w: 110, h: 65, col: '#0050a0',
          top: t(lang, 'Send Request', '发送请求'),
          sub: 'HTTP POST' },
        { x: 210, y: 55, w: 110, h: 95, col: '#a78bfa',
          top: t(lang, 'Inference', '模型推理'),
          sub: t(lang, 'ms ~ seconds', '毫秒~秒级') },
        { x: 380, y: 72, w: 110, h: 65, col: '#1a8a3a',
          top: t(lang, 'Return Result', '返回结果'),
          sub: t(lang, 'stream / once', 'tokens 流式/一次') },
        { x: 540, y: 72, w: 130, h: 65, col: '#ff4d6d',
          top: t(lang, 'Fades Away', '意识消散'),
          sub: t(lang, 'No residual', '无任何残留') },
      ];

      const boxes = phases.map((p, idx) => {
        const textY1 = idx === 1 ? p.y + p.h/2 - 3  : p.y + p.h/2 - 7;
        const textY2 = idx === 1 ? p.y + p.h/2 + 15 : p.y + p.h/2 + 11;
        return `
        <rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="5"
          fill="${p.col}18" stroke="${p.col}" stroke-width="1.5"/>
        <text x="${p.x + p.w/2}" y="${textY1}" text-anchor="middle"
          fill="${p.col}" font-family="'JetBrains Mono',monospace" font-size="12" font-weight="500">${p.top}</text>
        <text x="${p.x + p.w/2}" y="${textY2}" text-anchor="middle"
          fill="${p.col}99" font-family="'JetBrains Mono',monospace" font-size="9">${p.sub}</text>
      `}).join('');

      // Third text line for inference box — also +5px
      const inferExtra = `
        <text x="265" y="142" text-anchor="middle"
          fill="#a78bfa66" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, '"Temporarily awake"', '临时"清醒"')}
        </text>`;

      const arrows = `
        <line x1="40" y1="105" x2="720" y2="105" stroke="#1e3058" stroke-width="1.5"/>
        <line x1="170" y1="105" x2="208" y2="105" stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>
        <line x1="320" y1="105" x2="378" y2="105" stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>
        <line x1="490" y1="105" x2="538" y2="105" stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>
      `;

      return boxes + inferExtra + arrows + S.label(380, 205,
        t(lang,
          'One call = one temporary awakening. Context vanishes when the call ends.',
          '一次调用 = Agent 临时激活的一个瞬间。调用结束，这段上下文永久消失。'),
        '#6b84a8', 11);
    },

    content: {
      en: {
        perspective2026: 'In the last 12 months, providers have added longer streams, structured outputs, tool-calling, and session-like APIs that make one invocation feel much more capable. But a single invocation is still a bounded activation with a start and end; without external persistence, nothing meaningful survives the boundary.',
        definition: 'One complete round-trip of "send request → model inference → receive response." <strong>Lifespan: milliseconds to seconds.</strong> When the request ends, all context is gone.',
        essence: '<strong>Common misconception:</strong> "One invocation = one Agent." The accurate framing is: <em>one invocation is the moment an Agent briefly wakes up.</em> The Agent is defined by its persistent memory files; the invocation is what temporarily activates that definition.\n\nThink of a sleeping person (the Agent\'s memory files). Each time you wake them (invoke), they briefly think and respond, then sleep again. Sleeping does not mean they cease to exist.',
        code: `<span class="cmt"># This is NOT an Agent — this is a single invocation</span>
<span class="kw">response</span> = client.messages.create(
    model=<span class="str">"claude-sonnet-4-20250514"</span>,
    messages=[{<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: task}]
)
<span class="cmt"># Call ends — this "awareness" dissolves</span>
<span class="cmt"># Next call: the model remembers nothing of this</span>`,
        insight: 'Calling in a loop without rate limits looks like the model is "always alive" — this is an illusion. The reality is: activate → dissolve → activate → dissolve. The Agent\'s memory files are the true persistent carrier of "life."',
        pitfalls: [
          'Equating one invocation with one complete Agent. The invocation is only a short-lived execution window, not the whole system.',
          'Mistaking streaming output or long polling for a continuously conscious process. The runtime boundary still matters.',
          'Assuming provider-side sessions replace your own state model. Durable task state still needs to be stored and reloaded by your application.'
        ],
        furtherReading: [
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code Documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'OpenAI News', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '00-llm-api',
            reason: 'The API chapter explains the stateless provider boundary that every invocation crosses.'
          },
          {
            chapterId: '01b-memory',
            reason: 'After the invocation ends, memory files are what let the next activation continue meaningful work.'
          }
        ]
      },
      zh: {
        perspective2026: '过去 12 个月里，厂商增加了更长时间的流式响应、结构化输出、工具调用和类似 session 的接口，让“一次调用”看起来更像一个小型运行时；但它本质上依然是一次有明确起点和终点的激活，不靠外部持久化就不会留下真正可复用的状态。',
        definition: '一次完整的"发送请求 → 模型推理 → 获得回复"过程。<strong>寿命：毫秒级到秒级</strong>，请求结束即消亡，不留任何记忆。',
        essence: '<strong>常见误区</strong>：有人说"一次调用就是一个 Agent"——这是不准确的。准确说法是：<em>一次调用是 Agent 被激活的一个瞬间</em>。Agent 是持久存在的定义（文件集合），调用是让这个定义临时"清醒"的动作。\n\n就像一个沉睡的人（Agent 的记忆文件），每次被叫醒（调用），他短暂思考并回应，然后再次入睡。睡着不代表他不存在。',
        code: `<span class="cmt"># 这不是一个 Agent，这只是一次调用</span>
<span class="kw">response</span> = client.messages.create(
    model=<span class="str">"claude-sonnet-4-20250514"</span>,
    messages=[{<span class="str">"role"</span>: <span class="str">"user"</span>, <span class="str">"content"</span>: task}]
)
<span class="cmt"># 调用结束，这段"意识"消散</span>
<span class="cmt"># 下次调用时，模型对这次一无所知</span>`,
        insight: '不限流的情况下可以循环调用，看起来像"一直活着"——这是错觉。本质是不断激活、不断消亡、不断激活。Agent 的记忆文件才是"活着"的载体。',
        pitfalls: [
          '把一次调用直接等同于完整 Agent。调用只是短暂执行窗口，不是整个系统。',
          '把流式输出或长连接误解成持续运行的“意识进程”。运行时边界依然存在。',
          '误以为 provider 提供的 session 就能替代你自己的状态模型。长期任务状态仍然需要应用层负责存储与回灌。'
        ],
        furtherReading: [
          { title: 'Anthropic：构建高效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'OpenAI 新闻与博客', url: 'https://openai.com/blog' }
        ],
        crossRefs: [
          {
            chapterId: '00-llm-api',
            reason: '上一章解释了每次调用都要跨越的“厂商无状态接口边界”。'
          },
          {
            chapterId: '01b-memory',
            reason: '当一次调用结束后，能让下一次激活继续工作的，就是记忆文件这层持久载体。'
          }
        ]
      }
    }
  });
})();
