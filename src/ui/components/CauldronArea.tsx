import React from 'react';
import recipeData from '../../data/recipe-db.json';

// 中央エリア：釜エリア（アニメーション＋合成ボタン）
export const CauldronArea: React.FC<{ selectedMaterials: string[], onSynthesize: () => void }> = ({ selectedMaterials, onSynthesize }) => {
  // 合成予想の結果を取得
  const getPrediction = (materials: string[]) => {
    const sorted = [...materials].sort();
    // recipeData は JSON なので recipes プロパティにアクセスする
    const recipe = (recipeData as any).recipes.find((r: any) => {
        const ingredients = r.ingredients.map((ing: any) => ing.id).sort();
        return JSON.stringify(ingredients) === JSON.stringify(sorted);
    });
    return recipe ? recipe.output.name : '？？？';
  };

  const prediction = getPrediction(selectedMaterials);
  // 合成結果が「失敗」だと分かっているもののみ合成不可（今は？？？は許可）
  const isImpossible = prediction === '失敗';

  return (
    <div className="cauldron-area" style={{ 
      gridArea: 'anim',
      border: '4px solid #8b4513', 
      height: '300px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#2a1a10',
      borderRadius: '50% 50% 50% 50% / 20% 20% 80% 80%', // 釜のような形
      color: '#ddd',
      margin: '20px'
    }}>
      <div style={{ marginBottom: '20px' }}>
        {selectedMaterials.length > 0 ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            {selectedMaterials.map((m, i) => {
              const elementNames: Record<string, string> = {
                'e_fire': '火（エレメント）',
                'e_water': '水（エレメント）',
                'e_wind': '風（エレメント）',
                'e_earth': '土（エレメント）',
                'fire': '火',
                'water': '水',
                'wind': '風',
                'earth': '土',
                'steam': '蒸気'
              };
              const displayName = elementNames[m] || m;
              return (
                <span key={i} style={{ padding: '8px 15px', background: '#5d3a1a', borderRadius: '50%', border: '1px solid #d4af37' }}>
                  {displayName}
                </span>
              );
            })}
          </div>
        ) : (
          <p>大釜は空です...</p>
        )}
      </div>
      
      {selectedMaterials.length > 0 && (
        <div style={{ margin: '10px', color: '#d4af37', fontWeight: 'bold' }}>
            予想: {prediction}
        </div>
      )}

      {selectedMaterials.length > 0 && (
        <button 
          onClick={onSynthesize}
          disabled={isImpossible}
          style={{ 
              padding: '15px 30px', 
              cursor: isImpossible ? 'not-allowed' : 'pointer', 
              backgroundColor: isImpossible ? '#555' : '#d4af37', 
              color: isImpossible ? '#aaa' : '#000', 
              border: 'none', 
              borderRadius: '4px', 
              fontWeight: 'bold' 
          }}
        >
          {isImpossible ? '合成不可' : '合成開始'}
        </button>
      )}
    </div>
  );
};
