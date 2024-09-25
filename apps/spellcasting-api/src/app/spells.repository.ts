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
      {
        id: 'inferno-fireball',
        type: SpellType.Conjuration,
        ingredients: ['sulfur', 'bat wing', 'dragon scale'],
        incantations: ['Ignis Sphera', 'Infernalis Maxima'],
      },
    ],
  },
  {
    id: 'invisibility',
    name: 'Invisibility Cloak',
    description: 'Renders the caster invisible to the naked eye.',
    recipes: [
      {
        id: 'basic-invisibility',
        type: SpellType.Illusion,
        ingredients: ['chameleon skin', 'moonlight essence'],
        incantations: ['Occultatum Personae'],
      },
    ],
  },
  {
    id: 'fortune-telling',
    name: 'Crystal Ball Divination',
    description: 'Reveals glimpses of possible futures.',
    recipes: [
      {
        id: 'basic-divination',
        type: SpellType.Divination,
        ingredients: ['crystal sphere', 'owl feather'],
        incantations: ['Revelio Futurum'],
      },
      {
        id: 'advanced-divination',
        type: SpellType.Divination,
        ingredients: ['crystal sphere', 'owl feather', 'time sand'],
        incantations: ['Revelio Futurum', 'Tempus Visum'],
      },
    ],
  },
  {
    id: 'shield-charm',
    name: 'Magical Barrier',
    description: 'Creates a protective shield around the caster.',
    recipes: [
      {
        id: 'basic-shield',
        type: SpellType.Abjuration,
        ingredients: ['iron filings', 'unicorn hair'],
        incantations: ['Protego'],
      },
      {
        id: 'fortress-shield',
        type: SpellType.Abjuration,
        ingredients: ['iron filings', 'unicorn hair', 'dragon heartstring'],
        incantations: ['Protego', 'Fortis Maxima'],
      },
    ],
  },
  {
    id: 'polymorph',
    name: 'Shape-Shifting Spell',
    description: 'Transforms the caster into an animal form.',
    recipes: [
      {
        id: 'basic-polymorph',
        type: SpellType.Transmutation,
        ingredients: ['shapeshifter scales', 'moonberry'],
        incantations: ['Metamorphosis Animalis'],
      },
    ],
  },
  {
    id: 'mind-reading',
    name: 'Telepathy Charm',
    description: 'Allows the caster to read surface thoughts.',
    recipes: [
      {
        id: 'basic-mind-reading',
        type: SpellType.Divination,
        ingredients: ['psionite crystal', 'sage leaf'],
        incantations: ['Legilimens'],
      },
    ],
  },
  {
    id: 'elemental-summoning',
    name: 'Elemental Conjuration',
    description: 'Summons a minor elemental being.',
    recipes: [
      {
        id: 'fire-elemental',
        type: SpellType.Conjuration,
        ingredients: ['volcanic ash', 'phoenix feather'],
        incantations: ['Evoco Ignis Elementum'],
      },
      {
        id: 'water-elemental',
        type: SpellType.Conjuration,
        ingredients: ['sea salt', 'mermaid scale'],
        incantations: ['Evoco Aqua Elementum'],
      },
    ],
  },
  {
    id: 'time-slow',
    name: 'Temporal Manipulation',
    description: 'Slows down time in a localized area.',
    recipes: [
      {
        id: 'basic-time-slow',
        type: SpellType.Enchantment,
        ingredients: ['hourglass sand', 'chronite crystal'],
        incantations: ['Tempus Tardus'],
      },
    ],
  },
  {
    id: 'illusion-creation',
    name: 'Phantasmal Image',
    description: 'Creates a convincing illusion of an object or creature.',
    recipes: [
      {
        id: 'basic-illusion',
        type: SpellType.Illusion,
        ingredients: ['mirage essence', 'dream silk'],
        incantations: ['Imago Phantasma'],
      },
      {
        id: 'grand-illusion',
        type: SpellType.Illusion,
        ingredients: ['mirage essence', 'dream silk', 'starlight dust'],
        incantations: ['Imago Phantasma', 'Grandis Deceptio'],
      },
    ],
  },
];

export const getAllSpells = () => spells;
export const getSpell = (id: string) => spells.find((spell) => spell.id === id);
