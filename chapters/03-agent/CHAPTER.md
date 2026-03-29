# Chapter 03 · Agent 智能体

> Agent = UI 界面程序 + 记忆文件集合（含 Skills）。
> Agent 不是"活的程序"，而是一堆文件在被调用时临时清醒。
> 真正产生智能的是大模型 API，Agent 提供的是**持续性**和**专业化上下文**。

---

## 一、Agent 的精确定义

```
Agent = UI 界面程序（Shell Program） + 记忆文件集合（Memory Files）
```

两者缺一不可：
- **UI 界面程序**负责调用大模型 API、读写文件、执行工具——它是"躯体"
- **记忆文件集合**定义了 Agent 是谁、知道什么、会什么、做过什么——它是"灵魂"
- **大模型 API**提供推理能力——它是临时借来的"大脑"

**常见误解**：很多人以为"调了 GPT API 就有了一个 Agent"。不对。那只是一次无记忆的 API 调用。没有记忆文件，没有 Skill，就不是 Agent，只是一个昂贵的文字续写函数。

---

## 二、Agent 的三种状态

```
┌─────────────────────────────────────────────────────┐
│                    Agent 生命周期                      │
│                                                      │
│   静止态           激活态            归档态            │
│   ┌─────┐    触发    ┌─────┐    完成    ┌─────┐      │
│   │ 💤  │ ────────→ │ ⚡  │ ────────→ │ 📁  │      │
│   │文件堆│          │临时清醒│          │写回文件│      │
│   └─────┘          └─────┘          └─────┘      │
│      ↑                                    │         │
│      └────────────────────────────────────┘         │
│                   再次沉睡                            │
└─────────────────────────────────────────────────────┘
```

### 状态一：静止态（Dormant）

Agent 只是一堆文件，没有意识，像一本合上的书。

```
agent-project/
├── persona.md        ← 我是谁（身份、风格、价值观）
├── knowledge.md      ← 我知道什么（行业知识、领域经验）
├── skill_search.md   ← 我会做什么（搜索技能）
├── skill_deploy.md   ← 我会做什么（部署技能）
├── worklog.md        ← 我做过什么（工作日志）
└── handoff.md        ← 现在到哪了（交接手册）
```

没有任何程序运行，没有消耗任何计算资源。这堆文件可以被 Git 管理、被复制、被传输给另一个人继续使用。

### 状态二：激活态（Active）

UI 界面程序被触发，将记忆文件 + 当前任务打包发给大模型 API：

```
[persona.md 内容] + [knowledge.md 内容] + [相关 Skills]
  + [handoff.md 当前状态] + [用户当前任务]
      ↓ 组装成 messages 数组
      ↓ POST /v1/messages
      ↓ 大模型推理
      ↓ 返回响应 + 工具调用
```

Agent 在这个瞬间"临时清醒"，产生推理和行动。但这个"清醒"是幻觉——本质是大模型在读完所有文件后做了一次文字续写。

### 状态三：归档态（Archived）

工作完成，结果写回记忆文件：
- `worklog.md` 追加本次任务记录
- `handoff.md` 更新当前状态和下一步
- `knowledge.md` 追加新获得的知识（如果有）

然后 Agent 再次沉睡。**如果不写回文件，这次"清醒"的所有成果将永久丢失。**

---

## 三、记忆文件体系

Agent 的记忆文件不是随便堆砌的 Markdown，而是有明确分工的知识体系：

| 文件 | 用途 | 增长方式 | 类比 |
|------|------|----------|------|
| `persona.md` | 我是谁 — 身份、风格、价值观 | 写一次，极少修改 | 人的性格 |
| `knowledge.md` | 我知道什么 — 行业知识、规则、案例 | 随任务积累 | 人的经验 |
| `skill_X.md` | 我会做什么 — 特定任务的操作步骤 | 按需新增 | 人的技能 |
| `worklog.md` | 我做过什么 — 任务历史、决策、结果 | 每次会话追加 | 人的日记 |
| `handoff.md` | 现在到哪了 — 进行中的事项、下一步 | 每次会话更新 | 人的待办清单 |

### 成本陷阱

每次调用 Agent，所有记忆文件都要塞进上下文窗口，按 Token 收费。

```
新 Agent：~2K tokens → 每次调用 $0.003
 ↓ 运行 3 个月
中期 Agent：~30K tokens → 每次调用 $0.045
 ↓ 运行 6 个月
成熟 Agent：~100K tokens → 每次调用 $0.15

成本增长 50 倍！
```

