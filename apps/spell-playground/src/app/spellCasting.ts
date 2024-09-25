import { Recipe, SpellType } from '@the-coven/util-interface';

export async function clientCastSpell(
  spellData: {
    name: string;
    type: SpellType;
    ingredients: string[];
    incantations: string[];
  },
  passphrase: string
): Promise<string> {
  const response = await fetch('/api/cast-spell', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...spellData,
      passphrase,
    }),
  });

  if (!response.ok) {
    throw new Error('Spell casting failed');
  }

  const result = await response.json();
  return result.message;
}

// Helper function to cast spell from a recipe
export async function castSpellFromRecipe(
  recipe: Recipe,
  passphrase: string
): Promise<string> {
  return clientCastSpell(
    {
      name: recipe.name,
      type: recipe.type,
      ingredients: recipe.ingredients,
      incantations: recipe.incantations,
    },
    passphrase
  );
}

// Helper function to cast a custom spell
export async function castCustomSpell(
  name: string,
  type: SpellType,
  ingredients: string[],
  incantations: string[],
  passphrase: string
): Promise<string> {
  return clientCastSpell({ name, type, ingredients, incantations }, passphrase);
}
