import { Recipe, Spell } from '@the-coven/util-interface';

type CastFunction = (
  spellId: string,
  recipeId: string,
  passphrase: string,
  extraIngredients: string[],
  extraIncantations: string[]
) => Promise<string>;

export class SpellCaster {
  private spell: Spell;
  private recipe: Recipe;
  private extraIngredients: string[] = [];
  private extraIncantations: string[] = [];
  private castFunction: CastFunction;

  constructor(spell: Spell, recipeId: string, castFunction: CastFunction) {
    this.spell = spell;
    const selectedRecipe = spell.recipes.find((r) => r.id === recipeId);
    if (!selectedRecipe) {
      throw new Error('Recipe not found for this spell.');
    }
    this.recipe = selectedRecipe;
    this.castFunction = castFunction;
  }

  addExtraIngredient(ingredient: string): void {
    this.extraIngredients.push(ingredient);
  }

  addExtraIncantation(incantation: string): void {
    this.extraIncantations.push(incantation);
  }

  async cast(passphrase: string): Promise<string> {
    return this.castFunction(
      this.spell.id,
      this.recipe.id,
      passphrase,
      this.extraIngredients,
      this.extraIncantations
    );
  }
}
