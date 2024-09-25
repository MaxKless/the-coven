import { SpellType, Spell } from '@the-coven/util-interface';

const spells: Spell[] = [
  {
    id: 'levitation',
    name: 'Levitation Charm',
    description: 'Makes objects fly or hover in the air.',
    recipes: [
      {
        id: 'basic-levitation',
        type: SpellType.Enchantment,
        ingredients: ['feather', 'moonstone'],
        incantations: ['Wingardium Leviosa'],
      },
      {
        id: 'advanced-levitation',
        type: SpellType.Enchantment,
        ingredients: ['feather', 'moonstone', 'pixie dust'],
        incantations: ['Wingardium Leviosa', 'Altius Levitas'],
      },
    ],
  },
  {
    id: 'fireball',
    name: 'Fireball',
    description: 'Conjures a powerful ball of fire.',
    recipes: [
      {
        id: 'basic-fireball',
        type: SpellType.Conjuration,
        ingredients: ['sulfur', 'bat wing'],
        incantations: ['Ignis Sphera'],
      },
    ],
  },
];

export const getAllSpells = () => spells;
export const getSpell = (id: string) => spells.find((spell) => spell.id === id);
