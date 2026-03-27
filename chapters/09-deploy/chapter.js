(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '09-deploy',
    order: 9,
    nav:      { en: 'Local vs Cloud',  zh: '本地 vs 云端' },
    title:    { en: 'Local <span class="accent">vs</span> Cloud', zh: '本地 <span class="accent">vs</span> 云端' },
    subtitle: { en: 'Data sovereignty vs user experience', zh: '两种部署模式 · 数据主权与体验的取舍' },
    tag:      { en: 'Pattern',         zh: '架构模式' },
    tagClass: 'tag-pattern',
    viewBox: '0 0 760 268',

    getSvg(lang) {
      const pros = (items) => items.map(s => `<tspan x="0" dy="16" fill="#00e59988">✓ ${s}</tspan>`).join('');
      const cons = (items) => items.map(s => `<tspan x="0" dy="16" fill="#ff4d6d88">✗ ${s}</tspan>`).join('');

      return `
        <!-- LOCAL panel -->
        <rect x="28" y="20" width="336" height="228" rx="8"
          fill="#00c8ff08" stroke="#00c8ff40" stroke-width="1.5" stroke-dasharray="4 3"/>
        <text x="196" y="44" text-anchor="middle" fill="#00c8ff"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="500">
          ${t(lang, 'Local Mode', '本地模式')}
        </text>
        <rect x="52" y="58" width="288" height="154" rx="6" fill="#0d1526" stroke="#1e3058" stroke-width="1"/>
        <text x="98" y="76" fill="#6b84a8" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'User device', '用户设备')}
        </text>
        ${S.box(62, 84, 120, 42, '#00c8ff', t(lang, 'Shell Program', 'UI 界面程序'), '')}
        ${S.box(62, 140, 120, 42, '#ffb800', t(lang, 'Memory Files', '记忆文件'), '')}
        <line x1="242" y1="110" x2="296" y2="110" stroke="#6b84a8" stroke-width="1.2" marker-end="url(#arr)" stroke-dasharray="3 2"/>
        <text x="268" y="103" text-anchor="middle" fill="#6b84a888"
          font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'your key', '用户自己的 Key')}
        </text>
        <rect x="296" y="96" width="34" height="30" rx="4" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1"/>
        <text x="313" y="116" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="8">API</text>
        <text x="62" y="213" font-family="'JetBrains Mono',monospace" font-size="9">
          ${pros([t(lang, 'Data stays local', '数据不离本地'), t(lang, 'Choose your compute', '算力可自选最优')])}
          ${cons([t(lang, 'Needs API key setup', '需要配置 Key'), t(lang, 'Technical barrier', '有技术门槛')])}
        </text>

        <!-- CLOUD panel -->
        <rect x="396" y="20" width="336" height="228" rx="8"
          fill="#a78bfa08" stroke="#a78bfa40" stroke-width="1.5" stroke-dasharray="4 3"/>
        <text x="564" y="44" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="500">
          ${t(lang, 'Cloud Mode', '云端模式')}
        </text>
        <rect x="420" y="58" width="288" height="154" rx="6" fill="#0d1526" stroke="#1e3058" stroke-width="1"/>
        <text x="466" y="76" fill="#6b84a8" font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Your server', '你的服务器')}
        </text>
        ${S.box(430, 84, 120, 42, '#a78bfa', t(lang, 'Shell Program', 'UI 界面程序'), '')}
        ${S.box(430, 140, 120, 42, '#ffb800', t(lang, 'Memory Files', '记忆文件'), '')}
        <line x1="610" y1="110" x2="660" y2="110" stroke="#6b84a8" stroke-width="1.2" marker-end="url(#arr)" stroke-dasharray="3 2"/>
        <text x="634" y="103" text-anchor="middle" fill="#6b84a888"
          font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'your key', '你的 Key')}
        </text>
        <rect x="660" y="96" width="34" height="30" rx="4" fill="#a78bfa18" stroke="#a78bfa" stroke-width="1"/>
        <text x="677" y="116" text-anchor="middle" fill="#a78bfa"
          font-family="'JetBrains Mono',monospace" font-size="8">API</text>
        <text x="430" y="213" font-family="'JetBrains Mono',monospace" font-size="9">
          ${pros([t(lang, 'Zero setup for users', '用户零配置'), t(lang, 'Smooth UX', '体验流畅')])}
          ${cons([t(lang, 'You pay compute cost', '你承担算力成本'), t(lang, 'Data on your server', '数据在你服务器')])}
        </text>
      `;
    },

    content: {
      en: {
        definition: 'Two Agent deployment modes: <strong>Local</strong> (Agent runs on the user\'s device with their own API key) and <strong>Cloud</strong> (Agent runs on the product\'s server; users pay for usage).',
        essence: 'Fundamentally a trade-off between <em>data sovereignty</em> and <em>ease of use</em>.\n\nLocal is better for: technical users, privacy-sensitive use cases, users who want to control compute costs.\n\nCloud is better for: consumer-facing products that need zero-config, out-of-the-box experience.\n\n<strong>Worth noting:</strong> In cloud mode, user data necessarily flows through your server, regardless of what you "promise." This is an architectural fact, not a matter of intent.',
        insight: 'Developers with access to cheap compute should consider local mode: data stays on device, costs are self-controlled, and users can use the latest models. Local mode is the architecture where "the Agent truly belongs to the user."'
      },
      zh: {
        definition: '两种 Agent 系统部署方式：<strong>本地模式</strong>（Agent 跑在用户设备，用户自己的 Key）和<strong>云端模式</strong>（Agent 跑在产品服务器，用户充值使用）。',
        essence: '本质上是<em>数据主权</em>和<em>使用门槛</em>之间的取舍。\n\n本地模式更适合：技术用户、对数据隐私有要求的场景、想要自己控制算力成本的用户。\n\n云端模式更适合：面向普通用户的消费级产品，需要零配置开箱即用体验。\n\n<strong>值得注意</strong>：云端模式下，用户数据必然流经你的服务器，不管你是否"承诺不看"。这是架构决定的，不是意愿问题。',
        insight: '有渠道拿到便宜算力的开发者，本地模式是最香的：数据在本地、成本自控、能用最新模型。本地模式才是真正意义上"Agent 属于用户"的架构。'
      }
    }
  });
})();
