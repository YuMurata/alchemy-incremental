import React, { createContext, useContext, useReducer } from 'react';
import { GameStore, UIState } from '../types';

interface Action {
  type: 'SET_UI_STATE' | 'UPDATE_STATE';
  payload: any;
}

const initialState: GameStore = {
  items: {},
  spirit: { level: 1, exp: 0 },
  uiState: 'Idle',
};

const gameReducer = (state: GameStore, action: Action): GameStore => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return { ...state, uiState: action.payload };
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
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
