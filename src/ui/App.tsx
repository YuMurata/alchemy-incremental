import React, { useState } from 'react';
import { GameProvider, useGameStore } from './hooks/useGameStore';
import { GameLayout } from './components/GameLayout';
import Mixer from './components/Mixer';
import { CauldronArea } from './components/CauldronArea';
import { QuickMaterialPanel } from './components/QuickMaterialPanel';

const AppContent: React.FC = () => {
  const { state } = useGameStore();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const addMaterial = (name: string) => {
    setSelectedMaterials(prev => prev.length < 3 ? [...prev, name] : prev);
  };

  const synthesize = () => {
    console.log('合成実行:', selectedMaterials);
    setSelectedMaterials([]);
  };

  return (
    <GameLayout
      children={{
        header: <h1>Alchemy Incremental</h1>,
        spiritPanel: <div>精霊レベル: 1</div>,
        main: (
          <div style={{ display: 'grid', gridTemplateAreas: '"anim" "mats"', gap: '20px' }}>
            <CauldronArea selectedMaterials={selectedMaterials} onSynthesize={synthesize} />
            <QuickMaterialPanel items={state.items} onAddMaterial={addMaterial} />
            <div className="synthesis-status">
              <h3>選択中:</h3>
              {selectedMaterials.map((m, i) => (
                <span key={i}>
                  {m} <button onClick={() => setSelectedMaterials(prev => prev.filter((_, idx) => idx !== i))}>解除</button>
                </span>
              ))}
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
