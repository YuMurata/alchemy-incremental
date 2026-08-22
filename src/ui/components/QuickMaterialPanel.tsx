import React from 'react';

export const QuickMaterialPanel: React.FC<{ 
  onAddMaterial: (name: string) => void,
  items: Record<string, number>
}> = ({ onAddMaterial, items }) => {
  return (
    <div className="quick-material-panel" style={{ 
      gridArea: 'mats',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      padding: '20px',
      backgroundColor: '#333',
      borderRadius: '8px'
    }}>
      {Object.entries(items).map(([name, count]) => (
        <button key={name} onClick={() => onAddMaterial(name)} style={{ padding: '10px' }}>
          {name} ({count})
        </button>
      ))}
    </div>
  );
};
