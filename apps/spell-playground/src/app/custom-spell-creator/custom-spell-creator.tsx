import React, { useState } from 'react';
import { SpellType } from '@the-coven/util-interface';
import { castCustomSpell } from '../spellCasting';
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
      const result = await castCustomSpell(
        name,
        type,
        ingredients.split(',').map((i) => i.trim()),
        incantations.split(',').map((i) => i.trim()),
        'abracadabra'
      );

      // Parse the result string into an array of lines
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
      <h2>Create Custom Spell</h2>
      <input
        type="text"
        placeholder="Spell Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as SpellType)}
      >
        {Object.values(SpellType).map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <input
        type="text"
        placeholder="Incantations (comma-separated)"
        value={incantations}
        onChange={(e) => setIncantations(e.target.value)}
      />
      <button onClick={handleCastCustomSpell}>Cast Custom Spell</button>
    </div>
  );
};

export default CustomSpellCreator;
