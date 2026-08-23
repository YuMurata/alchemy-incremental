import React from 'react';

export const QuickMaterialPanel: React.FC<{ 
  onAddMaterial: (name: string) => void,
  items: Record<string, number>
}> = ({ onAddMaterial, items }) => {
  // エレメント系は無限（表示しない）
  const infiniteMaterials = ['e_fire', 'e_water', 'e_wind', 'e_earth'];
  const elementNames: Record<string, string> = {
    'e_fire': '火（エレメント）',
    'e_water': '水（エレメント）',
    'e_wind': '風（エレメント）',
    'e_earth': '土（エレメント）',
    'fire': '火',
    'water': '水',
    'wind': '風',
    'earth': '土',
    'steam': '蒸気'
  };

  const translatedItems = {
    ...items,
    'e_fire': 0, // Mock initial
    'e_water': 0,
    'e_wind': 0,
    'e_earth': 0
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
      {Object.entries(translatedItems).map(([name, count]) => {
        const displayName = elementNames[name] || name;
        return (
          <button key={name} onClick={() => onAddMaterial(name)} style={{ padding: '10px' }}>
            {displayName} ({count})
          </button>
        );
      })}
    </div>
  );
};
