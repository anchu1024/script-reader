/**
 * @class Character
 * 登場人物を`Dialog`などでも扱いやすいように設計された基幹クラスです。
 */
class Character {
  constructor() {
    this.type = "narration";
    this.name = "";
    this.color = "default";
    this.font = {
      family: "sans-serif",
      size: "1rem",
      color: "white",
      lineHeight: 1.5,
      weight: "normal",
      style: "normal",
    };
    this.voice = Assets.audio.voice.empty;
  }
}

/**
 * @class Player
 * プロジェクトに出てくる登場人物を定義するクラスです。
 * このクラスでは主にUI面での実装を目的とし、喋らせたりなどの行為はPlayerManagerが行います。
 * このクラスは`Character`クラスを継承しています。
 */
class Player extends Character {
  #images = [];

  /**
   * @param {string} [image] キャラが使用する画像のURL配列。アクセス用の名前をキーとしてURLを格納
   * @param {string} [name="Unknown"] キャラの名前。ダイアログなどで表示される。
   * @param {string} [color="#ff0066"] キャラのシンボルカラー。ダイアログなどで使われる(かも)。ちなみにデフォルトは作者の好きな色`#ff0066`
   * @param {Voice} [voice] キャラのボイス。
   */
  constructor({
    image,
    name = "Unknown",
    color = "#ff0066",
    voice = Assets.audio.voice.empty,
  } = {}) {
    // TODO : キャラごとにフォント情報を持てるようにする
    super();
    this.type = "character";
    this.name = name;
    this.color = color;
    this.voice = voice;

    this.image = image;

    /**
     * このキャラの実際の表示される画像要素です。
     * DOM未完の可能性から要素追加は別途行うような設計(試験段階)
     * @type {HTMLImageElement}
     */
    this.el = new Image();
    this.change(this.image);
  }

  /**
   * キャラの画像を差し替える
   * @param {string} [costume = ""] コスチュームの名前。これは生成時、imageで取り込んだキーのどれかを指定してください。
   * @returns {void} 返り値はないです。
   */
  change(costume) {
    if (this.image[costume] === undefined || this.image[costume] === null) {
      throw new ReferenceError(
        "不正な引数です : 指定されたキーに対応するコスチュームは存在しません。"
      );
    }
    this.el.src = this.image[costume];
  }

  /**
   * 向きを左、右に設定します。
   * @param {string|number|boolean} [dir] `right`、`left`で指定、または`1`、`-1`(1が右)で指定、または`true`、`false`(trueで右)で指定できます。
   */
  setPos(dir) {
    rightFlag = false;
    if (typeof dir === "string") {
      if (dir === "right") {
        rightFlag = true;
      }
    } else if (typeof dir === "number") {
      if (dir === 1) {
        rightFlag = true;
      }
    } else if (typeof dir === "boolean") {
      rightFlag = dir;
    }
    if (rightFlag) {
      this.el.style.left = "100vw";
      this.el.style.transform = "scale(-1, 1)";
    } else {
      this.el.style.left = "0px";
      this.el.style.transform = "scale(1, 1)";
    }
  }
}
