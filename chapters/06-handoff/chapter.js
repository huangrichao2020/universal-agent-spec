(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '06-handoff',
    order: 6,
    nav:      { en: 'Handoff Doc',  zh: '交接手册' },
    title:    { en: '<span class="accent">Handoff</span> Document', zh: '<span class="accent">交接手册</span>' },
    subtitle: { en: 'Persistent state across invocations', zh: 'Agent 状态的持久化' },
    tag:      { en: 'System',       zh: '系统概念' },
    tagClass: 'tag-system',
    viewBox: '0 0 760 255',

    getSvg(lang) {
      const rows = [
        ['#00e599', t(lang, '✅ Data fetch complete',  '✅ 数据采集完成')],
        ['#00e599', t(lang, '✅ Indicators computed',  '✅ 指标计算完成')],
        ['#ffb800', t(lang, '⏳ Cleaning in progress', '⏳ 异常清洗进行中')],
        ['#6b84a8', t(lang, '📁 raw_data.json ready',  '📁 产出: raw_data.json')],
        ['#00c8ff', t(lang, '➡ Next: filter turnover > 15%', '➡ 下一步: 分析换手率>15%')],
      ];

      const docLines = rows.map(([c, txt], i) => `
        <text x="268" y="${98 + i*22}" fill="${c}"
          font-family="'JetBrains Mono',monospace" font-size="9">${txt}</text>
      `).join('');

      return `
        ${S.box(38, 84, 145, 58, '#00c8ff',
          t(lang, 'Agent A', 'Agent A'),
          t(lang, 'Data fetch', '数据采集'))}

        <rect x="248" y="38" width="268" height="172" rx="6"
          fill="#ffb80010" stroke="#ffb800" stroke-width="1.5"/>
        <rect x="248" y="38" width="268" height="34" rx="6" fill="#ffb80022" stroke="none"/>
        <text x="382" y="60" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">HANDOFF.md</text>
        ${docLines}

        ${S.box(578, 84, 145, 58, '#a78bfa',
          t(lang, 'Agent B', 'Agent B'),
          t(lang, 'Analysis', '分析决策'))}

        <line x1="183" y1="113" x2="246" y2="113"
          stroke="#ffb800" stroke-width="1.5" marker-end="url(#arrA)"/>
        <text x="215" y="106" text-anchor="middle" fill="#ffb80088"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'writes', '写入')}
        </text>
        <line x1="518" y1="113" x2="576" y2="113"
          stroke="#a78bfa" stroke-width="1.5" marker-end="url(#arr)"/>
        <text x="548" y="106" text-anchor="middle" fill="#a78bfa88"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'reads', '读取')}
        </text>

        ${S.label(380, 245,
          t(lang,
            'File modified → handoff doc must be updated. This ensures multi-Agent consistency.',
            '文件被修改 → 手册必须同步更新。这是多 Agent 系统的数据一致性保障。'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'A "work status document" maintained by each Agent (or project directory), recording <strong>what was done / current state / what to do next</strong>. Solves the Agent statelessness problem, letting "awareness" persist across invocations.',
        essence: 'The handoff document is the <em>shared whiteboard</em> of a multi-Agent system. After Agent A finishes, Agent B doesn\'t need to replay the entire history — just read the handoff doc to know exactly where to pick up.\n\n<strong>Iron rule:</strong> Whenever files in a directory are modified, the handoff document must be updated synchronously. Violate this rule and you get "information silos" — Agent B makes decisions based on stale state and produces garbage.',
        code: `<span class="cmt"># HANDOFF.md — standard format</span>
<span class="str">## Task Status</span>
- [x] Fetch A-share daily data
- [x] Compute technical indicators
- [ ] Anomaly cleaning (in progress)

<span class="str">## Output Files</span>
- data/raw_20240115.json  ✅
- data/indicators.json    ✅

<span class="str">## Instructions for Agent B</span>
Focus on: turnover rate > 15% with volume breakout

<span class="str">## Known Issues</span>
- 3 missing rows in 002xxx series, marked null`,
        insight: 'Think of the handoff document as a "real-time Git commit message" — not written for humans, but for the next Agent. The more precise it is, the fewer misjudgments downstream.'
      },
      zh: {
        definition: '每个 Agent（或项目目录）维护的"工作状态文档"，记录<strong>我做了什么 / 现在状态 / 下一步怎么做</strong>。解决 Agent 无状态问题，让"意识"在多次调用间延续。',
        essence: '交接手册是多 Agent 系统的<em>共享黑板</em>。Agent A 写完后，Agent B 不需要重新理解整个历史，只需读手册就知道接哪里。\n\n<strong>铁律</strong>：每当目录内的文件被修改，对应的交接手册必须同步更新。违反这条规则，工作流就会出现"信息孤岛"，Agent B 基于过期状态做决策，产出垃圾。',
        insight: '把交接手册理解成"Git commit message 的实时版"——不是给人看的，是给下一个 Agent 看的。越精确，下游 Agent 的误判越少。'
      }
    }
  });
})();
