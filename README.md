<div align="center">

<img src="https://img.shields.io/badge/version-3.0.0-00c8ff?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/badge/concepts-42-ffb800?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/badge/lang-中文%20%7C%20EN-00e599?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/badge/rights-All%20Rights%20Reserved-ff4d6d?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/badge/ClawHub-whatisagent-ff4d6d?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/github/stars/huangrichao2020/universal-agent-spec?style=for-the-badge&color=ffb800&labelColor=070b14" />

<br/><br/>

# 🌐 在线交互演示

### 42 个核心 Agent 概念 · 中英双语 · SVG 图示 · 零安装
### 42 core Agent concepts · Bilingual ZH/EN · SVG diagrams · Zero install

**直接用浏览器打开 — 无需配置，无需服务器，离线可用**
**Open in your browser right now — no setup, no server, works offline**

<br/>

## [👉 &nbsp; huangrichao2020.github.io/universal-agent-spec &nbsp; 👈](https://huangrichao2020.github.io/universal-agent-spec)

<br/>

> 一键切换中英文。每个概念都配有可视化图示、精确定义、工程洞见和代码示例
> Toggle between 中文 and English with one click. Every concept comes with a visual diagram, precise definition, engineering insight, and code example

<br/>

---

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║        U N I V E R S A L   A G E N T   S P E C          ║
║                                                          ║
║     The first engineering-grade specification that       ║
║     truly defines what an AI Agent IS and how it WORKS   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

# 🤖 通用 Agent 定义规范

### **整个 AI Agent 生态系统一直缺少的那份规范**

*别再争论"Agent"是什么了。先把地基打好*

