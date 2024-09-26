import express from 'express';

import { Spell } from '@the-coven/util-interface';
import { serverCastSpell } from './app/spell-cast.function';
import {
  getAllIncantations,
  getAllIngredients,
  getAllRecipes,
  getRecipe,
} from './app/recipes.repository';

const app = express();
app.use(express.json());

app.get('/api/recipes', (req, res) => {
  const recipes = getAllRecipes();
  res.json(recipes);
});

app.get('/api/ingredients', (req, res) => {
  const ingredients = getAllIngredients();
  res.json(ingredients);
});

app.get('/api/incantations', (req, res) => {
  const incantations = getAllIncantations();
  res.json(incantations);
});

app.get('/api/recipes/:id', (req, res) => {
  const recipe = getRecipe(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

app.post('/api/cast-spell', (req, res) => {
  const { name, type, ingredients, incantations, passphrase } = req.body;

  try {
    const spell = new Spell(name, type, ingredients, incantations);
    serverCastSpell(spell, passphrase)
      .then((result) => {
        res.json({ message: result });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Invalid spell data',
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
