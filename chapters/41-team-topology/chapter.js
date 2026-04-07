(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '41-team-topology',
    order: 41,

    nav:      { en: 'Team Topology', zh: '团队拓扑' },
    title:    { en: 'Team <span class="accent">Topology</span>', zh: '团队 <span class="accent">拓扑</span>' },
    subtitle: { en: 'Human + Agent Collaboration Topology', zh: 'Human + Agent Collaboration Topology' },
    tag:      { en: 'Business', zh: '商业' },
    tagClass: 'tag-biz',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      let svg = '';

      svg += S.sequence(130, 54, [
        { label: t(lang, 'Human', '人类'), col: S.c.cyan },
        { label: t(lang, 'Agent', 'Agent'), col: S.c.red },
      ], [
        { from: 0, to: 1, label: t(lang, 'delegate goal', '委派目标') },
        { from: 1, to: 0, label: t(lang, 'clarify / ask', '澄清 / 追问') },
        { from: 1, to: 0, label: t(lang, 'pause for approval', '暂停审批') },
        { from: 0, to: 1, label: t(lang, 'approve / reject', '批准 / 拒绝') },
        { from: 1, to: 0, label: t(lang, 'deliver result', '交付结果') },
      ], 260, 34);

      svg += S.label(380, 286,
        t(lang, 'Healthy topology means humans keep risk ownership while agents absorb search, drafting, and routine execution.',
                '健康的人机拓扑是：人类保留风险所有权，Agent 吸收搜索、起草和例行执行。'),
        S.c.textDim, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, the best teams no longer ask whether humans should stay in the loop. They ask where humans must stay in the loop because that is where risk ownership, policy judgment, or ambiguous tradeoffs live. Agent adoption succeeds when the topology is explicit: who delegates, who approves, who watches, and who takes over on failure.',
        definition: 'Team topology is the <strong>organizational pattern that allocates planning, execution, approvals, and exception handling across humans and agents</strong>. It defines the collaboration graph, not just the chat interface.',
        essence: `<strong>Trust tiers:</strong> most successful deployments move through layers. First, the agent suggests. Then it drafts for review. Then it executes bounded low-risk work. Only after evidence and guardrails mature does it gain broader autonomy.\n\n<strong>Approval nodes:</strong> approvals should cluster around irreversible or high-cost actions: payments, deploys, deletes, external communications, policy-sensitive decisions. Low-risk repetitive work should not require a human click every turn.\n\n<strong>Division of labor:</strong> humans are best at setting goals, owning policy, resolving ambiguity, and deciding whether a tradeoff is acceptable. Agents excel at search, synthesis, rote execution, continuous monitoring, and pushing work through clearly defined steps.\n\n<strong>Failure handoff:</strong> when a run stalls or drifts, someone must own the takeover path. Healthy teams make that explicit instead of letting failure bounce between inboxes, chat threads, and silent retries.\n\n<strong>Real cases:</strong> <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code</a> makes human review and permission gates first-class, while <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noreferrer">agent design guidance</a> keeps returning to the same pattern: autonomy works best when humans stay responsible for the highest-risk decisions.`,
        insight: 'The wrong question is "How do we replace the human?" The right question is "Which decisions must remain human because they define accountability?"',
        pitfalls: [
          'Measuring success by the percentage of work done without human touch, instead of by throughput, error rate, and bounded risk.',
          'Putting approval gates everywhere, which creates fatigue and eventually trains humans to click through blindly.',
          'Failing to assign ownership for agent exceptions, so no one knows who should step in when the run degrades.'
        ],
        furtherReading: [
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' }
        ],
        crossRefs: [
          {
            chapterId: '06-handoff',
            reason: 'Human-agent collaboration breaks down quickly without explicit handoff artifacts and ownership transfer.'
          },
          {
            chapterId: '35-long-horizon-tasks',
            reason: 'Long tasks make team topology visible because resume ownership and approval checkpoints must be assigned.'
          },
          {
            chapterId: '40-failure-modes',
            reason: 'Failure modes determine when the topology should escalate from autonomous execution back to human control.'
          }
        ],
        code: `<span class="cmt"># Run: python3 assign_trust.py</span>
tasks = [
    (<span class="str">'rename variables'</span>, <span class="str">'low'</span>),
    (<span class="str">'send external email'</span>, <span class="str">'high'</span>),
    (<span class="str">'delete production data'</span>, <span class="str">'critical'</span>),
]

<span class="kw">for</span> name, risk <span class="kw">in</span> tasks:
    owner = <span class="str">'agent'</span> <span class="kw">if</span> risk == <span class="str">'low'</span> <span class="kw">else</span> <span class="str">'human-approval'</span>
    <span class="kw">print</span>({<span class="str">'task'</span>: name, <span class="str">'owner'</span>: owner})`,
        table: {
          title: 'Trust tiers',
          headers: ['Tier', 'Who decides', 'Agent role', 'Approval pattern'],
          rows: [
            ['Suggest', 'Human', 'Research / propose', 'No execution'],
            ['Draft', 'Human reviewer', 'Prepare artifacts', 'Review before send'],
            ['Bounded execute', 'Agent within policy', 'Low-risk execution', 'Spot checks + selective approval'],
            ['Escalate on failure', 'Human owner', 'Pause and summarize', 'Explicit takeover'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，最成熟的团队已经不再问“人类要不要留在回路里”，而是问“哪些地方人类必须留在回路里，因为那里承载了风险所有权、策略判断或高歧义取舍”。Agent 落地成功的前提，是把拓扑讲清楚：谁委派、谁审批、谁观察、谁在失败时接管。',
        definition: '团队拓扑是把<strong>规划、执行、审批和异常处理</strong>分配给人类与 Agent 的组织模式。它定义的是协作图，而不只是聊天界面。',
        essence: `<strong>信任层级：</strong>大多数成功部署都会经历分层。先让 Agent 提建议，再让它起草供人审，再让它在低风险边界内执行，最后才是在证据和护栏成熟后扩大自主性。\n\n<strong>审批节点：</strong>审批应该聚焦在不可逆或高代价动作上：付款、部署、删除、外部沟通、策略敏感决策。低风险、高重复的工作，不应该要求人类每一轮都点击一次确认。\n\n<strong>人机分工：</strong>人类更适合设定目标、承担策略责任、处理高歧义取舍、决定哪些 tradeoff 可以接受。Agent 更适合搜索、综合、例行执行、持续监控，以及把工作推过清晰定义的步骤。\n\n<strong>失败接管：</strong>当运行卡住或开始漂移时，必须有人明确拥有接管路径。健康团队会把这一点写清楚，而不是让失败在 inbox、聊天线程和静默重试之间反复弹跳。\n\n<strong>真实案例：</strong><a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code</a> 把人工 review 和 permission gate 做成了一等公民，而 <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noreferrer">Agent 设计指南</a> 也反复说明：当最高风险决策仍由人类负责时，自主性通常最容易落地。`,
        insight: '错误的问题是“怎么替代人类”，更正确的问题是“哪些决定必须保留给人类，因为它们定义了责任归属”。',
        pitfalls: [
          '用“完全不碰人类的比例”衡量成功，而不是看吞吐、错误率和风险是否被约束住。',
          '把审批门放得到处都是，最后只会制造审批疲劳，让人类习惯性盲点通过。',
          '对 Agent 异常没有明确 owner，导致任务失控时没人知道谁该站出来接管。'
        ],
        furtherReading: [
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic：构建有效 Agent', url: 'https://www.anthropic.com/research/building-effective-agents' },
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' }
        ],
        crossRefs: [
          {
            chapterId: '06-handoff',
            reason: '没有明确的交接产物和 ownership transfer，人机协作会很快失稳。'
          },
          {
            chapterId: '35-long-horizon-tasks',
            reason: '一到长任务，resume 归谁管、审批点放在哪里，团队拓扑就会被真实暴露出来。'
          },
          {
            chapterId: '40-failure-modes',
            reason: 'Failure mode 决定了系统何时应该从自治执行切回人工控制。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 assign_trust.py</span>
tasks = [
    (<span class="str">'rename variables'</span>, <span class="str">'low'</span>),
    (<span class="str">'send external email'</span>, <span class="str">'high'</span>),
    (<span class="str">'delete production data'</span>, <span class="str">'critical'</span>),
]

<span class="kw">for</span> name, risk <span class="kw">in</span> tasks:
    owner = <span class="str">'agent'</span> <span class="kw">if</span> risk == <span class="str">'low'</span> <span class="kw">else</span> <span class="str">'human-approval'</span>
    <span class="kw">print</span>({<span class="str">'task'</span>: name, <span class="str">'owner'</span>: owner})`,
        table: {
          title: '信任层级',
          headers: ['层级', '谁决定', 'Agent 角色', '审批模式'],
          rows: [
            ['建议', '人类', '研究 / 提案', '不执行'],
            ['起草', '人工 reviewer', '准备产物', '发送前审查'],
            ['边界执行', 'Agent 在策略内决定', '低风险执行', '抽检 + 选择性审批'],
            ['失败升级', '人工 owner', '暂停并总结', '显式接管'],
          ]
        }
      }
    }
  });
})();
