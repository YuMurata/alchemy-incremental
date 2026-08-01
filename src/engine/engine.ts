// src/engine.ts
import { SynthesisResult, Recipe } from './types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 合成エンジン
 * 純粋なロジックとして JSON を返す
 */
export class AlchemyEngine {
  private recipes: Recipe[] = [];

  constructor(dbPath: string = '/app/data/recipe-db.json') {
    this.loadRecipes(dbPath);
  }

  private loadRecipes(dbPath: string): void {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      this.recipes = JSON.parse(data);
    } catch (e) {
      console.error(`Failed to load recipe DB: ${dbPath}`, e);
      this.recipes = [];
    }
  }

  synthesize(recipeId: string, inventory: Record<string, number>): SynthesisResult {
    const recipe = this.recipes.find(r => r.id === recipeId);


    if (!recipe) {
      return {
        success: false,
        message: "レシピが見つかりません。",
        consumedMaterials: [],
        timestamp: new Date().toISOString()
      };
    }

    // 素材チェック
    const ingredientCount = recipe.ingredients.reduce((sum, ing) => sum + ing.amount, 0);
    if (ingredientCount < 2 || ingredientCount > 3) {
      return {
        success: false,
        message: `合成には必ず2つか3つの素材が必要です: 使用数 ${ingredientCount}`,
        consumedMaterials: [],
        timestamp: new Date().toISOString()
      };
    }

    for (const ing of recipe.ingredients) {
      if ((inventory[ing.id] || 0) < ing.amount) {
        return {
          success: false,
          message: `素材が足りません: ${ing.id}`,
          consumedMaterials: [],
          timestamp: new Date().toISOString()
        };
      }
    }

    // 合成実行
    return {
      success: true,
      message: "合成に成功しました！",
      output: recipe.output,
      consumedMaterials: recipe.ingredients,
      timestamp: new Date().toISOString()
    };
  }

  // 再創世の実行
  resetUniverse(inventory: Record<string, number>): { crystals: number } {
    // 結晶の獲得量計算 (すべての素材の amount 合計 * 0.01)
    const totalValue = Object.values(inventory).reduce((sum, val) => sum + val, 0);
    const crystals = Math.floor(totalValue * 0.01);
    return { crystals };
  }
}
