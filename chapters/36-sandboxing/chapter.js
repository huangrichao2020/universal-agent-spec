(function () {
  const S = window.AgentSpecHelpers;
  const t = (lang, en, zh) => lang === 'zh' ? zh : en;

  window.AgentSpec.register({
    id: '36-sandboxing',
    order: 36,

    nav:      { en: 'Sandboxing', zh: '沙盒执行' },
    title:    { en: '<span class="accent">Sandboxing</span>', zh: '<span class="accent">沙盒执行</span>' },
    subtitle: { en: 'Least Privilege · FS Isolation · Network Isolation', zh: 'Least Privilege · FS Isolation · Network Isolation' },
    tag:      { en: 'System', zh: '系统' },
    tagClass: 'tag-system',

    viewBox: '0 0 760 320',

    getSvg(lang) {
      let svg = '';

      svg += `
        <rect x="40" y="28" width="680" height="240" rx="10"
          fill="${S.c.dim}10" stroke="${S.c.dim2}" stroke-width="1.5"/>
        <text x="380" y="50" text-anchor="middle" fill="${S.c.textDim}"
          font-family="'JetBrains Mono',monospace" font-size="12" font-weight="600">
          ${t(lang, 'Host', '宿主机')}
        </text>
      `;

      svg += S.box(205, 82, 350, 70, S.c.cyan,
        t(lang, 'Sandbox Container', '沙盒容器'),
        t(lang, 'temp fs + restricted runtime', '临时文件系统 + 受限运行时'));
      svg += S.box(260, 176, 240, 54, S.c.red,
        t(lang, 'Untrusted Code', '不可信代码'),
        t(lang, 'generated bash / python', '生成的 bash / python'));

      svg += S.box(58, 112, 120, 50, S.c.green,
        t(lang, 'File System', '文件系统'),
        t(lang, 'mount allowlist', '挂载白名单'));
      svg += S.box(582, 112, 120, 50, S.c.amber,
        t(lang, 'Network', '网络'),
        t(lang, 'off / allowlist', '关闭 / 白名单'));

      svg += S.dashed(178, 137, 205, 117, S.c.green);
      svg += S.dashed(555, 117, 582, 137, S.c.amber);

      svg += S.label(380, 286,
        t(lang, 'Generated code should execute inside a constrained envelope, never as implicit host authority.',
                '模型生成的代码应该始终在受限包络内执行，而不是天然继承宿主机权限。'),
        S.c.textDim, 10);

      return svg;
    },

    content: {
      en: {
        perspective2026: 'By 2026, the most capable agents are also the most dangerous if executed naively. Coding agents write shell commands, browser agents can click real UI, and subagents can chain tools in parallel. The central lesson of the last year is simple: model output is untrusted input until it has passed through permission checks and a constrained runtime.',
        definition: 'Sandboxing is the practice of running <strong>model-produced or otherwise untrusted actions inside a constrained execution environment</strong> with explicit limits on files, network, tools, secrets, and escalation paths.',
        essence: `<strong>Treat generated code as untrusted:</strong> once an agent can emit bash, Python, SQL, or browser actions, you are no longer in a pure reasoning system. You are operating an execution environment. Sandboxing is what keeps "helpful automation" from becoming arbitrary host authority.\n\n<strong>Least privilege:</strong> the default mode should be read-only or tightly scoped write access. Escalation to broader permissions should happen only for a specific reason, ideally with human approval.\n\n<strong>Filesystem isolation:</strong> do not let generated code wander the entire host. Mount only the workspace or temp directories it actually needs. Keep secrets and unrelated repos out of reach.\n\n<strong>Network isolation:</strong> outbound network access changes the threat model completely. Strong sandboxes either disable it or restrict it to allowlisted destinations.\n\n<strong>Real cases:</strong> <a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code</a> made permission modes and tool approval part of the agent UX, while <a href="https://www.anthropic.com/news/computer-use" target="_blank" rel="noreferrer">Anthropic's Computer Use work</a> reinforced the need for a clear trust boundary when the model can operate real software surfaces.`,
        insight: 'Sandboxing is not an "enterprise extra." It is the mechanism that lets you safely grant autonomy at all.',
        pitfalls: [
          'Running generated commands directly on the host because the task looks familiar or low risk.',
          'Giving the sandbox access to the whole filesystem, which turns one agent task into ambient authority over unrelated assets.',
          'Allowing unrestricted network by default, then being surprised when prompt injection or tool misuse can exfiltrate data.'
        ],
        furtherReading: [
          { title: 'Claude Code documentation', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic: Computer Use', url: 'https://www.anthropic.com/news/computer-use' },
          { title: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering' }
        ],
        crossRefs: [
          {
            chapterId: '04-shell',
            reason: 'The shell runtime is where permission prompts, command execution, and boundary enforcement actually live.'
          },
          {
            chapterId: '26-guardrails',
            reason: 'Guardrails define policy; sandboxing enforces policy at execution time.'
          },
          {
            chapterId: '32-computer-use',
            reason: 'Screen-level agents make sandbox boundaries urgent because clicks and keystrokes operate real software directly.'
          }
        ],
        code: `<span class="cmt"># Run: python3 sandbox_guard.py</span>
<span class="kw">from</span> pathlib <span class="kw">import</span> Path

allowed_root = Path(<span class="str">'/tmp/agent-sandbox'</span>).resolve()
allowed_root.mkdir(parents=<span class="kw">True</span>, exist_ok=<span class="kw">True</span>)

target = (allowed_root / <span class="str">'result.txt'</span>).resolve()

<span class="kw">if</span> allowed_root <span class="kw">not in</span> target.parents <span class="kw">and</span> target != allowed_root:
    <span class="kw">raise</span> RuntimeError(<span class="str">'blocked write outside sandbox'</span>)

target.write_text(<span class="str">'safe output\\n'</span>)
<span class="kw">print</span>(target.read_text().strip())`,
        table: {
          title: 'Execution boundary checklist',
          headers: ['Control', 'Question', 'Good default'],
          rows: [
            ['Filesystem', 'What paths are writable?', 'Workspace or temp only'],
            ['Network', 'Can code dial out?', 'Disabled or allowlisted'],
            ['Secrets', 'What credentials are visible?', 'Inject none by default'],
            ['Escalation', 'Who approves more power?', 'Explicit human gate'],
            ['Audit', 'Can you explain what ran?', 'Trace every action'],
          ]
        }
      },
      zh: {
        perspective2026: '到了 2026 年，最强的 Agent 也往往是最危险的，如果你用天真的方式执行它。编码 Agent 会写 shell 命令，浏览器 Agent 能点真实界面，子 Agent 还能并行串工具。过去一年最核心的教训很简单：模型输出在经过权限检查和受限运行时之前，都应该被视为不可信输入。',
        definition: 'Sandboxing 是把<strong>模型产出的代码或其他不可信动作</strong>放进受限执行环境中运行的做法，并显式限制它可访问的文件、网络、工具、密钥和权限升级路径。',
        essence: `<strong>把生成代码当作不可信输入：</strong>一旦 Agent 能输出 bash、Python、SQL 或浏览器动作，你就不再处于纯推理系统，而是在运营一个执行环境。沙盒的作用，就是防止“有帮助的自动化”直接滑向宿主机级任意执行。\n\n<strong>最小权限：</strong>默认模式应该是只读或严格受限的写权限。只有在明确需要时，才提升到更高权限，而且最好经过人工确认。\n\n<strong>文件系统隔离：</strong>不要让生成代码在整个宿主机上随意游走。只挂载它真正需要的工作目录或临时目录，把 secrets 和无关仓库隔离开。\n\n<strong>网络隔离：</strong>一旦打开出网，威胁模型就会完全变化。强沙盒通常要么默认关网，要么只允许访问白名单目标。\n\n<strong>真实案例：</strong><a href="https://docs.claude.com/en/docs/claude-code" target="_blank" rel="noreferrer">Claude Code</a> 把 permission modes 和工具审批变成了 Agent UX 的一部分，而 <a href="https://www.anthropic.com/news/computer-use" target="_blank" rel="noreferrer">Anthropic 的 Computer Use</a> 也再次强调：当模型可以操作真实软件表面时，信任边界必须非常清晰。`,
        insight: '沙盒不是“企业版增强功能”，而是你敢不敢给 Agent 自主执行权的前提条件。',
        pitfalls: [
          '因为任务看起来熟悉或风险低，就让模型生成的命令直接在宿主机上运行。',
          '让沙盒默认可见整个文件系统，结果一个 Agent 任务就获得了对无关资产的环境级权限。',
          '默认放开网络，然后对 prompt injection 或工具误用导致的数据外传感到意外。'
        ],
        furtherReading: [
          { title: 'Claude Code 文档', url: 'https://docs.claude.com/en/docs/claude-code' },
          { title: 'Anthropic：Computer Use', url: 'https://www.anthropic.com/news/computer-use' },
          { title: 'Anthropic 工程博客', url: 'https://www.anthropic.com/engineering' }
        ],
        crossRefs: [
          {
            chapterId: '04-shell',
            reason: 'Shell Runtime 是权限提示、命令执行和边界 enforcement 真正发生的地方。'
          },
          {
            chapterId: '26-guardrails',
            reason: 'Guardrail 负责定义策略，Sandboxing 负责在执行期把策略真正落地。'
          },
          {
            chapterId: '32-computer-use',
            reason: '屏幕级 Agent 会直接操作真实软件，所以沙盒边界的重要性会被迅速放大。'
          }
        ],
        code: `<span class="cmt"># 运行：python3 sandbox_guard.py</span>
<span class="kw">from</span> pathlib <span class="kw">import</span> Path

allowed_root = Path(<span class="str">'/tmp/agent-sandbox'</span>).resolve()
allowed_root.mkdir(parents=<span class="kw">True</span>, exist_ok=<span class="kw">True</span>)

target = (allowed_root / <span class="str">'result.txt'</span>).resolve()

<span class="kw">if</span> allowed_root <span class="kw">not in</span> target.parents <span class="kw">and</span> target != allowed_root:
    <span class="kw">raise</span> RuntimeError(<span class="str">'blocked write outside sandbox'</span>)

target.write_text(<span class="str">'safe output\\n'</span>)
<span class="kw">print</span>(target.read_text().strip())`,
        table: {
          title: '执行边界检查表',
          headers: ['控制项', '要问什么', '推荐默认值'],
          rows: [
            ['文件系统', '哪些路径可写？', '仅工作目录或临时目录'],
            ['网络', '代码能否出网？', '默认关闭或白名单'],
            ['密钥', '能看到哪些凭证？', '默认不注入'],
            ['升级权限', '谁批准更高权限？', '显式人工门禁'],
            ['审计', '能否解释跑了什么？', '记录每个动作'],
          ]
        }
      }
    }
  });
})();
