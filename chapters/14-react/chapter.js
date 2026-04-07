(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '14-react',
    order: 14,

    nav:      { en: 'ReAct',           zh: 'ReAct 模式' },
    title:    { en: '<span class="accent">ReAct</span> Pattern', zh: '<span class="accent">ReAct</span> 模式' },
    subtitle: { en: 'Reason + Act · The Default Agent Loop', zh: 'Reason + Act · Agent 的默认循环' },
    tag:      { en: 'Design Pattern',  zh: '设计模式' },
    tagClass: 'tag-pattern',

    viewBox: '0 0 760 310',

    getSvg(lang) {
      // Central ReAct loop
      const think  = S.box(280, 20, 200, 44, '#0071e3',
        t(lang, 'Thought', '思考'),
        t(lang, '"I need to search for..."', '"我需要搜索..."'));
      const act    = S.box(280, 100, 200, 44, '#ff4d6d',
        t(lang, 'Action', '行动'),
        t(lang, 'Call tool: search("...")', '调用工具: search("...")'));
      const observe = S.box(280, 180, 200, 44, '#1a8a3a',
        t(lang, 'Observation', '观察'),
        t(lang, 'Tool returns result', '工具返回结果'));

      // Arrows between steps
      const a1 = S.arrow(380, 64, 380, 100, '#6b84a8');
      const a2 = S.arrow(380, 144, 380, 180, '#6b84a8');

      // Loop back arrow
      const loop = `
        <path d="M 380 224 L 380 244 Q 380 254 370 254 L 220 254 Q 210 254 210 244 L 210 42 Q 210 32 220 32 L 278 32"
          fill="none" stroke="#ffb800" stroke-width="1.5" stroke-dasharray="5 3"
          marker-end="url(#arrA)"/>
        <text x="210" y="150" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="9" transform="rotate(-90,210,150)">
          ${t(lang, 'loop until answer found', '循环直到找到答案')}
        </text>
      `;

      // Right side: variants
      const variants = `
        ${S.box(540, 30, 180, 36, '#a78bfa',
          t(lang, 'ReWOO', 'ReWOO'),
          t(lang, 'Plan all → execute all', '全部规划 → 全部执行'))}
        ${S.box(540, 85, 180, 36, '#0050a0',
          t(lang, 'Reflexion', '反思'),
          t(lang, 'Self-critique after done', '完成后自我批评'))}
        ${S.box(540, 140, 180, 36, '#ff4d6d',
          t(lang, 'LATS', 'LATS'),
          t(lang, 'MCTS-guided search', 'MCTS 引导搜索'))}

        <text x="630" y="195" text-anchor="middle" fill="#6b84a880"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Variants that extend ReAct', 'ReAct 的扩展变体')}
        </text>
      `;

      return `
        ${think}${act}${observe}${a1}${a2}${loop}${variants}

        ${S.label(380, 280,
          t(lang, 'ReAct = the "hello world" of agent patterns. Start here.',
                  'ReAct = Agent 模式的 "hello world"。从这里开始。'),
          '#0071e3', 10)}
        ${S.label(380, 298,
          t(lang, 'Risk: infinite loops. Always set a max-steps limit.',
                  '风险：无限循环。务必设置最大步数限制。'),
          '#ff4d6d', 10)}
      `;
    },

    content: {
      en: {
        perspective2026: 'By 2026, ReAct remains the default loop inside coding agents, research agents, and browser agents, but production systems rarely run a raw Thought-Action-Observation loop without supervision. They add step budgets, tool-specific approvals, state snapshots, and background execution controls. ReAct survived because it is simple, inspectable, and composable, not because it is sufficient by itself.',
        definition: 'ReAct (<strong>Re</strong>ason + <strong>Act</strong>) is the foundational agent pattern: the model alternates between thinking (reasoning about what to do), acting (calling a tool), and observing (reading the result). This Thought-Action-Observation loop repeats until the task is complete.',

        essence: '<strong>The loop:</strong>\n1. <em>Thought</em> — The model reasons: "I need to find the user\'s order status. I should call the database lookup tool."\n2. <em>Action</em> — The model emits a tool call: <code>lookup_order(id: "12345")</code>\n3. <em>Observation</em> — The tool returns: "Order #12345: shipped, tracking ABC123"\n4. <em>Thought</em> — "I have the info. Let me format the answer."\n5. <em>Final Answer</em> — "Your order #12345 has shipped! Tracking: ABC123"\n\n<strong>Why it works:</strong> By interleaving reasoning with real-world feedback, ReAct grounds the model\'s thinking in actual data. Pure CoT can hallucinate intermediate steps; ReAct forces reality checks at every step.\n\n<strong>Variants:</strong>\n— <em>ReWOO</em>: Plan all steps upfront, then execute all tools at once. Avoids infinite loops but loses mid-execution adaptation.\n— <em>Reflexion</em>: After completing a task, the model critiques its own performance and stores lessons for next time. Enables self-improvement.\n— <em>LATS</em>: Uses Monte Carlo Tree Search to evaluate multiple action paths before committing. Best for high-stakes, irreversible actions.',

        insight: 'ReAct is the default pattern for 80%+ of production Agents. Its main failure mode is infinite loops — the model keeps calling tools without making progress. Always set a max-steps limit (typically 10-25 steps). If the agent can\'t solve it in 25 steps, it probably can\'t solve it at all.',

        pitfalls: [
          '把 ReAct 循环直接放进生产环境却不设 <strong>max steps / timeout / approval gates</strong>。这通常会把“会做事”迅速变成“会无限做事”。',
          '让 Observation 原样塞回上下文而不做压缩。工具结果过长时，ReAct 很容易被自己的历史淹没，后续推理质量会持续下降。',
          '对确定性流水线也坚持逐步 ReAct。已知步骤固定、依赖关系清楚的任务，往往更适合 `plan → execute`，而不是每一步都重新思考。'
        ],

        furtherReading: [
          { title: 'ReAct: Synergizing Reasoning and Acting in Language Models', url: 'https://arxiv.org/abs/2210.03629' },
          { title: 'Reflexion: Language Agents with Verbal Reinforcement Learning', url: 'https://arxiv.org/abs/2303.11366' },
          { title: 'Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],

        crossRefs: [
          {
            chapterId: '13-reasoning',
            reason: 'ReAct inherits the reasoning patterns from the previous chapter and turns them into an explicit thought-action loop.'
          },
          {
            chapterId: '15-plan-execute',
            reason: 'Plan-and-Execute is the main alternative when you want fewer loops, stronger task decomposition, or more deterministic execution.'
          }
        ],

        table: {
          title: 'ReAct family comparison',
          headers: ['Pattern', 'Loop Style', 'Strength', 'Weakness', 'Best For'],
          rows: [
            ['ReAct',     'Think → Act → Observe (repeat)',  'Grounded, adaptive',    'Infinite loop risk',     'General-purpose agents'],
            ['ReWOO',     'Plan all → Execute all',          'No infinite loops',     'Cannot adapt mid-plan',  'Deterministic pipelines'],
            ['Reflexion', 'ReAct + self-critique after',     'Self-improvement',      'Extra LLM calls',        'Recurring similar tasks'],
            ['LATS',      'MCTS-guided action selection',    'Evaluates before acting','Very expensive',        'High-stakes decisions'],
          ]
        }
      },

      zh: {
        perspective2026: '到了 2026 年，ReAct 仍然是编程 Agent、研究 Agent、浏览器 Agent 里的默认循环，但生产系统几乎不会裸跑一个纯粹的“思考-行动-观察”闭环。它们会加上步数预算、工具级审批、状态快照和后台执行控制。ReAct 之所以活下来，不是因为它单独就足够，而是因为它简单、可观测、易组合。',
        definition: 'ReAct（<strong>Re</strong>ason + <strong>Act</strong>）是最基础的 Agent 模式：模型在思考（推理该做什么）、行动（调用工具）、观察（读取结果）之间交替。这个"思考-行动-观察"循环持续到任务完成。',

        essence: '<strong>循环过程：</strong>\n1. <em>思考</em>——模型推理："我需要查询用户的订单状态，应该调用数据库查询工具。"\n2. <em>行动</em>——模型发出工具调用：<code>lookup_order(id: "12345")</code>\n3. <em>观察</em>——工具返回："订单 #12345：已发货，物流单号 ABC123"\n4. <em>思考</em>——"信息已获取，整理答案。"\n5. <em>最终回答</em>——"您的订单 #12345 已发货！物流单号：ABC123"\n\n<strong>为什么有效：</strong>通过将推理与真实世界反馈交叉，ReAct 让模型的思考扎根于实际数据。纯 CoT 可能在中间步骤产生幻觉；ReAct 在每一步都强制进行现实核验。\n\n<strong>变体：</strong>\n— <em>ReWOO</em>：先规划所有步骤，再一次性执行所有工具。避免无限循环但失去执行中的适应性。\n— <em>Reflexion</em>：完成任务后，模型自我批评并存储教训供下次使用。实现自我进化。\n— <em>LATS</em>：使用蒙特卡洛树搜索在行动前评估多条路径。适合高风险、不可逆操作。',

        insight: 'ReAct 是 80% 以上生产级 Agent 的默认模式。它最主要的失败模式是无限循环——模型反复调用工具却没有进展。务必设置最大步数限制（通常 10-25 步）。如果 Agent 在 25 步内解决不了，它大概率根本解决不了。',

        pitfalls: [
          '把 ReAct 循环直接放进生产环境却不设 <strong>max steps / timeout / approval gates</strong>。这通常会把“会做事”迅速变成“会无限做事”。',
          '让 Observation 原样塞回上下文而不做压缩。工具结果过长时，ReAct 很容易被自己的历史淹没，后续推理质量会持续下降。',
          '对确定性流水线也坚持逐步 ReAct。已知步骤固定、依赖关系清楚的任务，往往更适合 `plan → execute`，而不是每一步都重新思考。'
        ],

        furtherReading: [
          { title: 'ReAct 论文', url: 'https://arxiv.org/abs/2210.03629' },
          { title: 'Reflexion 论文', url: 'https://arxiv.org/abs/2303.11366' },
          { title: 'Anthropic：构建高效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],

        crossRefs: [
          {
            chapterId: '13-reasoning',
            reason: 'ReAct 把上一章的推理模式进一步变成显式的思考-行动循环，是“会想”到“会做”的直接桥梁。'
          },
          {
            chapterId: '15-plan-execute',
            reason: '当你需要更少循环、更强任务拆解或更确定的执行路径时，Plan-and-Execute 是 ReAct 的主要替代方案。'
          }
        ],

        table: {
          title: 'ReAct 家族对比',
          headers: ['模式', '循环方式', '优势', '劣势', '最适场景'],
          rows: [
            ['ReAct',     '思考→行动→观察（重复）',  '扎实、自适应',    '无限循环风险',   '通用型 Agent'],
            ['ReWOO',     '全部规划→全部执行',       '无无限循环',      '无法中途调整',   '确定性流水线'],
            ['Reflexion', 'ReAct + 事后自我批评',    '自我进化',        '额外 LLM 调用', '重复性类似任务'],
            ['LATS',      'MCTS 引导行动选择',       '行动前评估',      '非常昂贵',      '高风险决策'],
          ]
        }
      }
    }
  });
})();
