import React, { useState } from 'react';
import { SpellType } from '@the-coven/util-interface';
import { spellCastingSDK } from '@the-coven/spellcasting-sdk';
import styles from '../app.module.css';

interface CustomSpellCreatorProps {
  setToastData: (data: { title: string; message: string[] } | null) => void;
}

const CustomSpellCreator: React.FC<CustomSpellCreatorProps> = ({
  setToastData,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<SpellType>(SpellType.Enchantment);
  const [ingredients, setIngredients] = useState('');
  const [incantations, setIncantations] = useState('');

  const handleCastCustomSpell = async () => {
    try {
      const customSpell = spellCastingSDK.createSpell(
        name,
        type,
        ingredients.split(',').map((i) => i.trim()),
        incantations.split(',').map((i) => i.trim())
      );
      const result = await spellCastingSDK.castSpell(
        customSpell,
        'abracadabra'
      );

      const resultLines = result
        .split('\n')
        .filter((line) => line.trim() !== '');

      setToastData({
        title: 'Custom Spell Cast',
        message: resultLines,
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
    <div className={styles.customSpellCreator}>
      <h2>
        <span role="img" aria-label="Candle">
          🕯️
        </span>{' '}
        Create Custom Spell{' '}
        <span role="img" aria-label="Spider web">
          🕸️
        </span>
      </h2>
      <input
        type="text"
        placeholder="Spell Name"
        aria-label="Spell Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as SpellType)}
        aria-label="Spell Type"
      >
        {Object.values(SpellType).map((t) => (
          <option key={t} value={t}>
            <span role="img" aria-label="Magic wand">
              🪄
            </span>{' '}
            {t}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Ingredients (comma-separated)"
        aria-label="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <input
        type="text"
        placeholder="Incantations (comma-separated)"
        aria-label="Incantations"
        value={incantations}
        onChange={(e) => setIncantations(e.target.value)}
      />
      <button onClick={handleCastCustomSpell}>
        <span role="img" aria-label="Crescent moon">
          🌙
        </span>{' '}
        Cast Custom Spell{' '}
        <span role="img" aria-label="Black cat">
          🐈‍⬛
        </span>
      </button>
    </div>
  );
};

export default CustomSpellCreator;