[**▶ 在线演示**](https://huangrichao2020.github.io/universal-agent-spec) · [**⭐ Star 此仓库**](https://github.com/huangrichao2020/universal-agent-spec) · [**📖 English**](#english)

</div>

---

## 版权与授权声明

本项目不是开源项目。

允许个人基于非商业目的进行研究、学习、阅读、下载和本地测试。
未经作者事先书面授权，禁止将本项目或其衍生内容用于任何商业用途，包括但不限于产品集成、SaaS/API 服务、企业内部生产、商业培训、咨询交付、销售、转授权和再分发。

商业授权联系微信：`huangyibo181`

详见 [LICENSE.md](./LICENSE.md) 与 [COMMERCIAL-LICENSE.md](./COMMERCIAL-LICENSE.md)。

---

## 🔥 为什么要做这个

每一周，都有成千上万的开发者上线所谓的"AI Agent"——本质上不过是**一个 for 循环套着一次 API 调用**

每一天，都有团队在争论他们的系统到底是 Agent、工作流、Copilot 还是聊天机器人——争不出结果，因为**根本没有共同语言**

每一个月，都有工程师在 multi-agent 系统上浪费整个迭代周期，然后系统悄无声息地出错，因为**没有人把 Agent 之间如何交接的规则写下来**

**今天，这一切结束**

通用 Agent 定义规范是**工程级、经过实战验证、零废话**的参考手册，定义了 AI Agent 系统从最小单元到生产级多 Agent 流水线的完整概念栈——涵盖心跳监控、交接手册、商业化部署策略

---

## ⚡ 包含什么

42 个严格定义的核心概念，每个概念包含：
- 📐 **精确定义** — 它*究竟*是什么，不是营销话术
- 🧠 **本质解析** — *为什么*这样设计
- 🎨 **SVG 图示** — 可视化说明，中英双语一键切换
- 💡 **工程洞见** — 别处没人告诉你的那些事
- 💻 **代码示例** — 可运行，不是伪代码

| # | 概念 | 一句话真相 |
|---|---------|-------------------|
| 00 | **LLM API** | 无状态函数，它不记得你 |
| 01 | **Invocation** | Agent 醒来的时刻——然后死去 |
| 02 | **Skill** | 程序性记忆，专家的编码手册 |
| 03 | **Agent** | Shell 程序 + 记忆文件，不多不少 |
| 04 | **Shell Program** | 执行载体，Claude Code、Codex CLI 或你自己的 |
| 05 | **Workflow** | Agent 不能聊天，Workflow 是它们之间的搬运工 |
| 06 | **Handoff Document** | 共享白板，丢了它就丢了一切 |
| 07 | **Aware / Heartbeat** | 免疫系统，便宜模型，高频检查 |
| 08 | **Multi-Agent Comm** | 没有聊天，只有交接 |
| 09 | **Local vs Cloud** | 数据主权 vs 用户体验，有意识地选择 |
| 10 | **Light vs Heavy** | 两种范式，选错就从头重建 |
| 11 | **Business Model** | ToB 卖大脑，ToC 卖服务 |
| 12 | **Tool Use** | 函数调用是 Agent 的双手 |
| 13 | **Reasoning** | CoT / ToT / GoT，思考的拓扑学 |
| 14 | **ReAct** | 思考-行动-观察，Agent 的呼吸循环 |
| 15 | **Plan & Execute** | 强规划器 + 快执行器，分而治之 |
| 16 | **MCP** | 工具连接的 USB-C，JSON-RPC 2.0 |
| 17 | **A2A** | Agent 到 Agent，发现-协商-协作 |
| 18 | **AG-UI** | Agent 到用户，16 种事件流 |
| 19 | **Protocol Stack** | MCP + A2A + AG-UI 三层协议栈 |
| 20 | **Frameworks** | LangGraph / CrewAI / OpenAI SDK / AutoGen / ADK |
| 21 | **Low-Code** | Dify / Coze / n8n，拖拽构建 Agent |
| 22 | **Architecture Patterns** | Supervisor / 层级 / Swarm / Mesh / Pipeline |
| 23 | **Graph Orchestration** | StateGraph、检查点、时间旅行 |
| 24 | **Memory Architecture** | 5 类记忆 × 3 种存储后端 |
| 25 | **Observability** | Trace / Token / 延迟 / 决策审计 |
| 26 | **Guardrails** | 输入 / 输出 / 执行三道防线 |
| 27 | **Evaluation** | 基准测试、指标、评估驱动开发 |
| 28 | **Coding Agents** | Cursor / Codex / Devin / Claude 对比 |
| 29 | **Case Studies** | 客服 / 研究 / 数据分析实战 |
| 30 | **Formal Spec** | 8 个标准接口，形式化定义 |
| 31 | **Learning Path** | 入门 → 进阶 → 专家路线图 |
| 32 | **Computer Use** | API 不通时的最后一公里 |
| 33 | **Skills System** | 能力不是 prompt，而是可加载资产 |
| 34 | **Context Engineering** | 上下文质量常比模型大小更重要 |
| 35 | **Long-Horizon Tasks** | 没有 checkpoint，就没有长程自治 |
| 36 | **Sandboxing** | 没有沙盒的自主执行不该上线 |
| 37 | **Cost Routing** | 优化的是成功结果成本，不是单次调用成本 |
| 38 | **Agent Harness** | 外壳常比底模更决定生产力 |
| 39 | **SWE-bench** | 分数之外更重要的是失败簇 |
| 40 | **Failure Modes** | 先让失败可见，再谈成功放大 |
| 41 | **Team Topology** | 不是替代人，而是重画责任边界 |

---

## 🚀 快速开始

零依赖，零构建，零配置

```bash
git clone https://github.com/huangwei/universal-agent-spec
cd universal-agent-spec
open index.html   # 就这样
```

直接双击 `index.html` 用浏览器打开即可。**离线可用，不需要任何服务器**

---

## 🤖 给你的 Agent 注入自我认知（ClawHub Skill）

看完规范，让你的 Agent 也知道自己是什么

一条命令安装伴侣 skill，让 Agent 从第一次被唤醒起就明白自己的本质、记忆机制和常驻规则，不需要主人手动调教：

```bash
clawhub install whatisagent
```

👉 **[clawhub.ai/skills/whatisagent](https://clawhub.ai/skills/whatisagent)**

Skill 教会你的 Agent：
- Agent 究竟是什么（文件 + 调用，不是"活的"）
- 记忆文件如何工作，为什么消耗 token
- 4 条常驻规则：交接文档、调用链注释、文件操作记录、先计划后执行
- 12 概念快速参考，每句都是真相

---

## 🎯 适合谁

- **AI/LLM 工程师** — 厌倦了在生产 Agent 系统里重新发明词汇
- **工程团队 Leader** — 需要在下个迭代开始前对齐"Agent"的定义
- **研究人员** — 探索 agentic AI、自主系统、LLM pipeline
- **创业者** — 正在构建下一代 AI 原生产品
- **任何人** — 曾经在会议上看着三个人用"Agent""工作流""Copilot"描述同一个东西

---

## 🏗️ 架构设计

项目本身就是一次干净工程的示范：

```
universal-agent-spec/
├── index.html              ← 自包含，打开即用
├── manifest.js             ← 唯一的耦合点，在这里添加章节
├── core/
│   ├── registry.js         ← 章节注册 + i18n 引擎
│   ├── helpers.js          ← SVG 绘图 API (S.box / S.label / S.arrow)
│   └── styles.css          ← 设计系统
├── chapters/
│   ├── 00-llm-api/ … 11-business/   ← 基础概念 (0-11)
│   ├── 12-tool-use/ … 15-plan-exec/  ← 核心模式 (12-15)
│   ├── 16-mcp/ … 19-protocol-stack/  ← 协议层 (16-19)
│   ├── 20-frameworks/ … 23-graph/     ← 框架与编排 (20-23)
│   ├── 24-memory/ … 27-evaluation/    ← 生产就绪 (24-27)
│   ├── 28-coding/ … 31-learning/      ← 实践与进阶 (28-31)
│   ├── 32-computer-use/ … 35-long-horizon/ ← 2026 前沿模式 (32-35)
│   ├── 36-sandboxing/ … 41-team-topology/  ← 生产治理与组织层 (36-41)
│   └── XX-concept/
│       ├── chapter.js      ← 自注册，双语，隔离
│       └── CHAPTER.md      ← 每章节修改指南
├── DESIGN.md               ← 架构决策
└── CONTRIBUTING.md         ← 如何 3 步添加章节
```

**松耦合原则：** `index.html` 对章节内容零了解，章节通过 `window.AgentSpec.register()` 自注册。添加新章节 = 修改 `manifest.js` 一行

---

## 🌍 双语设计

每个概念——包括每个 SVG 图示中的每个词——都有**中文**和**English**两种语言，一键切换，无需刷新

为全球 AI 工程社区构建，最重要的 Agent 研究和产品来自硅谷*和*北京

---

## 🤝 参与贡献

欢迎任何能让规范更清晰、更准确、更完整的贡献

**添加新概念：**
1. `mkdir chapters/42-your-concept`
2. 从 `CONTRIBUTING.md` 复制模板
3. 在 `manifest.js` 添加一行

详见 [`CONTRIBUTING.md`](./CONTRIBUTING.md) 完整指南，包括 SVG 绘图 API 参考

**新概念标准：** 它是否在真实工程团队中引起混淆？当前文献是否未能清晰定义它？如果是——它应该在这里

---

## 💬 理念

> *"Agent 没有生命。它是一堆文件加一个调用程序。大模型 API 提供智能，Agent 提供持续性"*

大多数 Agent 框架给你工具。这份规范给你**心智模型**——那种 GPT-5 发布了也不会过时的东西

---

## 📊 关键词地图

`LLM` · `AI Agent` · `Multi-Agent` · `Agentic AI` · `LLM Orchestration` · `Agent Framework` · `Autonomous Agent` · `Claude` · `GPT` · `OpenAI` · `Anthropic` · `LangChain` · `LangGraph` · `AutoGPT` · `CrewAI` · `Dify` · `Coze` · `n8n` · `MCP` · `A2A` · `AG-UI` · `Model Context Protocol` · `Tool Use` · `Function Calling` · `Memory` · `Vector Database` · `Graph Orchestration` · `StateGraph` · `Guardrails` · `Evaluation` · `Google ADK` · `AutoGen` · `Swarm` · `Cursor` · `Devin` · `Codex` · `Copilot` · `Chain of Thought` · `Tree of Thought` · `ReAct` · `Reflexion` · `LATS` · `Plan and Execute` · `Reasoning Model` · `Skill` · `Handoff` · `Heartbeat` · `Observability` · `RAG` · `Prompt Engineering` · `AI Infrastructure` · `MLOps`

---

## ⭐ Star 历史

如果这份规范帮你避免了糟糕的架构决策、无用的团队争论，或凌晨 3 点因 Agent 静默失败导致的生产事故——**给它一个 Star**，它什么都不花，但意味着一切

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=huangrichao2020/universal-agent-spec&type=Date)](https://star-history.com/#huangrichao2020/universal-agent-spec&Date)

</div>

---

## 👤 作者

**Huang Richao** and **Huang Wei**

📮 grdomai43881@gmail.com

两个程序员，受够了看 AI 行业淹没在自己制造的术语里，决定做点什么

> *"在你构建下一个 Agent 之前，先确保你知道它是什么"*

---

<div align="center">

用 ⚡ 和很多强烈的观点造就了这个项目

**如果你用这份规范做出了真实的东西，告诉我**

</div>

---

---

<a name="english"></a>

<div align="center">

# 🤖 Universal Agent Definition Specification

### **The spec the entire AI Agent ecosystem was missing**

*Stop arguing about what an "Agent" is. Start building on solid ground*

[**▶ View Live Demo**](https://huangrichao2020.github.io/universal-agent-spec) · [**⭐ Star this repo**](https://github.com/huangrichao2020/universal-agent-spec) · [**📖 中文文档**](#中文)

</div>

---

## 🔥 Why This Exists

Every week, thousands of developers ship "AI Agents" that are actually just **a single API call wrapped in a for-loop**

Every day, teams debate whether their system is an Agent, a Workflow, a Copilot, or just a chatbot — and nobody wins because **there is no shared language**

Every month, engineers waste sprints building multi-agent systems that silently fail because **nobody wrote down the rules for how Agents talk to each other**

**This stops today**

Universal Agent Spec is the **engineering-grade, battle-tested, zero-bullshit reference** that defines the complete conceptual stack of AI Agent systems — from a single LLM API call all the way up to production multi-agent pipelines with heartbeat monitoring, handoff documents, and commercial deployment strategies

---

## ⚡ What's Inside

42 rigorously defined concepts, each with:
- 📐 **Precise definition** — what it *actually* is, not marketing speak
- 🧠 **Essence analysis** — *why* it's designed this way
- 🎨 **SVG diagram** — visual illustration, bilingual (ZH/EN toggle)
- 💡 **Engineering insight** — the thing nobody else tells you
- 💻 **Code examples** — runnable, not pseudocode

| # | Concept | The One-Line Truth |
|---|---------|-------------------|
| 00 | **LLM API** | A stateless function. It doesn't remember you |
| 01 | **Invocation** | The moment an Agent wakes up — then dies |
| 02 | **Skill** | Procedural memory. The expert's manual, codified |
| 03 | **Agent** | Shell program + memory files. Nothing more, nothing less |
| 04 | **Shell Program** | The execution body. Claude Code, Codex CLI, or your own |
| 05 | **Workflow** | Agents can't chat. Workflows are the porter between them |
| 06 | **Handoff Document** | The shared whiteboard. Lose it and lose everything |
| 07 | **Aware / Heartbeat** | The immune system. Cheap model, high frequency |
| 08 | **Multi-Agent Comm** | There is no chatting. Only handoffs |
| 09 | **Local vs Cloud** | Data sovereignty vs UX. Choose consciously |
| 10 | **Light vs Heavy** | Two paradigms. Pick wrong and rebuild from scratch |
| 11 | **Business Model** | ToB sells the brain. ToC sells the service |
| 12 | **Tool Use** | Function calling is the Agent's hands |
| 13 | **Reasoning** | CoT / ToT / GoT — the topology of thought |
| 14 | **ReAct** | Think-Act-Observe, the Agent's breathing cycle |
| 15 | **Plan & Execute** | Strong planner + fast executor, divide and conquer |
| 16 | **MCP** | USB-C for tool connections, JSON-RPC 2.0 |
| 17 | **A2A** | Agent-to-Agent: discover, negotiate, collaborate |
| 18 | **AG-UI** | Agent-to-User: 16 event types streaming |
| 19 | **Protocol Stack** | MCP + A2A + AG-UI, three-layer stack |
| 20 | **Frameworks** | LangGraph / CrewAI / OpenAI SDK / AutoGen / ADK |
| 21 | **Low-Code** | Dify / Coze / n8n, drag-and-drop Agent building |
| 22 | **Architecture Patterns** | Supervisor / Hierarchical / Swarm / Mesh / Pipeline |
| 23 | **Graph Orchestration** | StateGraph, checkpoints, time travel |
| 24 | **Memory Architecture** | 5 memory types × 3 storage backends |
| 25 | **Observability** | Traces / tokens / latency / decision audit |
| 26 | **Guardrails** | Input / output / execution — three lines of defense |
| 27 | **Evaluation** | Benchmarks, metrics, evaluation-driven development |
| 28 | **Coding Agents** | Cursor / Codex / Devin / Claude compared |
| 29 | **Case Studies** | Customer service / research / data analysis |
| 30 | **Formal Spec** | 8 standard interfaces, formally defined |
| 31 | **Learning Path** | Beginner → Intermediate → Expert roadmap |
| 32 | **Computer Use** | The last mile when APIs are unavailable |
| 33 | **Skills System** | Capabilities are loadable assets, not prompts |
| 34 | **Context Engineering** | Better context often beats a bigger model |
| 35 | **Long-Horizon Tasks** | No checkpoints, no durable autonomy |
| 36 | **Sandboxing** | Autonomous execution without a sandbox should not ship |
| 37 | **Cost Routing** | Optimize cost per successful result, not per call |
| 38 | **Agent Harness** | The harness often matters more than the base model |
| 39 | **SWE-bench** | Failure clusters matter more than a single score |
| 40 | **Failure Modes** | Make failure visible before you try to scale success |
| 41 | **Team Topology** | Don't replace humans blindly; redraw responsibility |

---

## 🚀 Quick Start

Zero dependencies. Zero build step. Zero configuration

```bash
git clone https://github.com/huangwei/universal-agent-spec
cd universal-agent-spec
open index.html   # that's it
```

Or just open `index.html` directly in your browser. **It works offline. No server needed**

---

## 🤖 Give Your Agent Self-Awareness (ClawHub Skill)

Once your Agent knows the spec, it should also **know what it is**

Install the companion skill so your Agent understands its own nature, memory mechanism, and standing orders from the very first invocation — no hand-holding required:

```bash
clawhub install whatisagent
```

👉 **[clawhub.ai/skills/whatisagent](https://clawhub.ai/skills/whatisagent)**

What the skill teaches your Agent on load:
- What an Agent actually is (files + invocation, not "alive")
- How memory files work and why they cost tokens
- 4 standing orders: handoff docs, call chain annotations, file op records, plan-before-execute
- 12-concept quick reference with one-line truths

---

## 🎯 Who This Is For

- **AI/LLM Engineers** building production Agent systems who are tired of reinventing vocabulary
- **Engineering Managers** who need to align teams on what "Agent" means before the next sprint
- **Researchers** exploring agentic AI, autonomous systems, and LLM-based pipelines
- **Founders** building the next generation of AI-native products
- **Anyone** who has ever been in a meeting where three people used "Agent", "Workflow", and "Copilot" to describe the same thing

---

## 🏗️ Architecture

This project is itself a demonstration of clean engineering:

```
universal-agent-spec/
├── index.html              ← Self-contained. Open and go
├── manifest.js             ← The only coupling point. Add chapters here
├── core/
│   ├── registry.js         ← Chapter registration + i18n engine
│   ├── helpers.js          ← SVG drawing API (S.box / S.label / S.arrow)
│   └── styles.css          ← Design system
├── chapters/
│   ├── 00-llm-api/ … 11-business/   ← Foundations (0-11)
│   ├── 12-tool-use/ … 15-plan-exec/  ← Core patterns (12-15)
│   ├── 16-mcp/ … 19-protocol-stack/  ← Protocol layer (16-19)
│   ├── 20-frameworks/ … 23-graph/     ← Frameworks & orchestration (20-23)
│   ├── 24-memory/ … 27-evaluation/    ← Production readiness (24-27)
│   ├── 28-coding/ … 31-learning/      ← Practice & beyond (28-31)
│   ├── 32-computer-use/ … 35-long-horizon/ ← Frontier patterns for 2026 (32-35)
│   ├── 36-sandboxing/ … 41-team-topology/  ← Production governance & org design (36-41)
│   └── XX-concept/
│       ├── chapter.js      ← Self-registering. Bilingual. Isolated
│       └── CHAPTER.md      ← Per-chapter modification guide
├── DESIGN.md               ← Architecture decisions
└── CONTRIBUTING.md         ← How to add a chapter in 3 steps
```

**Loose coupling principle:** `index.html` has zero knowledge of chapter content. Chapters self-register via `window.AgentSpec.register()`. Add a new chapter = edit one line in `manifest.js`

---

## 🌍 Bilingual by Design

Every concept — including every word inside every SVG diagram — ships in both **中文** and **English**. Toggle with one click. No reload. No flash.

Built for the global AI engineering community, where the most important Agent research and products come from both Beijing *and* Silicon Valley.

---

## 🤝 Contributing

We welcome contributions that clarify, correct, or extend the spec.

This repository is not open source. Any contribution, suggestion, issue, or pull request is submitted voluntarily and does not change the licensing terms of this repository. Commercial use still requires separate written authorization.

**To add a new concept:**
1. `mkdir chapters/42-your-concept`
2. Copy the template from `CONTRIBUTING.md`
3. Add one line to `manifest.js`

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full guide including SVG drawing API reference.

**The bar for new concepts:** Does it cause confusion in real engineering teams? Does the current literature fail to define it clearly? If yes — it belongs here.

---

## 💬 The Philosophy

> *"An Agent is not alive. It is a pile of files and an invocation program. The LLM API provides the intelligence. The Agent provides the continuity."*

Most Agent frameworks give you tools. This spec gives you **mental models** — the kind that don't go stale when GPT-5 ships.

---

## 📊 Keyword Map

`LLM` · `AI Agent` · `Multi-Agent` · `Agentic AI` · `LLM Orchestration` · `Agent Framework` · `Autonomous Agent` · `Claude` · `GPT` · `OpenAI` · `Anthropic` · `LangChain` · `LangGraph` · `AutoGPT` · `CrewAI` · `Dify` · `Coze` · `n8n` · `MCP` · `A2A` · `AG-UI` · `Model Context Protocol` · `Tool Use` · `Function Calling` · `Memory` · `Vector Database` · `Graph Orchestration` · `StateGraph` · `Guardrails` · `Evaluation` · `Google ADK` · `AutoGen` · `Swarm` · `Cursor` · `Devin` · `Codex` · `Copilot` · `Chain of Thought` · `Tree of Thought` · `ReAct` · `Reflexion` · `LATS` · `Plan and Execute` · `Reasoning Model` · `Skill` · `Handoff` · `Heartbeat` · `Observability` · `RAG` · `Prompt Engineering` · `AI Infrastructure` · `MLOps`

---

## ⭐ Star History

If this spec saved you from a bad architecture decision, a useless team debate, or a 3am production incident caused by Agents silently failing — **give it a star.** It costs nothing and means everything.

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=huangrichao2020/universal-agent-spec&type=Date)](https://star-history.com/#huangrichao2020/universal-agent-spec&Date)

</div>

---

## 👤 Authors

**Huang Richao** and **Huang Wei**

📮 grdomai43881@gmail.com

Two programmers who got tired of watching the AI industry drown in its own jargon and decided to do something about it.

> *"Before you build the next Agent, make sure you know what one is."*

---

## License

Copyright (c) 2026 Huang Richao. All Rights Reserved.

This repository is source-available only for personal, non-commercial research, learning, reading, and evaluation.
Commercial use requires prior written authorization.

Commercial licensing contact WeChat: `huangyibo181`

---

<div align="center">

Made with ⚡ and a lot of strong opinions.

**If you build something real with this, let me know.**

</div>
