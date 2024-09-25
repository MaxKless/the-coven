import { Recipe, Spell } from '@the-coven/util-interface';

export class SpellCaster {
  private spell: Spell;
  private recipe: Recipe;
  private extraIngredients: string[] = [];
  private extraIncantations: string[] = [];

  constructor(spell: Spell, recipeId: string) {
    this.spell = spell;
    const selectedRecipe = spell.recipes.find((r) => r.id === recipeId);
    if (!selectedRecipe) {
      throw new Error('Recipe not found for this spell.');
    }
    this.recipe = selectedRecipe;
  }

  addExtraIngredient(ingredient: string): void {
    this.extraIngredients.push(ingredient);
  }

  addExtraIncantation(incantation: string): void {
    this.extraIncantations.push(incantation);
  }

  cast(passphrase: string): string {
    if (passphrase !== 'abracadabra') {
      throw new Error('Invalid passphrase. Spell casting failed.');
    }

    const allIngredients = [
      ...this.recipe.ingredients,
      ...this.extraIngredients,
    ];
    const allIncantations = [
      ...this.recipe.incantations,
      ...this.extraIncantations,
    ];

    return (
      `${this.spell.name} (${this.recipe.type}) cast successfully!\n` +
      `Recipe Used: ${this.recipe.id}\n` +
      `Ingredients used: ${allIngredients.join(', ')}\n` +
      `Incantations used: ${allIncantations.join(', ')}`
    );
  }
}
