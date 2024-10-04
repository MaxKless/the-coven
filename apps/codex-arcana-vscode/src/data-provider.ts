import { Recipe } from '@the-coven/util-interface';
import {
  CancellationToken,
  Event,
  ProviderResult,
  TreeDataProvider,
  TreeItem,
} from 'vscode';

export class SpellcastingTreeDataProvider
  implements TreeDataProvider<TreeItem>
{
  ingredients: string[] = [];
  incantations: string[] = [];
  recipes: Recipe[] = [];

  getTreeItem(element: TreeItem): TreeItem | Thenable<TreeItem> {
    return element;
  }
  getChildren(element?: TreeItem | undefined): ProviderResult<TreeItem[]> {
    if (!element) {
      return [
        {
          label: 'Ingredients',
        },
        { label: 'Incantations' },
        { label: 'Recipes' },
      ];
    }
  }
}
