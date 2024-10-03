import { join } from 'path';
import { ExtensionContext } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

export function initLanguageClient(context: ExtensionContext) {
  let serverModule = context.asAbsolutePath(join('language-server', 'main.js'));
  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  let clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'javascript' }],
  };

  const client = new LanguageClient(
    'codexArcanaLanguageServer',
    'Codex Arcana Language Server',
    serverOptions,
    clientOptions
  );

  client.start();
}
