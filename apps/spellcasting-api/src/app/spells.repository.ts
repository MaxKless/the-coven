import { SpellType, Spellcasting } from '@the-coven/util-interface';

const spells: Spellcasting[] = [
  {
    id: 'levitation',
    name: 'Levitation Charm',
    description: 'Makes objects fly or hover in the air.',
    difficulty: 3,
    ingredients: ['feather', 'moonstone'],
    incantations: ['Wingardium Leviosa'],
    recipes: [
      {
        id: 'basic-levitation',
        type: SpellType.Enchantment,
        ingredients: ['feather', 'moonstone'],
        incantations: ['Wingardium Leviosa'],
      },
    ],
  },
  {
    id: 'invisibility',
    name: 'Invisibility Spell',
    description: 'Renders the caster invisible to the naked eye.',
    difficulty: 7,
    ingredients: ['chameleon skin', 'ghost essence'],
    incantations: ['Invisibilis Totalus'],
    recipes: [
      {
        id: 'full-invisibility',
        type: SpellType.Illusion,
        ingredients: ['chameleon skin', 'ghost essence'],
        incantations: ['Invisibilis Totalus'],
      },
    ],
  },
  {
    id: 'fireball',
    name: 'Fireball Conjuration',
    description: 'Summons a powerful ball of fire.',
    difficulty: 5,
    ingredients: ['sulfur', 'dragon scale'],
    incantations: ['Ignis Sphera'],
    recipes: [
      {
        id: 'basic-fireball',
        type: SpellType.Conjuration,
        ingredients: ['sulfur', 'dragon scale'],
        incantations: ['Ignis Sphera'],
      },
    ],
  },
];

export const getAllSpells = () => spells;
export const getSpell = (id: string) => spells.find((spell) => spell.id === id);
