// src/index.ts
import { AlchemyEngine } from './engine/engine.js';
import { Material, Recipe } from './types.js';

// サンプルレシピの定義
const sampleRecipes: Recipe[] = [
  {
    id: "r1",
    name: "Fire Creation",
    output: { id: "m2", name: "Fire", amount: 1 },
    ingredients: [
      { id: "m1", name: "Water", amount: 2 }
    ],
    baseTime: 1,
    masteryPoint: 1
  }
];

// エンジンの初期化 (ファイルパスを自分で解決する仕様)
import recipes from './data/recipe-db.json';
const engine = new AlchemyEngine(recipes as any);


// サンプル在庫 (十分な素材)
const inventory: Record<string, number> = { 
  "m_water": 20, "m_fire": 20, "m_earth": 20, "m_wind": 20,
  "m_sand": 10, "m_mud": 10, "m_lumber": 10, "m_fabric": 10
};

// 連続合成テスト (R1 -> R2 -> R3)
const testRecipes = [
  { id: "r_01_001", name: "水+火=湯気" },
  { id: "r_02_001", name: "砂+火=ガラス" },
  { id: "r_03_001", name: "ガラス+火+水=レンズ" }
];

console.log("--- 錬金術連続合成テスト開始 ---");
let currentInventory = { ...inventory };

for (const step of testRecipes) {
  const result = engine.synthesize(step.id, currentInventory);
  console.log(`\n合成対象: ${step.name} (${step.id})`);
  console.log(JSON.stringify(result, null, 2));

  if (result.success && result.output) {
    // 在庫更新のシミュレーション
    result.consumedMaterials.forEach(m => currentInventory[m.id] -= m.amount);
    currentInventory[result.output.id] = (currentInventory[result.output.id] || 0) + result.output.amount;
  }
}
// ...既存のコードの末尾に追加...

// 再創世のテスト
console.log("\n--- 再創世 (リセット) テスト開始 ---");
const resetResult = engine.resetUniverse(currentInventory);
console.log(JSON.stringify({
    message: "再創世を実行しました。",
    gainedCrystals: resetResult.crystals,
    newUniverse: {
        gold: 0,
        inventory: {},
        masteryLevel: resetResult.crystals // 結晶をそのままマスタリーレベルに
    }
}, null, 2));
console.log("--- テスト完了 ---");

