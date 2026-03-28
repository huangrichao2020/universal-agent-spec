(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '08-multi-agent',
    order: 8,
    nav:      { en: 'Multi-Agent Comm', zh: '多Agent通信' },
    title:    { en: 'Multi-<span class="accent">Agent</span> Communication', zh: '多 <span class="accent">Agent</span> 通信' },
    subtitle: { en: 'No chatting — only handoffs', zh: '没有闲聊，只有交接' },
    tag:      { en: 'System',           zh: '系统概念' },
    tagClass: 'tag-system',
    viewBox: '0 0 760 258',

    getSvg(lang) {
      return `
        <!-- Wrong side label -->
        <text x="185" y="30" text-anchor="middle" fill="#ff4d6d"
          font-family="'JetBrains Mono',monospace" font-size="12">
          ✗  ${t(lang, 'Common misconception', '错误认知')}
        </text>
        ${S.box(38, 52, 145, 65, '#ff4d6d', t(lang, 'Agent A', 'Agent A'), '')}
        ${S.box(228, 52, 145, 65, '#ff4d6d', t(lang, 'Agent B', 'Agent B'), '')}
        <line x1="183" y1="78" x2="226" y2="78" stroke="#ff4d6d" stroke-width="1.5" marker-end="url(#arr)"/>
        <line x1="228" y1="94" x2="185" y2="94" stroke="#ff4d6d" stroke-width="1.5" marker-end="url(#arr)"/>
        <text x="205" y="73" text-anchor="middle" fill="#ff4d6d"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Direct chat?', '直接聊天？')}
        </text>
        <text x="205" y="108" text-anchor="middle" fill="#ff4d6d88"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Agents have no spontaneous comm', 'Agent 无自发通信能力')}
        </text>

        <line x1="400" y1="18" x2="400" y2="235" stroke="#1e3058" stroke-width="1" stroke-dasharray="4 3"/>

        <!-- Correct side label -->
        <text x="580" y="30" text-anchor="middle" fill="#1a8a3a"
          font-family="'JetBrains Mono',monospace" font-size="12">
          ✓  ${t(lang, 'Actual mechanism', '实际机制')}
        </text>
        ${S.box(428, 52, 105, 65, '#0050a0', t(lang, 'Agent A', 'Agent A'), '')}
        ${S.box(638, 52, 105, 65, '#a78bfa', t(lang, 'Agent B', 'Agent B'), '')}
        <rect x="538" y="72" width="94" height="34" rx="4" fill="#ffb80018" stroke="#ffb800" stroke-width="1.2"/>
        <text x="585" y="88" text-anchor="middle" fill="#ffb800"
          font-family="'JetBrains Mono',monospace" font-size="9" font-weight="500">
          ${t(lang, 'Workflow porter', '工作流搬运')}
        </text>
        <text x="585" y="100" text-anchor="middle" fill="#ffb80088"
          font-family="'JetBrains Mono',monospace" font-size="8">
          ${t(lang, 'file/pipe/queue', '文件/管道/队列')}
        </text>
        <line x1="533" y1="88" x2="540" y2="88" stroke="#ffb800" stroke-width="1.2" marker-end="url(#arrA)"/>
        <line x1="632" y1="88" x2="640" y2="88" stroke="#ffb800" stroke-width="1.2" marker-end="url(#arr)"/>

        ${S.box(438, 168, 145, 52, '#0050a0',
          t(lang, 'File pass', '文件传递'),
          t(lang, 'A writes → B reads', 'A 写 → B 读'))}
        ${S.box(598, 168, 145, 52, '#a78bfa',
          t(lang, 'Pipe pass', '管道传递'),
          t(lang, 'stdout → stdin', 'stdout → stdin'))}

        <text x="447" y="158" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Large data', '大数据量')}
        </text>
        <text x="608" y="158" fill="#6b84a8"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Realtime', '实时流式')}
        </text>

        ${S.label(580, 248,
          t(lang, 'A "porter" workflow program must relay all inter-Agent messages',
                  '中间必须有工作流程序作为"搬运工"'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'Agents <strong>cannot communicate directly</strong>. What is called "multi-Agent conversation" is really: A\'s output → workflow program reads → constructs new context → B\'s input.',
        essence: 'This is the most misunderstood concept. Many believe that in a multi-Agent system, Agents are "chatting" — in reality they are completely unaware of each other\'s existence.\n\nAll each Agent sees is: a context (task + previous Agent\'s output). It processes and outputs. The <em>workflow program</em> is what chains everything together.\n\n<strong>File transfer:</strong> A writes a file, B reads it (good for large data, batch)\n<strong>Pipe transfer:</strong> A\'s stdout feeds directly to B\'s stdin (good for real-time streaming)',
        insight: 'Think of multi-Agent systems as an assembly line, not a team meeting. Each worker (Agent) focuses on their station, receives material from upstream, processes it, passes downstream. They don\'t know each other and don\'t need to.'
      },
      zh: {
        definition: 'Agent 之间<strong>不能直接通信</strong>。所谓"多 Agent 对话"，本质是：A 的输出 → 工作流程序读取 → 构造新的 context → B 的输入。',
        essence: '这是最容易被误解的概念。很多人以为多 Agent 系统里 Agent 们在"聊天"——实际上它们完全不知道对方的存在。\n\n它们看到的只是：一个 context（包含任务 + 上一步的产出），处理后输出结果。是<em>工作流程序</em>在串联这一切。\n\n<strong>文件传递</strong>：A 写入文件，B 读取文件（适合大数据量、批处理）\n<strong>管道传递</strong>：A 的 stdout 直接接 B 的 stdin（适合实时流式处理）',
        insight: '把多 Agent 系统理解成"工厂流水线"比"团队讨论"更准确：每个工人（Agent）只专注自己的工位，拿到上游传过来的物料，加工后传给下游，互相不认识也不需要认识。'
      }
    }
  });
})();
