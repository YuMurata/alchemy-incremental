export type UIState = 'Idle' | 'Playing' | 'Success' | 'Failure' | 'Result' | 'Menu';

export interface MixRequest {
  items: string[];
  spiritId: string;
}

export interface MixResponse {
  success: boolean;
  resultItemId?: string;
  spiritExpGain: number;
  updateStrategy: 'replace' | 'patch';
}

export interface GameStatusResponse {
  inventory: { itemId: string; count: number }[];
  spirit: { id: string; level: number; exp: number };
  unlockedRecipes: string[];
}

export interface GameStore {
  items: Record<string, number>;
  spirit: { level: number; exp: number };
  uiState: UIState;
}