**应对策略**：
- 定期压缩 `worklog.md`，只保留近期详情和历史摘要
- 使用分层加载：核心记忆（persona + handoff）始终加载，知识库按需检索
- 大型知识库使用 RAG（检索增强生成），不要全量塞入上下文

---

## 四、生产级 Agent 架构（来自真实项目的经验）

以下架构来自一个拥有 10+ 个 Agent、处理日均数千请求的企业级平台。

### 4.1 Agent 工厂模式

在生产环境中，不同类型的 Agent 需要不同的配置。使用工厂模式统一创建：

```python
# Agent 工厂 — 统一创建不同类型的 Agent
class AgentFactory:
    """
    注册 agent 类型和默认配置，
    通过 create(type, context) 创建实例
    """
    _registry = {}

    @classmethod
    def register(cls, agent_type, builder_fn, default_config):
        cls._registry[agent_type] = (builder_fn, default_config)

    @classmethod
    def create(cls, agent_type, context):
        builder_fn, config = cls._registry[agent_type]
        return builder_fn(context, config)

# 注册不同类型的 Agent
AgentFactory.register("search",   build_search_agent,   search_config)
AgentFactory.register("document", build_document_agent, document_config)
AgentFactory.register("devops",   build_devops_agent,   devops_config)

# 创建实例
agent = AgentFactory.create("search", user_context)
```

**为什么不直接 new**：因为每个 Agent 需要加载不同的 Skill、挂载不同的工具、配置不同的中间件。工厂封装了这些差异。

### 4.2 中间件栈

成熟的 Agent 不是直接"读文件 → 调 API"，而是通过一个中间件栈处理各种边界情况：

```
用户输入
    ↓
┌─── 中间件栈 ───────────────────────────────────┐
│                                                 │
│  UploadFileMiddleware      处理上传文件           │
│       ↓                                         │
│  DynamicSearchSkillsMiddleware  按需加载相关 Skill │
│       ↓                                         │
│  MemoryMiddleware          加载/保存记忆文件       │
│       ↓                                         │
│  ClarificationMiddleware   处理澄清对话          │
│       ↓                                         │
│  ToolErrorRetryMiddleware  工具调用失败自动重试    │
│       ↓                                         │
│  DanglingToolCallMiddleware 修补残留的 tool_call  │
│       ↓                                         │
│  TodoMiddleware            任务计划管理           │
│       ↓                                         │
│  SummarizationMiddleware   上下文超长时自动摘要    │
│                                                 │
└─────────────────────────────────────────────────┘
    ↓
大模型 API 调用
    ↓
响应返回（可能包含工具调用）
```

**每个中间件解决一个具体问题**：

| 中间件 | 解决的问题 |
|--------|-----------|
| `DynamicSearchSkillsMiddleware` | Skill 太多，全量加载浪费 Token → 向量搜索只加载相关的 |
| `ToolErrorRetryMiddleware` | 工具偶尔超时或返回错误 → 自动重试最多 2 次 |
| `DanglingToolCallMiddleware` | 对话被中断后残留未完成的 tool_call → 自动补一个错误响应让对话继续 |
| `ClarificationMiddleware` | 用户意图不明确 → 主动询问而不是猜测 |
| `MemoryMiddleware` | 记忆文件的加载和回写 → 自动化，不依赖 Agent 自觉 |

### 4.3 SubAgent 模式

一个"全能 Agent"是不现实的。生产环境中采用 **一个主 Agent + 多个专项 SubAgent** 的架构：

```
                    ┌─── 主 Agent（路由 + 通用对话）───┐
                    │                                  │
                    │  根据用户意图分发到对应 SubAgent    │
                    │                                  │
                    └──────────┬───────────────────────┘
                               │
        ┌──────────┬──────────┼──────────┬──────────┐
        ↓          ↓          ↓          ↓          ↓
   搜索 Agent  文档 Agent  代码 Agent  DevOps    兜底 Agent
                                       Agent
   web_search  parse_doc  sandbox     deploy     (所有未分
   web_crawl   to_pdf     code_gen    stop       配的工具)
   search_co   to_docx
               to_pptx
```

每个 SubAgent 的配置：

```python
# SubAgent 定义（真实生产代码的简化版）
SubAgentDef(
    name="search-agent",
    description="深度搜索与信息研究",
    tools=["web_search", "web_crawl", "search_companies"],
    skills_path="skills/search_agent/",     # 只加载搜索相关 Skill
)

SubAgentDef(
    name="document-agent",
    description="文档解析与生成",
    tools=["process_document_from_url", "process_document_with_images",
           "markdown_to_pdf", "markdown_to_docx", "markdown_to_pptx"],
    skills_path="skills/document_agent/",
)

SubAgentDef(
    name="fallback-agent",
    description="处理所有未分配给专项 Agent 的任务",
    tools=REMAINING_TOOLS,    # 所有未分配的工具
    skills_path=None,
)
```

