import { SynthesisResult, Recipe } from '../types';

/**
 * 合成エンジン
 * 純粋なロジックとして JSON を返す
 */
export class Simulator {
  private recipes: Recipe[] = [];

  constructor(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  // 無限素材リスト
  private infiniteMaterials = new Set(['fire_el', 'water_el', 'wind_el', 'earth_el']);

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
    for (const ing of recipe.ingredients) {
      // 無限素材以外のみチェック
      if (!this.infiniteMaterials.has(ing.id)) {
        if ((inventory[ing.id] || 0) < ing.amount) {
          return {
            success: false,
            message: `素材が足りません: ${ing.name}`,
            consumedMaterials: [],
            timestamp: new Date().toISOString()
          };
        }
      }
    }

    // 消費素材の計算（無限素材は含めない）
    const consumed = recipe.ingredients.filter(ing => !this.infiniteMaterials.has(ing.id));

    // 合成実行
    return {
      success: true,
      message: "合成に成功しました！",
      output: recipe.output,
      consumedMaterials: consumed,
      timestamp: new Date().toISOString()
    };
  }

  // 再創世の実行
  resetUniverse(inventory: Record<string, number>): { crystals: number } {
    const totalValue = Object.values(inventory).reduce((sum, val) => sum + val, 0);
    const crystals = Math.floor(totalValue * 0.01);
    return { crystals };
  }
}
