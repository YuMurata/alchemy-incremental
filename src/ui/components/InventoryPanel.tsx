import React, { useState } from 'react';
import { useGameStore } from '../hooks/useGameStore';

export const InventoryPanel: React.FC<{ 
  onToggleMaterial: (name: string) => void, 
  selectedMaterials: string[] 
}> = ({ onToggleMaterial, selectedMaterials }) => {
  const { state } = useGameStore();
  
  return (
    <div className="inventory-panel" style={{ border: '2px solid #555', padding: '15px', borderRadius: '8px' }}>
      <h3>所持素材</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(state.items).map(([name, count]) => {
          const isSelected = selectedMaterials.includes(name);
          return (
            <li key={name} style={{ marginBottom: '8px' }}>
              {name}: {count} 
              <button 
                style={{ marginLeft: '10px', backgroundColor: isSelected ? '#555' : '#eee' }}
                onClick={() => onToggleMaterial(name)}
              >
                {isSelected ? '選択解除' : '選択'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
