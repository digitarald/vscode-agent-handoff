// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

interface HandoffInput {
	newPrompt: string;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "agent-handoff" is now active!');

	// Register the handoff tool
	const handoffTool = vscode.lm.registerTool<HandoffInput>(
		'handoff',
		{
			invoke: async (
				options: vscode.LanguageModelToolInvocationOptions<HandoffInput>,
				token: vscode.CancellationToken
			): Promise<vscode.LanguageModelToolResult> => {
				const { newPrompt } = options.input;

				try {
					// First create a new chat
					await vscode.commands.executeCommand('workbench.action.chat.newChat');
					// Then open with your prompt
					await vscode.commands.executeCommand('workbench.action.chat.open', {
						query: newPrompt,
						isPartialQuery: true
					});

					// Return success result
					const firstLine = newPrompt.split('\n')[0];
					return new vscode.LanguageModelToolResult([
						new vscode.LanguageModelTextPart(
							`Successfully handed off to a new chat session.`
						)
					]);
				} catch (error) {
					// Return error result
					const errorMessage = error instanceof Error ? error.message : String(error);
					return new vscode.LanguageModelToolResult([
						new vscode.LanguageModelTextPart(
							`Failed to hand off to a new chat session: ${errorMessage}`
						)
					]);
				}
			}
		}
	);

	context.subscriptions.push(handoffTool);
}

// This method is called when your extension is deactivated
export function deactivate() { }
