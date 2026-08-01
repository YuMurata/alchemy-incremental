import { AlchemyEngine } from './src/engine';
import * as path from 'path';

// テスト用DBパス (プロジェクトルート基準)
const dbPath = path.join(__dirname, 'data/recipe-db.json');

// エンジンの初期化
const engine = new AlchemyEngine(dbPath);

// テスト用のプレイヤー状態 (素材100個持っていると仮定)
const inventory = { 'water': 100, 'fire': 100, 'earth': 100, 'wind': 100 };

console.log("--- マイルストーン検証用テスト ---");

// 1. 再創世のテスト
const resetResult = engine.resetUniverse(inventory);
console.log("再創世結果 (結晶獲得量):", resetResult);

// 検証：総数400の0.01倍 = 4 が獲得できるはず
if (resetResult.crystals === 4) {
    console.log("✅ プレステージロジック: 正常");
} else {
    console.log("❌ プレステージロジック: エラー");
}

// 2. 合成テスト (もし水＋火のレシピがあるなら)
// ここはレシピDBの内容に依存するけど、ロジックとして呼び出せるかチェック
const synth = engine.synthesize('r_water_fire', inventory);
console.log("合成テスト:", synth);
console.log("--- テスト完了 ---");
