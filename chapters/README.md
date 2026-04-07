# chapters/ 章节地图

## 推荐阅读路径

### 🟢 入门路径（推荐新手）
`00-llm-api` → `01-invocation` → `03-agent` → `04-shell` → `12-tool-use` → `14-react`

### 🟡 中级路径
`02-skill` → `05-workflow` → `06-handoff` → `13-reasoning` → `15-plan-execute` → `16-mcp`

### 🔴 高级路径
`07-aware` → `08-multi-agent` → `17-a2a` → `22-arch-patterns` → `23-graph-orchestration` → `24-memory-arch`

### 🏭 生产部署路径
`09-deploy` → `10-light-heavy` → `25-observability` → `26-guardrails` → `27-evaluation`

### 💼 商业与实践
`11-business` → `28-coding-agents` → `29-case-studies` → `31-learning-path`

---

## 章节总览

### 基础概念 (0–11)

| 目录 | Order | 标题 (EN / ZH) | 难度 | 分类 | 前置章节 |
|------|-------|----------------|------|------|----------|
| `00-llm-api/` | 0 | LLM API / 大模型 API | ⭐ | tag-infra | 无 |
| `01-invocation/` | 1 | Invocation / 单次调用 | ⭐ | tag-infra | 00 |
| `01b-memory/` | 1.2 | Compress Memory / 压缩记忆 | ⭐⭐ | tag-core | 01 |
| `01b-memory-files/` | 1.1 | Memory Files / 记忆文件 | ⭐⭐ | tag-core | 01b-memory |
| `02-skill/` | 2 | Skill / 技能 | ⭐⭐ | tag-core | 01 |
| `03-agent/` | 3 | Agent / 智能体 | ⭐ | tag-core | 00–02 |
| `04-shell/` | 4 | Shell / 执行壳 | ⭐⭐ | tag-core | 03 |
| `05-workflow/` | 5 | Workflow / 工作流 | ⭐⭐ | tag-system | 03–04 |
| `06-handoff/` | 6 | Handoff / 交接文档 | ⭐⭐ | tag-system | 05 |
| `07-aware/` | 7 | Aware & Heartbeat / 感知与心跳 | ⭐⭐⭐ | tag-system | 03–06 |
| `08-multi-agent/` | 8 | Multi-Agent / 多智能体 | ⭐⭐⭐ | tag-system | 05–07 |
| `09-deploy/` | 9 | Local vs Cloud / 部署 | ⭐⭐ | tag-pattern | 03 |
| `10-light-heavy/` | 10 | Light vs Heavy / 轻重范式 | ⭐⭐ | tag-pattern | 03–09 |
| `11-business/` | 11 | Business Model / 商业模式 | ⭐⭐ | tag-biz | 03–10 |

### 核心模式 (12–15)

| 目录 | Order | 标题 (EN / ZH) | 难度 | 分类 | 前置章节 |
|------|-------|----------------|------|------|----------|
| `12-tool-use/` | 12 | Tool Use / 工具调用 | ⭐⭐ | tag-core | 00–03 |
| `13-reasoning/` | 13 | Reasoning / 推理模式 | ⭐⭐ | tag-pattern | 00 |
| `14-react/` | 14 | ReAct / 思考-行动-观察 | ⭐⭐ | tag-pattern | 12–13 |
| `15-plan-execute/` | 15 | Plan & Execute / 规划与执行 | ⭐⭐⭐ | tag-pattern | 14 |

### 协议层 (16–19)

| 目录 | Order | 标题 (EN / ZH) | 难度 | 分类 | 前置章节 |
|------|-------|----------------|------|------|----------|
| `16-mcp/` | 16 | MCP / 模型上下文协议 | ⭐⭐ | tag-infra | 12 |
| `17-a2a/` | 17 | A2A / Agent 间协议 | ⭐⭐⭐ | tag-system | 08–16 |
| `18-ag-ui/` | 18 | AG-UI / Agent-用户界面 | ⭐⭐ | tag-system | 16 |
| `19-protocol-stack/` | 19 | Protocol Stack / 协议栈 | ⭐⭐⭐ | tag-infra | 16–18 |

