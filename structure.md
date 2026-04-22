# Structure

それぞれのファイルの説明や仕様、そして読み込む順番や依存などの設計情報を記載します。

## 外部依存先

    - `Howler.js` 音声データを簡単に扱うためのライブラリーです。

## `JS`

`JavaScript`ファイルは基本的に`/src/js`内に記述します。

- `application.js`

    プレビュー時の起動、終了、エディタ内の操作、総括などを担当するスクリプト。

    #### dependencies

        - `character.js`

        - `dialog.js`

- `archive.js` _作成予定_

    `IndexedDB`を使って、音声や画像などのアセットファイル、台本データなどを名前付きで保存します。

    #### dependencies

        anonymous

- `assets.js`

    音声や画像などのプレビューを簡単にするためのスクリプトです。

    #### dependencies

        - `Howler.js`
    
- `character.js`

    キャラクター情報を定義するスクリプトです。メインクラスは`Player`です。

    #### dependencies

        - `assets.js`

        - `utils.js`

- `dialog.js`

    テロップを表示するダイアログのスクリプトです。

    #### dependencies

        - `assets.js`

        - `character.js`

        - `utils.js`

- `loader.js` _作成予定_

    画像や音声などをユーザーからアップロードされたとき、それを取り込み、アーカイブも行うスクリプトです。

    #### dependencies

        - `archive.js`

        - `assets.js`

- `parser.js` _作成予定_

    ユーザーからの台本データをパースし、プレビューボタンが押されたときにすぐさまプレビューに移れるようデータを作成するスクリプトです。

    #### dependencies

        anonymous

- `utils.js`

    プレビュー時のUtility関数オブジェクトです。

### 推奨読み込み順序

- `/src/js/utils.js`
- `/src/js/archive.js`
- `/src/js/parser.js`
- `/src/js/assets.js`
- `/src/js/character.js`
- `/src/js/dialog.js`
- `/src/js/loader.js`
- `/src/js/application.js`

## `CSS`

`CSS`ファイルは基本的に`/src/css`内に記述します。

- `style.css`

    総合的なスタイルCSS。今後分離する可能性あり。

### 推奨読み込み順序

- `/src/css/style.css`