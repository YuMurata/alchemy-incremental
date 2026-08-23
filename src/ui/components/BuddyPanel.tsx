import React from 'react';

interface BuddyPanelProps {
  spiritLevel: number;
  homunculusFuel: number;
  fairyGold: number;
  onInteractSpirit: () => void;
  onInteractHomunculus: () => void;
  onInteractFairy: () => void;
}

export const BuddyPanel: React.FC<BuddyPanelProps> = ({ 
  spiritLevel, homunculusFuel, fairyGold, 
  onInteractSpirit, onInteractHomunculus, onInteractFairy 
}) => {
  return (
    <div className="buddy-panel" style={{ 
      color: '#d4af37'
    }}>
      <h3>錬金の相棒</h3>
      <div className="buddy-item" style={{ marginBottom: '10px' }}>
        <strong>ホムンクルス (燃料: {homunculusFuel})</strong>
        <p>自動合成: 停止中</p>
        <button onClick={onInteractHomunculus}>触媒を捧げる</button>
      </div>
      <div className="buddy-item" style={{ marginBottom: '10px' }}>
        <strong>精霊 (Lv.{spiritLevel})</strong>
        <p>品質ボーナス: +{spiritLevel * 5}%</p>
        <button onClick={onInteractSpirit}>素材を捧げる</button>
      </div>
      <div className="buddy-item">
        <strong>妖精 (ゴールド: {fairyGold})</strong>
        <p>自動売却: 停止中</p>
        <button onClick={onInteractFairy}>ゴールドを捧げる</button>
      </div>
    </div>
  );
};
