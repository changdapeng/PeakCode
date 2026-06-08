# CI Runner 排队事故报告

## 概要

2026-06-08，因配置了不可达的第三方 CI runner（Blacksmith），导致 CI 作业持续排队等待超过 10 小时，阻塞了 CI 流水线流转。

## 时间线

- 用户推送 `README.zh.md` 和语言链接到 `main` 分支
- GitHub Actions CI 触发 `Format, Lint, Typecheck, Test, Browser Test, Build` job，状态显示 "Waiting for a runner to pick up this job..."
- 10 小时后，job 仍在排队
- 用户发现异常，经排查定位为 `runs-on: blacksmith-4vcpu-ubuntu-2404` 配置问题
- 修复方案：改为 GitHub 官方托管 runner `ubuntu-24.04`
- 修复推送后，CI 立即开始正常运行

## 根因分析

`.github/workflows/ci.yml` 中配置了第三方的 Blacksmith runner：

```yaml
runs-on: blacksmith-4vcpu-ubuntu-2404
```

Blacksmith 是一个第三方 CI runner 服务（blacksmith.sh），在中国网络环境下无法访问。CI job 被提交到 Blacksmith 的 runner 队列后，因为用户环境中没有可用的 Blacksmith runner 实例，job 永久处于排队等待状态。

## 直接原因

修改 CI 配置时直接选用了非主流的第三方 runner，未验证其在中国网络环境下的可达性。

## 反思

1. **对外部服务的依赖要有兜底判断** — 使用第三方 runner 前应先确认其在目标网络环境下可正常工作。
2. **CI 配置应该优先使用 GitHub 官方 runner** — `ubuntu-24.04` 是 GitHub 原生托管的 runner，全球可用，不应该为了无关性能的场景引入第三方 runner 增加风险。
3. **改动后没有验证** — 配置变更未触发一次实际运行来确认可用性，导致问题在用户实际使用时才暴露。
4. **等待时间未被及时预警** — CI 排队 10 小时没有及时介入排查，导致用户大量时间被浪费。

## 改进措施

1. CI runner 统一使用 `ubuntu-24.04`（GitHub 官方托管），除非有明确的性能需求才考虑替换。
2. CI 配置变更后，观察至少一次完整运行通过。
3. 对于 CI 排队超过 5 分钟的情况，建立主动排查流程。
