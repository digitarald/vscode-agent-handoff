import * as vscode from 'vscode';

interface HandoffInput {
	newPrompt: string;
	title: string;
}

export function activate(context: vscode.ExtensionContext) {
	const handoffTool = vscode.lm.registerTool<HandoffInput>(
		'handoff',
		{
			invoke: async (
				options: vscode.LanguageModelToolInvocationOptions<HandoffInput>,
				token: vscode.CancellationToken
			): Promise<vscode.LanguageModelToolResult> => {
				const { newPrompt, title } = options.input;
				const config = vscode.workspace.getConfiguration('agentHandoff');
				const asyncMode = config.get<boolean>('async', true);

				try {
					if (asyncMode) {
						vscode.window.showInformationMessage(
							`Ready to handoff: ${title}`,
							'Start Chat',
							'Review in File'
						).then(selection => {
							if (selection === 'Start Chat') {
								vscode.commands.executeCommand('workbench.action.chat.newChat', {
									agentMode: true,
									inputValue: newPrompt,
									isPartialQuery: true
								});
								// vscode.commands.executeCommand('workbench.action.chat.open', {
								// 	query: newPrompt,
								// 	isPartialQuery: true
								// });
						} else if (selection === 'Review in File') {
							const uri = vscode.Uri.parse(`untitled:${title}.prompt.md`);
							vscode.workspace.openTextDocument(uri).then(async doc => {
								await vscode.window.showTextDocument(doc, { preview: false });
								const edit = new vscode.WorkspaceEdit();
								edit.insert(uri, new vscode.Position(0, 0), newPrompt);
								await vscode.workspace.applyEdit(edit);
							});
						}
						});

						return new vscode.LanguageModelToolResult([
							new vscode.LanguageModelTextPart(
								`Handoff ready. Choose to start a chat session or open the prompt in a file for review.`
							)
						]);
					} else {
						await vscode.commands.executeCommand('workbench.action.chat.newChat');
						await vscode.commands.executeCommand('workbench.action.chat.open', {
							query: newPrompt,
							isPartialQuery: true
						});

						return new vscode.LanguageModelToolResult([
							new vscode.LanguageModelTextPart(
								`Successfully handed off to a new chat session.`
							)
						]);
					}
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					return new vscode.LanguageModelToolResult([
						new vscode.LanguageModelTextPart(
							`Failed to create handoff: ${errorMessage}`
						)
					]);
				}
			}
		}
	);

	context.subscriptions.push(handoffTool);
}

export function deactivate() { }
