import { Recipe, Spell, SpellType } from '@the-coven/util-interface';

export class SpellCastingSDK {
  private baseUrl: string;

  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async getAllRecipes(): Promise<Recipe[]> {
    const response = await fetch(`${this.baseUrl}/api/recipes`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return await response.json();
  }

  async getRecipe(id: string): Promise<Recipe> {
    const response = await fetch(`${this.baseUrl}/api/recipes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    return await response.json();
  }

  async castSpell(spell: Spell, passphrase: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/cast-spell`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: spell.getName(),
        type: spell.getType(),
        ingredients: spell.getIngredients(),
        incantations: spell.getIncantations(),
        passphrase,
      }),
    });

    if (!response.ok) {
      throw new Error('Spell casting failed');
    }

    const result = await response.json();
    return result.message;
  }

  createSpell(
    name: string,
    type: SpellType,
    ingredients: string[],
    incantations: string[]
  ): Spell {
    return new Spell(name, type, ingredients, incantations);
  }

  createSpellFromRecipe(recipe: Recipe): Spell {
    return Spell.fromRecipe(recipe);
  }
}

// Export a singleton instance
export const spellCastingSDK = new SpellCastingSDK();
