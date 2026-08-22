import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { GameStore, UIState } from '../types';
import recipes from '../../data/recipe-db.json';
import { Simulator } from '../../logic/Simulator';

const engine = new Simulator(recipes as any);

interface Action {
  type: 'SET_UI_STATE' | 'UPDATE_STATE' | 'SYNTHESIZE';
  payload: any;
}

const initialState: GameStore = {
  items: { "水": 10, "火": 10 },
  spirit: { level: 1, exp: 0 },
  uiState: 'Idle',
};

const gameReducer = (state: GameStore, action: Action): GameStore => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return { ...state, uiState: action.payload };
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    case 'SYNTHESIZE': {
      const { recipeId } = action.payload;
      const result = engine.synthesize(recipeId, state.items);
      if (result.success) {
        const newItems = { ...state.items };
        // 素材の消費 (simulatorが返すconsumedMaterialsのみ)
        result.consumedMaterials.forEach(m => {
          if (newItems[m.id] !== undefined) {
            newItems[m.id] -= m.amount;
          }
        });
        // 成果物の追加
        if (result.output) {
          newItems[result.output.id] = (newItems[result.output.id] || 0) + result.output.amount;
        }
        return { ...state, items: newItems, uiState: 'Success' };
      }
      return { ...state, uiState: 'Idle' };
    }
    default:
      return state;
  }
};

const GameContext = createContext<{
  state: GameStore;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export const useGameStore = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameStore must be used within GameProvider');
  return context;
};
