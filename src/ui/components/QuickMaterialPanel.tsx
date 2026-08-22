import React from 'react';

export const QuickMaterialPanel: React.FC<{ 
  onAddMaterial: (name: string) => void,
  items: Record<string, number>
}> = ({ onAddMaterial, items }) => {
  const infiniteMaterials = ['fire', 'water', 'wind', 'earth'];
  const elementNames: Record<string, string> = {
    'fire': '火',
    'water': '水',
    'wind': '風',
    'earth': '土'
  };

  return (
    <div className="quick-material-panel" style={{ 
      gridArea: 'mats',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '20px',
      backgroundColor: '#333',
      borderRadius: '8px'
    }}>
      <h3>素材リスト</h3>
      {Object.entries(items).map(([name, count]) => {
        const isInfinite = infiniteMaterials.includes(name);
        const displayName = elementNames[name] || name;
        return (
          <button key={name} onClick={() => onAddMaterial(name)} style={{ padding: '10px' }}>
            {displayName} {isInfinite ? '' : `(${count})`}
          </button>
        );
      })}
    </div>
  );
};
