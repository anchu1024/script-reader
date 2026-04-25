/**
 * @class Application
 * プレビュー用アプリケーションクラスの定義。パースなどの流れなどを行う。
 */
class Application {
  constructor() {
    this.dialog = new Dialog();
    this.screen = new Screen();
    this.dialog.addEl(document.querySelector(".preview"));
    this.BG = document.querySelector(".background");
    this.nowBG = "";
  }

  preview(settings, characters, scripts) {
    // characters = [{name = String, image = string, voice = audioElement, voiceName = string}];
    // scripts = [{type = string, charId = string, text = string, mediaUrl = string}]
    this.nowBG = settings.initialBackground;
    console.log(settings.dialogTheme);
    this.dialog.changeTheme(settings.dialogTheme);
    this.forceScene("preview");
    this.BG.src = this.nowBG;
    console.log(scripts);
  }

  /**
   * プレビュー画面とエディタ画面を切り替えます。
   */
  togglePreview() {
    document.querySelector(".preview").style.display =
      document.querySelector(".preview").style.display == "block"
        ? "none"
        : "block";
    document.querySelector(".editor").style.display =
      document.querySelector(".editor").style.display == "block"
        ? "none"
        : "block";
  }

  /**
   * プレビュー画面とエディタ画面を強制的に切り替えます。
   * @param {string} [type] 切り替え先のモードの名前です。`"preview"`または`"editor"`で指定してください。それ以外だとエラーが出ます。
   */
  forceScene(type) {
    if (type == "preview") {
      document.querySelector(".preview").style.display = "block";
      document.querySelector(".editor").style.display = "none";
    } else if (type == "editor") {
      document.querySelector(".preview").style.display = "none";
      document.querySelector(".editor").style.display = "block";
    } else {
      throw new Error(`引数が不正です : "${type}"`);
    }
  }
}

// ********************* Playground and DevCodes! *********************
