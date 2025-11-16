# AI Agent Onboarding - Agent Handoff Extension

## Overview
This VS Code extension provides an LLM tool called `handoff` that enables AI agents to spawn new chat sessions with specific prompts. It's a meta-tool for context engineering and task delegation.

## Architecture

### Core Components
```
src/extension.ts          # Main extension entry point
  ├── activate()          # Registers the handoff tool
  ├── HandoffInput        # TypeScript interface for tool input
  └── Tool handler        # Async function that spawns chat sessions
```

### Technology Stack
- **Runtime**: VS Code Extension API (v1.106.0+)
- **Language**: TypeScript 5.9+
- **Build**: TypeScript compiler (tsc)
- **Package Manager**: pnpm

## Key APIs Used

### 1. LLM Tool Registration
```typescript
vscode.lm.registerTool<HandoffInput>('handoff', {
  invoke: async (options, token) => { /* ... */ }
})
```
- **Location**: `src/extension.ts:18-51`
- **Purpose**: Registers tool with VS Code's language model API
- **Return**: `vscode.LanguageModelToolResult`

### 2. Chat Command
```typescript
vscode.commands.executeCommand('workbench.action.chat.open', {
  query: prompt
})
```
- **Location**: `src/extension.ts:29-31`
- **Purpose**: Opens new chat panel with pre-filled prompt
- **Arguments**: `{ query: string }`

### 3. Tool Schema (package.json)
```json
{
  "name": "handoff",
  "inputSchema": {
    "type": "object",
    "properties": {
      "prompt": { "type": "string" }
    },
    "required": ["prompt"]
  }
}
```

## Development Workflow

### Setup
```bash
pnpm install                # Install dependencies
pnpm run compile            # Build TypeScript → JavaScript
```

### Testing
```bash
# Launch Extension Development Host
Press F5 in VS Code

# The extension activates when:
# - onLanguageModelTool:handoff event fires
# - Any LLM tool access occurs
```

### Build Output
- **Source**: `src/extension.ts`
- **Compiled**: `out/extension.js`
- **Entry Point**: Defined in `package.json` → `main: "./out/extension.js"`

## Contributing Guide

### Adding Features

**1. Modify Tool Input Schema**
Edit `package.json` → `contributes.languageModelTools[0].inputSchema`
```json
{
  "properties": {
    "prompt": { "type": "string" },
    "participant": { "type": "string" }  // New field
  }
}
```

**2. Update TypeScript Interface**
Edit `src/extension.ts` → `HandoffInput` interface
```typescript
interface HandoffInput {
    prompt: string;
    participant?: string;  // New field
}
```

**3. Implement Handler Logic**
Modify `invoke` function in `src/extension.ts:20-50`

### Error Handling Pattern
```typescript
try {
    await vscode.commands.executeCommand(/* ... */);
    return new vscode.LanguageModelToolResult([
        new vscode.LanguageModelTextPart("Success message")
    ]);
} catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new vscode.LanguageModelToolResult([
        new vscode.LanguageModelTextPart(`Failed: ${errorMessage}`)
    ]);
}
```

### Code Style
- **Indentation**: Tabs (as per .editorconfig)
- **Async/Await**: Preferred over promises
- **Error Types**: Check `instanceof Error` before accessing `.message`
- **Logging**: Use `console.log()` for activation events

## Testing Scenarios

### Manual Testing
1. **F5** → Launch Extension Development Host
2. Open GitHub Copilot Chat
3. LLM invokes tool: `handoff(prompt: "Write unit tests")`
4. **Expected**: New chat panel opens with prompt

### Verification Points
- ✓ Extension activates (check Debug Console)
- ✓ Tool appears in `vscode.lm.tools` array
- ✓ Chat panel opens on invocation
- ✓ Success message returned to LLM
- ✓ Error handled gracefully if command fails

## Extension Lifecycle

```
VS Code Start
    ↓
Activation Event: onLanguageModelTool:handoff
    ↓
activate() called
    ↓
vscode.lm.registerTool() executes
    ↓
Tool available in vscode.lm.tools
    ↓
LLM invokes tool
    ↓
invoke() handler runs
    ↓
workbench.action.chat.open executed
    ↓
LanguageModelToolResult returned
```

## Common Tasks

### Rebuild After Changes
```bash
pnpm run compile
# Then reload Extension Development Host: Cmd+R (macOS) / Ctrl+R (Windows)
```

### Check Tool Registration
Open Debug Console in Extension Development Host:
```
Congratulations, your extension "agent-handoff" is now active!
```

### View Available Tools (in Extension Development Host)
```javascript
// Open Developer Tools Console
vscode.lm.tools.forEach(t => console.log(t.name));
// Should include: "handoff"
```

## Package.json Key Sections

### Contribution Point
```json
"contributes": {
  "languageModelTools": [...]  // Tool definition
}
```

### Activation Events
```json
"activationEvents": [
  "onLanguageModelTool:handoff"  // Lazy activation
]
```

### Scripts
- `compile`: Build TypeScript
- `watch`: Auto-rebuild on file changes
- `lint`: Run ESLint
- `test`: Run test suite

## Deployment

### Local Installation
```bash
# Package extension
vsce package

# Install .vsix file
code --install-extension agent-handoff-0.0.1.vsix
```

### Publishing (Future)
```bash
vsce publish
```

## Troubleshooting

### Tool Not Available
- Check activation event fired (Debug Console)
- Verify `package.json` syntax (languageModelTools)
- Ensure VS Code version ≥ 1.106.0

### Chat Doesn't Open
- Verify `workbench.action.chat.open` command exists
- Check GitHub Copilot is installed
- Inspect error in `LanguageModelToolResult`

### TypeScript Errors
```bash
pnpm run compile  # See compilation errors
```

## Resources

- **VS Code Extension API**: https://code.visualstudio.com/api
- **Language Model API**: https://code.visualstudio.com/api/references/vscode-api#lm
- **Tool Registration**: https://code.visualstudio.com/api/references/vscode-api#lm.registerTool
- **Extension Guidelines**: https://code.visualstudio.com/api/references/extension-guidelines

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Build | `pnpm run compile` |
| Watch mode | `pnpm run watch` |
| Test | `F5` (Launch Extension Development Host) |
| Lint | `pnpm run lint` |
| Package | `vsce package` |

---

**For AI Agents**: This extension is itself a tool for spawning additional agent contexts. When contributing, consider how your changes affect the meta-workflow of AI-assisted development and multi-agent collaboration patterns.
