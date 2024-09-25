import express from 'express';
import { getAllSpells, getSpell } from './app/spells.repository';

const app = express();

app.get('/api/spells', (req, res) => {
  res.send(getAllSpells());
});

app.get('/api/spells/:id', (req, res) => {
  const spell = getSpell(req.params.id);
  if (spell) {
    res.send(spell);
  } else {
    res.status(404).send({ message: 'Spell not found' });
  }
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
