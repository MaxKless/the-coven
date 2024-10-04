import {
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from 'vscode';
import { Recipe, SpellCastingSDK } from '@the-coven/spellcasting-sdk';

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
      const spellcastinSdk = new SpellCastingSDK(
        'https://the-coven.vercel.app'
      );
      this.ingredients = await spellcastinSdk.getAllIngredients();
      this.incantations = await spellcastinSdk.getAllIncantations();
      this.recipes = await spellcastinSdk.getAllRecipes();
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
      const recipe = this.recipes.find((r) => r.name === element.label);
      if (!recipe) {
        return [];
      }

      return [
        ...recipe.ingredients.map((ingredient) => ({
          label: ingredient,
          collapsibleState: TreeItemCollapsibleState.None,
          iconPath: new ThemeIcon('bug'),
        })),
        ...recipe.incantations.map((ingredient) => ({
          label: ingredient,
          collapsibleState: TreeItemCollapsibleState.None,
          iconPath: new ThemeIcon('book'),
        })),
      ];
    }

    return [];
  }
}
