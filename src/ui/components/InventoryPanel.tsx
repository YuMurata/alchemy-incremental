import React from 'react';
import { useGameStore } from '../hooks/useGameStore';

export const InventoryPanel: React.FC = () => {
  const { state } = useGameStore();
  
  return (
    <div className="inventory-panel" style={{ border: '2px solid red', padding: '10px' }}>
      <h3>所持素材</h3>
      <ul>
        {Object.entries(state.items).map(([name, count]) => (
          <li key={name}>
            {name}: {count} 
            <button onClick={() => console.log(`Selected ${name}`)}>選択</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
