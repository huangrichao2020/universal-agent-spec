(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '05-workflow',
    order: 5,
    nav:      { en: 'Workflow',     zh: '工作流' },
    title:    { en: '<span class="accent">Workflow</span>', zh: '<span class="accent">工作流</span>' },
    subtitle: { en: 'Multi-Agent collaboration system', zh: '多 Agent 分工协作系统' },
    tag:      { en: 'System',       zh: '系统概念' },
    tagClass: 'tag-system',
    viewBox: '0 0 760 278',

    getSvg(lang) {
      return `
        ${S.box(30, 108, 105, 52, '#a78bfa',
          t(lang, 'API Entry', 'API 入口'),
          t(lang, 'User request', '用户请求'))}

        <rect x="165" y="97" width="115" height="74" rx="5" fill="#f7f3ea" stroke="#2a2a35" stroke-width="1.5"/>
        <text x="222" y="124" text-anchor="middle" fill="#1d1d1f"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'Workflow', '工作流')}
        </text>
        <text x="222" y="141" text-anchor="middle" fill="#3a3a3c"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Orchestrator', '调度程序')}
        </text>
        <text x="222" y="157" text-anchor="middle" fill="#636366"
          font-family="'JetBrains Mono',monospace" font-size="8">Python/Node</text>

        ${S.box(318, 40, 122, 58, '#0050a0',
          t(lang, 'Agent A', 'Agent A'),
          t(lang, 'Data fetch', '数据采集'))}
        ${S.box(318, 132, 122, 58, '#ffb800',
          t(lang, 'Agent B', 'Agent B'),
          t(lang, 'Analysis', '分析决策'))}
        ${S.box(318, 224, 122, 58, '#a78bfa',
          t(lang, 'Aware Layer', '感知层'),
          t(lang, 'Heartbeat', '心跳监控'))}

        ${S.box(494, 87, 122, 58, '#1a8a3a',
          t(lang, 'Agent C', 'Agent C'),
          t(lang, 'Execute + Output', '执行+输出'))}

        <rect x="658" y="100" width="82" height="48" rx="5"
          fill="#1a8a3a12" stroke="#1a8a3a" stroke-width="1.5"/>
        <text x="699" y="120" text-anchor="middle" fill="#1a8a3a"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'Final', '最终')}
        </text>
        <text x="699" y="136" text-anchor="middle" fill="#1a8a3a"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'Output', '输出')}
        </text>

        <line x1="135" y1="134" x2="163" y2="134" stroke="#6b84a8" stroke-width="1.5" marker-end="url(#arr)"/>
        <line x1="280" y1="112" x2="316" y2="70" stroke="#0050a0" stroke-width="1.5" marker-end="url(#arrC)"/>
        <line x1="280" y1="136" x2="316" y2="162" stroke="#ffb800" stroke-width="1.5" marker-end="url(#arrA)"/>
        <line x1="440" y1="70" x2="492" y2="105" stroke="#0050a0" stroke-width="1.2" stroke-dasharray="4 3"/>
        <line x1="440" y1="162" x2="492" y2="122" stroke="#ffb800" stroke-width="1.2" stroke-dasharray="4 3"/>
        <line x1="616" y1="116" x2="656" y2="124" stroke="#1a8a3a" stroke-width="1.5" marker-end="url(#arr)"/>

        <text x="466" y="78" text-anchor="middle" fill="#0050a066"
          font-family="'JetBrains Mono',monospace" font-size="9">JSON</text>
        <text x="466" y="168" text-anchor="middle" fill="#ffb80066"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'file/pipe', '文件/管道')}
        </text>

        ${S.label(380, 295,
          t(lang,
            'Workflow = rules for what Agent A passes to Agent B, plus the rights to call B',
            '工作流 = 规定 Agent A 干完后把什么传给 Agent B，并给 A 调用 B 的权限'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'A system where multiple Agents collaborate by following preset rules in sequence (or parallel). <strong>Workflows solve the problem that Agents cannot "chat" with each other</strong> — they replace spontaneous communication with explicit data-passing rules.',
        essence: 'Agents have <em>no spontaneous communication ability</em> — they cannot send messages to each other on their own. The workflow is the "porter": it specifies what format A passes to B after finishing, and grants A the right to invoke B.\n\n<strong>A workflow can be wrapped as a single API endpoint.</strong> External caller hits the endpoint → triggers Agent A → A finishes and calls Agent B → … → final Agent returns result. To the outside world, it looks like one ordinary API call.',
        code: `<span class="cmt"># Workflow exposed as a single API endpoint</span>
@app.<span class="fn">post</span>(<span class="str">"/workflow/analyze"</span>)
<span class="kw">def</span> <span class="fn">analyze</span>(ticker: str):
    <span class="cmt"># 1. Activate Agent A (data fetch)</span>
    data = subprocess.<span class="fn">run</span>([<span class="str">"claude"</span>, <span class="str">"--skill"</span>, <span class="str">"fetch"</span>, ticker])
    <span class="cmt"># 2. A's output → B's input</span>
    analysis = subprocess.<span class="fn">run</span>([<span class="str">"claude"</span>, <span class="str">"--skill"</span>, <span class="str">"analyze"</span>, data.stdout])
    <span class="cmt"># 3. C synthesizes everything</span>
    report = subprocess.<span class="fn">run</span>([<span class="str">"claude"</span>, <span class="str">"--skill"</span>, <span class="str">"report"</span>, analysis.stdout])
    <span class="kw">return</span> report.stdout`,
        insight: 'Workflow stability determines the reliability of the entire system. An Agent being "smart" is a bonus; the workflow being "stable" is the foundation. One workflow bug wastes all Agents.'
      },
      zh: {
        definition: '多个 Agent 按照预设规则分工、依次（或并行）处理任务的系统。<strong>工作流解决 Agent 之间不能"闲聊"的问题</strong>——通过明确的数据传递规则替代自发通信。',
        essence: 'Agent 之间<em>没有自发通信能力</em>——它们不会主动给对方发消息。工作流就是"搬运工"：规定 A 干完了把产出以什么格式传给 B，并且 A 要有权限调用 B。\n\n<strong>工作流对外可以包装成一个 API 接口</strong>：外部调用这个接口 → 触发 Agent A → A 完成后调用 Agent B → … → 最终 Agent 返回结果。对外部来说，这就是一次普通的 API 调用。',
        code: `<span class="cmt"># 工作流对外是一个 API 接口</span>
@app.<span class="fn">post</span>(<span class="str">"/workflow/analyze"</span>)
<span class="kw">def</span> <span class="fn">analyze</span>(ticker: str):
    data = subprocess.<span class="fn">run</span>([<span class="str">"claude"</span>, <span class="str">"--skill"</span>, <span class="str">"fetch"</span>, ticker])
    analysis = subprocess.<span class="fn">run</span>([<span class="str">"claude"</span>, <span class="str">"--skill"</span>, <span class="str">"analyze"</span>, data.stdout])
    report = subprocess.<span class="fn">run</span>([<span class="str">"claude"</span>, <span class="str">"--skill"</span>, <span class="str">"report"</span>, analysis.stdout])
    <span class="kw">return</span> report.stdout`,
        insight: '工作流的稳定性决定整个系统的可靠性。Agent 的"聪明"是锦上添花，工作流的"稳定"才是地基。一个工作流出了 bug，所有 Agent 都白费。'
      }
    }
  });
})();
