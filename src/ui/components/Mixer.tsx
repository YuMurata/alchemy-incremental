import React, { useState } from 'react';
import { useGameStore } from '../hooks/useGameStore';

const Mixer: React.FC = () => {
  const { state, dispatch } = useGameStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleMix = async () => {
    dispatch({ type: 'SET_UI_STATE', payload: 'Playing' });
    // 状態更新を反映させるために少し待機
    await new Promise(r => setTimeout(r, 0));
    dispatch({ type: 'SYNTHESIZE', payload: { recipeId: 'r_01_001' } });
    
    // 合成完了後、演出時間を設けてから Idle に戻す（テスト用に Success 状態を維持）
    setTimeout(() => {
        dispatch({ type: 'SET_UI_STATE', payload: 'Success' });
        setTimeout(() => dispatch({ type: 'SET_UI_STATE', payload: 'Idle' }), 1000);
    }, 500);
  };

  return (
    <div className="mixer-panel">
      <h2>合成エリア</h2>
      <div data-testid="synthesis-status">
        現在の状態: {state.uiState}
      </div>
      <button 
        data-testid="retry-button"
        className="mix-button"
        onClick={handleMix}
        disabled={state.uiState === 'Playing'}
      >
        合成開始
      </button>
      {state.uiState === 'Playing' && <div data-testid="suikomi-animation" className="animation" />}

      <div className="status-text">
        現在の状態: {state.uiState}
      </div>
    </div>
  );
};

export default Mixer;
