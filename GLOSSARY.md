# 术语表 Glossary

| 术语 | 英文 | 定义（一句话） | 关联章节 |
|------|------|----------------|----------|
| Agent 间协议 | A2A | 用于 Agent 之间做发现、委派、任务协作与结果交付的协议层。 | ch.17 |
| Agent-用户协议 | AG-UI | 让前端实时接收 Agent 状态、工具调用、审批与恢复事件的事件协议。 | ch.18 |
| 智能体 | Agent | 能自主调用工具、管理状态并持续朝目标推进的 LLM 程序。 | ch.03 |
| Agent 卡片 | Agent Card | 描述 Agent 身份、能力、输入输出模式和协议支持情况的标准清单。 | ch.17, ch.30 |
| Agent 外壳 | Agent Harness | 围绕模型提供上下文接入、执行面、审批流和 review 体验的运行时外壳。 | ch.38 |
| 架构模式 | Architecture Pattern | 组织多个 Agent 或步骤协作的结构化方式，如 Supervisor、层级或流水线。 | ch.22 |
| 产物 | Artifact | 任务执行后交付给下游系统、用户或其他 Agent 的文件、结果或结构化输出。 | ch.17, ch.30 |
| 感知层 | Aware Layer | 在后台持续观察任务状态并在异常时触发升级或恢复的监控层。 | ch.07 |
| 评测基准 | Benchmark | 用来比较 Agent 或模型在特定任务集上表现的标准化测试集合。 | ch.27, ch.39 |
| 商业模式 | Business Model | Agent 产品如何获取价值、定价并沉淀护城河的经营设计。 | ch.11 |
| 思维链 | Chain of Thought | 让模型按步骤展开中间推理的基本 reasoning 结构。 | ch.13 |
| 检查点 | Checkpoint | 将长任务在某一步的结构化状态落盘，便于恢复、回放与续跑。 | ch.23, ch.35 |
| 屏幕级 Agent | Computer Use | 通过读屏与界面操作来完成任务的屏幕自动化 Agent 模式。 | ch.32 |
| 上下文工程 | Context Engineering | 对上下文窗口做筛选、压缩、注入和布局的系统化工程实践。 | ch.34 |
| 上下文窗口 | Context Window | 模型单次推理可同时接收和处理的输入 token 范围。 | ch.00, ch.34 |
| 成本路由 | Cost Routing | 按任务价值和风险在不同模型、缓存和执行路径间做成本优化的策略。 | ch.37 |
| 评估 | Evaluation | 用离线集、回放集和线上信号持续衡量 Agent 质量与回归情况的系统。 | ch.27 |
| 失败模式 | Failure Mode | Agent 在循环、工具、上下文或状态层面重复出现的典型失效形态。 | ch.40 |
| 形式化规范 | Formal Specification | 约定 Agent 标准接口和能力边界的契约，而不是某个具体框架实现。 | ch.30 |
| 框架 | Framework | 为 Agent 提供状态管理、编排、工具集成和运行时抽象的软件框架。 | ch.20 |
| 函数调用 | Function Calling | 让模型输出结构化工具调用而不是自然语言回复的执行接口形式。 | ch.12 |
| 图编排 | Graph Orchestration | 用状态图表达步骤、分支、暂停、恢复和人机协作的编排方式。 | ch.23 |
| 护栏 | Guardrail | 用于约束输入、输出、执行权限、预算和审批的运行时安全机制。 | ch.26 |
| 交接手册 | Handoff Document | 供下一个 Agent 或人类继续执行任务的结构化状态摘要。 | ch.06 |
| 心跳 | Heartbeat | 用于判断长任务是否仍在推进、阻塞还是已经失控的周期性状态信号。 | ch.07, ch.35 |
| 重 Agent | Heavy Agent | 把更多判断权、步骤选择与流程控制交给模型的高自主形态。 | ch.10 |
| 人工审批 | Human Approval | 在高风险动作执行前由人类显式批准的安全关口。 | ch.18, ch.26 |
| 人在环路 | Human-in-the-Loop | 在关键节点让人类参与确认、纠偏或接管的协作模式。 | ch.23, ch.41 |
| 单次调用 | Invocation | 模型被激活执行一次请求并返回结果的短暂运行边界。 | ch.01 |
| JSON Schema | JSON Schema | 用于严格描述工具参数、结构化输出和接口契约的数据模式。 | ch.12, ch.30 |
| 学习路径 | Learning Path | 按阶段组织 Agent 学习顺序、实践项目和工具选型的路线图。 | ch.31 |
| 轻 Agent | Light Agent | 把 AI 限定在少数关键判断节点、其余逻辑尽量代码化的低自主形态。 | ch.10 |
| 大模型 API | LLM API | 以模型调用为中心的基础设施接口，天生默认无状态。 | ch.00 |
| 长程任务 | Long-Horizon Task | 会跨越多个步骤、会话甚至天级时间跨度的可恢复任务。 | ch.35 |
| 低代码平台 | Low-Code Platform | 用可视化方式搭建 Agent 工作流和工具编排的平台。 | ch.21 |
| MCP | MCP | Model Context Protocol 的缩写，是 Agent 接入工具与资源的标准协议。 | ch.16 |
| 记忆架构 | Memory Architecture | 对不同记忆类型、存储后端和写入策略的整体设计。 | ch.24 |
| 网格 | Mesh | 多个 Agent 相对平等、彼此连接的协作拓扑。 | ch.22 |
| 模型上下文协议 | Model Context Protocol | 统一 Agent 与工具、资源、提示模板连接方式的协议标准。 | ch.16 |
| 多 Agent | Multi-Agent | 通过多个职责分化的 Agent 协作完成任务的系统形态。 | ch.08, ch.22 |
| 可观测性 | Observability | 对 Agent 的步骤、成本、延迟、状态和决策进行追踪与审计的能力。 | ch.25 |
| 流水线 | Pipeline | 把任务拆成固定顺序步骤并逐段传递结果的简单编排结构。 | ch.05, ch.22 |
| 规划与执行 | Plan-and-Execute | 先由强模型规划，再由执行器按计划推进并在必要时重规划的模式。 | ch.15 |
| Prompt 预算 | Prompt Budget | 单次运行中可分配给不同上下文块的 token 预算。 | ch.34 |
| 协议栈 | Protocol Stack | 把工具、Agent 协作和用户界面分别放在不同协议层来治理的分层结构。 | ch.19 |
| ReAct | ReAct | 在“推理-行动-观察”循环中驱动 Agent 前进的默认执行模式。 | ch.14 |
| 推理模式 | Reasoning Pattern | 模型如何组织中间思考、搜索空间和判断路径的模式集合。 | ch.13 |
| 路由 | Routing | 按任务类型、风险或成本把请求分发到不同步骤、模型或 Agent 的机制。 | ch.05, ch.37 |
| 沙盒执行 | Sandboxing | 通过权限、文件系统和网络边界约束 Agent 执行面的安全机制。 | ch.36 |
| 屏幕自动化 | Screen Automation | 用视觉读屏和点击、输入等交互来驱动真实界面的自动化方式。 | ch.32 |
| 技能 | Skill | 可复用的能力封装单元，通常包含流程、说明、脚本和触发边界。 | ch.02 |
| Skills 体系 | Skills System | 负责 Skills 的发现、加载、权限管理和组合使用的能力层。 | ch.33 |
| 状态增量 | State Delta | 相对于上一状态的变更片段，常用于事件流同步和恢复。 | ch.18, ch.30 |
| StateGraph | StateGraph | 以显式状态和节点边为核心的图编排抽象。 | ch.23 |
| 监督者 | Supervisor | 统一接收任务、做路由与协调，并管理下游 worker 的中心 Agent。 | ch.22 |
| 群体 | Swarm | 让多个 Agent 在较弱中心控制下自组织协作的拓扑模式。 | ch.22 |
| SWE-bench | SWE-bench | 用真实软件仓库问题评测编程 Agent 修复能力的公开基准。 | ch.39 |
| 任务模型 | Task Model | 用结构化状态描述任务提交、处理中和完成产物的标准方式。 | ch.17, ch.30 |
| 团队拓扑 | Team Topology | 人与 Agent 之间如何委派、审批、接管和负责的组织结构。 | ch.41 |
| 时间旅行 | Time Travel | 回到历史状态重新分叉执行、调试或比较结果的恢复能力。 | ch.23 |
| 工具调用 | Tool Use | 让模型通过结构化调用去触达 API、数据库、Shell 或其他能力的机制。 | ch.12 |
| 向量数据库 | Vector Database | 用向量相似度检索语义记忆和相关上下文的存储后端。 | ch.24 |
| 工作流 | Workflow | 把任务拆成有先后关系的步骤，并定义它们之间输入输出契约的系统。 | ch.05 |
| 工作记忆 | Working Memory | 只服务当前任务推进、可在短期内更新或丢弃的临时执行状态。 | ch.06, ch.24 |
