import React, { useState, useEffect } from 'react';
import { clientCastSpell } from './spellCasting';
import { Spell } from '@the-coven/util-interface';
import { SpellCaster } from '@the-coven/util-spellcaster';
import Toast from './toast/toast';

const App: React.FC = () => {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [toastData, setToastData] = useState<{
    title: string;
    message: string[];
  } | null>(null);

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

      // Parse the result string into an array of lines
      const resultLines = result
        .split('\n')
        .filter((line) => line.trim() !== '');

      setToastData({
        title: resultLines[0],
        message: resultLines.slice(1),
      });
    } catch (error) {
      setToastData({
        title: 'Spell Casting Failed',
        message: [
          `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ],
      });
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
      {toastData && (
        <Toast
          title={toastData.title}
          message={toastData.message}
          onClose={() => setToastData(null)}
        />
      )}

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
    </div>
  );
};

export default App;
