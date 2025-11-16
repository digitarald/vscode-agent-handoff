# Change Log

All notable changes to the "agent-handoff" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.0.1] - 2025-11-16

### Added
- Initial preview release
- LLM tool registration for handoff functionality
- Automatic chat session spawning via `workbench.action.chat.newChat` and `workbench.action.chat.open`
- Context-aware prompt generation support through `newPrompt` parameter
- TypeScript implementation with full type safety
- esbuild-based production build system
- Comprehensive README and documentation
- MIT License
- Development configuration (.vscode, .gitignore, .vscodeignore)

### Features
- `handoff` tool available to GitHub Copilot and VS Code language models
- Seamless chat session management for AI agent collaboration
- Zero-configuration activation on first tool usage
- Optimized bundling with esbuild for production deployments