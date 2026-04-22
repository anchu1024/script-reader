- `Player`クラスの完成

- `Dialog`クラスを作成

## 構造
```
ScriptRunner
 ├─ Script（JSON）
 ├─ PlayerManager
 │    └─ Player（画像管理）
 ├─ Dialog（セリフ表示）
 └─ Renderer（画面描画）
```

## CSS実装

- `.dialog`では--border-widthを使って動的に枠線の長さを変える

**`--border-width`は`px`指定だが、`--slice-width`は数値指定。これを守らないと(同時に更新しないと)UIが崩れるので注意**