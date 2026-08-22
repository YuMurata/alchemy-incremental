import React from 'react';
import { useGameStore } from '../hooks/useGameStore';

export const Inventory: React.FC = () => {
  const { state } = useGameStore();

  return (
    <div className="inventory-panel">
      <h2>所持素材</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(state.items).map(([name, amount]) => (
          amount > 0 && (
            <li key={name} style={{ margin: '5px 0' }}>
              <strong>{name}</strong>: {amount}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
