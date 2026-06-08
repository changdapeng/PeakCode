# Quick Start / 快速入门

## Development / 开发模式

### Web Development / Web 开发

```bash
# Start full development environment with hot reload / 启动完整开发环境（支持热重载）
bun run dev

# This will start:
# - Web server on http://localhost:3773
# - React dev server with HMR
# - File watchers for automatic rebuilds
# - WebSocket server for real-time communication

# 这将启动：
# - Web 服务器在 http://localhost:3773
# - React 开发服务器（支持热模块替换）
# - 文件监视器（自动重建）
# - WebSocket 服务器（实时通信）
```

### Desktop Development / 桌面应用开发

```bash
# Start desktop development / 启动桌面应用开发
bun run dev:desktop

# Desktop development on an isolated port set / 在隔离端口启动桌面开发
PEAKCODE_DEV_INSTANCE=feature-xyz bun run dev:desktop

# Isolated development to avoid conflicts / 隔离开发（避免冲突）
env -u T3CODE_AUTH_TOKEN T3CODE_PORT_OFFSET=3158 T3CODE_NO_BROWSER=1 \
  bun run dev:desktop --home-dir ./.peakcode-dev --port 58090

# Debug mode with inspector / 调试模式（带调试器）
bun run dev:desktop --inspect
```

### Marketing Site Development / 营销网站开发

```bash
# Start marketing site development / 启动营销网站开发
bun run dev:marketing

# Access at http://localhost:4321
# 访问地址：http://localhost:4321
```

---

## Production / 生产环境

### Build / 构建

```bash
# Build all projects / 构建所有项目
bun run build

# Build only specific projects / 仅构建特定项目
bun run build:marketing   # 构建营销网站
bun run build:desktop     # 构建桌面应用
bun run build:contracts   # 构建合约包
bun run build:server      # 构建服务器
bun run build:web         # 构建 Web UI

# Build with verbose output / 详细输出模式构建
bun run build --verbose

# Build for specific platform / 为特定平台构建
bun run build --filter=@peakcode/desktop -- --platform mac
```

### Start Production Server / 启动生产服务器

```bash
# Start production server / 启动生产服务器
bun run start

# Start desktop app / 启动桌面应用
bun run start:desktop

# Start marketing site preview / 启动营销网站预览
bun run start:marketing

# Start server with custom port / 使用自定义端口启动服务器
bun run start -- --port 8080
```

---

## Desktop Distribution / 桌面分发

### macOS / 苹果系统

```bash
# Build DMG for current architecture / 构建当前架构的 DMG
bun run dist:desktop:dmg

# Build DMG for ARM64 / 构建 ARM64 架构的 DMG
bun run dist:desktop:dmg:arm64

# Build DMG for x64 / 构建 x64 架构的 DMG
bun run dist:desktop:dmg:x64

# Build universal DMG (both architectures) / 构建通用 DMG（包含两种架构）
bun run dist:desktop:dmg:universal
```

### Linux

```bash
# Build AppImage for x64 / 构建 x64 架构的 AppImage
bun run dist:desktop:linux

# Build Debian package / 构建 Debian 包
bun run dist:desktop:linux:deb
```

### Windows

```bash
# Build NSIS installer for x64 / 构建 x64 架构的 NSIS 安装包
bun run dist:desktop:win

# Build portable zip / 构建便携版压缩包
bun run dist:desktop:win:portable
```

---

## Testing / 测试

### Run All Tests / 运行所有测试

```bash
bun run test
```

### Run Desktop Smoke Tests / 运行桌面应用冒烟测试

```bash
bun run test:desktop-smoke
```

### Run Specific Tests / 运行特定测试

```bash
# Run server tests / 运行服务器测试
bun run test --filter=@peakcode/server

# Run web tests / 运行 Web 测试
bun run test --filter=@peakcode/web

# Run desktop tests / 运行桌面测试
bun run test --filter=@peakcode/desktop

# Run a specific test file / 运行特定测试文件
bun run test --filter=@peakcode/server -- test/file.test.ts

# Run tests with coverage / 运行测试并生成覆盖率报告
bun run test --coverage

# Run tests in watch mode / 监听模式运行测试
bun run test --watch
```

---

## Linting & Formatting / 代码检查与格式化

### Format Code / 格式化代码

```bash
# Format all code / 格式化所有代码
bun run fmt

# Check formatting without applying changes / 检查格式（不应用更改）
bun run fmt:check

# Format specific files / 格式化特定文件
bun run fmt -- apps/server/src/main.ts
```

### Lint Code / 代码检查

```bash
# Run linter / 运行代码检查
bun run lint

# Run linter with fix / 运行代码检查并自动修复
bun run lint --fix

# Run linter on specific files / 检查特定文件
bun run lint -- apps/server/src/
```

### Type Check / 类型检查

```bash
# Run type checker / 运行类型检查
bun run typecheck

# Run type checker with verbose output / 详细输出模式运行类型检查
bun run typecheck --verbose
```

---

## Clean / 清理

```bash
# Clean all build artifacts and dependencies / 清理所有构建产物和依赖
bun run clean

# Clean only build artifacts / 仅清理构建产物
rm -rf apps/*/dist apps/*/dist-electron packages/*/dist .turbo

# Clean node_modules / 清理 node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules
```

---

## Environment Variables / 环境变量

### Development / 开发环境

| Variable / 变量 | Description / 描述 | Default / 默认值 |
|----------------|-------------------|-----------------|
| `T3CODE_PORT_OFFSET` | 端口偏移量 | `0` |
| `T3CODE_NO_BROWSER` | 是否禁止自动打开浏览器 | `false` |
| `T3CODE_AUTH_TOKEN` | 认证令牌 | - |
| `PEAKCODE_DEV_INSTANCE` | 开发实例名称 | - |

### Production / 生产环境

| Variable / 变量 | Description / 描述 | Default / 默认值 |
|----------------|-------------------|-----------------|
| `NODE_ENV` | 运行环境 | `production` |
| `PORT` | 服务端口 | `3773` |

---

## Quick Reference / 快速参考

| Command / 命令 | Description / 描述 |
|---------------|-------------------|
| `bun run dev` | 启动完整开发环境 |
| `bun run dev:server` | 仅启动服务器 |
| `bun run dev:web` | 仅启动 Web UI |
| `bun run dev:desktop` | 启动桌面应用开发 |
| `bun run dev:marketing` | 启动营销网站开发 |
| `bun run build` | 构建所有项目 |
| `bun run start` | 启动生产服务器 |
| `bun run test` | 运行所有测试 |
| `bun run lint` | 运行代码检查 |
| `bun run fmt` | 格式化代码 |
| `bun run typecheck` | 类型检查 |
| `bun run dist:desktop:dmg` | 构建 macOS DMG |
| `bun run dist:desktop:linux` | 构建 Linux AppImage |
| `bun run dist:desktop:win` | 构建 Windows 安装包 |

---

## Troubleshooting / 故障排除

### Port Already in Use / 端口已被占用

```bash
# Check which process is using the port / 检查哪个进程占用了端口
lsof -nP -iTCP:3773 -sTCP:LISTEN

# Kill the process / 终止进程
kill -9 <PID>

# Or use a different port / 或使用不同端口
bun run dev -- --port 58090
```

### Dependencies Issues / 依赖问题

```bash
# Reinstall dependencies / 重新安装依赖
bun run clean
bun install

# Update dependencies / 更新依赖
bun update
```

### Build Errors / 构建错误

```bash
# Check build logs / 检查构建日志
cat .turbo/turbo-build.log

# Clean and rebuild / 清理并重新构建
bun run clean
bun run build
```
