export interface Recipe {
  type: SpellType;
  ingredients: string[];
  incantations: string[];
}

export interface Spellcasting {
  ingredients: string[];
  incantations: string[];
  recipes: Recipe[];
}

export enum SpellType {
  Spellcasting = 'Spellcasting',
  Enchantment = 'Enchantment',
  Illusion = 'Illusion',
  Conjuration = 'Conjuration',
  Divination = 'Divination',
  Abjuration = 'Abjuration',
}
