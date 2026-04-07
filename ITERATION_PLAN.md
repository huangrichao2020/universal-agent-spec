# universal-agent-spec · 狠狠迭代规划 (v1)

> 目标：把过去两年（2024–2026）围绕 AI Agent 的**知识 / 项目 / 架构 / 最佳实践**，系统地、循序渐进地、可交互地沉淀进本仓库。沿用现有 `manifest.js + chapters/XX/chapter.js + CHAPTER.md` 自注册模式，**不重写架构**，只做扩展、补全、加深。

---

## 0. 工作纪律 (Codex 必读)

1. **先规划再动手**：每开一个新章节/新模块前，先在该目录下写 `PLAN.md`，列出 sections / SVG / 代码示例 / 参考资料，再开工。
2. **一件事一件事做**：禁止并行修改 >1 个章节。完成一个章节 → 自测 → commit → 再做下一个。
3. **做完必自测**：
   - `python3 -m http.server 8000` 起服务
   - 用浏览器打开 `http://localhost:8000`，切到新章节，**确认中英文双语、SVG 渲染、代码块高亮、目录跳转**全部正常
   - 控制台无 `register` 报错，无 404
   - 必要时截图存到 `chapters/XX-xxx/screenshots/`
4. **每动一个文件，写一份工作手册**：在被改动文件同目录新建/更新 `WORKLOG.md`，记录「为何改、改了什么、如何验证、踩坑」。
5. **每个目录一份交接手册**：每个 `chapters/XX-xxx/` 必须有 `CHAPTER.md`（已有则补全），内容含：定位、阅读顺序、依赖章节、未完成 TODO、维护人、上次更新日期。`core/`、`skills/`、新建的任何顶层目录同样要有 `HANDOFF.md`。
6. **复用 > 新造**：
   - SVG 一律走 `core/helpers.js` 的 `S.box / S.label / S.arrow`
   - 注册一律走 `window.AgentSpec.register`
   - 样式一律走 `core/styles.css` 已有 token，禁止 inline color
   - i18n 一律 `{ en, zh }` 双键，缺一不可
7. **举一反三**：每完成一个章节，回看是否有可抽到 `core/helpers.js` 的通用片段（如时序图、状态机、分层架构图），抽出后旧章节同步替换。
8. **不要造假**：代码示例必须可运行（Python/TS/Bash 都注明运行方式），禁止伪代码冒充。

---

## 1. 现状盘点

- 已有 32 章 (`00 → 31`)，覆盖：基础概念 (0–11)、核心模式 (12–15)、协议层 (16–19)、框架编排 (20–23)、生产就绪 (24–27)、实践进阶 (28–31)。
- 架构：`index.html` 壳 + `manifest.js` 注册表 + `chapters/XX/chapter.js` 自注册 + `core/{helpers,registry,styles}`。
- 缺口（迭代要补的）：
  - **深度不均**：早期章节（00–11）偏概念、缺工程细节；后期章节（24–31）偏列表、缺真实案例。
  - **缺少串联**：章节之间没有「前置 / 后续 / 对比」交叉引用。
  - **缺少 2025–2026 新知识**：Computer Use、长程任务记忆、Claude Skills、子 Agent、Plan Mode、SWE-bench Verified、Agent Harness、Sandboxing、Cost-aware Routing 等。
  - **缺少可跑 Demo**：现有 code example 多为静态片段。
  - **缺少学习路径动画**：`31-learning-path` 目前是文字。
  - **README/DESIGN 没体现 v3 蓝图**。

---

## 2. 迭代分期（5 个 Phase，循序渐进）

### Phase A · 地基加固（不新增章节，只补质量）
1. 给 `core/` 加 `HANDOFF.md`，澄清三个文件职责与扩展点。
2. 给 `chapters/` 加根级 `README.md`（章节地图 + 难度标记 + 推荐阅读路径）。
3. 给所有 32 章补齐缺失的 `CHAPTER.md`（脚本扫描：`for d in chapters/*/; do test -f $d/CHAPTER.md || echo MISSING $d; done`）。
4. 抽公共 SVG patterns 到 `core/helpers.js`：`S.timeline`、`S.layerStack`、`S.stateMachine`、`S.sequence`。
5. 在 `core/registry.js` 增加 `chapter.meta = { difficulty, prerequisites, nextSteps, updatedAt }`，渲染到章节顶部徽章。
6. 补全 i18n：脚本检查每章 `en`/`zh` 键对齐。

**自测**：本地起 server，遍历 32 章，无控制台报错，徽章正常。

