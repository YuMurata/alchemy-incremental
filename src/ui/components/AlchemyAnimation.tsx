import React from 'react';

const AlchemyAnimation: React.FC<{ selectedMaterials: string[] }> = ({ selectedMaterials }) => {
  return (
    <div className="alchemy-animation-area" style={{ 
      border: '2px solid #555', 
      height: '250px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      color: '#ddd',
      borderRadius: '8px'
    }}>
      <div style={{ marginBottom: '20px' }}>
        {selectedMaterials.length > 0 ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            {selectedMaterials.map((m, i) => (
              <span key={i} style={{ padding: '5px 10px', background: '#333', borderRadius: '4px' }}>
                {m}
              </span>
            ))}
          </div>
        ) : (
          <p>錬金アニメーション (Dot Art Placeholder)</p>
        )}
      </div>
      
      {selectedMaterials.length > 0 && (
        <button 
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#8b4513', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          合成開始
        </button>
      )}
    </div>
  );
};

export default AlchemyAnimation;
