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
  const [showPurchased, setShowPurchased] = useState(false);
  const [upgrades, setUpgrades] = useState([
    { id: 'auto_synthesizer', name: '自動合成機', effect: '自動で合成を行う', cost: 100, purchased: false },
    { id: 'spirit_boost', name: '精霊の加護', effect: '精霊Lvアップ効率2倍', cost: 500, purchased: false }
  ]);

  const purchaseUpgrade = (id: string) => {
    const upgrade = upgrades.find(u => u.id === id);
    if (upgrade && fairyGold >= upgrade.cost) {
      setFairyGold(prev => prev - upgrade.cost);
      setUpgrades(prev => prev.map(u => u.id === id ? { ...u, purchased: true } : u));
    } else {
      alert("ゴールドが足りません！");
    }
  };

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
      console.warn("レシピ合成失敗: 合致するレシピがありません。");
    }
  };

  return (
    <GameLayout
      children={{
        header: <h1>Alchemy Incremental</h1>,
        main: (
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
              <div className="left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <QuickMaterialPanel items={state.items} onAddMaterial={addMaterial} />
                <div className="upgrade-panel" style={{ 
                  border: '2px solid #555', 
                  padding: '15px', 
                  borderRadius: '8px',
                  backgroundColor: '#2a1a10',
                  color: '#d4af37'
                }}>
                  <h3>アップグレードエリア</h3>
                  <label>
                    <input type="checkbox" checked={showPurchased} onChange={() => setShowPurchased(!showPurchased)} />
                    購入済みを表示
                  </label>
                  <div className="upgrade-list" style={{ marginTop: '10px' }}>
                    {upgrades
                      .filter(u => showPurchased || !u.purchased)
                      .map(u => (
                        <div key={u.id} className="upgrade-item" style={{ borderTop: '1px solid #555', paddingTop: '5px' }}>
                          <p><strong>{u.name}</strong> {u.purchased && '(購入済み)'}</p>
                          <p>効果: {u.effect}</p>
                          {!u.purchased && (
                            <button onClick={() => purchaseUpgrade(u.id)}>コスト: {u.cost}ゴールド</button>
                          )}
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className="upgrade-panel" style={{ 
                  border: '2px solid #555', 
                  padding: '15px', 
                  borderRadius: '8px',
                  backgroundColor: '#2a1a10',
                  color: '#d4af37'
                }}>
                  <h3>錬金の相棒エリア（アップグレードエリア）</h3>
                  <BuddyPanel 
                    spiritLevel={spiritLevel} 
                    homunculusFuel={homunculusFuel} 
                    fairyGold={fairyGold}
                    onInteractSpirit={interactWithSpirit}
                    onInteractHomunculus={interactWithHomunculus}
                    onInteractFairy={interactWithFairy}
                  />
                </div>
              </div>
              
              <div className="center-area" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <CauldronArea selectedMaterials={selectedMaterials} onSynthesize={synthesize} />
                <div className="synthesis-status">
                  <h3>選択中:</h3>
                  {selectedMaterials.map((m, i) => (
                    <span key={i}>
                      {elementNames[m] || m} <button onClick={() => setSelectedMaterials(prev => prev.filter((_, idx) => idx !== i))}>解除</button>
                    </span>
                  ))}
                </div>
                <div className="right-panel">
                  <button onClick={() => setShowRecipeBook(!showRecipeBook)}>
                    {showRecipeBook ? 'レシピ本を閉じる' : '錬金レシピ本を開く'}
                  </button>
                  {showRecipeBook && <RecipeBook />}
                </div>
              </div>
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
