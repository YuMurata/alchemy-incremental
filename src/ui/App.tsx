import React, { useState } from 'react';
import { GameProvider } from './hooks/useGameStore';
import { GameLayout } from './components/GameLayout';
import Mixer from './components/Mixer';
import AlchemyAnimation from './components/AlchemyAnimation';
import { InventoryPanel } from './components/InventoryPanel';

const App: React.FC = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const addMaterial = (name: string) => {
    setSelectedMaterials(prev => [...prev, name]);
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
              <AlchemyAnimation selectedMaterials={selectedMaterials} />
              <InventoryPanel onAddMaterial={addMaterial} onRemoveMaterial={removeMaterial} selectedMaterials={selectedMaterials} />
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
