import React from 'react';

export const InventoryPanel: React.FC<{ 
  onAddMaterial: (name: string) => void,
  onRemoveMaterial: (index: number) => void,
  selectedMaterials: string[] 
}> = ({ onAddMaterial, onRemoveMaterial, selectedMaterials }) => {
  
  return (
    <div className="inventory-panel" style={{ border: '2px solid #555', padding: '15px', borderRadius: '8px' }}>
      <h3>所持素材</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>水: 10 <button onClick={() => onAddMaterial('水')}>選択</button></li>
        <li>火: 10 <button onClick={() => onAddMaterial('火')}>選択</button></li>
      </ul>
      
      <h3>選択中の素材</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {selectedMaterials.map((name, index) => (
          <li key={index}>
            {name} 
            <button onClick={() => onRemoveMaterial(index)}>選択解除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
