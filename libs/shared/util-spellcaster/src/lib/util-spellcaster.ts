import { Recipe, Spell } from '@the-coven/util-interface';
let _spellCaster: SpellCaster | undefined;

export class SpellCaster {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  async getRecipe(recipeId: string): Promise<Recipe> {
    const response = await fetch(`/api/recipes/${recipeId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    return await response.json();
  }

  async cast(spell: Spell, passphrase: string): Promise<string> {
    const response = await fetch('/api/cast-spell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: spell.name,
        type: spell.type,
        ingredients: spell.ingredients,
        incantations: spell.incantations,
        passphrase,
      }),
    });

    if (!response.ok) {
      throw new Error('Spell casting failed');
    }

    return await response.text();
  }

  static getInstance(): SpellCaster {
    if (!_spellCaster) {
      _spellCaster = new SpellCaster();
    }
    return _spellCaster;
  }
}
