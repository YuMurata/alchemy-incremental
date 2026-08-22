import React from 'react';

export const BuddyPanel: React.FC = () => {
  return (
    <div className="buddy-panel" style={{ 
      border: '2px solid #555', 
      padding: '15px', 
      borderRadius: '8px',
      backgroundColor: '#2a1a10',
      color: '#d4af37'
    }}>
      <h3>錬金の相棒</h3>
      <div className="buddy-item" style={{ marginBottom: '10px' }}>
        <strong>ホムンクルス (Lv.1)</strong>
        <p>自動合成: 停止中</p>
        <button>燃料を捧げる</button>
      </div>
      <div className="buddy-item" style={{ marginBottom: '10px' }}>
        <strong>精霊 (Lv.1)</strong>
        <p>品質ボーナス: +0%</p>
        <button>素材を捧げる</button>
      </div>
      <div className="buddy-item">
        <strong>妖精 (Lv.1)</strong>
        <p>自動売却: 停止中</p>
        <button>ゴールドを捧げる</button>
      </div>
    </div>
  );
};
