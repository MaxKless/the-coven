import { NextResponse } from 'next/server';
import { Spell } from '@the-coven/util-interface';
import { serverCastSpell } from './spell-cast.function';

export async function POST(request: Request) {
  const { name, type, ingredients, incantations, passphrase } =
    await request.json();

  try {
    const spell = new Spell(name, type, ingredients, incantations);
    const result = await serverCastSpell(spell, passphrase);
    return NextResponse.json({ message: result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid spell data' },
      { status: 400 }
    );
  }
}
