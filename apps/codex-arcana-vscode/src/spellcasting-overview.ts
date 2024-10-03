import { Recipe, SpellCastingSDK } from '@the-coven/spellcasting-sdk';
import {
  CancellationToken,
  Event,
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from 'vscode';

export class SpellcastingOverviewTreeDataProvider
  implements TreeDataProvider<TreeItem>
{
  ingredients: string[] = [];
  incantations: string[] = [];
  recipes: Recipe[] = [];

  getTreeItem(element: TreeItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  async getChildren(element?: TreeItem | undefined): Promise<TreeItem[]> {
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
        collapsibleState: TreeItemCollapsibleState.None,
      }));
    }
    if (element.label === 'Incantations') {
      return this.incantations.map((incantation) => ({
        label: incantation,
        collapsibleState: TreeItemCollapsibleState.None,
      }));
    }

    if (element.label === 'Recipes') {
      return this.recipes.map((recipe) => ({
        label: recipe.name,
        collapsibleState: TreeItemCollapsibleState.Collapsed,
        contextValue: 'recipe',
      }));
    }

    if (element.contextValue === 'recipe') {
      const recipe = this.recipes.find(
        (recipe) => recipe.name === element.label
      );
      if (!recipe) {
        return [];
      }
      return [
        ...recipe.ingredients.map((ingredient) => ({
          label: ingredient,
          collapsibleState: TreeItemCollapsibleState.None,
          iconPath: new ThemeIcon('bug'),
        })),
        ...recipe.incantations.map((incatation) => ({
          label: incatation,
          collapsibleState: TreeItemCollapsibleState.None,
          iconPath: new ThemeIcon('book'),
        })),
      ] as const;
    }

    return [];
  }
}
