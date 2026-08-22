import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { GameStore, UIState } from '../types';
import recipes from '../../data/recipe-db.json';
import { Simulator } from '../../logic/Simulator';

const engine = new Simulator(recipes as any);

export interface Action {
  type: 'SET_UI_STATE' | 'UPDATE_STATE' | 'SYNTHESIZE';
  payload: any;
}

// 初期状態の設定（テスト用）
const initialState: GameStore = {
  items: { "m_water": 999, "m_fire": 999, "m_wind": 999, "m_earth": 999, "water": 999, "fire": 999 },
  spirit: { level: 1, exp: 0 },
  uiState: 'Idle',
  unlockedRecipes: [],
};

const gameReducer = (state: GameStore, action: Action): GameStore => {
  switch (action.type) {
    case 'SET_UI_STATE':
      return { ...state, uiState: action.payload };
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    case 'SYNTHESIZE': {
      const { recipeId } = action.payload;
      // デバッグ用: ロードされている全レシピのIDを出力
      console.log('Available Recipe IDs:', (engine as any).recipes.map((r: any) => r.id));
      const result = engine.synthesize(recipeId, state.items);
      console.log('Synthesize Result for', recipeId, ':', result);
      if (result.success) {
        const newItems = { ...state.items };
        // 消費素材の計算（無限素材は含めない）
        result.consumedMaterials.forEach(m => {
          if (newItems[m.id] !== undefined) {
            newItems[m.id] -= m.amount;
          }
        });
        // 成果物の追加
        if (result.output) {
          newItems[result.output.id] = (newItems[result.output.id] || 0) + result.output.amount;
        }
        
        // レシピアンロック
        const updatedUnlocked = state.unlockedRecipes.includes(recipeId) 
          ? state.unlockedRecipes 
          : [...state.unlockedRecipes, recipeId];

        return { ...state, items: newItems, uiState: 'Success', unlockedRecipes: updatedUnlocked };
      }
      return { ...state, uiState: 'Fail' };
    }
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
