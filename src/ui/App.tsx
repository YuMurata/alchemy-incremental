import React, { useState } from 'react';
import { GameProvider, useGameStore } from './hooks/useGameStore';
import { GameLayout } from './components/GameLayout';
import Mixer from './components/Mixer';
import { CauldronArea } from './components/CauldronArea';
import { QuickMaterialPanel } from './components/QuickMaterialPanel';

import { RecipeBook } from './components/RecipeBook';
import { BuddyPanel } from './components/BuddyPanel';

const AppContent: React.FC = () => {
  const { state } = useGameStore();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showRecipeBook, setShowRecipeBook] = useState(false);

  const addMaterial = (name: string) => {
    setSelectedMaterials(prev => prev.length < 3 ? [...prev, name] : prev);
  };

  const synthesize = () => {
    console.log('合成実行:', selectedMaterials);
    // TODO: ここに合成ロジック(dispatch)を繋ぐ
    setSelectedMaterials([]);
  };

  return (
    <GameLayout
      children={{
        header: <h1>Alchemy Incremental</h1>,
        spiritPanel: <div>精霊レベル: 1</div>,
        main: (
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 250px', gap: '20px' }}>
            <div className="left-panel">
              <BuddyPanel />
              <QuickMaterialPanel items={state.items} onAddMaterial={addMaterial} />
            </div>
            
            <div className="center-area">
              <CauldronArea selectedMaterials={selectedMaterials} onSynthesize={synthesize} />
              <div className="synthesis-status">
                <h3>選択中:</h3>
                {selectedMaterials.map((m, i) => (
                  <span key={i}>
                    {m} <button onClick={() => setSelectedMaterials(prev => prev.filter((_, idx) => idx !== i))}>解除</button>
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
