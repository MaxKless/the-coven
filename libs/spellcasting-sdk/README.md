# SpellCasting SDK

The SpellCasting SDK is a TypeScript library that provides an easy-to-use interface for interacting with a magical API. It allows users to manage spells, recipes, ingredients, and incantations.

## Table of Contents

- [SpellCasting SDK](#spellcasting-sdk)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Reference](#api-reference)
    - [`SpellCastingSDK`](#spellcastingsdk)
      - [Methods](#methods)
    - [`Spell`](#spell)
      - [Properties](#properties)
      - [Methods](#methods-1)
    - [Exported Types and Classes](#exported-types-and-classes)
  - [Examples](#examples)

## Installation

To install the SpellCasting SDK, use npm:

```bash
npm install @the-coven/spellcasting-sdk
```

## Usage

Import the SDK and related types in your TypeScript file:

```typescript
import { SpellCastingSDK, spellCastingSDK, Recipe, Spell, SpellType } from '@the-coven/spellcasting-sdk';
```

You can use the pre-configured `spellCastingSDK` instance with relative paths, or create a new instance with a custom base URL:

```typescript
const customSDK = new SpellCastingSDK('https://the-coven.vercel.app');
```

## API Reference

### `SpellCastingSDK`

The main class that provides methods for interacting with the SpellCasting API.

#### Methods

- `getAllIngredients(): Promise<string[]>`

  - Fetches all available ingredients.

- `getAllIncantations(): Promise<string[]>`

  - Fetches all available incantations.

- `getAllRecipes(): Promise<Recipe[]>`

  - Fetches all available spell recipes.

- `getRecipe(id: string): Promise<Recipe>`

  - Fetches a specific recipe by ID.

- `castSpell(spell: Spell, passphrase: string): Promise<string>`

  - Casts a spell and returns the result.

- `createSpell(name: string, type: SpellType, ingredients: string[], incantations: string[]): Spell`

  - Creates a new Spell instance.

- `createSpellFromRecipe(recipe: Recipe): Spell`
  - Creates a new Spell instance from a Recipe.

### `Spell`

A class representing a magical spell.

#### Properties

- `name: string`
- `type: SpellType`
- `ingredients: string[]`
- `incantations: string[]`

#### Methods

- `addIngredient(ingredient: string): void`
- `addIncantation(incantation: string): void`
- `removeIngredient(ingredient: string): void`
- `removeIncantation(incantation: string): void`

### Exported Types and Classes

The following types and classes are exported from this SDK for convenience:

- `Recipe`: An interface representing a spell recipe.
- `Spell`: A class representing a magical spell.
- `SpellType`: An enum of different spell types.

These can be imported directly from the SDK:

```typescript
import { Recipe, Spell, SpellType } from '@the-coven/spellcasting-sdk';
```

## Examples

Here are some examples of how to use the SpellCasting SDK:

```typescript
import { SpellCastingSDK, spellCastingSDK, SpellType, Spell, Recipe } from '@the-coven/spellcasting-sdk';

// Using the pre-configured SDK
const ingredients = await spellCastingSDK.getAllIngredients();
console.log('Available ingredients:', ingredients);

// Creating and casting a spell
const newSpell = spellCastingSDK.createSpell('Levitation', SpellType.Enchantment, ['feather', 'pixie dust'], ['Wingardium Leviosa']);

const result = await spellCastingSDK.castSpell(newSpell, 'magic_passphrase');
console.log('Spell result:', result);

// Fetching and using a recipe
const recipes = await spellCastingSDK.getAllRecipes();
const firstRecipe = recipes[0];
const recipeSpell = spellCastingSDK.createSpellFromRecipe(firstRecipe);

console.log('Spell from recipe:', recipeSpell);

// Using the Spell class directly
const customSpell = new Spell('Invisibility', SpellType.Illusion);
customSpell.addIngredient('invisible ink');
customSpell.addIncantation('Disappearo!');

console.log('Custom spell:', customSpell);
```
