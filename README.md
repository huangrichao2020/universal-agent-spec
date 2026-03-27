<div align="center">

<img src="https://img.shields.io/badge/version-2.0.0-00c8ff?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/badge/concepts-12-ffb800?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/badge/lang-EN%20%7C%20中文-00e599?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/badge/license-MIT-a78bfa?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/badge/ClawHub-whatisagent-ff4d6d?style=for-the-badge&labelColor=070b14" />
<img src="https://img.shields.io/github/stars/huangrichao2020/universal-agent-spec?style=for-the-badge&color=ffb800&labelColor=070b14" />

<br/><br/>

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

# 🤖 Universal Agent Definition Specification

### **The spec the entire AI Agent ecosystem was missing.**

*Stop arguing about what an "Agent" is. Start building on solid ground.*

[**▶ View Live Demo**](https://huangrichao2020.github.io/universal-agent-spec) · [**⭐ Star this repo**](https://github.com/huangrichao2020/universal-agent-spec) · [**📖 中文文档**](#中文)

</div>

---

## 🔥 Why This Exists

Every week, thousands of developers ship "AI Agents" that are actually just **a single API call wrapped in a for-loop.**

Every day, teams debate whether their system is an Agent, a Workflow, a Copilot, or just a chatbot — and nobody wins because **there is no shared language.**

Every month, engineers waste sprints building multi-agent systems that silently fail because **nobody wrote down the rules for how Agents talk to each other.**

**This stops today.**

Universal Agent Spec is the **engineering-grade, battle-tested, zero-bullshit reference** that defines the complete conceptual stack of AI Agent systems — from a single LLM API call all the way up to production multi-agent pipelines with heartbeat monitoring, handoff documents, and commercial deployment strategies.

---

## ⚡ What's Inside

12 rigorously defined concepts, each with:
- 📐 **Precise definition** — what it *actually* is, not marketing speak
- 🧠 **Essence analysis** — *why* it's designed this way
- 🎨 **SVG diagram** — visual illustration, bilingual (EN/ZH toggle)
- 💡 **Engineering insight** — the thing nobody else tells you
- 💻 **Code examples** — runnable, not pseudocode

| # | Concept | The One-Line Truth |
|---|---------|-------------------|
| 00 | **LLM API** | A stateless function. It doesn't remember you. |
| 01 | **Invocation** | The moment an Agent wakes up — then dies. |
| 02 | **Skill** | Procedural memory. The expert's manual, codified. |
| 03 | **Agent** | Shell program + memory files. Nothing more, nothing less. |
| 04 | **Shell Program** | The execution body. Claude Code, Codex CLI, or your own. |
| 05 | **Workflow** | Agents can't chat. Workflows are the porter between them. |
| 06 | **Handoff Document** | The shared whiteboard. Lose it and lose everything. |
| 07 | **Aware / Heartbeat** | The immune system. Cheap model, high frequency. |
| 08 | **Multi-Agent Comm** | There is no chatting. Only handoffs. |
| 09 | **Local vs Cloud** | Data sovereignty vs UX. Choose consciously. |
| 10 | **Light vs Heavy** | Two paradigms. Pick wrong and rebuild from scratch. |
| 11 | **Business Model** | ToB sells the brain. ToC sells the service. |

---

## 🚀 Quick Start

Zero dependencies. Zero build step. Zero configuration.

```bash
git clone https://github.com/huangwei/universal-agent-spec
cd universal-agent-spec
open index.html   # that's it.
```

Or just open `index.html` directly in your browser. **It works offline. No server needed.**

---

## 🤖 Give Your Agent Self-Awareness (ClawHub Skill)

Once your Agent knows the spec, it should also **know what it is**.

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
├── index.html              ← Self-contained. Open and go.
├── manifest.js             ← The only coupling point. Add chapters here.
├── core/
│   ├── registry.js         ← Chapter registration + i18n engine
│   ├── helpers.js          ← SVG drawing API (S.box / S.label / S.arrow)
│   └── styles.css          ← Design system
├── chapters/
│   └── XX-concept/
│       ├── chapter.js      ← Self-registering. Bilingual. Isolated.
│       └── CHAPTER.md      ← Per-chapter modification guide
├── DESIGN.md               ← Architecture decisions
└── CONTRIBUTING.md         ← How to add a chapter in 3 steps
```

**Loose coupling principle:** `index.html` has zero knowledge of chapter content. Chapters self-register via `window.AgentSpec.register()`. Add a new chapter = edit one line in `manifest.js`.

---

## 🌍 Bilingual by Design

Every concept — including every word inside every SVG diagram — ships in both **English** and **中文**. Toggle with one click. No reload. No flash.

Built for the global AI engineering community, where the most important Agent research and products come from both Silicon Valley *and* Beijing.

---

## 🤝 Contributing

We welcome contributions that clarify, correct, or extend the spec.

**To add a new concept:**
1. `mkdir chapters/12-your-concept`
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

`LLM` · `AI Agent` · `Multi-Agent` · `Agentic AI` · `LLM Orchestration` · `Agent Framework` · `Autonomous Agent` · `Claude` · `GPT` · `OpenAI` · `Anthropic` · `LangChain` · `LangGraph` · `AutoGPT` · `AgentGPT` · `CrewAI` · `Dify` · `n8n` · `Workflow Automation` · `RAG` · `Tool Use` · `Function Calling` · `Memory` · `Long-term Memory` · `Vector Database` · `Prompt Engineering` · `System Prompt` · `Context Window` · `AI Infrastructure` · `MLOps` · `AI Native` · `Foundation Model` · `Claude Code` · `Codex` · `Copilot` · `AI Assistant` · `Chatbot` · `Reasoning Model` · `Chain of Thought` · `ReAct` · `Plan and Execute` · `Skill` · `Handoff` · `Heartbeat` · `Observability`

---

## ⭐ Star History

If this spec saved you from a bad architecture decision, a useless team debate, or a 3am production incident caused by Agents silently failing — **give it a star.** It costs nothing and means everything.

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=huangrichao2020/universal-agent-spec&type=Date)](https://star-history.com/#huangrichao2020/universal-agent-spec&Date)

</div>

---

## 👤 Authors

**Huang Richao** and **Huang Wei**

Two programmers who got tired of watching the AI industry drown in its own jargon and decided to do something about it.

> *"Before you build the next Agent, make sure you know what one is."*

---

<div align="center">

Made with ⚡ and a lot of strong opinions.

**If you build something real with this, let me know.**

</div>

---

---

<a name="中文"></a>

<div align="center">

# 🤖 通用 Agent 定义规范

### **整个 AI Agent 生态系统一直缺少的那份规范。**

*别再争论"Agent"是什么了。先把地基打好。*

</div>

---

## 🔥 为什么要做这个

每一周，都有成千上万的开发者上线所谓的"AI Agent"——本质上不过是**一个 for 循环套着一次 API 调用**。

每一天，都有团队在争论他们的系统到底是 Agent、工作流、Copilot 还是聊天机器人——争不出结果，因为**根本没有共同语言**。

每一个月，都有工程师在 multi-agent 系统上浪费整个迭代周期，然后系统悄无声息地出错，因为**没有人把 Agent 之间如何交接的规则写下来**。

**今天，这一切结束。**

通用 Agent 定义规范是**工程级、经过实战验证、零废话**的参考手册，定义了 AI Agent 系统从最小单元到生产级多 Agent 流水线的完整概念栈——涵盖心跳监控、交接手册、商业化部署策略。

---

## ⚡ 包含什么

12 个严格定义的核心概念，每个概念包含：
- 📐 **精确定义** — 它*究竟*是什么，不是营销话术
- 🧠 **本质解析** — *为什么*这样设计
- 🎨 **SVG 图示** — 可视化说明，中英双语一键切换
- 💡 **工程洞见** — 别处没人告诉你的那些事
- 💻 **代码示例** — 可运行，不是伪代码

---

## 🚀 快速开始

零依赖，零构建，零配置。

```bash
git clone https://github.com/huangwei/universal-agent-spec
cd universal-agent-spec
open index.html   # 就这样。
```

直接双击 `index.html` 用浏览器打开即可。**离线可用，不需要任何服务器。**

---

## 🤖 给你的 Agent 注入自我认知（ClawHub Skill）

看完规范，让你的 Agent 也知道自己是什么。

一条命令安装伴侣 skill，让 Agent 从第一次被唤醒起就明白自己的本质、记忆机制和常驻规则，不需要主人手动调教：

```bash
clawhub install whatisagent
```

👉 **[clawhub.ai/skills/whatisagent](https://clawhub.ai/skills/whatisagent)**

---

## 🎯 适合谁

- **AI/LLM 工程师** — 厌倦了在生产 Agent 系统里重新发明词汇
- **工程团队 Leader** — 需要在下个迭代开始前对齐"Agent"的定义
- **研究人员** — 探索 agentic AI、自主系统、LLM pipeline
- **创业者** — 正在构建下一代 AI 原生产品
- **任何人** — 曾经在会议上看着三个人用"Agent""工作流""Copilot"描述同一个东西

---

## 🏗️ 架构设计

项目本身就是一次干净工程的示范：松耦合、可扩展、无框架依赖。新增一个章节只需三步，改一行 `manifest.js`。

---

## 🤝 参与贡献

欢迎任何能让规范更清晰、更准确、更完整的贡献。

详见 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。

---

## 💬 理念

> *"Agent 没有生命。它是一堆文件加一个调用程序。大模型 API 提供智能，Agent 提供持续性。"*

大多数 Agent 框架给你工具。这份规范给你**心智模型**——那种 GPT-5 发布了也不会过时的东西。

---

## 👤 作者

**Huang Richao** and **Huang Wei**

两个程序员，受够了看 AI 行业淹没在自己制造的术语里，决定做点什么。

> *"在你构建下一个 Agent 之前，先确保你知道它是什么。"*

---

<div align="center">

用 ⚡ 和很多强烈的观点造就了这个项目。

**如果你用这份规范做出了真实的东西，告诉我。**

⭐ **Star 一下，让更多工程师找到这里。** ⭐

</div>
