import { SpellCastingSDK } from '@the-coven/spellcasting-sdk';
import { Recipe } from '@the-coven/util-interface';
import {
  CancellationToken,
  Event,
  ProviderResult,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
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
  async getChildren(
    element?: TreeItem | undefined
  ): Promise<TreeItem[] | undefined> {
    if (!element) {
      const sdk = new SpellCastingSDK('https://the-coven.vercel.app');
      this.ingredients = await sdk.getAllIngredients();
      this.incantations = await sdk.getAllIncantations();
      this.recipes = await sdk.getAllRecipes();

      return [
        {
          label: 'Ingredients',
          collapsibleState: TreeItemCollapsibleState.Collapsed,
        },
        {
          label: 'Incantations',
          collapsibleState: TreeItemCollapsibleState.Collapsed,
        },
        {
          label: 'Recipes',
          collapsibleState: TreeItemCollapsibleState.Collapsed,
        },
      ];
    }
    if (element.label === 'Ingredients') {
      return this.ingredients.map((ingredient) => ({
        label: ingredient,
      }));
    }
    if (element.label === 'Incantations') {
      return this.incantations.map((incantation) => ({
        label: incantation,
      }));
    }
    if (element.label === 'Recipes') {
      return this.recipes.map((recipe) => ({
        label: recipe.name,
      }));
    }
  }
}
