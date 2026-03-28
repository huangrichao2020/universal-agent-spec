(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '07-aware',
    order: 7,
    nav:      { en: 'Aware / Heartbeat', zh: '感知层/心跳' },
    title:    { en: '<span class="accent">Aware</span> Layer · Heartbeat', zh: '<span class="accent">感知层</span> · 心跳机制' },
    subtitle: { en: 'System-level monitoring for Agent pipelines', zh: '系统级运维 Agent' },
    tag:      { en: 'System',            zh: '系统概念' },
    tagClass: 'tag-system',
    viewBox: '0 0 760 278',

    getSvg(lang) {
      const triggers = [
        [t(lang, 'ERROR in logs',         '日志出现 ERROR'),          t(lang, '→ Wake master Agent', '→ 唤醒总管 Agent')],
        [t(lang, 'Handoff stale 30min',   '手册 30min 未更新'),       t(lang, '→ Alert',             '→ 告警通知')],
        [t(lang, 'Agent output empty',    'Agent 输出为空'),           t(lang, '→ Auto retry',        '→ 自动重试')],
        [t(lang, 'External event fired',  '外部事件触发'),             t(lang, '→ Wake target Agent', '→ 唤醒对应 Agent')],
      ];

      const triggerRows = triggers.map(([cond, action], i) => `
        <text x="496" y="${113 + i*26}" fill="#1a8a3a88"
          font-family="'JetBrains Mono',monospace" font-size="9">${cond}</text>
        <text x="496" y="${126 + i*26}" fill="#00c8ff"
          font-family="'JetBrains Mono',monospace" font-size="9">${action}</text>
      `).join('');

      return `
        <polyline points="38,135 78,135 88,62 98,208 108,135 158,135 168,78 178,192 188,135 218,135 228,84 238,186 248,135 298,135 308,74 318,196 328,135 368,135"
          fill="none" stroke="#1a8a3a" stroke-width="2"/>
        <polyline points="368,135 408,135 418,95 428,175 438,135 468,135"
          fill="none" stroke="#1a8a3a44" stroke-width="1.5" stroke-dasharray="4 3"/>

        <rect x="480" y="62" width="258" height="148" rx="6"
          fill="#1a8a3a10" stroke="#1a8a3a" stroke-width="1.5"/>
        <text x="609" y="87" text-anchor="middle" fill="#1a8a3a"
          font-family="'JetBrains Mono',monospace" font-size="12" font-weight="500">
          ${t(lang, 'Aware Layer', '感知层 Aware')}
        </text>
        ${triggerRows}

        <rect x="480" y="218" width="258" height="30" rx="4" fill="#0d1526" stroke="#2a4578"/>
        <text x="609" y="237" text-anchor="middle" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'Cheap model (¥0.001/1K tokens)', '使用便宜模型（¥0.001/千Token）')}
        </text>

        <line x1="468" y1="135" x2="478" y2="135"
          stroke="#1a8a3a" stroke-width="1.5" marker-end="url(#arr)"/>

        ${S.label(240, 268,
          t(lang, 'High-freq scan · Low-cost judgment · Anomaly triggers premium Agent',
                  '高频扫描 · 低成本判断 · 异常触发高级 Agent'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'An independently running "monitoring program" that scans project state at high frequency (logs, handoff docs, Agent outputs) and triggers the appropriate Agent when anomalies are detected. <strong>Uses cheap models for judgment; flagship models for execution.</strong>',
        essence: 'The Aware layer answers: "Who monitors the Agents?" Without it, a failed Agent may go unnoticed until a user complains.\n\n<strong>Core principle:</strong> <em>Heartbeat judgment = simple classification</em> (normal / anomaly / warning). No flagship model needed. Using a ¥0.001/1K-token model for heartbeats vs a ¥0.1/1K-token flagship model means a 100× cost difference.',
        table: {
          title: 'Cost Tiering Strategy',
          headers: ['Layer', 'Model choice', 'Frequency', 'Purpose'],
          rows: [
            ['Aware layer', 'qwen-turbo / haiku', 'Every 30–60s', 'Log scan, status classification, anomaly detection'],
            ['Workflow layer', 'claude-sonnet / gpt-4o', 'On demand', 'Agent orchestration, format conversion'],
            ['Core layer', 'claude-opus / o3', 'Important tasks', 'Deep analysis, critical decisions, creative work'],
          ]
        },
        insight: 'The Aware layer is the "immune system" of the whole Agent pipeline. An Agent system without monitoring is like a server without observability — when something breaks you won\'t even know it\'s broken.'
      },
      zh: {
        definition: '独立运行的"系统监控程序"，高频扫描项目状态（日志、交接手册、Agent 输出），发现异常时触发对应 Agent 处理。<strong>使用便宜模型做判断，旗舰模型做执行</strong>。',
        essence: '感知层解决的是"谁来监控 Agent"的问题。在没有感知层的系统中，Agent 出错了可能没有任何人知道，直到用户投诉。\n\n<strong>核心设计原则</strong>：<em>心跳判断 = 简单分类任务</em>（正常/异常/警告），不需要旗舰模型。用 ¥0.001/千Token 的模型做心跳，用 ¥0.1/千Token 的模型做核心任务，成本差 100 倍。',
        table: {
          title: '成本分层策略',
          headers: ['层级', '模型选择', '频率', '用途'],
          rows: [
            ['感知层', 'qwen-turbo / haiku', '每 30~60 秒', '日志扫描、状态判断、异常分类'],
            ['工作流层', 'claude-sonnet / gpt-4o', '按需触发', 'Agent 间调度、格式转换'],
            ['核心层', 'claude-opus / o3', '重要任务', '深度分析、关键决策、创作'],
          ]
        },
        insight: '感知层是整个 Agent 系统的"免疫系统"。没有感知层的 Agent 系统就像没有监控的服务器——出了问题你甚至不知道它已经挂了。'
      }
    }
  });
})();
