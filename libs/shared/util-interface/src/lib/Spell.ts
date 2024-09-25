import { Recipe, SpellType } from './util-interface';

export class Spell {
  private ingredients: string[];
  private incantations: string[];
  private name: string;
  private type: SpellType;

  constructor(
    name: string,
    type: SpellType,
    ingredients: string[],
    incantations: string[]
  ) {
    this.ingredients = ingredients;
    this.incantations = incantations;
    this.name = name;
    this.type = type;
  }

  static fromRecipe(recipe: Recipe): Spell {
    return new Spell(
      recipe.name,
      recipe.type,
      recipe.ingredients,
      recipe.incantations
    );
  }

  getName(): string {
    return this.name;
  }

  getType(): SpellType {
    return this.type;
  }

  getIngredients(): string[] {
    return this.ingredients;
  }

  getIncantations(): string[] {
    return this.incantations;
  }
}
