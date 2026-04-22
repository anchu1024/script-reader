/**
 * すべてのクラスで共通して使えるユーティリティ関数群
 * @type {Object<any, any>}
 */
const Utils = {
  userInputPromise: null,
  /**
   * 指定したミリ秒間処理を止めるプロミスを返す
   * 非同期関数で`await`または`then`で受ける必要があります。
   * @param {number} [ms] 休む時間。単位がミリ秒(`ms`)であることに注意が必要です。
   * @returns {Promise} 指定時間秒後に解決するプロミス
   */
  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },

  /**
   * フォント関連の変更を一気に行うバンドル関数です。
   * オプションをまとめたオブジェクト後述の引数はすべてオブジェクト形式で渡してください
   * @param {HTMLElement} [el] CSSを変更する要素です。
   * @param {Object} [option] 引数に渡すオブジェクト。変更するCSSの情報を入れます。
   * @param {string} [option.family] フォントファミリー用の値
   * @param {string|number} [option.size] フォントサイズ用の値。デフォルト単位は`px`
   * @param {string|number} [option.color] フォントカラー用の値。数値の場合は16進数が望まれる
   * @param {number} [option.lineHeight] 行間指定用の値。数値でフォントサイズに対する割合を指定
   * @param {string|number} [option.weight] 文字の太さ用の値。主に`bold`、`normal`の切り替え用
   * @param {string} [option.style] フォントのスタイル用の値。主に`italic`、`normal`の切り替え用
   */
  changeFont(
    el,
    {
      family = null,
      size = null,
      color = null,
      lineHeight = null,
      weight = null,
      style = null,
    }
  ) {
    this.changeFontFamily(el, family);
    this.changeFontSize(el, size);
    this.changeFontColor(el, color);
    this.changeLineHeight(el, lineHeight);
    this.changeFontWeight(el, weight);
    this.changeFontStyle(el, style);
  },

  /**
   * フォントを変える関数
   * あらかじめ指定されたフォントが存在しないといけません
   * @param {HTMLElement} [el] CSSを変更する要素です。
   * @param {string} [font] フォントの名前。CSS指定時と同じもの、かつすでにロード済みのもの
   */
  changeFontFamily(el, font) {
    if (typeof font !== "string") return;
    this.setStyle(el, "font-family", font);
  },

  /**
   * 文字の大きさを変える関数
   * 単位は好きに決められますがデフォルトは`px`です。
   * @param {HTMLElement} [el] CSSを変更する要素です。
   * @param {string|number} [size] サイズの指定。文字列の時はそのままだが数値のときのみデフォルトの単位が入る
   */
  changeFontSize(el, size) {
    if (size === null || size === undefined) return;
    this.setStyle(el, "font-size", size, "px");
  },

  /**
   * 文字の色を変える関数
   * @param {HTMLElement} [el] CSSを変更する要素です。
   * @param {string|number} [color] 色の指定。`"#ff0000"`のような文字列指定でも`0xff0000`などの数値指定でもOK
   */
  changeFontColor(el, color) {
    this.setStyle(el, "color", color);
  },

  /**
   * 行間を変える関数
   * @param {HTMLElement} [el] CSSを変更する要素です。
   * @param {number} [height] 行間は文字の大きさ(高さ)からの相対値で割り出されるため数値のみ指定してください。文字列でも動作します。
   */
  changeLineHeight(el, height) {
    this.setStyle(el, "line-height", height);
  },

  /**
   * 文字の幅を変える関数
   * @param {HTMLElement} [el] CSSを変更する要素です。
   * @param {string|number} [style] `bold`や`normal`などの文字の幅指定用のCSS値
   */
  changeFontWeight(el, style) {
    if (
      [
        "normal",
        "bold",
        "lighter",
        "bolder",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
      ].includes(style) ||
      typeof style === "number"
    ) {
      this.setStyle(el, "font-weight", style);
    } else if (style !== null) {
      throw new Error(
        "CSSエラー : font-weightに指定しようとしたCSS値が不正です。"
      );
    }
  },

  /**
   * 文字のスタイルを変える関数
   * 主に斜体(italic)と通常(normal)を切り替える用
   * @param {HTMLElement} [el] CSSを変更する要素です。
   * @param {string} [style] 指定するスタイル値、基本`"italic"`か`"normal"`。
   */
  changeFontStyle(el, style) {
    if (["normal", "italic", "oblique"].includes(style)) {
      this.setStyle(el, "font-style", style);
    } else if (style !== null) {
      throw new Error(
        "CSSエラー : font-styleに指定しようとしたCSS値が不正です。"
      );
    }
  },

  /**
   * 要素のスタイルを変える関数です。
   * `key`か`value`のどちらかが`null`だとこの関数は何もしません。
   * @param {HTMLElement} [el] CSSを変更する要素です。
   * @param {string} [key] CSSのキーです。CSSで記述する形で指定してください。
   * @param {string|value} [value] CSSプロパティ値です。CSS文字列か数値で指定してください。もし数値の場合後述の`unit`引数を単位として設定します。
   * @param {string} [unit] デフォルト単位を決めます。省略可。
   */
  setStyle(el, key, value, unit = "") {
    if (key === null || value === null) return;
    if (typeof value === "number") {
      value = String(value) + unit;
    }
    el.style.setProperty(key, String(value));
  },

  /**
   * クリックなどのユーザーイベントが起こるまで待つプロミスを返す関数
   * @returns {Promise}
   */
  waitUserInput() {
    return new Promise((resolve) => {
      this.userInputPromise = resolve;
    });
  },
};

/**
 * ユーザーイベントを検知するイベントハンドラ
 */
document.querySelector(".preview").addEventListener("click", () => {
  if (typeof Utils.userInputPromise === "function") {
    Utils.userInputPromise();
    Utils.userInputPromise = null;
  }
});

document.querySelector(".preview").addEventListener("keydown", () => {
  if (typeof Utils.userInputPromise === "function") {
    Utils.userInputPromise();
    Utils.userInputPromise = null;
  }
});