### 框架与编排 (20–23)

| 目录 | Order | 标题 (EN / ZH) | 难度 | 分类 | 前置章节 |
|------|-------|----------------|------|------|----------|
| `20-frameworks/` | 20 | Frameworks / 主流框架 | ⭐⭐ | tag-infra | 03–14 |
| `21-lowcode/` | 21 | Low-Code / 低代码平台 | ⭐⭐ | tag-infra | 20 |
| `22-arch-patterns/` | 22 | Architecture / 架构模式 | ⭐⭐⭐ | tag-pattern | 05–15–20 |
| `23-graph-orchestration/` | 23 | Graph / 图编排 | ⭐⭐⭐ | tag-pattern | 22 |

### 生产就绪 (24–27)

| 目录 | Order | 标题 (EN / ZH) | 难度 | 分类 | 前置章节 |
|------|-------|----------------|------|------|----------|
| `24-memory-arch/` | 24 | Memory Architecture / 记忆架构 | ⭐⭐⭐ | tag-core | 01b |
| `25-observability/` | 25 | Observability / 可观测性 | ⭐⭐⭐ | tag-system | 20 |
| `26-guardrails/` | 26 | Guardrails / 护栏机制 | ⭐⭐⭐ | tag-system | 12–25 |
| `27-evaluation/` | 27 | Evaluation / 评估体系 | ⭐⭐⭐ | tag-system | 26 |

### 实践与进阶 (28–31)

| 目录 | Order | 标题 (EN / ZH) | 难度 | 分类 | 前置章节 |
|------|-------|----------------|------|------|----------|
| `28-coding-agents/` | 28 | Coding Agents / 编程 Agent | ⭐⭐ | tag-biz | 03–14–16 |
| `29-case-studies/` | 29 | Case Studies / 行业案例 | ⭐⭐ | tag-biz | 全部 |
| `30-spec-formal/` | 30 | Formal Spec / 形式化规范 | ⭐⭐⭐ | tag-core | 全部 |
| `31-learning-path/` | 31 | Learning Path / 学习路径 | ⭐ | tag-biz | 无 |

---

## 文件规约

每个章节目录包含：

| 文件 | 必选 | 说明 |
|------|------|------|
| `chapter.js` | ✅ | 章节数据（自注册到 `window.AgentSpec`） |
| `CHAPTER.md` | ✅ | 章节交接手册 |
| `WORKLOG.md` | 可选 | 变更日志（有改动时创建） |

---

## 分组说明

| 分组 | 章节范围 | tagClass | 颜色 |
|------|----------|----------|------|
| 基础概念 | 00–11 | `tag-infra` / `tag-core` | 紫 / 青 |
| 核心模式 | 12–15 | `tag-pattern` | 绿 |
| 协议层 | 16–19 | `tag-system` / `tag-infra` | 橙 / 紫 |
| 框架编排 | 20–23 | `tag-pattern` / `tag-infra` | 绿 / 紫 |
| 生产就绪 | 24–27 | `tag-core` / `tag-system` | 青 / 橙 |
| 实践进阶 | 28–31 | `tag-biz` / `tag-core` | 红 / 青 |

---

## 如何新增章节

参见 [CONTRIBUTING.md](../CONTRIBUTING.md)。三步：
1. `mkdir chapters/XX-name && touch chapters/XX-name/{chapter.js,CHAPTER.md}`
2. 编写 `chapter.js`（参考模板）
3. 在 `manifest.js` 追加注册

## 注意事项

- `index.html` 中所有章节代码是**内联**的（非动态加载），新增章节需同时更新 `index.html`
- 章节间完全独立，互不引用
- SVG 文字必须双语（`t(lang, 'EN', '中文')`）
