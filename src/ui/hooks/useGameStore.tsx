import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { GameStore, UIState } from '../types';
// エンジンの初期化 (data/recipe-db.json を直接読み込む)
// テスト時と実行時で recipe-db.json の読み込み結果が異なる場合があるため、
// Simulator が正常にレシピを認識できているか確認する
import recipeData from '../../data/recipe-db.json';
import { Simulator } from '../../logic/Simulator';

const engine = new Simulator(recipeData as any);

export interface Action {
  type: 'SET_UI_STATE' | 'UPDATE_STATE' | 'SYNTHESIZE';
  payload: any;
}

const items: Record<string, number> = { 
  "e_water": Infinity, "e_fire": Infinity, "e_wind": Infinity, "e_earth": Infinity,
  "m_steam": 0
};
// 初期状態の設定（テスト用）
const initialState: GameStore = {
  items: items,
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
      // 合成対象の素材が足りているかチェック
      const recipe = (engine as any).recipes.find((r: any) => r.id === recipeId);
      console.log('Current Items Keys:', Object.keys(state.items));
      console.log('Recipe Required:', recipe ? recipe.ingredients : 'Not found');
      
      const result = engine.synthesize(recipeId, state.items);
      console.log('Synthesize Result for', recipeId, ':', result);
      if (result.success) {
        const newItems = { ...state.items };
        // 消費素材の計算（無限素材は含めない）
        result.consumedMaterials.forEach(m => {
          if (newItems[m.id] !== undefined && newItems[m.id] !== Infinity) {
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
      return { ...state, uiState: 'Failure' };
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
