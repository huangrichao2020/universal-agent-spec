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
        essence: 'Skills are a special form of memory, but many people confuse Skills with Prompts. The key difference: <em>Prompts describe identity and style</em>; <em>Skills describe executable step-by-step procedures.</em>\n\nThe value of a Skill lies in "structuring expert knowledge": a senior DevOps engineer\'s incident response flow, once written as a Skill, can be reproduced by any Agent at expert level.\n\n<strong>Going deeper: Skills are NOT "organized prompt templates."</strong> A mature Skill is a full <em>capability package</em>. It can embed executable scripts (bash/python), define multi-step workflows with branching and rollback, orchestrate tool chains with strict dependency order, include quality checklists, and even dispatch sub-Agents. Think of it as a "micro-application" written in Markdown that the Agent interprets and executes.',
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
        insight: 'Accumulated Skills are an Agent\'s true moat. An Agent with 200 refined Skills vastly outperforms one that has only changed its underlying model several times. Skills are your asset; the model is the tool you rent.',
        code: `<span class="cmt"># A Skill is a capability package — not just organized prompts</span>
<span class="kw">name:</span> deploy-and-verify
<span class="kw">description:</span> <span class="str">Deploy, verify, rollback on failure</span>

<span class="cmt">## ① Workflow (branching logic)</span>
build → deploy → health_check
  ├─ <span class="str">pass</span> → notify(<span class="str">"deployed"</span>)  ✅
  └─ <span class="str">fail</span> → rollback → alert(<span class="str">"rolled back"</span>)

<span class="cmt">## ② Embedded Script</span>
<span class="fn">docker build</span> -t $SVC . && <span class="fn">docker push</span> $REG/$SVC
<span class="fn">curl</span> -sf $URL/health || <span class="kw">exit 1</span>

<span class="cmt">## ③ Quality Checklist</span>
<span class="kw">□</span> Port conflict cleared   <span class="kw">□</span> Env vars complete
<span class="kw">□</span> Rollback script tested

<span class="cmt">## ④ Sub-Agent Dispatch</span>
→ search-agent: <span class="str">find latest stable image</span>
→ notify-agent: <span class="str">alert team on Slack</span>`
      },
      zh: {
        definition: '告诉 Agent "遇到 X 类任务时，如何一步步处理"的结构化文档。<strong>Skill 是过程性记忆（Procedural Memory）</strong>——就像骑自行车的肌肉记忆。',
        essence: 'Skill 是记忆的特殊形式，但很多人把 Skill 和 Prompt 混淆。关键区别：<em>Prompt 描述身份和风格</em>，<em>Skill 描述可执行的操作步骤</em>。\n\nSkill 的价值在于"将专家知识结构化"：一个资深运维工程师对某类故障的处理流程，写成 Skill 后，任何 Agent 都能复现这个专家级处理能力。\n\n<strong>更深一层：Skill 绝不是"提示词的归类整理"。</strong>一个成熟的 Skill 是完整的<em>能力封装单元</em>。它可以内嵌可执行脚本（bash/python）、定义含分支和回退的多步骤工作流、编排工具链的严格调用顺序、包含质量检查清单、甚至调度子 Agent。Skill 本质上是一个用 Markdown 编写的"微型应用"，Agent 解析并执行其中的指令。',
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
        insight: 'Skill 的累积是 Agent 真正的护城河。一个积累了 200 个精细 Skill 的 Agent，其能力远超那个只是频繁更换底层模型、却没有 Skill 积累的 Agent。Skill 是你的资产，模型是你租的工具。',
        code: `<span class="cmt"># Skill 是能力封装单元 — 不只是提示词归类</span>
<span class="kw">name:</span> deploy-and-verify
<span class="kw">description:</span> <span class="str">部署服务，自动验证，失败则回滚</span>

<span class="cmt">## ① 工作流（含分支逻辑）</span>
build → deploy → health_check
  ├─ <span class="str">通过</span> → notify(<span class="str">"上线成功"</span>)  ✅
  └─ <span class="str">失败</span> → rollback → alert(<span class="str">"已回滚"</span>)

<span class="cmt">## ② 内嵌脚本</span>
<span class="fn">docker build</span> -t $SVC . && <span class="fn">docker push</span> $REG/$SVC
<span class="fn">curl</span> -sf $URL/health || <span class="kw">exit 1</span>

<span class="cmt">## ③ 质量检查清单</span>
<span class="kw">□</span> 端口冲突检查完成    <span class="kw">□</span> 环境变量完整
<span class="kw">□</span> 回滚脚本已测试

<span class="cmt">## ④ 子 Agent 调度</span>
→ search-agent: <span class="str">查找最新稳定镜像版本</span>
→ notify-agent: <span class="str">通知团队成员</span>`
      }
    }
  });
})();
