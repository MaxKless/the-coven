import React, { useState, useEffect } from 'react';
import { SpellCaster } from '@the-coven/util-spellcaster';
import { clientCastSpell } from './spellCasting';
import { Spell } from '@the-coven/util-interface';

const App: React.FC = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [castResult, setCastResult] = useState<string>('');

  useEffect(() => {
    fetch('/api/spells')
      .then((response) => response.json())
      .then((data: Spell[]) => setSpells(data))
      .catch((error) => console.error('Error fetching spells:', error));
  }, []);

  const handleSpellClick = (spell: Spell) => {
    setSelectedSpell(spell);
  };

  const castSpell = async () => {
    if (!selectedSpell) return;

    try {
      const spellCaster = new SpellCaster(
        selectedSpell,
        selectedSpell.recipes[0].id,
        clientCastSpell
      );
      const result = await spellCaster.cast('abracadabra');
      setCastResult(result);
    } catch (error) {
      setCastResult(
        `Error casting spell: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1>Spellcasting App</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Spells</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {spells.map((spell) => (
              <li
                key={spell.id}
                onClick={() => handleSpellClick(spell)}
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                  border: '1px solid #ccc',
                  marginBottom: '5px',
                  backgroundColor:
                    selectedSpell && selectedSpell.id === spell.id
                      ? '#e0e0e0'
                      : 'transparent',
                }}
              >
                {spell.name}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <h2>Selected Spell</h2>
          {selectedSpell ? (
            <div>
              <h3>{selectedSpell.name}</h3>
              <p>{selectedSpell.description}</p>
              <button onClick={castSpell}>Cast Spell</button>
            </div>
          ) : (
            <p>Select a spell to cast</p>
          )}
        </div>
      </div>

      {castResult && (
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <h3>Spell Casting Result</h3>
          <p>{castResult}</p>
        </div>
      )}
    </div>
  );
};

export default App;
