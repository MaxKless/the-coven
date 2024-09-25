import React, { useState, useEffect } from 'react';
import { clientCastSpell } from './spellCasting';
import { Spell } from '@the-coven/util-interface';
import { SpellCaster } from '@the-coven/util-spellcaster';
import Toast from './toast/toast';
import styles from './app.module.css';

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
    <div className={styles.appContainer}>
      {toastData && (
        <Toast
          title={toastData.title}
          message={toastData.message}
          onClose={() => setToastData(null)}
        />
      )}

      <h1 className={styles.title}>Spellcasting App</h1>
      <div className={styles.spellList}>
        <div className={styles.spellListContainer}>
          <h2>Spells</h2>
          <ul
            className={styles.spellItemList}
            style={{ listStyle: 'none', padding: 0 }}
          >
            {spells.map((spell) => (
              <li
                key={spell.id}
                onClick={() => handleSpellClick(spell)}
                className={`${styles.spellItem} ${
                  selectedSpell && selectedSpell.id === spell.id
                    ? styles.selected
                    : ''
                }`}
              >
                {spell.name}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.selectedSpellContainer}>
          <h2>Selected Spell</h2>
          {selectedSpell ? (
            <div className={styles.spellDetails}>
              <h3>{selectedSpell.name}</h3>
              <p>{selectedSpell.description}</p>
              <button className={styles.castButton} onClick={castSpell}>
                Cast Spell
              </button>
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
