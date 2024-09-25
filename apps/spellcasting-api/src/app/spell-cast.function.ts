import { Spell, SpellType } from '@the-coven/util-interface';

export async function serverCastSpell(
  spell: Spell,
  passphrase: string
): Promise<string> {
  // Validate passphrase
  if (passphrase !== 'abracadabra') {
    throw new Error('Invalid passphrase. Spell casting failed.');
  }

  // Generate result message
  let resultMessage = `${spell.getName()} (${spell.getType()}) cast successfully!\n`;
  resultMessage += `Ingredients used: ${spell.getIngredients().join(', ')}\n`;
  resultMessage += `Incantations used: ${spell.getIncantations().join(', ')}\n`;

  // Add some flavor text based on the spell type
  switch (spell.getType()) {
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
    case SpellType.Transmutation:
      resultMessage += 'The very essence of matter bends to your will.';
      break;
    default:
      resultMessage += "The spell's effects manifest in wondrous ways.";
  }

  // Simulate spell casting delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return resultMessage;
}
