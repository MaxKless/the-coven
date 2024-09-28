// server.ts
import type * as Party from 'partykit/server';
import { Spell, SpellType } from '@the-coven/spellcasting-sdk';

export default class SpellServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`New connection: ${conn.id}`);
    // Send existing spells to the new connection
    const spells = (await this.room.storage.get<Spell[]>('spells')) || [];
    conn.send(JSON.stringify({ type: 'init', spells }));
  }

  async onMessage(message: string, sender: Party.Connection) {
    console.log(`New message: ${message}`);
    const data = JSON.parse(message);
    if (data.type === 'cast_spell') {
      // Get existing spells
      const spells = (await this.room.storage.get<Spell[]>('spells')) || [];
      console.log('Existing spells:', spells);
      // Create a new Spell instance
      const newSpell = new Spell(
        data.spell._name,
        data.spell._type as SpellType,
        data.spell._ingredients,
        data.spell._incantations
      );

      // Add new spell
      const updatedSpells = [...spells, newSpell].reverse().slice(0, 5);

      // Store updated spells
      await this.room.storage.put('spells', updatedSpells);

      // Broadcast the spell to all connections
      this.room.broadcast(
        JSON.stringify({ type: 'new_spell', spell: newSpell }),
        [sender.id]
      );
    }
  }
}
