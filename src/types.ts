// src/types.ts

export interface Material {
  id: string; // m_xxx
  name: string; // 名前を追加
  amount: number;
}

/**
 * レシピの定義 (設計書準拠)
 */
export interface Recipe {
  id: string; // r_xxx_xxx
  name: string; // 名前を追加
  ingredients: Material[];
  output: Material;
  baseTime: number;
  masteryPoint: number;
  required_cauldron_rank?: number; // 釜のランクを追加
}

/**
 * 合成エンジンの出力スキーマ
 */
export interface SynthesisResult {
  success: boolean;
  message: string;
  output?: Material;
  consumedMaterials: Material[];
  timestamp: string;
}
