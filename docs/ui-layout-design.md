# 錬金術ゲーム UIレイアウト設計書 (コンセプト: 錬金術師の作業机)

## レイアウトの全体像
- **コンセプト**: 錬金術師の作業机（アンティーク調、木目、ガラス瓶などの質感）
- **レスポンシブ**: PCではサイドバー、モバイルではスライド/縦積みレイアウト

## 画面構成 (Grid/Flexbox)

### 1. アニメーションエリア (①)
- 画面中央上部。合成結果や錬金演出を表示。
- `aspect-ratio: 16/9;` または固定高さ。

### 2. 合成エリア (③)
- アニメーションエリアの直下。
- 3つのスロット（素材配置枠）を配置。
- 「合成開始」ボタンを中央に配置。

### 3. 素材選択エリア (②)
- モバイル: 画面下部。カルーセルまたはタブ形式。
- PC: 左サイドパネル（スクロール可能）。

## 実装イメージ (CSS)

```css
/* Container (Grid) */
.game-container {
  display: grid;
  grid-template-areas: 
    "anim"
    "synt"
    "mats";
  grid-template-columns: 1fr;
  height: 100vh;
}

@media (min-width: 768px) {
  .game-container {
    grid-template-areas: 
      "mats anim"
      "mats synt";
    grid-template-columns: 300px 1fr;
  }
}

.animation-area { grid-area: anim; }
.synthesis-area { grid-area: synt; }
.materials-area { grid-area: mats; }
```

## デザイン仕様
- **素材スロット**: 3つの丸い枠。Drag & Drop またはタップ選択。
- **色調**: 深いブラウン、古紙の色、金色のアクセント。
- **UIフォント**: セリフ体（古風な雰囲気）
