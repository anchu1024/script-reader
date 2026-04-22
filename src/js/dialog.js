/**
 * @class Dialog
 * 下に出るダイアログのクラスです。
 */
class Dialog {
  defaultTheme = "シンプルライト";
  /**
   * 台本を読み上げるスピード、具体的には次の一文字を表示するまでのタイムラグ(ms指定)を表します。
   * @type {number}
   */
  speed = 100;

  /**
   * 速度をアップさせる。例えば１クリック目ではスピードを単に二倍し、２クリック目で完全スキップにするといった実装用
   * @type {number}
   */
  timeScale = 1;

  /**
   * スキップを行うかどうかのフラグ。
   * @type {boolean}
   */
  skipRequest = false;

  /**
   * スキップを有効化するかどうかのフラグ
   * @type {boolean}
   */
  canSkip = true;

  narration = new Character();

  isWriting = false;
  locked = false;

  /**
   * スキップ判定が先走りしないように開始から指定ms分は判定を無視するための変数
   * @type {number}
   */
  coolDown = 50;

  constructor() {
    this.eventHandler = this.eventHandler.bind(this);

    window.addEventListener("click", this.eventHandler);
    window.addEventListener("keydown", this.eventHandler);

    this.container = document.createElement("div");
    this.container.classList.add("dialog-container");
    this.el = document.createElement("div");
    this.el.classList.add("dialog");
    this.container.appendChild(this.el);
    this.changeTheme(this.defaultTheme);
  }

  /**
   * 渡された要素の下にダイアログを追加します。
   * @param {HTMLElement} [parent] 親要素。この要素の下にダイアログが追加されます。
   */
  addEl(parent) {
    parent.appendChild(this.container);
  }

  /**
   * ダイアログのテーマを変える
   * @param {string} [name] 指定された名前のテーマをダイアログに適用します。
   * @returns {void} 返り値はありません。
   */
  changeTheme(name) {
    if (Assets.images.themes[name] === undefined) {
      throw new ReferenceError(
        "参照エラー : 使用しようとしたダイアログのテーマは存在しません。"
      );
    }
    this.nowTheme = Assets.images.themes[name];
    for (const [key, value] of Object.entries(Assets.images.themes[name].css)) {
      this.el.style.setProperty(key, String(value));
    }
  }

  /**
   * ダイアログのサイズを変える関数
   * サイズ以外を変更できないように分割代入を用いている
   * @param {Object} [option] 引数にはオブジェクト形式で渡してください
   * @param {number|string} [option.width] 横幅を指定します。文字列で定義するとそのまま渡され、数値の場合はpx単位に変換します。
   * @param {number|string} [option.height] 縦幅を指定します。横幅の時と同じです。
   */
  changeSize({ width = null, height = null } = {}) {
    Utils.setStyle(this.el, "width", width, "px");
    Utils.setStyle(this.el, "height", height, "px");
  }

  /**
   * クリックやキーイベントなどによるダイアログ諸処理の関数
   * bind必須
   */
  eventHandler() {
    if (!this.canSkip) return;
    if (this.locked || !this.isWriting) return;
    if (this.timeScale == 1) {
      this.timeScale = 2;
    } else {
      this.skipRequest = true;
    }
  }

  /**
   * ダイアログの内容をリセットする関数
   */
  reset() {
    this.el.textContent = "";
  }

  /**
   * 台本を実際に読み上げる関数
   * @param {string} [str] 読み上げる台本
   * @param {Object} [option] オプションをまとめたオブジェクト後述の引数はすべてオブジェクト形式で渡してください
   * @param {number} [option.speed] 読む速さのスピード、デフォルトは`Dialog.speed`。
   * @param {boolean} [option.canSkip] ダブルクリックで飛ばせるかどうかを表す。デフォルトは`true`。
   * @param {Character} [option.chara] ダイアログが登場人物をUIで識別できるように利用するキャラ情報。デフォルトはナレーション。
   * @returns {Promise<void>} 読み上げが終了したことを示すプロミス(今後の都合により変更の可能性あり)
   */
  async say(
    str,
    {
      speed = this.speed,
      canSkip = true,
      chara = this.narration,
      decorate = [],
    } = {}
  ) {
    this.reset();
    this.timeScale = 1;
    this.skipRequest = false;
    this.speed = speed;
    this.canSkip = canSkip;
    const decoration = decorate || []; // decorateにnullなどが指定されてしまった場合の対処
    this.locked = true;
    this.isWriting = true;
    setTimeout(() => {
      this.locked = false;
    }, this.coolDown);
    for (let idx = 0; idx < str.length; idx++) {
      const color = decoration[idx] || null;
      this.textLetter(str[idx], { color: color });
      const waitTime = this.skipRequest ? 0 : this.speed / this.timeScale;
      if (waitTime > 0) {
        chara.voice.play();
        await Utils.sleep(waitTime);
      }
    }
    this.isWriting = false;
    await Utils.waitUserInput(this.locked);
  }

  /**
   * １文字ずつ表示する関数です。
   * @param {string} [char] 表示させる文字
   * @param {Object} [style] １文字ごとのスタイル(色付け、強調など)を定義するためのオブジェクト
   */
  textLetter(char, style = {}) {
    const hasStyle =
      style &&
      Object.keys(style).length > 0 &&
      Object.values(style).some((v) => v !== null);
    if (hasStyle) {
      const letter = document.createElement("span");
      letter.textContent = char;
      Utils.changeFont(letter, style);
      this.el.appendChild(letter);
    } else {
      this.el.appendChild(document.createTextNode(char));
    }
  }
}
