'use client';
import React, { useState, useEffect } from 'react';
import { SpellCastingSDK, SpellType } from '@the-coven/spellcasting-sdk';
import { Spell, Recipe } from '@the-coven/spellcasting-sdk';
import Toast from './Toast';
import CustomSpellCreator from './CustomSpellCreator';
import styles from '../styles/App.module.css';
import usePartySocket from 'partysocket/react';

const spellCastingSDK = new SpellCastingSDK(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://the-coven.vercel.app'
);

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? 'localhost:1999';

interface RawSpellData {
  _name: string;
  _type: SpellType;
  _ingredients: string[];
  _incantations: string[];
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [toastData, setToastData] = useState<{
    title: string;
    message: string[];
  } | null>(null);
  const [recentSpells, setRecentSpells] = useState<Spell[]>([]);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: 'spells',
    onMessage(event: MessageEvent) {
      const data = JSON.parse(event.data);
      if (data.type === 'init') {
        setRecentSpells(
          (data.spells as RawSpellData[]).map(
            (spellData) =>
              new Spell(
                spellData._name,
                spellData._type,
                spellData._ingredients,
                spellData._incantations
              )
          )
        );
      } else if (data.type === 'new_spell') {
        console.log('Received message:', data);
        const newSpell = new Spell(
          (data.spell as RawSpellData)._name,
          (data.spell as RawSpellData)._type,
          (data.spell as RawSpellData)._ingredients,
          (data.spell as RawSpellData)._incantations
        );
        console.log('New spell:', newSpell);
        setToastData({
          title: `:🎃: :✨: ${newSpell.name} (${newSpell.type}) cast successfully!`,
          message: [
            `Ingredients used: ${newSpell.ingredients.join(', ')}`,
            `Incantations used: ${newSpell.incantations.join(', ')}`,
          ],
        });
        setRecentSpells((prevSpells) => {
          return [...prevSpells, newSpell].reverse().slice(0, 5);
        });
      }
    },
  });

  useEffect(() => {
    spellCastingSDK
      .getAllRecipes()
      .then((data: Recipe[]) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const castSpell = async () => {
    if (!selectedRecipe) return;

    try {
      const spell = Spell.fromRecipe(selectedRecipe);
      await spellCastingSDK.castSpell(spell, 'abracadabra');
      try {
        await socket.send(JSON.stringify({ type: 'cast_spell', spell }));
      } catch (error) {
        console.error('Error sending spell to PartyKit server:', error);
      }
    } catch (error) {
      setToastData({
        title: ':🧙‍♀️: :🌙: Spell Casting Failed',
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

      <h1 className={styles.title}>
        <span role="img" aria-label="Witch">
          🧙‍♀️
        </span>{' '}
        Magical Recipe Book{' '}
        <span role="img" aria-label="Spell book">
          📖
        </span>
        <span role="img" aria-label="Sparkles">
          ✨
        </span>
      </h1>
      <div className={styles.spellList}>
        <div className={styles.selectedSpellContainer}>
          <h2>
            <span role="img" aria-label="Crescent moon">
              🌙
            </span>{' '}
            Selected Recipe{' '}
            <span role="img" aria-label="Herb">
              🌿
            </span>
          </h2>
          {selectedRecipe ? (
            <div className={styles.spellDetails}>
              <h3>
                <span role="img" aria-label="Evil eye amulet">
                  🧿
                </span>{' '}
                {selectedRecipe.name}
              </h3>
              <p>
                <strong>Type:</strong> {selectedRecipe.type}
              </p>
              <p>
                <strong>Ingredients:</strong>{' '}
                {selectedRecipe.ingredients.join(', ')}
              </p>
              <p>
                <strong>Incantations:</strong>{' '}
                {selectedRecipe.incantations.join(', ')}
              </p>
              <p>
                <strong>Description:</strong> {selectedRecipe.description}
              </p>
              <button className={styles.castButton} onClick={castSpell}>
                <span role="img" aria-label="Candle">
                  🕯️
                </span>{' '}
                Cast Spell from Recipe{' '}
                <span role="img" aria-label="Bat">
                  🦇
                </span>
              </button>
            </div>
          ) : (
            <p>
              <span role="img" aria-label="Crystal ball">
                🔮
              </span>{' '}
              Select a recipe to cast a spell{' '}
              <span role="img" aria-label="Crescent moon">
                ☽
              </span>
            </p>
          )}
        </div>
        <div className={styles.spellListContainer}>
          <h2>
            <span role="img" aria-label="Autumn leaf">
              🍂
            </span>{' '}
            Autumn Recipes{' '}
            <span role="img" aria-label="Maple leaf">
              🍁
            </span>
          </h2>
          <ul className={styles.recipeItemList}>
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                className={`${styles.spellItem} ${
                  selectedRecipe && selectedRecipe.id === recipe.id
                    ? styles.selected
                    : ''
                }`}
              >
                <span role="img" aria-label="Crystal ball">
                  🔮
                </span>{' '}
                {recipe.name}{' '}
                <span role="img" aria-label="Magic wand">
                  🪄
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div className={styles.recentSpells}>
        <h2>Recently Cast Spells</h2>
        <ul>
          {recentSpells.map((spell, index) => (
            <li key={index}>
              {spell.name} ({spell.type})
            </li>
          ))}
        </ul>
      </div> */}

      <CustomSpellCreator setToastData={setToastData} />
    </div>
  );
};

export default App;
