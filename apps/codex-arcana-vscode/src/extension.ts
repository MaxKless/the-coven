// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SpellcastingTreeDataProvider } from './data-provider';
import { SpellcastingOverviewTreeDataProvider } from './spellcasting-overview';
import { initLanguageClient } from './language-client';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "codex-arcana-vscode" is now active!'
  );

  vscode.window.registerTreeDataProvider(
    'spellcasting-overview',
    new SpellcastingTreeDataProvider()
  );

  vscode.commands.registerCommand(
    'codex-arcana-vscode.copy',
    (item: vscode.TreeItem) => {
      vscode.env.clipboard.writeText(item.label?.toString() || '');
    }
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'codex-arcana-vscode.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage('Sup, witches');
    }
  );

  vscode.commands.registerCommand(
    'spellcasting.copy',
    (element: vscode.TreeItem) => {
      vscode.env.clipboard.writeText(element.label?.toString() || '');
    }
  );

  vscode.window.registerTreeDataProvider(
    'spellcasting-overview',
    new SpellcastingOverviewTreeDataProvider()
  );

  initLanguageClient(context);

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
