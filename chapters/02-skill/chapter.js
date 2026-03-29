(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '02-skill',
    order: 2,

    nav:      { en: 'Skill',      zh: 'Skill 技能' },
    title:    { en: '<span class="accent">Skill</span> Document', zh: '<span class="accent">Skill</span> 技能文档' },
    subtitle: { en: 'Procedural memory for Agents', zh: 'Agent 的过程性记忆' },
    tag:      { en: 'Core Concept', zh: '核心概念' },
    tagClass: 'tag-core',

    viewBox: '0 0 760 270',

    getSvg(lang) {
      const filename = t(lang, 'skill_send_notification.md', 'skill_send_feishu.md');
      const sections = [
        t(lang, '## Trigger', '## 触发条件'),
        t(lang, '## Steps',   '## 执行步骤'),
        t(lang, '## Notes',   '## 注意事项'),
      ];
      const lineWidths = [140, 100, 120, 80, 110, 90];
      const lineAlphas = ['30','20','25','18','22','15'];

      const docLines = [0,1,2,3,4,5].map(i => `
        <rect x="285" y="${78+i*23}" width="${lineWidths[i]}" height="8" rx="2"
          fill="#ffb800${lineAlphas[i]}"/>
      `).join('');

      const sectionLabels = [0,1,2].map((_, i) => `
        <text x="285" y="${76 + i*64}" fill="#ffb80088"
          font-family="'JetBrains Mono',monospace" font-size="9">${sections[i]}</text>
      `).join('');

      return `
        <!-- Hint label -->
        <text x="380" y="14" text-anchor="middle" fill="#c0785a"
          font-family="'Inter','Noto Serif SC',sans-serif" font-size="13" font-weight="500">
          ${t(lang, 'Below is an example of triggering a Skill', '以下为触发 Skills 的示例')}
        </text>

        <!-- Document card -->
        <rect x="265" y="22" width="230" height="208" rx="6"
          fill="#ffb80010" stroke="#ffb800" stroke-width="1.5"/>
        <rect x="265" y="22" width="230" height="36" rx="6" fill="#ffb80025" stroke="none"/>
        <text x="380" y="46" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="12" font-weight="500">${filename}</text>

        ${docLines}
        ${sectionLabels}

        <!-- Input side -->
        ${S.box(38, 96, 140, 52, '#0050a0',
          t(lang, 'User Request', '用户请求'),
          t(lang, 'Send notification', '发送飞书通知'))}
        <line x1="178" y1="122" x2="263" y2="122"
          stroke="#0050a0" stroke-width="1.5" marker-end="url(#arrC)"/>
        <text x="220" y="115" text-anchor="middle" fill="#0050a088"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'match trigger', '匹配触发条件')}
        </text>

        <!-- Output side -->
        ${S.box(582, 96, 140, 52, '#1a8a3a',
          t(lang, 'Execute Action', '执行动作'),
          t(lang, 'POST webhook', 'POST webhook'))}
        <line x1="497" y1="122" x2="580" y2="122"
          stroke="#1a8a3a" stroke-width="1.5" marker-end="url(#arr)"/>
        <text x="540" y="115" text-anchor="middle" fill="#1a8a3a88"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'follow steps', '按步骤执行')}
        </text>

        ${S.label(380, 260,
          t(lang,
            'A Skill tells the Agent: "When you see task X, here is exactly how to handle it."',
            'Skill 是告诉 Agent "遇到 X 类任务，按这个步骤做" 的结构化文档'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'A structured document that tells an Agent "when you encounter task type X, follow these steps." <strong>Skills are procedural memory</strong> — like the muscle memory of riding a bicycle.',
        essence: 'Skills are a special form of memory, but many people confuse Skills with Prompts. The key difference: <em>Prompts describe identity and style</em>; <em>Skills describe executable step-by-step procedures.</em>\n\nThe value of a Skill lies in "structuring expert knowledge": a senior DevOps engineer\'s incident response flow, once written as a Skill, can be reproduced by any Agent at expert level.',
        table: {
          title: 'Prompt vs Skill',
          headers: ['Dimension', 'Prompt', 'Skill'],
          rows: [
            ['Describes', 'Identity, style, values', 'Concrete executable steps'],
            ['Granularity', 'Abstract, macro', 'Specific and actionable'],
            ['Trigger', 'Always active', 'Triggered by specific tasks'],
            ['Analogy', 'Employee personality', 'Employee operations manual'],
            ['Portability', 'Tied to Agent persona', 'Reusable across Agents ✅'],
          ]
        },
        insight: 'Accumulated Skills are an Agent\'s true moat. An Agent with 200 refined Skills vastly outperforms one that has only changed its underlying model several times. Skills are your asset; the model is the tool you rent.'
      },
      zh: {
        definition: '告诉 Agent "遇到 X 类任务时，如何一步步处理"的结构化文档。<strong>Skill 是过程性记忆（Procedural Memory）</strong>——就像骑自行车的肌肉记忆。',
        essence: 'Skill 是记忆的特殊形式，但很多人把 Skill 和 Prompt 混淆。关键区别：<em>Prompt 描述身份和风格</em>，<em>Skill 描述可执行的操作步骤</em>。\n\nSkill 的价值在于"将专家知识结构化"：一个资深运维工程师对某类故障的处理流程，写成 Skill 后，任何 Agent 都能复现这个专家级处理能力。',
        table: {
          title: 'Prompt vs Skill 区别',
          headers: ['维度', 'Prompt', 'Skill'],
          rows: [
            ['描述对象', '身份、风格、价值观', '具体操作步骤'],
            ['粒度', '宏观抽象', '具体可执行'],
            ['触发方式', '始终生效', '遇到特定任务触发'],
            ['类比', '员工性格', '员工操作手册'],
            ['可转移性', '与 Agent 人格绑定', '可跨 Agent 复用 ✅'],
          ]
        },
        insight: 'Skill 的累积是 Agent 真正的护城河。一个积累了 200 个精细 Skill 的 Agent，其能力远超那个只是频繁更换底层模型、却没有 Skill 积累的 Agent。Skill 是你的资产，模型是你租的工具。'
      }
    }
  });
})();