**为什么需要 SubAgent**：
1. **工具隔离** — 搜索 Agent 看不到部署工具，不会误操作
2. **Skill 精准注入** — 每个 SubAgent 只加载自己领域的 Skill，节省 Token
3. **并行执行** — 多个 SubAgent 可以同时工作
4. **故障隔离** — 一个 SubAgent 出错不影响其他

### 4.4 工作流编排

多个 Agent 协作需要一个编排层（Workflow），来定义数据如何在 Agent 之间流转：

```
意图识别工作流（真实生产案例）：

START
  ↓
classify_intent (分类意图)
  ↓
  ├── confidence ≥ 80% → candidate_intent → 用户确认
  │                          ↓
  │                     确认 → output_intent → END
  │                     否认 → clarify → END
  │
  ├── confidence < 80% → clarify (让用户澄清) → END
  │
  └── 闲聊 → casual_end → END
```

**关键原则**：
- Agent 之间**不能自发通信** — 它们不会主动给对方发消息
- 工作流是"搬运工" — 规定 A 干完后把什么格式的数据传给 B
- 工作流对外可以包装成一个 API 接口 — 外部看到的是一次普通调用

---

## 五、养 Agent 的常驻指令

这些指令应该从第一天就写进 Agent 的系统提示词（persona.md）。它们决定了 Agent 是不断成长还是不断退化。

### 指令一：每个目录必须有交接手册 📁

```
项目每一个文件夹都要有对应的交接手册（HANDOFF.md）。
每当文件夹内的文件被改动，必须立即更新交接手册。

手册内容：
- 目录下有哪些文件、各自的用途
- 本次改动了什么
- 当前状态是什么
- 下一步是什么

没有任何目录应该是黑箱。
```

**为什么关键**：Agent 每次被唤醒都是"失忆"的。没有交接手册，它需要重新阅读所有文件才能理解项目状态，浪费大量 Token 和时间。有了交接手册，它一看就知道"上次做到哪了，接下来该做什么"。

### 指令二：代码中注释每一处调用链路 🔗

```
写代码时，每个方法被调用的地方都要注释写明：
1. 调用的完整链路是什么
2. 本处的传参是什么类型、从哪里来
3. 参数下一步会传到哪里去

示例：
# Called by: process_order() → validate_payment() → here
# params: order_id (str, from request.json['id']),
#         amount (float, from order.total)
# next: result passed to notify_user(order_id, status)
def charge_card(order_id: str, amount: float) -> bool:
```

**为什么关键**：Agent 读代码和人不一样。人可以用 IDE 跳转定义、打断点调试。Agent 只能读文本。没有调用链路注释，Agent 需要读完整个项目才能理解一个函数的上下文。

### 指令三：文件操作后留下记录 📝

```
对电脑或服务器做任何文件操作（创建、删除、移动、修改），
完成后都要在同目录下写一个或更新交接手册，任务才算完成。
没有文档记录的文件操作，是会复利增长的技术债。
```

### 指令四：复杂任务先规划再执行 🗺️

```
如果问题过于复杂，不要一次性输出巨量内容。正确流程：

1. 规划任务 — 产出文件索引，明确要创建/修改哪些文件
2. 制作工作手册 — 列明每个子任务和预期输出
3. 逐个执行 — 按手册一步步来
4. 逐步自测 — 每个子任务完成后验证质量
5. 汇报结果 — 核对全部完成情况，向用户报告
6. 留下交接 — 写一份本次任务的交接手册，供下次唤醒时接续
```

---

## 六、Agent 的能力评估框架

如何判断一个 Agent 的成熟度？

| 等级 | 特征 | 记忆文件量 | 技能数 |
|------|------|-----------|--------|
| **L0 裸调用** | 没有记忆，没有 Skill，每次从零开始 | 0 | 0 |
| **L1 有人格** | 有 persona.md，知道自己是谁，但没有专业技能 | ~2K tokens | 0 |
| **L2 有技能** | 有 persona + 多个 Skill，能处理特定类型任务 | ~10K tokens | 3-10 |
| **L3 有记忆** | 有完整记忆体系，能记住过去做过什么 | ~30K tokens | 10-30 |
| **L4 有协作** | 能通过工作流与其他 Agent 协作 | ~50K tokens | 20-50 |
| **L5 自进化** | 能根据经验自动新增/修改 Skill | ~100K tokens | 50+ |

