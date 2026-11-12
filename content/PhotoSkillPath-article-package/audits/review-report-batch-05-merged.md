# Batch 05 全批次合并复审 / Batch 05 merged independent review

复审范围：把第一组修订后的 EXP-05、EXP-06、FOC-05 与第二组 COM-05、PHO-05、EDI-05 合并为一个六篇批次重新审计。第一组使用 `revisions/revision-007/` 中的最终副本；第二组使用当前 `articles/` 中的最终草稿。原始审计、修订记录和第二组单独审计均保留不变。

复审依据：`editorial-profile.md`、`site-strategy.json`、Batch 05 计划与交接记录、六篇 `article.md`/`article.json`、各自 brief、research notes、outline、writer QA、预检结果、第一组独立复审报告、第二组独立审计报告，以及跨六篇的 `similarity-batch-05-merged.json`。

## Decision summary / 决策摘要

| Article | Decision | Core intent | Technical | Editorial | Publish |
|---|---|---|---|---|---|
| EXP-05 — Aperture Priority vs Shutter Priority: Which Should a Beginner Use? | PASS | 以“保护哪个变量”选择模式 | PASS | PASS | NOT_READY |
| EXP-06 — Exposure Compensation for Bright Backgrounds and Dark Subjects | PASS | 先识别亮暗主体错配，再做补偿与验证 | PASS | PASS | NOT_READY |
| FOC-05 — 5 Sharpness Checks to Try Before Blaming the Lens | PASS | 在归咎镜头前隔离五种清晰度原因 | PASS | PASS | NOT_READY |
| COM-05 — Window Light for Beginners: Read Direction Before You Edit | PASS | 先读窗光方向，再决定是否后期 | PASS | PASS | NOT_READY |
| PHO-05 — Phone Photo Crop Ratios: Sharing, Stories, and Printing | PASS | 按输出用途选择裁剪形状并保留可逆性 | PASS | PASS | NOT_READY |
| EDI-05 — A Beginner Photo Folder and Backup System That Stays Findable | PASS | 用文件夹、命名、副本和找回测试建立可检索系统 | PASS | PASS | NOT_READY |

本轮没有 `REVISE`、`REBUILD` 或 `BLOCKED`。六篇均通过合并后的意图、证据、结构、标题互换和批次相似度检查；没有发现需要再次改文的材料性问题。

## Batch-level findings / 批次级结论

- **Similarity risk: LOW。** `similarity-batch-05-merged.json` 的 15 个文章对中，14 对共享 8 词连续片段为 0；唯一例外是 EXP-06 与 COM-05 的 1 个片段，Jaccard 为 `0.0004`，且没有重复 H2/H3。这是自然语言偶合，不构成模板或改写风险。
- **Topic-boundary risk: LOW。** 六篇形成清晰的任务边界：EXP-05 负责模式选择，EXP-06 负责曝光补偿，FOC-05 负责清晰度诊断，COM-05 负责窗光方向，PHO-05 负责裁剪与输出用途，EDI-05 负责文件可检索性与备份。相邻文章可互链，但不存在同一搜索意图的替代关系。
- **Evidence risk: LOW。** 第一组修订已闭环 Auto ISO、histogram 与高动态范围表述；第二组已完成来源 reciprocal mapping 和预检。COM-05 的原计划 S8 不可读取，但已使用可读的 Sony、Adobe、Nikon、政府来源替代，并未把 S8 当作已验证证据。其余文章的官方支持/档案来源覆盖材料性主张。
- **Editorial-pattern risk: LOW。** 六篇均保留各自的动作链：选择—检查、识别—纠偏、隔离—升级、移动—观察、裁剪—预览、整理—找回。没有统一套用相同标题、结尾或免责声明骨架。
- **Scope and claims:** 六篇均为 global English、`research_only` 范围；没有第一人称亲测、购买/排名、平台算法承诺、固定设备行为或永久安全保证。设备菜单、应用界面和打印预览均保留了适用范围边界。

## Article findings / 六篇文章结论

### EXP-05 — Aperture Priority vs Shutter Priority

**PASS。** 标题承诺由决策矩阵、静态人像、运动主体、低光场景和可复述的选择句完整兑现。Aperture Priority 与 Shutter Priority 各自对应受保护变量和需要检查的失败信号；Auto ISO 直接官方来源缺口已在 revision-007 中补齐。与 EXP-06 或 FOC-05 互换标题会失去原文的模式选择任务，跨批次无重复 H2/H3。

### EXP-06 — Exposure Compensation for Bright Backgrounds and Dark Subjects

**PASS。** 文章提供亮背景/暗主体和暗背景/亮主体的条件化方向，随后给出 preview、highlights、histogram、两种场景和停止边界。histogram 与 HDR 证据已在 revision-007 中补齐，并删除了过度绝对化的 captured-range 句子。与 EXP-05 的模式选择或 COM-05 的光线方向没有意图合并。

### FOC-05 — 5 Sharpness Checks to Try Before Blaming the Lens

**PASS。** 五项低成本检查分别隔离相机移动、主体移动、焦点落点、快门方向和条件重复性，并设有何时停止自查、何时寻求专业支持的边界。文章未把清晰度清单伪装成实验室测试或维修结论；与六篇其他文章没有文本或标题结构冲突。

### COM-05 — Window Light for Beginners: Read Direction Before You Edit

**PASS。** 三种窗光位置、距离/扩散、最亮背景问题和三位置练习卡直接覆盖标题意图。Sony、Nikon、Adobe 和政府来源支撑方向、轮廓、纹理、柔和度与背景反差；练习步骤作为明确教学方法呈现，没有伪造亲测结果或固定角度承诺。

### PHO-05 — Phone Photo Crop Ratios: Sharing, Stories, and Printing

**PASS。** 目的地优先的决策表覆盖 square、portrait、landscape、print，并补上裁剪损失、打印预览、保留原图和 30 秒检查。Google Photos、Adobe Lightroom、Google Photos print 帮助与 Nikon composition 来源支撑材料性主张；没有把任何平台当前比例或 UI 写成普遍规则。

### EDI-05 — A Beginner Photo Folder and Backup System That Stays Findable

**PASS。** 最小文件夹树、耐移动的命名、一个月示例、第二副本、验证和五分钟找回测试构成完整工作流。National Archives、Library of Congress、Google One、Microsoft Photos 与 Apple 来源覆盖命名、目录、副本、备份状态和组织视图；文章明确区分新手起点与更强的多介质/多地点保存建议，没有恢复保证。

## Readiness / 就绪状态

technical_ready: true

editorial_ready: true

publish_ready: false

human_review: REQUIRED

说明：`editorial_ready: true` 只表示六篇合并后的独立编辑复审未发现材料性缺陷，不等于发布授权。发布前仍需完成目标设备/应用功能核对、最终页面渲染、图片权利检查（如使用图示）、站点级导航/隐私/抓取/AdSense 审计，以及人工确认所有链接、署名和免责声明。

## Disposition / 处置

Batch 05 六篇内容通过合并复审，无需再次修订。可将批次状态推进为 `batch-05_merged_audit_pass`，并转入站点级 AdSense 发布前审计；不要把本报告的 `publish_ready: false` 改写成已发布或已获 AdSense 批准。
