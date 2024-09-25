import React, { useState, useEffect } from 'react';
import { Recipe } from '@the-coven/util-interface';
import { castSpellFromRecipe } from './spellCasting';
import Toast from './toast/Toast';
import styles from './app.module.css';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [toastData, setToastData] = useState<{
    title: string;
    message: string[];
  } | null>(null);

  useEffect(() => {
    fetch('/api/recipes')
      .then((response) => response.json())
      .then((data: Recipe[]) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const castSpell = async () => {
    if (!selectedRecipe) return;

    try {
      const result = await castSpellFromRecipe(selectedRecipe, 'abracadabra');
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

      <h1 className={styles.title}>Magical Recipe Book</h1>
      <div className={styles.spellList}>
        <div className={styles.spellListContainer}>
          <h2>Recipes</h2>
          <ul>
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
                {recipe.name}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.selectedSpellContainer}>
          <h2>Selected Recipe</h2>
          {selectedRecipe ? (
            <div className={styles.spellDetails}>
              <h3>{selectedRecipe.name}</h3>
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
                Cast Spell from Recipe
              </button>
            </div>
          ) : (
            <p>Select a recipe to cast a spell</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
