# Contributing / 贡献指南

## Read This First / 首先阅读

Thank you for your interest in contributing to Peak Code! We welcome contributions from the community.

感谢您对 Peak Code 贡献的兴趣！我们欢迎来自社区的贡献。

PRs are automatically labeled with a `vouch:*` trust status and a `size:*` diff size based on changed lines.

PR 会自动根据变更行数标记 `vouch:*` 信任状态和 `size:*` 差异大小。

If you are an external contributor, expect `vouch:unvouched` until we explicitly add you to [.github/VOUCHED.td](.github/VOUCHED.td).

如果您是外部贡献者，在我们明确将您添加到 [.github/VOUCHED.td](.github/VOUCHED.td) 之前，您的 PR 将被标记为 `vouch:unvouched`。

---

## What We Accept / 接受的贡献类型

### Small, focused bug fixes / 小而专注的 Bug 修复

- Fixes for crashes, hangs, or data loss
- 修复崩溃、挂起或数据丢失问题

### Small reliability fixes / 小的可靠性改进

- Improvements to error handling and recovery
- 改进错误处理和恢复机制

### Small performance improvements / 小的性能优化

- Optimizations that don't change behavior
- 不改变行为的优化

### Tightly scoped maintenance work / 范围明确的维护工作

- Dependency updates with no behavioral changes
- 不改变行为的依赖更新
- Documentation improvements
- 文档改进

### Feature requests / 功能请求

- Well-documented feature proposals with use cases
- 带有使用场景的功能提案

---

## What We Are Least Likely To Accept / 最不可能接受的贡献

### Large PRs / 大型 PR

PRs with more than 500 lines of changes are unlikely to be reviewed.

超过 500 行变更的 PR 不太可能被审查。

### Drive-by feature work / 随意的功能添加

Features added without prior discussion are unlikely to be accepted.

未经事先讨论添加的功能不太可能被接受。

### Opinionated rewrites / 主观重写

Large-scale refactoring without clear benefits will be rejected.

没有明确好处的大规模重构将被拒绝。

### Anything that expands product scope / 任何扩大产品范围的内容

If it's not on our roadmap, we probably won't accept it.

如果不在我们的路线图上，我们很可能不会接受。

---

## If You Still Want To Open A PR / 如果您仍然想提交 PR

### Keep it small / 保持体积小

Aim for PRs under 200 lines of changed code.

目标是变更代码不超过 200 行。

### Explain exactly what changed / 清晰说明变更内容

Describe the changes in detail in the PR description.

在 PR 描述中详细说明变更内容。

### Explain exactly why the change should exist / 说明变更原因

What problem does this solve? Why is this the right approach?

这解决了什么问题？为什么这是正确的方法？

### Do not mix unrelated fixes together / 不要混合无关的修复

Each PR should address a single issue or improvement.

每个 PR 应该只解决一个问题或改进。

### If the PR makes anything resembling a UI change / 如果涉及 UI 变更

Include clear before/after images showing the difference.

提供清晰的前后对比图。

### If the change depends on motion, timing, transitions, or interaction details / 如果变更涉及动画、时序、过渡或交互细节

Include a short video demonstrating the behavior.

提供演示行为的短视频。

---

## Issues First / 先提 Issue

If you are thinking about a non-trivial change, open an issue first.

如果您考虑进行非平凡的变更，请先提交 issue。

That still does not mean we will want the PR, but it gives you a chance to avoid wasting your time.

这并不意味着我们一定会接受 PR，但可以让您避免浪费时间。

---

## Be Realistic / 保持现实

Opening a PR does not create an obligation on our side.

提交 PR 并不会给我们带来义务。

We may close it. We may ignore it. We may ask you to shrink it. We may reimplement the idea ourselves later.

我们可能会关闭它、忽略它、要求您缩小范围，或者稍后自己重新实现这个想法。

If you are fine with that, proceed.

如果您能接受这一点，请继续。

---

## Code Style / 代码风格

### Formatting / 格式化

- Use `bun run fmt` to format your code
- 使用 `bun run fmt` 格式化代码
- We use oxfmt as our formatter
- 我们使用 oxfmt 作为格式化工具

### Linting / 代码检查

- Use `bun run lint` to check for linting issues
- 使用 `bun run lint` 检查代码问题
- We use oxlint as our linter
- 我们使用 oxlint 作为代码检查工具

### Type Checking / 类型检查

- Use `bun run typecheck` to check types
- 使用 `bun run typecheck` 检查类型

### Naming Conventions / 命名规范

- Use PascalCase for class names and components
- 类名和组件使用 PascalCase
- Use camelCase for functions and variables
- 函数和变量使用 camelCase
- Use UPPER_CASE_SNAKE_CASE for constants
- 常量使用 UPPER_CASE_SNAKE_CASE

---

## Testing / 测试

### Writing Tests / 编写测试

- All new code should have unit tests
- 所有新代码都应该有单元测试
- Use Vitest for testing
- 使用 Vitest 进行测试
- Write tests that are fast and deterministic
- 编写快速且确定性的测试

### Running Tests / 运行测试

```bash
# Run all tests / 运行所有测试
bun run test

# Run specific test file / 运行特定测试文件
bun run test --filter=@peakcode/server -- test/file.test.ts

# Run tests with coverage / 运行测试并生成覆盖率报告
bun run test --coverage
```

---

## Development Workflow / 开发流程

### Branching / 分支

- Create feature branches from `main`
- 从 `main` 创建功能分支
- Name branches with descriptive names (e.g., `fix/crash-on-startup`, `feat/add-dark-mode`)
- 使用描述性名称命名分支（例如 `fix/crash-on-startup`, `feat/add-dark-mode`）

### Commits / 提交

- Use conventional commit messages
- 使用规范的提交消息
- Examples: `fix: resolve crash on session restart`, `feat: add keyboard shortcuts`
- 示例：`fix: resolve crash on session restart`, `feat: add keyboard shortcuts`

### Pull Requests / 拉取请求

- Title should be concise and descriptive
- 标题应简洁明了
- Description should explain what was changed and why
- 描述应说明变更内容和原因
- Link to related issues
- 链接到相关 issue

---

## Code Review / 代码审查

### Review Process / 审查流程

1. PR is submitted
2. PR is labeled with `vouch:*` and `size:*`
3. Reviewer is assigned
4. Reviewer provides feedback
5. Author addresses feedback
6. PR is approved or rejected

### Review Criteria / 审查标准

- Code correctness / 代码正确性
- Code quality / 代码质量
- Tests coverage / 测试覆盖率
- Documentation / 文档
- Performance / 性能
- Security / 安全性

---

## License / 许可证

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

通过向此项目贡献代码，您同意您的贡献将以 MIT 许可证授权。

See [LICENSE](./LICENSE) for details.

详见 [LICENSE](./LICENSE)。

---

## Contact / 联系方式

If you have any questions, feel free to reach out:

- Discord: [Join our Discord server](https://discord.gg/jn4EGJjrvv)
- GitHub Issues: [Open an issue](https://github.com/PeakCode-AI/PeakCode/issues)
