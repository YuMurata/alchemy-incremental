# Game Design Document

## Narrative (The Eternal Cauldron)
- **Concept**: Player finds a legendary cauldron, ascends to rebuild the universe, cauldron cycles to the next owner.
- **Events**: Opening, Homunculus/Fairy/Spirit liberation.
- **System**: Default skip once seen; click notifications to replay.

## Content
- **Materials**: Start with 4 basic elements (Water, Fire, Earth, Wind).
- **Ranks & Progression**:
    - Rank 1: Basic Elements (Water, Fire, Earth, Wind)
    - Rank 2: Natural Phenomena (Steam, Sand, Cloud, etc.)
    - Rank 3: Crafted Goods (Glass, Fabric, Lumber, etc.)
    - Rank 4-6: Alchemy Tools (Elixirs, Enchanted Gear)
    - Rank 7-9: Mystical Concepts (Star-light, Emotion, Flow of Time)
    - Rank 10: The Ultimate (Universe, Philosopher's Stone, Absolute Time)
- **Synthesis Rules (Recipe Generation)**:
    - **Base Rule**: Rank N+1 material = (2 or 3 Rank N materials) + (Optional any material).
    - **Minimum Requirements**: Must use exactly 2 or 3 materials per synthesis.
    - **Catalysts**: Not required for basic synthesis.

## Systems
- **Mastery**: Infinite production unlock. (Managed independently as synthesis speed boost)
- **Spirit Trading**: Required for Rank X+ materials.
- **Re-genesis (Reset)**: 
    - Trigger: Creating the "Universe" (Rank 10 material).
    - Kept Assets: "Memory Crystals" (currency) and their upgrades.
    - Reset Assets: Inventory, current material Rank/Mastery, active Catalyst speed.
- **Memory Crystals (Prestige Currency)**:
    - Earned by Re-genesis: `Total Value of Materials * 0.01 = Crystals`
    - Upgrades: Permanent boost to synthesis efficiency, initial material quality, or automated Rank production.
- **Alchemy Skills (AP)**:
    - Purpose: Synthesis作業効率化 (Success Rate, Resource Saving).
    - Management: Independent of Mastery.

## システムアーキテクチャ方針
- **ロジック・ビュー分離**: 合成エンジン（ロジック層）は純粋なJSONオブジェクトを返し、CLI/Web UI（ビュー層）はそれを整形表示する。
- **データ形式**: 合成結果、エラーメッセージ、消費・生成素材はすべてJSONスキーマに従う。
- **インフラ構成**: Docker Composeを活用し、サービス構成を分離する。
  - `engine`: 合成ロジックを担うコア（バックエンド）。
  - `cli`: デバッグ用インターフェース（JSONダンプ表示）。
  - `webui`: 将来的なフロントエンド（Webブラウザ表示）。
- **エンジン自己完結型初期化**: エンジンは初期化時に自身の責任で `recipe-db.json` をロードする。
