(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '32-computer-use',
    order: 32,

    nav:      { en: 'Computer Use', zh: '屏幕级 Agent' },
    title:    { en: 'Computer <span class="accent">Use</span>', zh: '屏幕级 <span class="accent">Agent</span>' },
    subtitle: { en: 'Anthropic Computer Use · OpenAI Operator', zh: 'Anthropic Computer Use · OpenAI Operator' },
    tag:      { en: 'Pattern', zh: '模式' },
    tagClass: 'tag-pattern',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      let svg = '';

      svg += S.layerStack(270, 24, 220, [
        { label: t(lang, 'App / Browser', '应用 / 浏览器'), col: S.c.green, sub: t(lang, 'real UI state', '真实界面状态') },
        { label: t(lang, 'Screen Pixels', '屏幕像素'), col: S.c.purple, sub: t(lang, 'screenshots in', '截图输入') },
        { label: t(lang, 'Agent Policy', 'Agent 策略'), col: S.c.cyan, sub: t(lang, 'plan next move', '决定下一步') },
        { label: t(lang, 'Action Tool', '动作工具'), col: S.c.amber, sub: t(lang, 'click / type / key', 'click / type / key') },
      ], 12);

      svg += S.box(36, 82, 170, 54, S.c.green,
        t(lang, 'API Path', 'API 路径'),
        t(lang, 'schema + stable fields', 'schema + 稳定字段'));
      svg += S.arrow(206, 109, 270, 109, S.c.green,
        t(lang, 'faster', '更快'));

      svg += S.box(554, 82, 170, 54, S.c.red,
        t(lang, 'Safety Boundary', '安全边界'),
        t(lang, 'sandbox / allowlist / HITL', '沙箱 / 白名单 / 人审'));
      svg += S.arrow(490, 163, 554, 109, S.c.red,
        t(lang, 'guard', '护栏'));

      svg += S.box(36, 188, 170, 54, '#0050a0',
        t(lang, 'Human Approval', '人工审批'),
        t(lang, 'checkout / delete / send', '付款 / 删除 / 发送'));
      svg += S.dashed(206, 215, 270, 215, S.c.red);

      svg += S.box(554, 188, 170, 54, S.c.amber,
        t(lang, 'Cost Loop', '成本循环'),
        t(lang, 'capture -> think -> act', '截图 -> 推理 -> 操作'));
      svg += S.dashed(490, 215, 554, 215, S.c.amber);

      svg += S.label(380, 287,
        t(lang, 'Screen-level agents are universal, but APIs stay cheaper, faster, and safer when available.',
                '屏幕级 Agent 覆盖面最广，但只要有 API，API 依然更便宜、更快、更安全。'),
        S.c.textDim, 10);
      svg += S.label(380, 306,
        t(lang, 'Use pixels as the fallback interface for real software, not as the default for every task.',
                '像素交互适合做真实软件的兜底接口，而不是所有任务的默认执行方式。'),
        S.c.red, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'In 2025-2026, screen-level agents moved from novelty demos to real operator surfaces. Anthropic Computer Use and OpenAI Operator made the browser and desktop a universal interface, but teams also learned the hard limit: pixel loops buy coverage at the price of latency, token burn, and a much tighter safety boundary.',
        definition: 'Computer use is an agent pattern where the model acts through <strong>screenshots, mouse movement, clicks, typing, and key presses</strong> instead of structured APIs. It treats the screen as the interface contract.',
        essence: `<strong>Why it matters:</strong> many valuable systems still do not expose clean APIs, or the API does not cover the exact workflow the human actually performs. Screen-level control turns any human-usable UI into an executable surface.\n\n<strong>Pixel interaction vs API interaction:</strong> APIs give structured inputs, deterministic fields, and cheap execution. Computer use works when no such contract exists, but the agent must repeatedly capture the screen, infer state from pixels, and choose the next action. That loop is slower and more brittle because layout changes, modal dialogs, loading delays, and hidden state all matter.\n\n<strong>Safety boundary:</strong> once an agent can click the real UI, it can also buy, delete, submit, or leak. Mature deployments isolate it inside a sandbox or VM, restrict reachable destinations, and pause for human approval on irreversible actions.\n\n<strong>Real cases:</strong> <a href="https://www.anthropic.com/news/computer-use" target="_blank" rel="noreferrer">Anthropic Computer Use</a> showed the screenshot-action loop directly, while <a href="https://openai.com/blog" target="_blank" rel="noreferrer">OpenAI's Operator work</a> pushed the browser-as-runtime idea into consumer-facing task execution.`,
        insight: 'Computer use is best treated as the last-mile adapter. Reach for APIs first; use pixels when the software boundary is otherwise unreachable or when you need to verify the same UI a human sees.',
        pitfalls: [
          'Using screen automation where a stable API already exists. You pay higher latency and fragility for no benefit.',
          'Granting browser or desktop control without sandboxing, approval gates, and destination allowlists.',
          'Ignoring the cost structure. Every screenshot, retry, and re-read consumes tokens and compounds latency.'
        ],
        furtherReading: [
          { title: 'Anthropic: Computer Use', url: 'https://www.anthropic.com/news/computer-use' },
          { title: 'OpenAI Blog', url: 'https://openai.com/blog' },
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],
        crossRefs: [
          {
            chapterId: '12-tool-use',
            reason: 'Tool use explains the structured contract path; this chapter shows what changes when the contract is pixels instead of JSON.'
          },
          {
            chapterId: '26-guardrails',
            reason: 'Screen control raises the stakes for approvals, policies, and execution-time safety checks.'
          },
          {
            chapterId: '28-coding-agents',
            reason: 'Modern coding agents combine shell tools, browsers, and sandboxes, making computer use a practical runtime concern rather than a toy demo.'
          }
        ],
        code: `<span class="cmt"># Run: python3 scale_click.py</span>
<span class="cmt"># Convert screenshot coordinates back to the real screen</span>
screen_w, screen_h = <span class="str">1512</span>, <span class="str">982</span>
sent_w, sent_h = <span class="str">1260</span>, <span class="str">820</span>

click_x, click_y = <span class="str">640</span>, <span class="str">320</span>

scale_x = screen_w / sent_w
scale_y = screen_h / sent_h

real_x = round(click_x * scale_x)
real_y = round(click_y * scale_y)

<span class="kw">print</span>({<span class="str">'x'</span>: real_x, <span class="str">'y'</span>: real_y})`,
        table: {
          title: 'API agent vs computer-use agent',
          headers: ['Dimension', 'API Agent', 'Computer Use Agent', 'Hybrid Rule'],
          rows: [
            ['Contract', 'Structured schema', 'Pixels + UI state', 'Prefer API, fall back to pixels'],
            ['Reliability', 'Higher', 'Lower when UI shifts', 'Keep critical writes on APIs'],
            ['Coverage', 'Only exposed endpoints', 'Any human-usable interface', 'Use UI for gaps'],
            ['Cost', 'Lower', 'Higher screenshot loop cost', 'Route selectively'],
            ['Safety', 'Endpoint permissions', 'Needs sandbox + approvals', 'Separate trust zones'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2025-2026 年，屏幕级 Agent 已经从“会点按钮的演示”变成真正的操作界面。Anthropic Computer Use 和 OpenAI Operator 让浏览器、桌面成为通用执行面，但工程团队也更清楚地看到代价：像素循环换来的是覆盖面，付出的则是更高延迟、更多 Token 消耗以及更严格的安全边界要求。',
        definition: 'Computer Use 是一种通过<strong>截图、鼠标移动、点击、输入和按键</strong>来执行任务的 Agent 模式，它不依赖结构化 API，而是把屏幕本身当作接口契约。',
        essence: `<strong>为什么重要：</strong>很多高价值系统并没有干净的 API，或者 API 并不能覆盖人类实际在界面里完成的那条流程。屏幕级控制让“任何人能操作的 UI”都变成 Agent 可执行的表面。\n\n<strong>像素交互 vs API 交互：</strong>API 提供结构化输入、稳定字段和更低成本的执行；Computer Use 适合没有现成契约的场景，但代价是 Agent 必须反复截图、从像素推断状态、再决定下一步动作。页面布局变化、弹窗、加载延迟、隐藏状态，都会让执行变脆。\n\n<strong>安全边界：</strong>一旦 Agent 能点击真实界面，它也就可能购买、删除、提交或泄露。成熟部署通常把它放进沙箱或虚拟机，限制可访问目标，并在不可逆动作前强制人工确认。\n\n<strong>真实案例：</strong><a href="https://www.anthropic.com/news/computer-use" target="_blank" rel="noreferrer">Anthropic Computer Use</a> 直接展示了截图-动作循环，而 <a href="https://openai.com/blog" target="_blank" rel="noreferrer">OpenAI 的 Operator 相关工作</a> 则把“浏览器即运行时”的思路推向面向用户的任务执行。`,
        insight: '把 Computer Use 当成“最后一公里适配器”最合适。能走 API 就先走 API；只有在软件边界无法触达，或者必须验证与人类相同的真实界面时，再让 Agent 读屏幕、做像素级操作。',
        pitfalls: [
          '明明有稳定 API，却仍然用屏幕自动化。你会无意义地增加延迟和脆弱性。',
          '给浏览器或桌面控制能力时，没有同时配置沙箱、审批节点和目标白名单。',
          '低估成本结构。每一次截图、重试和重新读屏都在消耗 Token 并拉长总时延。'
        ],
        furtherReading: [
          { title: 'Anthropic：Computer Use', url: 'https://www.anthropic.com/news/computer-use' },
          { title: 'OpenAI 博客', url: 'https://openai.com/blog' },
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],
        crossRefs: [
          {
            chapterId: '12-tool-use',
            reason: '工具调用解释了结构化契约路径，而本章说明当契约不是 JSON 而是像素时，系统设计会发生什么变化。'
          },
          {
            chapterId: '26-guardrails',
            reason: '一旦 Agent 能操作真实界面，审批、策略校验和执行期安全检查的重要性会显著上升。'
          },
          {
            chapterId: '28-coding-agents',
            reason: '现代编码 Agent 往往同时使用 shell、浏览器和沙箱，所以 Computer Use 已经是实际运行时问题，而不是演示玩具。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 scale_click.py</span>
<span class="cmt"># 把截图坐标换算回真实屏幕坐标</span>
screen_w, screen_h = <span class="str">1512</span>, <span class="str">982</span>
sent_w, sent_h = <span class="str">1260</span>, <span class="str">820</span>

click_x, click_y = <span class="str">640</span>, <span class="str">320</span>

scale_x = screen_w / sent_w
scale_y = screen_h / sent_h

real_x = round(click_x * scale_x)
real_y = round(click_y * scale_y)

<span class="kw">print</span>({<span class="str">'x'</span>: real_x, <span class="str">'y'</span>: real_y})`,
        table: {
          title: 'API Agent 与屏幕级 Agent 对比',
          headers: ['维度', 'API Agent', 'Computer Use Agent', '混合规则'],
          rows: [
            ['契约', '结构化 schema', '像素 + UI 状态', 'API 优先，像素兜底'],
            ['可靠性', '更高', '界面变化时更脆', '关键写操作尽量走 API'],
            ['覆盖面', '只覆盖暴露接口', '覆盖任何人可操作界面', '用 UI 补缺口'],
            ['成本', '更低', '截图循环成本更高', '按需路由'],
            ['安全', '端点级权限', '需要沙箱 + 审批', '分离信任区'],
          ]
        }
      }
    }
  });
})();
