import { AlchemyEngine } from '../alchemy';
import * as path from 'path';

const engine = new AlchemyEngine(path.join(__dirname, '../../src/data/recipe-db.json'));

let inventory: Record<string, number> = { "水": 1000, "火": 1000, "土": 1000 };
let gold = 0;
let memoryCrystals = 0;
let cauldronRank = 4;

console.log("--- Starting Priority Auto-Alchemy Simulation ---");

// シミュレーション実行：クリア判定を強化
for (let tick = 0; tick < 100; tick++) {
  const res = engine.simulateAutoAlchemy(inventory, gold, cauldronRank);
  inventory = res.inventory;
    
  if (engine.checkVictory(inventory)) {
    console.log(`[Tick ${tick}] Victory! The Universe has been created.`);
    const p = engine.prestige(inventory, gold, memoryCrystals);
    console.log(p.message);
    break;
  }
}

