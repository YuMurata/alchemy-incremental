import React, { useState } from 'react';
import { useGameStore } from '../hooks/useGameStore';

export const Mixer: React.FC = () => {
  const { state, dispatch } = useGameStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleMix = async () => {
    // 成功・失敗のシミュレーション（あとでバックエンドと結合）
    dispatch({ type: 'SET_UI_STATE', payload: 'Playing' });
    
    // TODO: ここでバックエンド API を叩く (API client 実装後)
    console.log('Mixing items:', selectedItems);
    
    // 一時的な成功演出
    setTimeout(() => {
      dispatch({ type: 'SET_UI_STATE', payload: 'Success' });
      setTimeout(() => dispatch({ type: 'SET_UI_STATE', payload: 'Idle' }), 1000);
    }, 500);
  };

  return (
    <div className="mixer-panel">
      <h2>合成エリア</h2>
      <button 
        className="mix-button"
        onClick={handleMix}
        disabled={state.uiState === 'Playing'}
      >
        合成開始
      </button>
      <div className="status-text">
        現在の状態: {state.uiState}
      </div>
    </div>
  );
};
