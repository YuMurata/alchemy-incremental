# Alchemy Incremental 開発・実行ガイド

このプロジェクトは、Docker環境での開発を前提としています。

## 前提条件
- Docker / Docker Compose

## Docker開発ワークフロー

### 1. コンテナの起動と初期化
まず、プロジェクトルートでコンテナを起動し、環境を整えます。
```bash
docker compose up -d
```

### 2. ビルド（コンテナ内）
コンテナ内で最新コードをコンパイルします。
```bash
docker compose exec app npm run build
```

### 3. シミュレーション実行（クリア確認）
ビルド済みのシミュレーターをコンテナ内で実行します。
```bash
docker compose exec app node dist/sim/simulator.js
```

### 4. レシピ生成ツールの実行
```bash
docker compose exec app node dist/tools/gen.js
```

## トラブルシューティング
- **環境差異**: 常にコンテナ内（`docker compose exec app ...`）でコマンドを実行してください。ローカルの Node 環境とバージョンが異なる場合があります。
- **ファイル反映**: `volumes` 設定によりローカルの変更がコンテナに即時反映されます。反映されない場合は一度 `docker compose restart app` を試してください。
