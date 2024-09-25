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
      <div className={styles.recipeList}>
        <div className={styles.recipeListContainer}>
          <h2>Recipes</h2>
          <ul className={styles.recipeItemList}>
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                className={`${styles.recipeItem} ${
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

        <div className={styles.selectedRecipeContainer}>
          <h2>Selected Recipe</h2>
          {selectedRecipe ? (
            <div className={styles.recipeDetails}>
              <h3>{selectedRecipe.name}</h3>
              <p>Type: {selectedRecipe.type}</p>
              <p>Ingredients: {selectedRecipe.ingredients.join(', ')}</p>
              <p>Incantations: {selectedRecipe.incantations.join(', ')}</p>
              <p>{selectedRecipe.description}</p>
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
