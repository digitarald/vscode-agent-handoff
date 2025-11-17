# Agent Handoff

[![CI](https://github.com/digitarald/vscode-agent-handoff/actions/workflows/ci.yml/badge.svg)](https://github.com/digitarald/vscode-agent-handoff/actions/workflows/ci.yml)
[![Release](https://github.com/digitarald/vscode-agent-handoff/actions/workflows/release.yml/badge.svg)](https://github.com/digitarald/vscode-agent-handoff/actions/workflows/release.yml)

Seamless context transition for AI agent collaboration. Enable GitHub Copilot to spawn focused chat sessions with intelligent context management.

## Why?

Long AI conversations get cluttered. Agent Handoff lets AI assistants create fresh, focused chat sessions—analyzing current context, extracting what matters, and delegating work to new threads.

**Perfect for:**
- Breaking complex projects into focused subtasks
- Transitioning between development phases
- Managing conversation scope and context overflow

## Features

- **Zero Configuration** - Works immediately with GitHub Copilot
- **Smart Context Transfer** - AI extracts relevant information for new sessions
- **Automatic Chat Spawning** - Opens new panels with contextual prompts
- **LLM Tool Integration** - Registered as `handoff` tool for language models

## Installation

[![Install in VS Code](https://img.shields.io/badge/VS%20Code-Install-blue?logo=visual-studio-code)](https://vscode.dev/redirect?url=vscode:extension/digitarald.agent-handoff)
[![Install in VS Code Insiders](https://img.shields.io/badge/VS%20Code%20Insiders-Install-green?logo=visual-studio-code)](https://insiders.vscode.dev/redirect?url=vscode:extension/digitarald.agent-handoff)

Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=digitarald.agent-handoff) or search "Agent Handoff" in VS Code Extensions.

## Usage

Once installed, simply ask GitHub Copilot to hand off work:

- *"Create a handoff for implementing the user dashboard"*
- *"Start a fresh chat to handle the API documentation"*
- *"Hand this off to a new session focused on testing"*

The AI will analyze your conversation, extract relevant context, and spawn a new focused chat session.

## Requirements

- VS Code 1.106.0+
- GitHub Copilot or compatible language model provider

## Contributing

Contributions welcome! [Open an issue](https://github.com/digitarald/vscode-agent-handoff/issues) or submit a pull request.

## License

MIT - see [LICENSE](LICENSE) for details.
