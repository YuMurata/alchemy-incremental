import React from 'react';
import recipes from '../../data/recipe-db.json';
import { useGameStore } from '../hooks/useGameStore';

export const RecipeBook: React.FC = () => {
  const { state } = useGameStore();

  return (
    <div className="recipe-book" style={{ border: '2px solid #555', padding: '15px', borderRadius: '8px' }}>
      <h3>錬金レシピ本</h3>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {recipes
          .filter((recipe: any) => state.unlockedRecipes?.includes(recipe.id))
          .map((recipe: any) => (
            <div key={recipe.id} style={{ borderBottom: '1px solid #333', padding: '5px 0' }}>
              <strong>{recipe.name}</strong>: {recipe.ingredients.map((ing: any) => ing.name).join(' + ')}
            </div>
          ))}
        {(!state.unlockedRecipes || state.unlockedRecipes.length === 0) && <p>未発見のレシピはありません。</p>}
      </div>
    </div>
  );
};
