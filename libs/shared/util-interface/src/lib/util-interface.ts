export interface Recipe {
  id: string;
  type: SpellType;
  ingredients: string[];
  incantations: string[];
}

export interface Spellcasting {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  ingredients: string[];
  incantations: string[];
  recipes: Recipe[];
}

export enum SpellType {
  Enchantment = 'Enchantment',
  Illusion = 'Illusion',
  Conjuration = 'Conjuration',
  Divination = 'Divination',
  Abjuration = 'Abjuration',
}
