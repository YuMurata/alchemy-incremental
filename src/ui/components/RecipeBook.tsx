import React from 'react';
import recipes from '../../data/recipe-db.json';

export const RecipeBook: React.FC = () => {
  return (
    <div className="recipe-book" style={{ border: '2px solid #555', padding: '15px', borderRadius: '8px' }}>
      <h3>錬金レシピ本</h3>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {recipes.map((recipe: any) => (
          <div key={recipe.id} style={{ borderBottom: '1px solid #333', padding: '5px 0' }}>
            <strong>{recipe.name}</strong>: {recipe.ingredients.map((ing: any) => ing.name).join(' + ')}
          </div>
        ))}
      </div>
    </div>
  );
};
