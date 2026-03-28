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
    viewBox: '0 0 760 300',

    getSvg(lang) {
      const checkItems = (items, color, startY, baseX) =>
        items.map((s, i) => `<text x="${baseX}" y="${startY + i*18}" fill="${color}"
          font-family="'JetBrains Mono',monospace" font-size="10">· ${s}</text>`).join('');

      return `
        <!-- LOCAL panel -->
        <rect x="24" y="18" width="338" height="268" rx="10"
          fill="#edf4ff" stroke="#0071e3" stroke-width="1.5" stroke-dasharray="5 3"/>
        <text x="193" y="42" text-anchor="middle" fill="#0071e3"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="600">
          ${t(lang, 'Local Mode', '本地模式')}
        </text>

        <!-- Local inner device box -->
        <rect x="44" y="52" width="200" height="148" rx="7"
          fill="#f7f3ea" stroke="#8e8e93" stroke-width="1"/>
        <text x="64" y="70" fill="#636366"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'User device', '用户设备')}
        </text>
        ${S.box(54, 80, 118, 40, '#0071e3', t(lang, 'UI Program', 'UI 界面程序'), '')}
        ${S.box(54, 134, 118, 40, '#f59e0b', t(lang, 'Memory Files', '记忆文件'), '')}

        <!-- Local arrow + LLM box -->
        <line x1="260" y1="126" x2="294" y2="126"
          stroke="#0071e3" stroke-width="1.5" marker-end="url(#arrC)" stroke-dasharray="4 2"/>
        <text x="277" y="119" text-anchor="middle" fill="#636366"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'user key', '用户 Key')}
        </text>
        <rect x="294" y="106" width="56" height="40" rx="5"
          fill="#edf4ff" stroke="#0071e3" stroke-width="1.2"/>
        <text x="322" y="122" text-anchor="middle" fill="#0071e3"
          font-family="'JetBrains Mono',monospace" font-size="9" font-weight="600">LLM</text>
        <text x="322" y="136" text-anchor="middle" fill="#0071e3"
          font-family="'JetBrains Mono',monospace" font-size="8">API</text>

        <!-- Local pros/cons -->
        ${checkItems([t(lang,'Data stays local','数据不离本地'), t(lang,'Choose your compute','算力可自选')], '#1a8a3a', 218, 40)}
        ${checkItems([t(lang,'Needs API key setup','需要配置 Key'), t(lang,'Technical barrier','有技术门槛')], '#ff3b30', 252, 40)}

        <!-- CLOUD panel -->
        <rect x="398" y="18" width="338" height="268" rx="10"
          fill="#f5f0ff" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="5 3"/>
        <text x="567" y="42" text-anchor="middle" fill="#7c3aed"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="600">
          ${t(lang, 'Cloud Mode', '云端模式')}
        </text>

        <!-- Cloud inner server box -->
        <rect x="418" y="52" width="200" height="148" rx="7"
          fill="#f7f3ea" stroke="#8e8e93" stroke-width="1"/>
        <text x="438" y="70" fill="#636366"
          font-family="'JetBrains Mono',monospace" font-size="10">
          ${t(lang, 'Your server', '你的服务器')}
        </text>
        ${S.box(428, 80, 118, 40, '#7c3aed', t(lang, 'UI Program', 'UI 界面程序'), '')}
        ${S.box(428, 134, 118, 40, '#f59e0b', t(lang, 'Memory Files', '记忆文件'), '')}

        <!-- Cloud arrow + LLM box -->
        <line x1="634" y1="126" x2="668" y2="126"
          stroke="#7c3aed" stroke-width="1.5" marker-end="url(#arr)" stroke-dasharray="4 2"/>
        <text x="651" y="119" text-anchor="middle" fill="#636366"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'your key', '你的 Key')}
        </text>
        <rect x="668" y="106" width="56" height="40" rx="5"
          fill="#f5f0ff" stroke="#7c3aed" stroke-width="1.2"/>
        <text x="696" y="122" text-anchor="middle" fill="#7c3aed"
          font-family="'JetBrains Mono',monospace" font-size="9" font-weight="600">LLM</text>
        <text x="696" y="136" text-anchor="middle" fill="#7c3aed"
          font-family="'JetBrains Mono',monospace" font-size="8">API</text>

        <!-- Cloud pros/cons -->
        ${checkItems([t(lang,'Zero setup for users','用户零配置'), t(lang,'Smooth UX','体验流畅')], '#1a8a3a', 218, 414)}
        ${checkItems([t(lang,'You pay compute cost','你承担算力成本'), t(lang,'Data on your server','数据在你服务器')], '#ff3b30', 252, 414)}
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
