import express from 'express';
import { getAllSpells, getSpell } from './app/spells.repository';
import { serverCastSpell } from './app/spell-cast.function';
import { SpellCaster } from '@the-coven/util-spellcaster';

const app = express();
app.use(express.json());

app.get('/api/spells', (req, res) => {
  res.json(getAllSpells());
});

app.get('/api/spells/:id', (req, res) => {
  const spell = getSpell(req.params.id);
  if (spell) {
    res.json(spell);
  } else {
    res.status(404).json({ message: 'Spell not found' });
  }
});

app.post('/api/cast-spell/:id', async (req, res) => {
  const spell = getSpell(req.params.id);
  if (!spell) {
    return res.status(404).json({ message: 'Spell not found' });
  }

  const { recipeId, passphrase, extraIngredients, extraIncantations } =
    req.body;

  try {
    const spellCaster = new SpellCaster(spell, recipeId, serverCastSpell);
    extraIngredients?.forEach((ingredient) =>
      spellCaster.addExtraIngredient(ingredient)
    );
    extraIncantations?.forEach((incantation) =>
      spellCaster.addExtraIncantation(incantation)
    );

    const result = await spellCaster.cast(passphrase);
    res.json({ message: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
