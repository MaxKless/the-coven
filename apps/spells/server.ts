import type * as Party from 'partykit/server';
import { Spell, SpellType } from '@the-coven/util-interface';

interface SpellCastRequest {
  type: 'new_spell';
  spell: {
    _name: string;
    _type: SpellType;
    _ingredients: string[];
    _incantations: string[];
  };
  passphrase: string;
}

function isSpellCastRequest(body: unknown): body is SpellCastRequest {
  if (typeof body !== 'object' || body === null) {
    return false;
  }

  const candidate = body as Partial<SpellCastRequest>;

  if (
    candidate.type !== 'new_spell' ||
    typeof candidate.passphrase !== 'string'
  ) {
    return false;
  }

  if (typeof candidate.spell !== 'object' || candidate.spell === null) {
    return false;
  }

  const spell = candidate.spell as Partial<SpellCastRequest['spell']>;

  return (
    typeof spell._name === 'string' &&
    Object.values(SpellType).includes(spell._type as SpellType) &&
    Array.isArray(spell._ingredients) &&
    spell._ingredients.every((i) => typeof i === 'string') &&
    Array.isArray(spell._incantations) &&
    spell._incantations.every((i) => typeof i === 'string')
  );
}

export default class SpellServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  async onRequest(req: Party.Request) {
    console.log(`Received ${req.method} request to ${req.url}`);

    if (req.method === 'POST') {
      try {
        const body: unknown = await req.json();
        console.log('Received body:', JSON.stringify(body, null, 2));

        if (!isSpellCastRequest(body)) {
          console.error('Invalid request body:', body);
          return new Response('Invalid request body', { status: 400 });
        }

        const { spell, passphrase } = body;

        if (passphrase !== 'abracadabra') {
          return new Response('Invalid passphrase', { status: 403 });
        }

        const resultMessage = `Spell "${spell._name}" cast successfully!`;
        console.log('Spell cast result:', resultMessage);

        this.room.broadcast(
          JSON.stringify({
            type: 'new_spell',
            spell,
            resultMessage,
          })
        );
        return new Response(resultMessage, { status: 200 });
      } catch (error) {
        console.error('Error in onRequest:', error);
        return new Response(
          error instanceof Error ? error.message : 'An unknown error occurred',
          { status: 400 }
        );
      }
    }
    return new Response('Method not allowed', { status: 405 });
  }

  async onMessage(message: string, sender: Party.Connection) {
    console.log('Received message from client:', message);
  }
}

SpellServer satisfies Party.Worker;
