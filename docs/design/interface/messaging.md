# 通信インターフェース仕様書

## 1. 目的
フロントエンド（UI）とエンジン間でのデータ通信プロトコルおよびメッセージ構造を定義する。本ドキュメントは両者の「契約」として機能する。

## 2. 通信方式
- WebSocketによる双方向通信
- JSONフォーマットを用いたメッセージ送受信

## 3. メッセージ定義 (イベント一覧)

### 3.1 フロントエンド → エンジン (Action Request)
- `ACTION_CRAFT`: 合成実行リクエスト
  - ペイロード: `{ recipeId: string }`
- `ACTION_UPGRADE`: 自動化ライン強化リクエスト
  - ペイロード: `{ lineId: string }`

### 3.2 エンジン → フロントエンド (State Update)
- `STATE_SYNC`: 全体状態の同期
  - ペイロード: `{ inventory: object, automation: object, stats: object }`
- `SYNC_DELTA`: 差分同期（軽量化のため）
  - ペイロード: `{ changedItems: object }`

## 4. UI同期ポリシー (第2問の合意事項)
- **楽観的UI更新を基本とする**: ユーザー体験を最優先し、操作後に即時UIを反映する。
- **ロールバック処理**: サーバーからのエラー応答（イベント名: `ACTION_REJECTED`）を受信した際は、UIの状態を直前の同期状態へ即座に差し戻す。
