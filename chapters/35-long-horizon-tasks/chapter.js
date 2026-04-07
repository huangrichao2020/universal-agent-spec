(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '35-long-horizon-tasks',
    order: 35,

    nav:      { en: 'Long Horizon', zh: '长程任务' },
    title:    { en: 'Long-Horizon <span class="accent">Tasks</span>', zh: '长程 <span class="accent">任务</span>' },
    subtitle: { en: 'Plan · Checkpoint · Resume · Verify', zh: 'Plan · Checkpoint · Resume · Verify' },
    tag:      { en: 'System', zh: '系统' },
    tagClass: 'tag-system',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      let svg = '';

      svg += S.timeline(70, 92, 620, [
        { label: t(lang, 'Plan', 'Plan'), sub: t(lang, 'task id', '任务 id') },
        { label: t(lang, 'Execute', 'Execute'), sub: t(lang, 'side effects', '外部动作') },
        { label: t(lang, 'Checkpoint', 'Checkpoint'), sub: t(lang, 'persist state', '写入状态') },
        { label: t(lang, 'Resume', 'Resume'), sub: t(lang, 'rehydrate', '恢复上下文') },
        { label: t(lang, 'Verify', 'Verify'), sub: t(lang, 'world still matches', '世界仍然一致') },
      ], S.c.amber);

      svg += S.box(130, 150, 180, 52, S.c.cyan,
        t(lang, 'Structured State', '结构化状态'),
        t(lang, 'step, artifacts, next action', '步骤、产物、下一步'));
      svg += S.box(450, 150, 180, 52, S.c.green,
        t(lang, 'Progress Trace', '进度轨迹'),
        t(lang, 'heartbeat + blockers', '心跳 + 阻塞项'));

      svg += S.label(380, 254,
        t(lang, 'Long tasks survive because state is externalized. Resume is a state machine transition, not a memory trick.',
                '长任务之所以能活下来，是因为状态被外化。Resume 是状态机转换，不是“模型突然想起来了”。'),
        S.c.textDim, 10);
      svg += S.label(380, 274,
        t(lang, 'Checkpoint before waiting, before risky actions, and before any step you cannot cheaply recompute.',
                '等待前、危险动作前、以及任何无法廉价重算的步骤前，都应该先做 checkpoint。'),
        S.c.red, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, the most useful agents are no longer short-lived chat turns. They run for hours or days across coding sessions, research sweeps, approval queues, and deployment workflows. The hard problem is not maintaining one long conversation; it is making progress durable when the process is interrupted, delegated, or restarted on another machine.',
        definition: 'Long-horizon tasks are agent runs that <strong>span multiple turns, delays, or execution windows</strong> and therefore require explicit persistence, checkpointing, resume semantics, and progress tracking.',
        essence: `<strong>A long task is not a long prompt:</strong> if the work lasts longer than one bounded model call, the system needs task identity, persisted state, artifact references, and a clear notion of what has already happened.\n\n<strong>Checkpointing:</strong> a checkpoint should capture more than chat history. It needs the current step, completed actions, pending actions, artifacts produced so far, approvals received, and enough context to reconstruct the next safe move.\n\n<strong>Resume:</strong> resuming is not "load the old messages and hope." The system must rehydrate the structured task state, re-check whether the external world drifted, and only then continue. If a file changed, an approval expired, or a deployment already happened, the next action may need to change.\n\n<strong>Progress tracking:</strong> long tasks need heartbeats and visible blockers. Humans need to know whether the agent is still alive, waiting on approval, retrying a flaky dependency, or truly stuck.\n\n<strong>Real cases:</strong> <a href="https://langchain-ai.github.io/langgraph" target="_blank" rel="noreferrer">LangGraph</a> made checkpointed graph execution mainstream, and <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code</a> made resumable long coding work a practical expectation rather than a research demo.`,
        insight: 'Without checkpoints, autonomy length is bounded by context length and process uptime. With checkpoints, autonomy length becomes a storage, orchestration, and verification problem.',
        pitfalls: [
          'Saving only the transcript. A resumeable task needs structured execution state, not just prose.',
          'Resuming blindly without checking whether the external world changed while the task was paused.',
          'Skipping idempotency. If a resumed step may replay side effects, the system needs guards before executing again.'
        ],
        furtherReading: [
          { title: 'LangGraph documentation', url: 'https://langchain-ai.github.io/langgraph' },
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],
        crossRefs: [
          {
            chapterId: '06-handoff',
            reason: 'Handoff documents are one human-readable checkpoint format for resuming long-running work.'
          },
          {
            chapterId: '23-graph-orchestration',
            reason: 'Graph orchestration provides the control flow primitives that make checkpointed resume practical.'
          },
          {
            chapterId: '25-observability',
            reason: 'Long tasks require traces, heartbeats, and state visibility or humans cannot trust the run lifecycle.'
          }
        ],
        code: `<span class="cmt"># Run: python3 checkpoint_demo.py</span>
<span class="kw">import</span> json
<span class="kw">from</span> pathlib <span class="kw">import</span> Path

path = Path(<span class="str">'state/task.json'</span>)
path.parent.mkdir(parents=<span class="kw">True</span>, exist_ok=<span class="kw">True</span>)

checkpoint = {
    <span class="str">'task'</span>: <span class="str">'repo-migration'</span>,
    <span class="str">'completed'</span>: [<span class="str">'scan'</span>, <span class="str">'plan'</span>],
    <span class="str">'next'</span>: <span class="str">'apply'</span>,
    <span class="str">'artifacts'</span>: [<span class="str">'report.md'</span>],
}

path.write_text(json.dumps(checkpoint, indent=<span class="str">2</span>))
restored = json.loads(path.read_text())

<span class="kw">print</span>({<span class="str">'resume_from'</span>: restored[<span class="str">'next'</span>], <span class="str">'done'</span>: restored[<span class="str">'completed'</span>]})`,
        table: {
          title: 'What a resumeable task must persist',
          headers: ['Need', 'Minimal state', 'Failure if absent'],
          rows: [
            ['Identity', 'task id + owner', 'Cannot correlate retries'],
            ['Control flow', 'current step + next step', 'Resume from wrong place'],
            ['Artifacts', 'paths / URLs / outputs', 'Must recompute or guess'],
            ['Side effects', 'what already happened', 'Duplicate actions'],
            ['Progress', 'heartbeat + blocker reason', 'Humans lose trust'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，最有价值的 Agent 已经不再是短暂的一次聊天轮次。它们会跨数小时甚至数天，横跨编码会话、研究扫描、审批队列和部署工作流。真正困难的部分不是“保持一段很长的对话”，而是在任务被打断、被委派或换机器重启后，依然能把进度接上。',
        definition: '长程任务是指那些<strong>跨越多个轮次、等待点或执行窗口</strong>的 Agent 运行，因此必须具备显式持久化、checkpoint、resume 语义和进度追踪。',
        essence: `<strong>长任务不等于长 prompt：</strong>只要工作持续时间超过一次有边界的模型调用，系统就需要任务身份、持久状态、产物引用，以及对“哪些事已经发生过”的清晰记录。\n\n<strong>Checkpoint：</strong>checkpoint 不能只存聊天记录。它还需要保存当前步骤、已完成动作、待完成动作、当前产物、已获得审批，以及足以安全恢复下一步所需的结构化状态。\n\n<strong>Resume：</strong>恢复绝不是“把旧消息再喂一遍然后祈祷”。系统必须重新装载任务状态，重新检查外部世界是否漂移，再决定下一步。如果文件变了、审批过期了、部署其实已经发生了，那么后续动作就必须改变。\n\n<strong>进度追踪：</strong>长任务需要心跳和可见阻塞项。人类必须知道 Agent 是仍在执行、正在等待审批、在重试一个不稳定依赖，还是已经真正卡死。\n\n<strong>真实案例：</strong><a href="https://langchain-ai.github.io/langgraph" target="_blank" rel="noreferrer">LangGraph</a> 把带 checkpoint 的图执行带进主流，而 <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code</a> 也让“可恢复的长程编码工作”从研究 demo 变成了现实期待。`,
        insight: '没有 checkpoint 时，Agent 的自治长度受限于上下文长度和进程 uptime；有了 checkpoint 之后，问题就转化为存储、编排和验证问题。',
        pitfalls: [
          '只保存 transcript。真正可恢复的任务需要结构化执行状态，而不只是叙述性文字。',
          '恢复时不检查暂停期间外部世界有没有变化，导致下一步基于过期现实继续执行。',
          '忽略幂等性。如果恢复后会重放副作用步骤，系统必须在再次执行前加保护。'
        ],
        furtherReading: [
          { title: 'LangGraph 文档', url: 'https://langchain-ai.github.io/langgraph' },
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' }
        ],
        crossRefs: [
          {
            chapterId: '06-handoff',
            reason: '交接文档本身就是一种面向人类可读的 checkpoint 形式，适合恢复长程工作。'
          },
          {
            chapterId: '23-graph-orchestration',
            reason: '图编排提供了让 checkpoint 和 resume 真正可落地的控制流原语。'
          },
          {
            chapterId: '25-observability',
            reason: '长任务需要 trace、heartbeat 和状态可见性，否则人类无法信任整个运行生命周期。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 checkpoint_demo.py</span>
<span class="kw">import</span> json
<span class="kw">from</span> pathlib <span class="kw">import</span> Path

path = Path(<span class="str">'state/task.json'</span>)
path.parent.mkdir(parents=<span class="kw">True</span>, exist_ok=<span class="kw">True</span>)

checkpoint = {
    <span class="str">'task'</span>: <span class="str">'repo-migration'</span>,
    <span class="str">'completed'</span>: [<span class="str">'scan'</span>, <span class="str">'plan'</span>],
    <span class="str">'next'</span>: <span class="str">'apply'</span>,
    <span class="str">'artifacts'</span>: [<span class="str">'report.md'</span>],
}

path.write_text(json.dumps(checkpoint, indent=<span class="str">2</span>))
restored = json.loads(path.read_text())

<span class="kw">print</span>({<span class="str">'resume_from'</span>: restored[<span class="str">'next'</span>], <span class="str">'done'</span>: restored[<span class="str">'completed'</span>]})`,
        table: {
          title: '可恢复任务至少要保存什么',
          headers: ['需求', '最小状态', '缺失后果'],
          rows: [
            ['身份', 'task id + owner', '无法关联重试与恢复'],
            ['控制流', '当前步骤 + 下一步', '从错误位置继续'],
            ['产物', '路径 / URL / 输出', '只能重算或猜测'],
            ['副作用', '哪些动作已经发生', '重复执行'],
            ['进度', 'heartbeat + 阻塞原因', '人类失去信任'],
          ]
        }
      }
    }
  });
})();
