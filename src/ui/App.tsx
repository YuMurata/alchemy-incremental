import React from 'react';
import { GameProvider } from './hooks/useGameStore';
import { GameLayout } from './components/GameLayout';
import Mixer from './components/Mixer';

const App: React.FC = () => {
  return (
    <GameProvider>
      <GameLayout
        children={{
          header: <h1>Alchemy Incremental</h1>,
          spiritPanel: <div>精霊レベル: 1</div>,
          main: <Mixer />,
          footer: <div>メニュー</div>,
        }}
      />
    </GameProvider>
  );
};

export default App;
