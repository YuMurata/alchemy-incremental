import React from 'react';

// 中央エリア：釜エリア（アニメーション＋合成ボタン）
export const CauldronArea: React.FC<{ selectedMaterials: string[], onSynthesize: () => void }> = ({ selectedMaterials, onSynthesize }) => {
  return (
    <div className="cauldron-area" style={{ 
      gridArea: 'anim',
      border: '4px solid #8b4513', 
      height: '300px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#2a1a10',
      borderRadius: '50% 50% 50% 50% / 20% 20% 80% 80%', // 釜のような形
      color: '#ddd',
      margin: '20px'
    }}>
      <div style={{ marginBottom: '20px' }}>
        {selectedMaterials.length > 0 ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            {selectedMaterials.map((m, i) => {
              const elementNames: Record<string, string> = {
                'fire': '火',
                'water': '水',
                'wind': '風',
                'earth': '土',
                'steam': '蒸気'
              };
              const displayName = elementNames[m] || m;
              return (
                <span key={i} style={{ padding: '8px 15px', background: '#5d3a1a', borderRadius: '50%', border: '1px solid #d4af37' }}>
                  {displayName}
                </span>
              );
            })}
          </div>
        ) : (
          <p>大釜は空です...</p>
        )}
      </div>
      
      {selectedMaterials.length > 0 && (
        <button 
          onClick={onSynthesize}
          style={{ padding: '15px 30px', cursor: 'pointer', backgroundColor: '#d4af37', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          合成開始
        </button>
      )}
    </div>
  );
};
