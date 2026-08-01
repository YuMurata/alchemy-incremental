// tests/test-logic.js
// TypeScriptのファイルを直接読み込めないので、JSにコンパイルされたファイルを参照するか、
// このテスト自体をTypeScriptで書き直す必要があるね。
// 一旦、コンパイル後のdistを参照するように修正してみるよっ！

const { AlchemyEngine } = require('../dist/engine');
const path = require('path');

function testPrestigeLogic() {
  // DBパスをdistからの相対パスに変更
  const dbPath = path.join(__dirname, '../data/recipe-db.json');
  const engine = new AlchemyEngine(dbPath);
  const inventory = { 'water': 100, 'fire': 100, 'earth': 100, 'wind': 100 };
  const result = engine.resetUniverse(inventory);

  if (result.crystals === 4) {
    console.log("✅ Prestige logic: Passed");
    return true;
  } else {
    console.error("❌ Prestige logic: Failed (Expected 4, got " + result.crystals + ")");
    return false;
  }
}

if (testPrestigeLogic()) {
  process.exit(0);
} else {
  process.exit(1);
}
