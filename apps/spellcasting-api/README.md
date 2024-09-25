# SpellCasting API Documentation

This document outlines the endpoints available in the SpellCasting API.

## Base URL

All URLs referenced in the documentation have the following base:

```bash
http://localhost:3000/api
```

## Endpoints

### 1. Get All Recipes

Retrieves a list of all available spell recipes.

- **URL:** `/recipes`
- **Method:** `GET`
- **URL Params:** None
- **Success Response:**

  - **Code:** 200
  - **Content:** Array of Recipe objects

    ```json
    [
      {
        "id": "basic-fireball",
        "name": "Basic Fireball",
        "type": "Conjuration",
        "ingredients": ["sulfur", "bat wing"],
        "incantations": ["Ignis Sphera"],
        "description": "Conjures a powerful ball of fire."
      },
      ...
    ]
    ```

### 2. Get Single Recipe

Retrieves details of a specific recipe.

- **URL:** `/recipes/:id`
- **Method:** `GET`
- **URL Params:**
  - `id=[string]`
- **Success Response:**

  - **Code:** 200
  - **Content:** Recipe object

    ```json
    {
      "id": "basic-fireball",
      "name": "Basic Fireball",
      "type": "Conjuration",
      "ingredients": ["sulfur", "bat wing"],
      "incantations": ["Ignis Sphera"],
      "description": "Conjures a powerful ball of fire."
    }
    ```

- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Recipe not found" }`

### 3. Cast Spell

Attempts to cast a spell based on the provided spell data.

- **URL:** `/cast-spell`
- **Method:** `POST`
- **Data Params:**

  ```json
  {
    "name": "string",
    "type": "string",
    "ingredients": ["string"],
    "incantations": ["string"],
    "passphrase": "string"
  }
  ```

  Where:

  - `name`: The name of the spell
  - `type`: One of "Enchantment", "Illusion", "Conjuration", "Divination", "Abjuration", "Transmutation"
  - `ingredients`: An array of strings, each representing an ingredient
  - `incantations`: An array of strings, each representing an incantation
  - `passphrase`: The secret passphrase for casting the spell

- **Example Request Body:**

  ```json
  {
    "name": "Frost Nova",
    "type": "Conjuration",
    "ingredients": ["ice shard", "winter wind"],
    "incantations": ["Glacius Maxima"],
    "passphrase": "winter is coming"
  }
  ```

- **Success Response:**

  - **Code:** 200
  - **Content:**

    ```json
    {
      "message": "Frost Nova cast successfully! A wave of icy magic spreads outward."
    }
    ```

- **Error Response:**

  - **Code:** 400
  - **Content:**

    ```json
    {
      "error": "Invalid spell type. Must be one of: Enchantment, Illusion, Conjuration, Divination, Abjuration, Transmutation"
    }
    ```

    OR

  - **Code:** 401
  - **Content:**

    ```json
    {
      "error": "Invalid passphrase. Spell casting failed."
    }
    ```

## Data Models

### Recipe

```typescript
{
  id: string;
  name: string;
  type: SpellType;
  ingredients: string[];
  incantations: string[];
  description: string;
}
```

### SpellType

An enum with the following possible values:

- Enchantment
- Illusion
- Conjuration
- Divination
- Abjuration
- Transmutation
