# SpellCasting SDK Documentation

This document outlines the usage and methods available in the SpellCasting SDK.

## Installation

This does not work yet because we have not published it.

```bash
npm install @the-coven/spellcasting-sdk
```

or if you're using Yarn:

```bash
yarn add @the-coven/spellcasting-sdk
```

## Usage

```typescript
import { spellCastingSDK, SpellCastingSDK } from '@your-org/spellcasting-sdk';
```

The SDK exports a default instance `spellCastingSDK` which uses relative URLs. You can also create a new instance with a custom base URL:

```typescript
const customSDK = new SpellCastingSDK('https://api.example.com');
```

## Methods

### getAllRecipes()

Fetches all available recipes.

```typescript
const recipes = await spellCastingSDK.getAllRecipes();
```

### getRecipe(id: string)

Fetches a specific recipe by ID.

```typescript
const recipe = await spellCastingSDK.getRecipe('basic-fireball');
```

### castSpell(spell: Spell, passphrase: string)

Attempts to cast a spell.

```typescript
const spell = spellCastingSDK.createSpellFromRecipe(recipe);
const result = await spellCastingSDK.castSpell(spell, 'your-passphrase');
```

### createSpell(name: string, type: SpellType, ingredients: string[], incantations: string[])

Creates a new Spell object.

```typescript
const customSpell = spellCastingSDK.createSpell(
    'Custom Frost Spell', 
    SpellType.Conjuration, 
    ['ice shard', 'winter wind'], 
    ['Glacius Maxima']
    );
```

### createSpellFromRecipe(recipe: Recipe)

Creates a Spell object from a Recipe.

```typescript
const spell = spellCastingSDK.createSpellFromRecipe(recipe);
```

## Error Handling

All methods that interact with the API can throw errors. It's recommended to use try-catch blocks:

```typescript
try {
  const recipes = await spellCastingSDK.getAllRecipes();
} catch (error) {
  console.error('Failed to fetch recipes:', error);
}
```

## Types

The SDK uses types from the `@the-coven/util-interface` package:

- `Recipe`
- `Spell`
- `SpellType`

Make sure to import these types if you need to use them in your application:

```typescript
import { Recipe, Spell, SpellType } from '@the-coven/util-interface';
```
