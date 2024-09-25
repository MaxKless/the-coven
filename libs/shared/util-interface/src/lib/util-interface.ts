export enum SpellType {
  Enchantment = 'Enchantment',
  Illusion = 'Illusion',
  Conjuration = 'Conjuration',
  Divination = 'Divination',
  Abjuration = 'Abjuration',
}

export interface Recipe {
  id: string;
  type: SpellType;
  ingredients: string[];
  incantations: string[];
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  recipes: Recipe[];
}
