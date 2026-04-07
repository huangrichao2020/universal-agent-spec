(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '23-graph-orchestration',
    order: 23,
    nav:      { en: 'Graph Orchestration', zh: '图编排' },
    title:    { en: 'Graph <span class="accent">Orchestration</span>', zh: '图 <span class="accent">编排</span>' },
    subtitle: { en: 'StateGraph · Checkpoints · Time Travel · Human-in-the-Loop', zh: 'StateGraph · 检查点 · 时间旅行 · 人机协作' },
    tag:      { en: 'Design Pattern',  zh: '设计模式' },
    tagClass: 'tag-pattern',
    viewBox: '0 0 760 290',
    getSvg(lang) {
      // StateGraph visualization
      let svg = '';
      // Nodes
      svg += S.box(40, 30, 100, 36, '#0071e3', t(lang, 'START', '开始'), '');
      svg += S.arrow(140, 48, 200, 48, '#6b84a8');
      svg += S.box(200, 30, 120, 36, '#a78bfa', t(lang, 'Research', '研究'), '');
      svg += S.arrow(320, 48, 380, 48, '#6b84a8');

      // Conditional edge (diamond)
      svg += `
        <polygon points="430,28 460,48 430,68 400,48" fill="#ffb80018" stroke="#ffb800" stroke-width="1.5"/>
        <text x="430" y="52" text-anchor="middle" fill="#ffb800" font-family="'JetBrains Mono',monospace" font-size="7">
          ${t(lang, 'OK?', '通过?')}
        </text>
      `;
      // Yes branch
      svg += S.arrow(460, 48, 520, 48, '#1a8a3a');
      svg += `<text x="490" y="42" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="7">Yes</text>`;
      svg += S.box(520, 30, 100, 36, '#1a8a3a', t(lang, 'Write', '编写'), '');
      svg += S.arrow(620, 48, 670, 48, '#6b84a8');
      svg += S.box(670, 30, 60, 36, '#6b84a8', 'END', '');

      // No branch (loop back)
      svg += `
        <text x="430" y="86" text-anchor="middle" fill="#ff4d6d" font-family="'JetBrains Mono',monospace" font-size="7">No</text>
      `;
      svg += `<path d="M 430 68 L 430 90 Q 430 100 420 100 L 270 100 Q 260 100 260 90 L 260 66"
        fill="none" stroke="#ff4d6d" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arr)"/>`;

      // Checkpoint visualization
      svg += `
        <rect x="40" y="130" width="320" height="65" rx="5" fill="#0050a012" stroke="#0050a0" stroke-width="1"/>
        <text x="200" y="148" text-anchor="middle" fill="#0050a0" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Checkpoints & Time Travel', '检查点与时间旅行')}
        </text>
        <text x="55" y="168" fill="#0050a088" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'State saved at every node → rewind to any point', '每个节点保存状态 → 可回退到任意点')}
        </text>
        <text x="55" y="183" fill="#0050a088" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Debug by replaying from checkpoint', '通过从检查点重放进行调试')}
        </text>
      `;

      // Human-in-the-loop
      svg += `
        <rect x="400" y="130" width="320" height="65" rx="5" fill="#ff4d6d12" stroke="#ff4d6d" stroke-width="1"/>
        <text x="560" y="148" text-anchor="middle" fill="#ff4d6d" font-family="'JetBrains Mono',monospace" font-size="10" font-weight="600">
          ${t(lang, 'Human-in-the-Loop Nodes', '人机协作节点')}
        </text>
        <text x="415" y="168" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Execution pauses → human reviews → resumes', '执行暂停 → 人类审查 → 继续')}
        </text>
        <text x="415" y="183" fill="#ff4d6d88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Critical for high-stakes decisions', '对高风险决策至关重要')}
        </text>
      `;

      // Scatter-Gather
      svg += `
        <rect x="40" y="210" width="680" height="40" rx="5" fill="#1a8a3a12" stroke="#1a8a3a" stroke-width="1"/>
        <text x="380" y="228" text-anchor="middle" fill="#1a8a3a" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="500">
          ${t(lang, 'Scatter-Gather: fan-out to N parallel agents → fan-in results → continue',
                  'Scatter-Gather：扇出到 N 个并行 Agent → 扇入结果 → 继续')}
        </text>
        <text x="380" y="244" text-anchor="middle" fill="#1a8a3a88" font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'Conditional edges + parallel execution = powerful flow control',
                  '条件边 + 并行执行 = 强大的流程控制')}
        </text>
      `;

      svg += S.label(380, 275,
        t(lang, 'Graph orchestration = the most powerful and flexible agent architecture pattern',
                '图编排 = 最强大灵活的 Agent 架构模式'),
        '#6b84a8', 10);

      return svg;
    },
    content: {
      en: {
        definition: 'Graph orchestration models agents as <strong>finite state machines with nodes (steps) and edges (transitions)</strong>. It supports conditional routing, parallel fan-out/fan-in, checkpointing, time travel, and human-in-the-loop — the most powerful pattern for complex agent workflows.',
        essence: '<strong>StateGraph</strong> — The core abstraction (popularized by LangGraph). Nodes are agent steps (research, write, review). Edges connect nodes with optional conditions. The graph executes step by step, with state flowing between nodes.\n\n<strong>Conditional edges</strong> — Route to different nodes based on the current state. "If research quality is good → write. If not → research again." This enables retry loops, quality gates, and adaptive workflows.\n\n<strong>Checkpointing</strong> — State is automatically saved at every node. You can rewind to any point and replay from there. Critical for debugging ("what went wrong at step 3?") and recovery ("the API failed at step 5, restart from step 4").\n\n<strong>Time travel</strong> — Go back to a previous checkpoint and take a different path. Like git for agent execution.\n\n<strong>Human-in-the-loop nodes</strong> — Execution pauses at designated nodes, presenting current state for human review. The human can approve, modify state, or reject. Essential for high-stakes decisions.\n\n<strong>Scatter-Gather</strong> — One node fans out to N parallel agents. Results are gathered and merged downstream. Enables parallel research, parallel code review, parallel data collection.',
        insight: 'Graph orchestration is the "assembly language" of agent architectures. Every other pattern (supervisor, pipeline, swarm) can be expressed as a graph. But with great power comes great complexity — only use graph orchestration when simpler patterns are insufficient.',
        perspective2026: 'By 2026, graph orchestration has become the default substrate for long-running, interruptible agent systems: coding agents, research pipelines, approval-heavy enterprise workflows, and any task that must resume after failure. The hard part is no longer drawing nodes and edges; it is designing durable state schemas, replay semantics, and audit trails that survive real production incidents.',
        pitfalls: [
          'Using a graph for tasks that are still basically linear. The graph adds overhead unless you genuinely need conditional routing, pauses, or recovery.',
          'Treating state as an afterthought. Weak state schemas make checkpoints and replays unreliable, which defeats the point of graph orchestration.',
          'Celebrating time travel demos without also building evaluation and audit discipline. Replay is useful only if you can explain what changed and why.'
        ],
        furtherReading: [
          { title: 'LangGraph documentation', url: 'https://langchain-ai.github.io/langgraph' },
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Plan-and-Solve Prompting', url: 'https://arxiv.org/abs/2305.04091' }
        ],
        crossRefs: [
          {
            chapterId: '22-arch-patterns',
            reason: 'Graph orchestration is easiest to apply once you know which higher-level architecture pattern you are trying to implement.'
          },
          {
            chapterId: '24-memory-arch',
            reason: 'Checkpointed graphs depend on explicit working state and memory boundaries, especially in long-running workflows.'
          },
          {
            chapterId: '28-coding-agents',
            reason: 'Coding agents are one of the clearest modern examples of graph-like execution with checkpoints, approvals, and resumable tool use.'
          }
        ],
        table: {
          title: 'Graph orchestration features',
          headers: ['Feature', 'Description', 'Use Case'],
          rows: [
            ['Conditional edges',    'Route based on state',           'Quality gates, retry loops'],
            ['Checkpointing',        'Auto-save at every node',        'Debugging, crash recovery'],
            ['Time travel',          'Rewind and replay',              'What-if analysis, A/B paths'],
            ['Human-in-the-loop',    'Pause for human approval',       'High-stakes decisions'],
            ['Scatter-Gather',       'Parallel fan-out/fan-in',        'Parallel research/collection'],
          ]
        }
      },
      zh: {
        definition: '图编排将 Agent 建模为<strong>有限状态机，由节点（步骤）和边（转换）组成</strong>。它支持条件路由、并行扇出/扇入、检查点、时间旅行和人机协作——是复杂 Agent 工作流最强大的模式。',
        essence: '<strong>StateGraph</strong>——核心抽象（由 LangGraph 推广）。节点是 Agent 步骤（研究、编写、审查）。边连接节点，可附条件。图逐步执行，状态在节点间流转。\n\n<strong>条件边</strong>——根据当前状态路由到不同节点。"如果研究质量合格 → 编写。如果不合格 → 重新研究。"实现重试循环、质量门控和自适应工作流。\n\n<strong>检查点</strong>——每个节点自动保存状态。可以回退到任意点并从那里重放。对调试（"第 3 步出了什么问题？"）和恢复（"API 在第 5 步失败，从第 4 步重启"）至关重要。\n\n<strong>时间旅行</strong>——回到之前的检查点并走不同路径。就像 Agent 执行的 git。\n\n<strong>人机协作节点</strong>——在指定节点暂停执行，将当前状态呈现给人类审查。人类可以批准、修改状态或拒绝。高风险决策必备。\n\n<strong>Scatter-Gather</strong>——一个节点扇出到 N 个并行 Agent，结果在下游汇聚合并。实现并行研究、并行代码审查、并行数据收集。',
        insight: '图编排是 Agent 架构的"汇编语言"。所有其他模式（Supervisor、流水线、群体）都可以用图表达。但能力越大复杂度越大——只在简单模式不够用时才使用图编排。',
        perspective2026: '到了 2026 年，图编排已经成为长程、可中断 Agent 系统的默认底座：编码 Agent、研究流水线、审批密集的企业流程，以及任何需要失败后恢复的任务都在用它。真正困难的部分不再是把节点和边画出来，而是如何设计能扛住生产事故的状态 schema、回放语义和审计轨迹。',
        pitfalls: [
          '对本质上仍然是线性流程的任务也强行上图。只有真正需要条件路由、暂停或恢复时，图的复杂度才值得。',
          '把状态当成附属品。状态 schema 设计薄弱，会让检查点和回放都变得不可靠，直接失去图编排的价值。',
          '只展示时间旅行 demo，却没有同步建设评测和审计体系。只有能解释“哪里变了、为什么变了”，回放才真正有意义。'
        ],
        furtherReading: [
          { title: 'LangGraph 文档', url: 'https://langchain-ai.github.io/langgraph' },
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Plan-and-Solve 论文', url: 'https://arxiv.org/abs/2305.04091' }
        ],
        crossRefs: [
          {
            chapterId: '22-arch-patterns',
            reason: '只有先知道自己要落地哪一种上层架构模式，图编排才容易用对地方。'
          },
          {
            chapterId: '24-memory-arch',
            reason: '带检查点的图工作流依赖明确的工作状态和记忆边界，尤其在长程执行里更明显。'
          },
          {
            chapterId: '28-coding-agents',
            reason: '编码 Agent 是图式执行的典型样本：检查点、审批节点、工具调用恢复都高度符合图编排思路。'
          }
        ],
        table: {
          title: '图编排特性',
          headers: ['特性', '描述', '适用场景'],
          rows: [
            ['条件边',     '基于状态路由',     '质量门控、重试循环'],
            ['检查点',     '每个节点自动保存', '调试、崩溃恢复'],
            ['时间旅行',   '回退和重放',       '假设分析、A/B 路径'],
            ['人机协作',   '暂停等待人类批准', '高风险决策'],
            ['Scatter-Gather', '并行扇出/扇入', '并行研究/收集'],
          ]
        }
      }
    }
  });
})();