大多数"AI Agent 产品"停留在 L0-L1 —— 只是套了一层 UI 的 API 调用。真正的 Agent 从 L2 开始，即拥有可执行的结构化技能。

---

## 七、从零搭建一个 Agent 的最小步骤

### 步骤一：创建记忆文件目录

```bash
mkdir my-agent
cd my-agent
```

### 步骤二：写 persona.md

```markdown
# 我是谁

你是一个专注于数据分析的 Agent。
你的工作风格：先理解数据结构，再提出分析方案，最后执行。
你擅长：SQL 查询、Python 数据处理、可视化图表。
你的原则：数据不说谎，但解读可能有偏差——始终标注数据来源和置信度。
```

### 步骤三：写第一个 Skill

```markdown
---
name: data-analysis
description: |
  数据分析技能。当用户提供数据文件（CSV/Excel/JSON）
  并要求分析、统计、可视化时触发。
---

# 数据分析

## 执行流程
1. 读取数据文件，输出前 5 行和列名
2. 询问用户分析目标
3. 编写并执行分析代码
4. 生成可视化图表
5. 输出分析结论
```

### 步骤四：写 handoff.md

```markdown
# 当前状态

## 进行中
（无）

## 上次完成
首次初始化，尚未执行任何任务。

## 下一步
等待用户提供第一个数据分析任务。
```

### 步骤五：选择 UI 界面程序运行

```bash
# 使用 Claude Code 作为 Shell Program
claude --project ./my-agent "请分析这份销售数据"

# 或使用 Codex CLI
codex --context ./my-agent "请分析这份销售数据"

# 或自研脚本
python run_agent.py --memory-dir ./my-agent --task "请分析这份销售数据"
```

---

## 八、Agent 与相关概念的关系图谱

```
                    ┌─────────────────────┐
                    │    LLM API (00)     │ ← 无状态函数，提供推理能力
                    └─────────┬───────────┘
                              │ 被调用
                    ┌─────────┴───────────┐
                    │   Invocation (01)   │ ← 一次临时清醒
                    └─────────┬───────────┘
                              │ 多次调用构成
                    ┌─────────┴───────────┐
                    │     Agent (03)      │ ← 文件 + 程序 = 持续存在
                    │                     │
                    │  ┌─ persona.md      │
                    │  ├─ knowledge.md    │
                    │  ├─ skill_X.md (02) │ ← Skill 是 Agent 的核心资产
                    │  ├─ worklog.md      │
                    │  └─ handoff.md (06) │ ← 交接手册保证连续性
                    │                     │
                    │  Shell Program (04) │ ← 执行躯体
                    └─────────┬───────────┘
                              │ 多个 Agent 协作
                    ┌─────────┴───────────┐
                    │   Workflow (05)     │ ← 数据传递规则
                    └─────────────────────┘
```

---

## 九、常见问题

### Q: Agent 和 Chatbot 有什么区别？

| 维度 | Chatbot | Agent |
|------|---------|-------|
| 记忆 | 无持久记忆 | 有记忆文件体系 |
| 技能 | 无结构化技能 | 有可复用的 Skill |
| 执行力 | 只能回复文字 | 能调用工具执行操作 |
| 连续性 | 关掉就没了 | 关掉还在，下次唤醒继续 |
| 成长性 | 不会成长 | 随使用积累经验 |

### Q: 一个 Agent 可以换底层模型吗？

可以。Agent 的价值在于记忆文件和 Skill，不在于底层模型。今天用 GPT-4o，明天换 Claude Opus，只要 UI 界面程序支持新模型的 API，Agent 的所有记忆和技能原封不动。**这就是为什么 Skill 是资产，模型是工具。**

### Q: Agent 会"死"吗？

Agent 不会"死"，只会"沉睡"。只要记忆文件还在，任何人在任何时间、用任何兼容的 UI 界面程序，都可以唤醒同一个 Agent。反过来，如果记忆文件被删除，Agent 就真的"死"了——不可恢复。

**所以，Agent 的备份策略就是文件备份策略**：Git 管理记忆文件，定期 push 到远程仓库。

---

## 文件说明

| 文件 | 用途 |
|------|------|
| `chapter.js` | 章节数据与 SVG 图示（双语），用于网站渲染 |
| `CHAPTER.md` | 本文档：Agent 概念深度解析 |
