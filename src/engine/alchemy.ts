import * as fs from 'fs';
import { Recipe, SynthesisResult } from './types';

export class AlchemyEngine {
  private recipes: Recipe[];

  constructor(dbPath: string) {
    const data = fs.readFileSync(dbPath, 'utf8');
    this.recipes = JSON.parse(data);
  }

  // 宇宙作成のための強制ループ
  simulateAutoAlchemy(inventory: Record<string, number>, gold: number, cauldronRank: number) {
    // 毎tick、基本素材を供給
    ["水", "火", "土"].forEach(mat => inventory[mat] = (inventory[mat] || 0) + 100);

    // 宇宙作成に必要な素材を順番に強制合成
    const sequence = [
        { name: "蒸気", ingredients: ["水", "火"] },
        { name: "泥", ingredients: ["水", "土"] },
        { name: "時間", ingredients: ["蒸気", "泥"] },
        { name: "賢者の石", ingredients: ["蒸気", "泥", "時間"] },
        { name: "宇宙", ingredients: ["賢者の石", "時間"] }
    ];

    for (const step of sequence) {
        while (step.ingredients.every(ing => (inventory[ing] || 0) >= 1)) {
            const basicMaterials = ["水", "火", "土", "風"];
            step.ingredients.forEach(ing => {
                if (!basicMaterials.includes(ing)) inventory[ing] -= 1;
            });
            inventory[step.name] = (inventory[step.name] || 0) + 1;
        }
    }
    return { inventory, gold };
  }

  synthesize(ingredients: string[], currentCauldronRank: number): SynthesisResult {
    const sortedInput = [...ingredients].sort();

    for (const recipe of this.recipes) {
      // 実際には recipe.ingredients は Material[] なので、名前のリストを作る必要がある
      const sortedRecipeNames = recipe.ingredients.map(m => m.name).sort();
      
      if (sortedInput.length === sortedRecipeNames.length &&
          sortedInput.every((val, index) => val === sortedRecipeNames[index])) {
        
        if (currentCauldronRank < (recipe.required_cauldron_rank || 0)) {
          return {
            success: false,
            message: `錬金釜のランクが足りません（必要: ${recipe.required_cauldron_rank}）`,
            consumedMaterials: [],
            timestamp: new Date().toISOString()
          };
        }

        return {
          success: true,
          message: `${recipe.name} を錬成した！`,
          output: recipe.output,
          consumedMaterials: recipe.ingredients,
          timestamp: new Date().toISOString()
        };
      }
    }

    return {
      success: false,
      message: "錬成に失敗した。素材は灰となって消えた...",
      consumedMaterials: [],
      timestamp: new Date().toISOString()
    };
  }

  checkVictory(inventory: Record<string, number>): boolean {
    return (inventory["宇宙"] || 0) >= 1;
  }
  // プレステージ（転生）ロジックの実装
  prestige(inventory: Record<string, number>, gold: number, memoryCrystals: number): { inventory: Record<string, number>, gold: number, memoryCrystals: number, message: string } {
    this.playEndingEffects();

    // 転生後の初期状態へリセット
    const newInventory: Record<string, number> = { "水": 0, "火": 0, "土": 0 };
    const newGold = 0;
    const newMemoryCrystals = memoryCrystals + 1; // 記憶の結晶を+1

    return {
      inventory: newInventory,
      gold: newGold,
      memoryCrystals: newMemoryCrystals,
      message: "宇宙が崩壊し、記憶が結晶となって釜に残った..."
    };
  }

  private playEndingEffects(): void {
    const effects = [
        ">>> [EFFECT] 釜が周囲の時空を吸い込み始めた...",
        ">>> [EFFECT] 宇宙が逆再生していく...",
        ">>> [EFFECT] 古物商の棚に釜が置かれた..."
    ];
    effects.forEach(e => console.log(e));
  }
}
