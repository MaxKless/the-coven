export enum SpellType {
  Enchantment = 'Enchantment',
  Illusion = 'Illusion',
  Conjuration = 'Conjuration',
  Divination = 'Divination',
  Abjuration = 'Abjuration',
  Transmutation = 'Transmutation',
}

export interface Recipe {
  id: string;
  name: string;
  type: SpellType;
  description: string;
  ingredients: string[];
  incantations: string[];
}
