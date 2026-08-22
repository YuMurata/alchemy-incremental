import React, { useState } from 'react';
import { GameProvider } from './hooks/useGameStore';
import { GameLayout } from './components/GameLayout';
import Mixer from './components/Mixer';
import AlchemyAnimation from './components/AlchemyAnimation';
import { InventoryPanel } from './components/InventoryPanel';

const App: React.FC = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const addMaterial = (name: string) => {
    setSelectedMaterials(prev => prev.length < 3 ? [...prev, name] : prev);
  };

  const removeMaterial = (index: number) => {
    setSelectedMaterials(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <GameProvider>
      <GameLayout
        children={{
          header: <h1>Alchemy Incremental</h1>,
          spiritPanel: <div>精霊レベル: 1</div>,
          main: (
            <>
              <AlchemyAnimation />
              <InventoryPanel onAddMaterial={addMaterial} onRemoveMaterial={removeMaterial} selectedMaterials={selectedMaterials} />
              <div className="synthesis-area" style={{ border: '2px solid #555', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                <h3>合成エリア</h3>
                <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                  {selectedMaterials.map((m, i) => (
                    <span key={i} style={{ padding: '5px 10px', background: '#333', borderRadius: '4px' }}>{m}</span>
                  ))}
                </div>
                {selectedMaterials.length > 0 && <button>合成開始</button>}
              </div>
              <Mixer />
            </>
          ),
          footer: <div>メニュー</div>,
        }}
      />
    </GameProvider>
  );
};

export default App;
