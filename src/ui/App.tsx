import React, { useState } from 'react';
import { GameProvider } from './hooks/useGameStore';
import { GameLayout } from './components/GameLayout';
import Mixer from './components/Mixer';
import AlchemyAnimation from './components/AlchemyAnimation';
import { InventoryPanel } from './components/InventoryPanel';

const App: React.FC = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const toggleMaterial = (name: string) => {
    setSelectedMaterials(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
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
              <InventoryPanel onToggleMaterial={toggleMaterial} selectedMaterials={selectedMaterials} />
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
