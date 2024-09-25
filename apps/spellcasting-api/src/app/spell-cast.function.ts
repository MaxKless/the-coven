import { Recipe, Spell, SpellType } from '@the-coven/util-interface';
import { getSpell } from './spells.repository';

export async function serverCastSpell(
  spellId: string,
  recipeId: string,
  passphrase: string,
  extraIngredients: string[],
  extraIncantations: string[]
): Promise<string> {
  // Validate passphrase
  if (passphrase !== 'abracadabra') {
    throw new Error('Invalid passphrase. Spell casting failed.');
  }

  // Fetch spell and recipe details from the database
  const spell: Spell | null = await getSpell(spellId);
  if (!spell) {
    throw new Error(`Spell with id ${spellId} not found.`);
  }

  const recipe: Recipe | null =
    spell.recipes.find((r) => r.id === recipeId) || null;

  // Combine base ingredients/incantations with extras
  const allIngredients = [...recipe.ingredients, ...extraIngredients];
  const allIncantations = [...recipe.incantations, ...extraIncantations];

  // Generate result message
  let resultMessage = `${spell.name} (${recipe.type}) cast successfully!\n`;
  resultMessage += `Recipe Used: ${recipe.id}\n`;
  resultMessage += `Ingredients used: ${allIngredients.join(', ')}\n`;
  resultMessage += `Incantations used: ${allIncantations.join(', ')}\n`;

  // Add some flavor text based on the spell type
  switch (recipe.type) {
    case SpellType.Enchantment:
      resultMessage += 'The air shimmers with magical energy.';
      break;
    case SpellType.Illusion:
      resultMessage += 'Reality seems to waver and shift.';
      break;
    case SpellType.Conjuration:
      resultMessage += 'A swirl of magical forces coalesces.';
      break;
    case SpellType.Divination:
      resultMessage += 'Mystical insights flood your mind.';
      break;
    case SpellType.Abjuration:
      resultMessage += 'A protective aura surrounds you.';
      break;
    default:
      resultMessage += "The spell's effects manifest in wondrous ways.";
  }

  return resultMessage;
}
