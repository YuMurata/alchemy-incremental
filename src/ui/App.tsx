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

  const [synthesisMessage, setSynthesisMessage] = useState<string | null>(null);
  const [failedRecipes, setFailedRecipes] = useState<string[][]>([]);

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
      setSynthesisMessage(`${recipe.name} を合成しました！`);
    } else {
      setFailedRecipes(prev => [...prev, [...selectedMaterials]]);
      setSynthesisMessage("合成に失敗しました...");
    }
    
    // 数秒後にメッセージをクリア
    setTimeout(() => setSynthesisMessage(null), 3000);
  };

  const getSynthesisHint = () => {
    return "合成開始ボタンを押すと素材を試せます";
  };

  return (
    <GameLayout
      children={{
        header: <h1>Alchemy Incremental</h1>,
        main: (
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 250px', gap: '20px' }}>
              {/* 左サイド: 素材リスト */}
              <div className="left-panel">
                <QuickMaterialPanel items={state.items} onAddMaterial={addMaterial} />
              </div>
              
              {/* 中央: 釜 + 選択中エリア + アップグレード */}
              <div className="center-area" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ textAlign: 'center', padding: '10px', background: '#332', borderRadius: '5px' }}>
                  {getSynthesisHint()}
                </div>
                <CauldronArea selectedMaterials={selectedMaterials} onSynthesize={synthesize} />
                {synthesisMessage && (
                  <div className="synthesis-message" style={{ textAlign: 'center', color: synthesisMessage.includes('失敗') ? '#ff6666' : '#66ff66' }}>
                    {synthesisMessage}
                  </div>
                )}
                <div className="synthesis-status">
                  <h3>選択中:</h3>
                  {selectedMaterials.map((m, i) => (
                    <span key={i}>
                      {elementNames[m] || m} <button onClick={() => setSelectedMaterials(prev => prev.filter((_, idx) => idx !== i))}>解除</button>
                    </span>
                  ))}
                </div>
                
                <div className="upgrade-panel" style={{ 
                  border: '2px solid #555', 
                  padding: '15px', 
                  borderRadius: '8px',
                  backgroundColor: '#2a1a10',
                  color: '#d4af37'
                }}>
                  <h3>アップグレードエリア</h3>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button onClick={() => {/* タブ切替用 */}}>ホムンクルス</button>
                    <button onClick={() => {/* タブ切替用 */}}>妖精</button>
                    <button onClick={() => {/* タブ切替用 */}}>精霊</button>
                  </div>
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
              </div>

              {/* 右サイド: レシピ本 */}
              <div className="right-panel">
                <button onClick={() => setShowRecipeBook(!showRecipeBook)}>
                  {showRecipeBook ? 'レシピ本を閉じる' : '錬金レシピ本を開く'}
                </button>
                {showRecipeBook && <RecipeBook />}
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
