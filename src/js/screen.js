/**
 * @class Screen
 * スクリーンのエンティティの描画マネジメントを行う
 */
class Screen {
  /**
   * 最大で何人のキャラを出現させるか。
   * @type {number}
   */
  #maxChara = 2;

  /**
   * 今このキャラが出現中かどうか
   * @type {object}
   */
  #existence = {};

  constructor() {
    this.charaPos = new Array(this.#maxChara).fill(false);
  }

  /**
   * キャラクター登場時に衝突が起きないよう場所を確保します。
   * @return {Object} 確保した場所などを返します。
   */
  allocate() {
    let idx = 0;
    while (idx < this.charaPos.size()) {
      if (!this.charaPos[idx]) {
        break;
      }
      idx++;
    }
    if (idx === this.charaPos.size()) {
      throw new RangeError(
        `想定を超えた人数のキャラを呼び出そうとしました。仕様修正を待つか、人数制限(${this.#maxChara}人)内に収まるようにプログラムを組みなおしてください。`,
      );
    }
    this.charaPos[idx] = true;
    return {
      idx,
    };
  }

  /**
   * 指定した位置のキャラを解放します。これを行うことで次のキャラがその位置に入ることが来ます。
   * @param {number} idx  解放したいキャラの位置を指定します。
   */
  free(idx) {
    this.charaPos[idx] = false;
  }

  /**
   * 今そのキャラが画面に存在するかを判定する関数
   * @param {string} charId キャラクターのIDを渡します
   * @returns boolean
   */
  has(charId) {
    if (!(charId in this.#existence)) {
      this.#existence[charId] = false;
    }
    return this.#existence[charId];
  }
}
