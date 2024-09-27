'use client';
import React, { useState, useEffect } from 'react';
import { SpellCastingSDK, type Recipe } from '@the-coven/spellcasting-sdk';
import Toast from './Toast';
import CustomSpellCreator from './CustomSpellCreator';
import styles from '../styles/App.module.css';

// Initialize the SDK with the correct base URL
const spellCastingSDK = new SpellCastingSDK('https://the-coven.vercel.app');

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [toastData, setToastData] = useState<{
    title: string;
    message: string[];
  } | null>(null);

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
      const spell = spellCastingSDK.createSpellFromRecipe(selectedRecipe);
      const result = await spellCastingSDK.castSpell(spell, 'abracadabra');
      const resultLines = result
        .split('\n')
        .filter((line) => line.trim() !== '');

      setToastData({
        title: `:🎃: :✨: ${resultLines[0]}`,
        message: resultLines.slice(1),
      });
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
                {selectedRecipe.name}{' '}
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
      </div>

      <CustomSpellCreator setToastData={setToastData} />
    </div>
  );
};

export default App;