### Phase B · 内容深挖（逐章升级，每章一次 commit）
按既有顺序，**每章一个 PR-style commit**，每章升级清单：
- [ ] 一段「2026 视角」的引子（这章在最近 12 个月发生了什么变化）
- [ ] 一张主图（用 Phase A 的新 helpers）
- [ ] 一个真实工程案例（带链接，禁止编造）
- [ ] 一段可运行代码（≤40 行，注明运行方式）
- [ ] 「常见误区」3 条
- [ ] 「延伸阅读」3 条（论文 / 博客 / 仓库）
- [ ] 与前后章节的交叉引用
- [ ] 更新 `CHAPTER.md` 的「上次更新日期」与「变更说明」

> 顺序：00 → 31，**一次只做一章**。每章完成后浏览器自测、截图、commit。

### Phase C · 新增章节（补 2025–2026 空白）
在 `manifest.js` 末尾追加，**每新增一章重复 Phase B 的清单**：
- `32-computer-use` — 屏幕级 Agent（Anthropic Computer Use / OpenAI Operator）
- `33-skills-system` — Claude Skills / Plugin / Subagent 体系
- `34-context-engineering` — Context window 管理、压缩、检索注入
- `35-long-horizon-tasks` — 多日任务、checkpoint、resume
- `36-sandboxing` — 安全执行、权限模型、bash 沙盒
- `37-cost-routing` — 多模型路由 / 便宜模型把关 / 缓存
- `38-agent-harness` — Claude Code / Codex / Cursor Agent / Devin 横向对比
- `39-swe-bench` — Agent 评测基准全景（SWE-bench Verified / GAIA / WebArena）
- `40-failure-modes` — 失败模式图谱（loop、hallucinated tool、context rot…）
- `41-team-topology` — 人 + Agent 协作的组织拓扑

### Phase D · 交互升级
1. `index.html` 增加章节难度过滤器、搜索框（仍纯前端，无构建）。
2. `31-learning-path` 改造成可点击的 SVG 路径图（复用 `S.timeline`）。
3. 增加「双栏对照」模式：左中文右英文同步滚动。
4. 增加 dark/light 切换持久化。

### Phase E · 元资产
1. 顶层新增 `BEST_PRACTICES.md`：把全书提炼为 30 条断言式最佳实践。
2. 顶层新增 `GLOSSARY.md`：所有出现过的术语 → 章节链接。
3. 顶层新增 `CHANGELOG.md`：本次迭代的版本日志（v2.0 → v3.0）。
4. README 更新 v3 蓝图、徽章版本号。

---

## 3. 每章/每文件「双手册」规约

- **文件级 `WORKLOG.md`**（每次改动追加一段）：
  ```
  ## 2026-04-07
  - 改动：xxx
  - 原因：xxx
  - 自测：浏览器路径 + 结果
  - 风险/踩坑：xxx
  ```
- **目录级 `CHAPTER.md` / `HANDOFF.md`** 模板：
  ```
  # 目录交接手册
  ## 定位
  ## 文件清单（逐个一句话）
  ## 依赖与被依赖
  ## 扩展点
  ## 未完成 TODO
  ## 维护人 / 上次更新
  ```

---

## 4. Codex 执行节奏（强约束）

> Codex：你接到这份 plan 后，**不要一口气全做完**。按下面节奏滚动：

```
LOOP for phase in [A, B, C, D, E]:
  for unit in phase.units:        # 一个 unit = 一章 或 一个文件组
    1. 写 unit/PLAN.md             （≤30 行，列 sections / SVG / 代码 / 参考）
    2. 实施改动
    3. 写/更新 unit/WORKLOG.md
    4. 写/更新所在目录 CHAPTER.md or HANDOFF.md
    5. 自测：python3 -m http.server 8000，浏览器访问，控制台 0 error
    6. git add -A && git commit -m "feat(XX): ..."
    7. 停下，输出一行进度汇报，再进入下一个 unit
```

- 任何一步失败 → 停下来诊断根因，禁止 `--no-verify` 绕过。
- 需要外部资料 → 先在 `unit/PLAN.md` 列出来源 URL，再下笔。
- 禁止删除已有章节内容；如需重写，先把旧版本搬到 `chapters/XX/legacy.js` 留档。

---

## 5. 验收标准

- 32 → 42 章，全部通过浏览器自测，控制台 0 error / 0 warning。
- 每个目录有 `CHAPTER.md` 或 `HANDOFF.md`。
- 每个被改动文件有对应的 `WORKLOG.md` 段落。
- `BEST_PRACTICES.md / GLOSSARY.md / CHANGELOG.md` 齐全。
- README 徽章升至 `v3.0.0`，concepts `42`。
- 提交历史：每个 unit 一个 commit，message 形如 `feat(33-skills-system): add chapter`。

---

(end of plan — Codex 按 Phase A 的 unit 1 开始)
