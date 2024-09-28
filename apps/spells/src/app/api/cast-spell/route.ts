import { NextRequest, NextResponse } from 'next/server';
import { fetchPartyKitServer } from '../../utils/partykit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received spell cast request:', JSON.stringify(body, null, 2));

    // Ensure the spell object is properly structured
    const spellData = {
      type: 'new_spell',
      spell: {
        _name: body.spell.name,
        _type: body.spell.type,
        _ingredients: body.spell.ingredients,
        _incantations: body.spell.incantations,
      },
      passphrase: body.passphrase,
    };

    console.log(
      'Sending request to PartyKit server:',
      JSON.stringify(spellData, null, 2)
    );
    const response = await fetchPartyKitServer('/parties/main/spells', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spellData),
    });

    console.log('PartyKit server response status:', response.status);

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('PartyKit server error:', errorMessage);
      throw new Error(`PartyKit server error: ${errorMessage}`);
    }

    const resultMessage = await response.text();
    console.log('PartyKit server response:', resultMessage);
    return NextResponse.json({ message: resultMessage });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}
