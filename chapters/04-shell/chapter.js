// chapters/04-shell/chapter.js
(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '04-shell',
    order: 4,
    nav:      { en: 'Shell Program', zh: 'UI 界面程序' },
    title:    { en: 'Shell <span class="accent">Program</span>', zh: 'UI 界面 <span class="accent">程序</span>' },
    subtitle: { en: 'The execution body of an Agent', zh: 'Agent 的执行躯体' },
    tag:      { en: 'Core Concept', zh: '核心概念' },
    tagClass: 'tag-core',
    viewBox: '0 0 760 250',

    getSvg(lang) {
      const shells = [
        [145, 42, '#a78bfa', 'Claude Code', 'claude cli'],
        [580, 42, '#ffb800', 'Codex CLI',   'openai codex'],
        [105, 185, '#1a8a3a', 'Qwen CLI',   'qwen code'],
        [580, 185, '#ff4d6d', t(lang, 'Custom Script', '自研脚本'), 'python/node'],
      ];

      const boxes = shells.map(([x, y, c, n, s]) => `
        <rect x="${x-65}" y="${y-20}" width="130" height="44" rx="5"
          fill="${c}12" stroke="${c}" stroke-width="1.2"/>
        <text x="${x}" y="${y-2}" text-anchor="middle" fill="${c}"
          font-family="'JetBrains Mono',monospace" font-size="11" font-weight="500">${n}</text>
        <text x="${x}" y="${y+14}" text-anchor="middle" fill="${c}88"
          font-family="'JetBrains Mono',monospace" font-size="9">${s}</text>
      `).join('');

      const lines = `
        <line x1="210" y1="52" x2="334" y2="100" stroke="#2a4578" stroke-width="1.2"/>
        <line x1="515" y1="52" x2="426" y2="100" stroke="#2a4578" stroke-width="1.2"/>
        <line x1="170" y1="177" x2="332" y2="140" stroke="#2a4578" stroke-width="1.2"/>
        <line x1="515" y1="177" x2="428" y2="145" stroke="#2a4578" stroke-width="1.2"/>
      `;

      return `
        ${boxes}
        <circle cx="380" cy="120" r="58" fill="#00c8ff0a" stroke="#00c8ff" stroke-width="1.5"/>
        <text x="380" y="115" text-anchor="middle" fill="#00c8ff"
          font-family="'JetBrains Mono',monospace" font-size="13" font-weight="500">Agent</text>
        <text x="380" y="133" text-anchor="middle" fill="#00c8ff88"
          font-family="'JetBrains Mono',monospace" font-size="9">
          ${t(lang, 'Memory Files', '记忆文件')}
        </text>
        ${lines}
        ${S.label(380, 240,
          t(lang, 'Any program that can invoke the LLM API can serve as a shell program',
                  '任何能发起大模型 API 请求的程序，都可以作为 Agent 的UI 界面程序'),
          '#6b84a8', 11)}
      `;
    },

    content: {
      en: {
        definition: 'The program responsible for the closed loop: "read memory files → build API request → parse response → execute actions → update memory files." The shell program is the execution body of an Agent.',
        essence: 'The shell program itself produces no intelligence — it is the <em>scheduler</em>. The best shell programs come from official LLM vendors (Claude Code, Codex CLI) because they natively support:\n\n<strong>Multiple instances</strong> (open multiple Agents like opening terminal windows); built-in <strong>file system interaction</strong> (read/write memory files directly); standard I/O interfaces that naturally suit <strong>workflow chaining</strong>.',
        table: {
          title: 'Shell Program Comparison',
          headers: ['Program', 'Vendor', 'Strengths', 'Best for'],
          rows: [
            ['Claude Code / cli', 'Anthropic', 'Most mature, project-level context', 'Complex engineering, long-running tasks'],
            ['Codex CLI', 'OpenAI', 'Code-focused, lightweight', 'Code generation, review'],
            ['Qwen Code / cli', 'Alibaba', 'Chinese-friendly, domestic models', 'China environment, Chinese content'],
            ['Custom Python script', 'Yourself', 'Fully controlled', 'Custom workflows, cost optimization'],
          ]
        },
        insight: 'Prefer official vendor CLIs over rolling your own SDK wrapper. The official CLIs have optimized tool calling, error handling, and token management — you skip months of debugging.'
      },
      zh: {
        definition: '负责"读取记忆文件 → 构造 API 请求 → 解析响应 → 执行动作 → 更新记忆文件"这一<strong>闭环</strong>的程序。UI 界面程序是 Agent 的执行躯体。',
        essence: 'UI 界面程序本身不产生智能，它是<em>调度者</em>。最好的UI 界面程序来自大模型厂商官方（Claude Code、Codex CLI），原因：\n\n原生支持<strong>多开</strong>（像开多个终端窗口一样启动多个 Agent）；内置<strong>文件系统交互</strong>（直接读写记忆文件）；标准输入输出接口，天然适合<strong>工作流串联</strong>。',
        table: {
          title: '主流UI 界面程序对比',
          headers: ['程序', '厂商', '特点', '适合场景'],
          rows: [
            ['Claude Code / cli', 'Anthropic', '最成熟，项目级上下文', '复杂代码工程、长期任务'],
            ['Codex CLI', 'OpenAI', '代码专向，轻量', '代码生成、review'],
            ['Qwen Code / cli', '阿里云', '中文友好，接国内模型', '国内环境、中文场景'],
            ['自研 Python 脚本', '你自己', '完全可控', '特定工作流、成本控制'],
          ]
        },
        insight: '推荐优先使用厂商官方 CLI 作为UI 界面程序，而非自己用 SDK 封装。官方 CLI 在工具调用、错误处理、Token 管理上做了大量优化，踩的坑你不用再踩一遍。'
      }
    }
  });
})();
