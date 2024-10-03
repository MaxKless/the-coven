import { SpellCastingSDK } from '@the-coven/spellcasting-sdk';
import { TextDocument } from 'vscode-languageserver-textdocument';
import {
  CompletionItem,
  CompletionList,
  createConnection,
  ProposedFeatures,
  TextDocuments,
} from 'vscode-languageserver/node';

const connection = createConnection(ProposedFeatures.all);

const documents = new TextDocuments<TextDocument>(TextDocument);

let ingredients: string[] = [];
let incantations: string[] = [];

connection.onInitialize(async () => {
  const sdk = new SpellCastingSDK('https://the-coven.vercel.app');
  ingredients = await sdk.getAllIngredients();
  incantations = await sdk.getAllIncantations();

  return {
    capabilities: {
      completionProvider: {
        resolveProvider: false,
      },
    },
  };
});

connection.onCompletion((params) => {
  const document = documents.get(params.textDocument.uri);

  if (!document || !document.uri.endsWith('js')) {
    return;
  }

  const text = document.getText();
  if (!text.includes('@the-coven/spellcasting-sdk')) {
    return;
  }

  const ingredientCompletions = ingredients.map((item) => {
    const completion = CompletionItem.create(item);
    completion.detail = 'Ingredient';
    return completion;
  });

  const incantationCompletions = incantations.map((item) => {
    const completion = CompletionItem.create(item);
    completion.detail = 'Incantation';
    return completion;
  });

  const position = params.position;
  const lines = text.split('\n');
  const prefixText = lines[position.line].slice(0, position.character);

  if (prefixText.includes('addIngredient')) {
    return CompletionList.create(ingredientCompletions);
  } else if (prefixText.includes('addIncantation')) {
    return CompletionList.create(incantationCompletions);
  } else {
    return CompletionList.create([
      ...ingredientCompletions,
      ...incantationCompletions,
    ]);
  }
});

documents.listen(connection);

connection.listen();
