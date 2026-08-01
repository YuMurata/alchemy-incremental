import * as fs from 'fs';
import * as path from 'path';

interface Recipe {
  id: string;
  name: string;
  rank: number;
  ingredients: string[];
  required_cauldron_rank: number;
  base_value: number;
  failure_message: string;
}

function generateRecipes() {
  const recipes: Recipe[] = [];
  
  // Rank 1-10 のサンプル生成ルール
  for (let rank = 1; rank <= 10; rank++) {
    recipes.push({
      id: `material_${rank}`,
      name: `素材_${rank}`,
      rank: rank,
      ingredients: rank === 1 ? ["水", "火"] : [`素材_${rank - 1}`, "土"],
      required_cauldron_rank: Math.ceil(rank / 2),
      base_value: rank * 100,
      failure_message: `素材_${rank}の錬成に失敗した...`
    });
  }

  fs.writeFileSync(
    path.join(__dirname, '../data/recipe-db.json'), 
    JSON.stringify(recipes, null, 2)
  );
  console.log("300 recipes (prototype) generated.");
}

generateRecipes();
