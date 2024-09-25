import { Recipe, SpellType } from './util-interface';

export class Spell {
  private _ingredients: string[];
  private _incantations: string[];
  private _name: string;
  private _type: SpellType;

  constructor(
    name: string,
    type: SpellType,
    ingredients: string[] = [],
    incantations: string[] = []
  ) {
    this._ingredients = ingredients;
    this._incantations = incantations;
    this._name = name;
    this._type = type;
  }

  static fromRecipe(recipe: Recipe): Spell {
    return new Spell(
      recipe.name,
      recipe.type,
      recipe.ingredients,
      recipe.incantations
    );
  }

  get name(): string {
    return this._name;
  }

  get type(): SpellType {
    return this._type;
  }

  get ingredients(): string[] {
    return [...this._ingredients];
  }

  get incantations(): string[] {
    return [...this._incantations];
  }

  addIngredient(ingredient: string): void {
    this._ingredients.push(ingredient);
  }

  addIncantation(incantation: string): void {
    this._incantations.push(incantation);
  }

  removeIngredient(ingredient: string): void {
    this._ingredients = this._ingredients.filter((i) => i !== ingredient);
  }

  removeIncantation(incantation: string): void {
    this._incantations = this._incantations.filter((i) => i !== incantation);
  }
}
