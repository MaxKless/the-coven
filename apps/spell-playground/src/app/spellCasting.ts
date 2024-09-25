export async function clientCastSpell(
  spellId: string,
  recipeId: string,
  passphrase: string,
  extraIngredients: string[],
  extraIncantations: string[]
): Promise<string> {
  const response = await fetch(`/api/cast-spell/${spellId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipeId,
      passphrase,
      extraIngredients,
      extraIncantations,
    }),
  });

  if (!response.ok) {
    throw new Error('Spell casting failed');
  }

  const result = await response.json();
  return result.message;
}
