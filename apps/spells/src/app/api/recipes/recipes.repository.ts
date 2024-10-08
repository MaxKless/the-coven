import { SpellType, Recipe } from '@the-coven/util-interface';

const recipes: Recipe[] = [
  {
    id: 'basic-levitation',
    name: 'Basic Levitation Charm',
    type: SpellType.Enchantment,
    ingredients: ['feather', 'moonstone'],
    incantations: ['Wingardium Leviosa'],
    description: 'Makes objects fly or hover in the air.',
  },
  {
    id: 'advanced-levitation',
    name: 'Advanced Levitation Charm',
    type: SpellType.Enchantment,
    ingredients: ['feather', 'moonstone', 'pixie dust'],
    incantations: ['Wingardium Leviosa', 'Altius Levitas'],
    description: 'Makes objects fly higher and with more control.',
  },
  {
    id: 'basic-fireball',
    name: 'Basic Fireball',
    type: SpellType.Conjuration,
    ingredients: ['sulfur', 'bat wing'],
    incantations: ['Ignis Sphera'],
    description: 'Conjures a powerful ball of fire.',
  },
  {
    id: 'inferno-fireball',
    name: 'Inferno Fireball',
    type: SpellType.Conjuration,
    ingredients: ['sulfur', 'bat wing', 'dragon scale'],
    incantations: ['Ignis Sphera', 'Infernalis Maxima'],
    description: 'Conjures an extremely potent and large fireball.',
  },
  {
    id: 'basic-invisibility',
    name: 'Basic Invisibility Cloak',
    type: SpellType.Illusion,
    ingredients: ['chameleon skin', 'moonlight essence'],
    incantations: ['Occultatum Personae'],
    description: 'Renders the caster invisible to the naked eye.',
  },
  {
    id: 'basic-divination',
    name: 'Basic Crystal Ball Divination',
    type: SpellType.Divination,
    ingredients: ['crystal sphere', 'owl feather'],
    incantations: ['Revelio Futurum'],
    description: 'Reveals glimpses of possible futures.',
  },
  {
    id: 'advanced-divination',
    name: 'Advanced Crystal Ball Divination',
    type: SpellType.Divination,
    ingredients: ['crystal sphere', 'owl feather', 'time sand'],
    incantations: ['Revelio Futurum', 'Tempus Visum'],
    description:
      'Reveals clearer and more detailed visions of possible futures.',
  },
  {
    id: 'basic-shield',
    name: 'Basic Magical Barrier',
    type: SpellType.Abjuration,
    ingredients: ['iron filings', 'unicorn hair'],
    incantations: ['Protego'],
    description: 'Creates a protective shield around the caster.',
  },
  {
    id: 'fortress-shield',
    name: 'Fortress Shield',
    type: SpellType.Abjuration,
    ingredients: ['iron filings', 'unicorn hair', 'dragon heartstring'],
    incantations: ['Protego', 'Fortis Maxima'],
    description: 'Creates an extremely strong and durable protective shield.',
  },
  {
    id: 'basic-polymorph',
    name: 'Basic Shape-Shifting Spell',
    type: SpellType.Transmutation,
    ingredients: ['shapeshifter scales', 'moonberry'],
    incantations: ['Metamorphosis Animalis'],
    description: 'Transforms the caster into an animal form.',
  },
  {
    id: 'basic-mind-reading',
    name: 'Basic Telepathy Charm',
    type: SpellType.Divination,
    ingredients: ['psionite crystal', 'sage leaf'],
    incantations: ['Legilimens'],
    description: 'Allows the caster to read surface thoughts.',
  },
  {
    id: 'fire-elemental',
    name: 'Fire Elemental Conjuration',
    type: SpellType.Conjuration,
    ingredients: ['volcanic ash', 'phoenix feather'],
    incantations: ['Evoco Ignis Elementum'],
    description: 'Summons a minor fire elemental being.',
  },
  {
    id: 'water-elemental',
    name: 'Water Elemental Conjuration',
    type: SpellType.Conjuration,
    ingredients: ['sea salt', 'mermaid scale'],
    incantations: ['Evoco Aqua Elementum'],
    description: 'Summons a minor water elemental being.',
  },
  {
    id: 'basic-time-slow',
    name: 'Basic Temporal Manipulation',
    type: SpellType.Enchantment,
    ingredients: ['hourglass sand', 'chronite crystal'],
    incantations: ['Tempus Tardus'],
    description: 'Slows down time in a localized area.',
  },
  {
    id: 'basic-illusion',
    name: 'Basic Phantasmal Image',
    type: SpellType.Illusion,
    ingredients: ['mirage essence', 'dream silk'],
    incantations: ['Imago Phantasma'],
    description: 'Creates a convincing illusion of an object or creature.',
  },
  {
    id: 'grand-illusion',
    name: 'Grand Phantasmal Image',
    type: SpellType.Illusion,
    ingredients: ['mirage essence', 'dream silk', 'starlight dust'],
    incantations: ['Imago Phantasma', 'Grandis Deceptio'],
    description: 'Creates a highly detailed and interactive illusion.',
  },
];

export const getAllIngredients = () => {
  const ingredients = new Set<string>();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => ingredients.add(ingredient));
  });
  return Array.from(ingredients);
};

export const getAllIncantations = () => {
  const incantations = new Set<string>();
  recipes.forEach((recipe) => {
    recipe.incantations.forEach((incantation) => incantations.add(incantation));
  });
  return Array.from(incantations);
};

export const getAllRecipes = () => recipes;
export const getRecipe = (id: string) =>
  recipes.find((recipe) => recipe.id === id);
