import React, { useState } from 'react';
import { GameProvider, useGameStore, Action } from './hooks/useGameStore';
import { GameLayout } from './components/GameLayout';
import Mixer from './components/Mixer';
import { CauldronArea } from './components/CauldronArea';
import { QuickMaterialPanel } from './components/QuickMaterialPanel';

import { RecipeBook } from './components/RecipeBook';
import { BuddyPanel } from './components/BuddyPanel';
import recipes from '../data/recipe-db.json';

const AppContent: React.FC = () => {
  const { state, dispatch } = useGameStore() as { state: any, dispatch: React.Dispatch<Action> };
  const [spiritLevel, setSpiritLevel] = useState(1);
  const [homunculusFuel, setHomunculusFuel] = useState(0);
  const [fairyGold, setFairyGold] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const interactWithSpirit = () => {
    setSpiritLevel(prev => prev + 1);
  };

  const interactWithHomunculus = () => {
    setHomunculusFuel(prev => prev + 10);
  };

  const interactWithFairy = () => {
    setFairyGold(prev => prev + 100);
  };
  const [showRecipeBook, setShowRecipeBook] = useState(false);

  const elementNames: Record<string, string> = {
    'e_fire': '火（エレメント）',
    'e_water': '水（エレメント）',
    'e_wind': '風（エレメント）',
    'e_earth': '土（エレメント）',
    'fire': '火',
    'water': '水',
    'wind': '風',
    'earth': '土',
    'steam': '蒸気'
  };

  const addMaterial = (name: string) => {
    setSelectedMaterials(prev => prev.length < 3 ? [...prev, name] : prev);
  };

  const synthesize = () => {
    const recipe = recipes.find(r => {
      const ingredientIds = r.ingredients.map((ing: any) => ing.id);
      return selectedMaterials.length === ingredientIds.length &&
             selectedMaterials.every(m => ingredientIds.includes(m));
    });

    if (recipe) {
      dispatch({ type: 'SYNTHESIZE', payload: { recipeId: recipe.id } });
      setSelectedMaterials([]);
      setFairyGold(prev => prev + 50);
      alert(`${recipe.name} を合成しました！`);
    } else {
      alert("その組み合わせのレシピはありません。");
    }
  };

  return (
    <GameLayout
      children={{
        header: <h1>Alchemy Incremental</h1>,
        spiritPanel: <></>,
        main: (
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 250px', gap: '20px' }}>
            <div className="left-panel">
              <BuddyPanel 
                spiritLevel={spiritLevel} 
                homunculusFuel={homunculusFuel} 
                fairyGold={fairyGold}
                onInteractSpirit={interactWithSpirit}
                onInteractHomunculus={interactWithHomunculus}
                onInteractFairy={interactWithFairy}
              />
              <QuickMaterialPanel items={state.items} onAddMaterial={addMaterial} />
            </div>
            
            <div className="center-area">
              <CauldronArea selectedMaterials={selectedMaterials} onSynthesize={synthesize} />
              <div className="synthesis-status">
                <h3>選択中:</h3>
                {selectedMaterials.map((m, i) => (
                  <span key={i}>
                    {elementNames[m] || m} <button onClick={() => setSelectedMaterials(prev => prev.filter((_, idx) => idx !== i))}>解除</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="right-panel">
              <button onClick={() => setShowRecipeBook(!showRecipeBook)}>
                {showRecipeBook ? 'レシピ本を閉じる' : '錬金レシピ本を開く'}
              </button>
              {showRecipeBook && <RecipeBook />}
            </div>
          </div>
        ),
        footer: <div>メニュー</div>,
      }}
    />
  );
};

const App: React.FC = () => (
  <GameProvider>
    <AppContent />
  </GameProvider>
);

export default App;
