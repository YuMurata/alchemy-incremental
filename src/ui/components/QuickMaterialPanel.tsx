import React from 'react';

export const QuickMaterialPanel: React.FC<{ 
  onAddMaterial: (name: string) => void,
  items: Record<string, number>
}> = ({ onAddMaterial, items }) => {
  // エレメント系は無限（表示しない）
  const infiniteMaterials = ['fire_el', 'water_el', 'wind_el', 'earth_el'];
  
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
        return (
          <button key={name} onClick={() => onAddMaterial(name)} style={{ padding: '10px' }}>
            {name} {isInfinite ? '' : `(${count})`}
          </button>
        );
      })}
    </div>
  );
};
