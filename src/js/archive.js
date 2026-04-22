class Storage {
  constructor(dbName = "MyDirectDB", storeName = "objects") {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
  }

  /**
   * データベースを開く（初期化）
   */
  async open() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject(`DB Open Error: ${event.target.error}`);
      };
    });
  }

  /**
   * 何でも保存するメソッド
   */
  async set(key, value) {
    await this.open();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      // データを加工して保存可能な形式にする
      const serializedData = this._serialize(value);

      const request = store.put(serializedData, key);

      request.onsuccess = () => resolve(key);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  /**
   * キーでデータを取り出すメソッド
   */
  async get(key) {
    await this.open();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        // 取り出し時に元の形（に近いもの）に戻して返す
        resolve(this._deserialize(result));
      };
      request.onerror = (e) => reject(e.target.error);
    });
  }

  /**
   * 再帰的に中身をチェックして保存形式に変換する
   */
  _serialize(value) {
    if (value === null || value === undefined) return value;

    // 1. DOM要素
    if (value instanceof HTMLElement) {
      return {
        __type: "dom_element",
        tagName: value.tagName,
        html: value.outerHTML,
      };
    }

    // 2. Blob / File / Date / RegExp はそのまま (IndexedDB対応)
    if (
      value instanceof Blob ||
      value instanceof File ||
      value instanceof Date ||
      value instanceof RegExp
    ) {
      return value;
    }

    // 3. 配列
    if (Array.isArray(value)) {
      return value.map((item) => this._serialize(item));
    }

    // 4. 普通のオブジェクト
    if (typeof value === "object") {
      const clone = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          clone[key] = this._serialize(value[key]);
        }
      }
      return clone;
    }

    return value;
  }

  /**
   * 再帰的にデータを復元する
   */
  _deserialize(value) {
    if (value === null || value === undefined) return value;

    // 1. 独自形式 (__type: 'dom_element') ならDOMに戻す
    if (value && typeof value === "object" && value.__type === "dom_element") {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = value.html;
      return wrapper.firstElementChild;
    }

    // 2. Date, RegExp, Blob, File はそのまま返す
    // (これらは typeof object ですが、再帰処理してはいけません)
    if (
      value instanceof Date ||
      value instanceof RegExp ||
      value instanceof Blob ||
      value instanceof File
    ) {
      return value;
    }

    // 3. 配列なら中身を1つずつ復元
    if (Array.isArray(value)) {
      return value.map((item) => this._deserialize(item));
    }

    // 4. オブジェクトならプロパティごとに復元
    if (typeof value === "object") {
      const clone = {};
      for (const key in value) {
        clone[key] = this._deserialize(value[key]);
      }
      return clone;
    }

    return value;
  }
}
