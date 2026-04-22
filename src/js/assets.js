/**
 * @class BGM
 * BGMを定義するクラスです。
 */
class BGM {
  constructor(...src) {
    this.audio = new Howl({ src: src });
  }

  play() {
    this.audio.play();
  }
}

/**
 * @class FX
 * 効果音を定義するクラスです。
 */
class FX {
  constructor(...src) {
    this.audio = new Howl({ src: src });
  }

  play() {
    this.audio.play();
  }
}

/**
 * @class Voice
 * キャラクターのセリフ出現時の音声を定義します。
 * SFXです。
 */
class Voice {
  /**
   * @param {...string} [src] オーディオファイルのパスを指定します。複数指定するやり方はHowlerのものと同じです。
   */
  constructor(...src) {
    this.audio = new Howl({ src: src });
  }

  play() {
    this.audio.play();
  }
}

/**
 * @class DialogTexture
 * ダイアログのテクスチャ用オブジェクトです。
 */
class DialogTexture {
  /**
   * @param {string} [url] 画像URL(URI)です。
   * @param {number} [width] 枠線の幅を定義。ここの値は枠線としたい部分(隅まで含めて)が完全に収まるような数値にしてください。単位はPX。
   * @param {string} [theme] このテクスチャが明るいのか暗いのか(`light`|`dark`)を指定。
   */
  constructor(url, width, theme) {
    if (typeof url !== "string") {
      throw new TypeError("型エラー : URLが文字列になっていません");
    }
    if (typeof width !== "number") {
      throw new TypeError(
        "型エラー : widthが数値じゃないです。ここではPXを暗黙の単位とした数値を入れてください"
      );
    }
    this.url = url;
    this.image = new Image();
    this.image.src = url;
    this.width = width;
    this.theme = theme;
    this.defoColor = "black";
    if (this.theme == "dark") {
      this.defoColor = "white";
    }
  }

  /**
   * ダイアログのテーマを変更するためのオブジェクトを返します。
   * @returns {Object} ダイアログ側でCSS操作ができるような形のオブジェクトが返される。
   */
  get css() {
    return {
      "--border-width": `${this.width}px`,
      "--slice-width": this.width,
      "border-image-source": `url("${this.url}")`,
      color: this.defoColor,
      padding: `${this.width * 3}px`,
    };
  }
}

/**
 * アセットを全て収めたオブジェクト
 * 音声、画像などが階層的に存在しています。
 * @type {Object}
 */
const Assets = {
  audio: {
    voice: {
      empty: new Voice("./assets/empty.mp3"),
      example: new Voice("./assets/example1.mp3"),
    },
    fx: {},
    bgm: {},
  },
  images: {
    urls: {},
    themes: {
      シンプルライト: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB30lEQVR4AeyTQY6DMBAE8f7/z+xunEMQhzm0xgWkpOBEWOOOq9Q/27btPhyDfwF//P1QBBRAkX/nHgTs+7759DN4s399HQS83rgsJaCApbjPYQo4M1n6RgFLcZ/DFHBmsvSNApbiPod9p4AzB+yNAjD0M1gBkwO2KgBDP4MVMDlgqwIw9DNYAZMDtioAQz+DFTA5YKsCMPQzWAGTA7YuFIDd8dLBCoD1KEABMAE43gYoACYAx9sABcAE4HgboACYABxvA5oFVMcroCLUvK+AZsDV8QqoCDXvK6AZcHW8AipCzfsKaAZcHa+AilDzvgKaAVfHK6Ai1LyvgGbA1fHPFFDd+kL7CoBlKEABMAE43gYoACYAx9sABcAE4HgboACYABxvA54jAL7JTeNtACxOAQqACcDxNkABMAE43gYoACYAx9sABcAE4HgbEApIxxWQEgznFRACTMcVkBIM5xUQAkzHFZASDOcVEAJMxxWQEgznFRACTMcVkBIM5xUQAkzH7ykgvfWF5hUAy1CAAmACcLwNUABMAI63AQqACcDxNkABMAE43gbcRwD8Tx8abwNgsQpQAEwAjrcBCoAJwPE2QAEwATj+0IAxxjaGzxi9DD6dHwR8bvh7DQEFFJy7t38BAAD//01Lw/oAAAAGSURBVAMAN6JucKoZFW0AAAAASUVORK5CYII=",
        3,
        "light"
      ),
      シンプルダーク: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB10lEQVR4AeyTQQrDMAwE7f7/z+k1OhgdhDRNOoVAjJC3mWE/lz+UwGf5QwkoAMW/VhCw9157++zdy+DuPAi4D3yfIaCAGc7HFAUc0cwMFDDD+ZiigCOamYECZjgfU/5TwBHH/EAB88xDogICjvmDAuaZh0QFBBzzBwXMMw+JCgg45g8KmGceEhUQcMwfFDDPPCQqIOCYPwwKmP+4JyQqALakAAXABOB4G6AAmAAcbwMUABOA422AAmACcLwNaBaQXa+AjFDzXAHNgLPrFZARap4roBlwdr0CMkLNcwU0A86uV0BGqHmugGbA2fUKyAg1zxXQDDi7/p0Csq/+obkCYBkKUABMAI63AQqACcDxNkABMAE43gYoACYAx9uA9wiAv+Sh8TYAFqcABcAE4HgboACYABxvAxQAE4DjbYACYAJwvA0oCqiuK6BKsLivgCLA6roCqgSL+wooAqyuK6BKsLivgCLA6roCqgSL+wooAqyuK6BKsLivgCLA6vozBVS/+of2FQDLUIACYAJwvA1QAEwAjrcBCoAJwPE2QAEwATjeBjxHAPxPXxpvA2CxClAATACOtwEKgAnA8TZAATABOD404Lqu5dPP4O48CLgPfJ8hoICEc/f4CwAA//9AiDShAAAABklEQVQDAFsqjV/qTYqYAAAAAElFTkSuQmCC",
        3,
        "dark"
      ),
      インターラインダーク: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACEUlEQVR4AeyTi27CQAwEz/3/f75eCkVqaWTkR5akU5EicthLZrQf4+ffXB+5xuhmsDDfXr8F3O7y/zACCDgM9d9Bm4BH3eacg6ufwVLxYL4JWJ95qQggQEX+nrsrwMyGGZdZDYM776e3XQFP3+RGCwEEtGB9fSkCXmfV8s3/KaAFZWwpAmLcyqYQUIYytggBMW5lUwgoQxlbhIAYt7IpBJShjC1CQIxb2RQCylDGFiEgxq1sCgFlKGOLDhQQ+4FXn0KA2DACECAmII6nAQgQExDH0wAEiAmI42kAAsQExPE0oFmAtx4BHqHmcwQ0A/bWI8Aj1HyOgGbA3noEeISazxHQDNhbjwCPUPM5ApoBe+sR4BFqPkdAM2Bv/TUFeE/9RucIEMtAAALEBMTxNAABYgLieBqAADEBcTwNQICYgDieBlxHgPhJThpPA8TiEIAAMQFxPA1AgJiAOJ4GIEBMQBxPAxAgJiCOpwFJAdlxBGQJJucRkASYHUdAlmByHgFJgNlxBGQJJucRkASYHUdAlmByHgFJgNlxBGQJJucRkASYHT+ngOxTv9E8AsQyEIAAMQFxPA1AgJiAOJ4GIEBMQBxPAxAgJiCOpwHnESD+pReNpwFisQhAgJiAOJ4GvKuAOefgqmOw55kG7JE56D4CDgK9F7MJsHX4dZnZMOMy62XwzXt73wSsd14qAghwyHcffwIAAP//dqsLcwAAAAZJREFUAwAZ02qFFnwMkAAAAABJRU5ErkJggg==",
        6,
        "dark"
      ),
      オーソドックスダーク: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACD0lEQVR4AeyUwW3DQAwET2ohjfiRHlJzesjDjaQGBXkYkB8EYSx5K8ljQEigM7nWjNfr2L2279vG1c9gh3w8Cdgf8P8cAgiYwzlMWfc/OePjPrj6GeyZ04DwuznnAAFzOIcpoYDlcwyuOgYjeIUCgvdzu5gAAoqBvroOAa8SK37/ewoohqisQ4BCr2AWAQUQlRUIUOgVzCKgAKKyAgEKvYJZBBRAVFYgQKFXMIuAAojKCgQo9ApmEVAAUVkxUYDyMa87iwCzWwQgwEzAHE8DEGAmYI6nAQgwEzDH0wAEmAmY42lAs4BsPQIyQs3nCGgGnK1HQEao+RwBzYCz9QjICDWfI6AZcLYeARmh5nMENAPO1iMgI9R8joBmwNn6awrInvpA5wgwy0AAAswEzPE0AAFmAuZ4GoAAMwFzPA1AgJmAOZ4GXEeA+UlOGk8DzOIQgAAzAXM8DUCAmYA5ngYgwEzAHE8DEGAmYI6nAaIAdRwBKkFxHgEiQHUcASpBcR4BIkB1HAEqQXEeASJAdRwBKkFxHgEiQHUcASpBcR4BIkB1/JwC1Kc+0DwCzDIQgAAzAXM8DUCAmYA5ngYgwEzAHE8DEGAmYI6nAecRYP6kF42nAWaxCECAmYA5ngYcVcD2MwZXHYPIMw2IyEy6j4BJoKOYdfm6L49r/N4GVz+DB+//vzQg+mpOuo+ABHT38R8AAAD//4MZoCUAAAAGSURBVAMAxsJ6Fc9i7Q0AAAAASUVORK5CYII=",
        6,
        "dark"
      ),
      オーソドックスシルバー: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACA0lEQVR4AeyUQW6EMBAEbd4Gr4a/EeWwEjmMRqv2uIFUJCsR1kwvVdtZ2uVn3/eTU8/ggrz9EXC94O85BBAwh3OYslz/5azr2jj1DK7MaUD43ZxzgYA5nMOUUEDvvfXO6X0Mg8hAKCAa4PlYAggYy/PrbQj4GtnYgf8pYCxDaRsCJHz6MAJ0htIGBEj49GEE6AylDQiQ8OnDCNAZShsQIOHThxGgM5Q2IEDCpw8jQGcobZgoQPqcrx1GgFktAhBgJmCOpwEIMBMwx9MABJgJmONpAALMBMzxNKBYQLYeARmh4nsEFAPO1iMgI1R8j4BiwNl6BGSEiu8RUAw4W4+AjFDxPQKKAWfrEZARKr5HQDHgbP07BWRvfaN7BJhlIAABZgLmeBqAADMBczwNQICZgDmeBiDATMAcTwPeI8D8Jg+NpwFmcQhAgJmAOZ4GIMBMwBxPAxBgJmCOpwEIMBMwx9MAUYA6jgCVoDiPABGgOo4AlaA4jwARoDqOAJWgOI8AEaA6jgCVoDiPABGgOo4AlaA4jwARoDr+TAHqW99oHgFmGQhAgJmAOZ4GIMBMwBxPAxBgJmCOpwEIMBMwx9OA5wgwf9KXxtMAs1gEIMBMwBxPA+4q4DzPxhnHIPJMAyIyk54jYBLoKGbZtq1/znEcjVPP4MP79zcNiL6ak54jIAFdff0DAAD//y4oeRYAAAAGSURBVAMAAvNBzj5X/58AAAAASUVORK5CYII=",
        6,
        "dark"
      ),
      マザー2プレーン: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACr0lEQVR4AeydYW6DMAxGsx2y3RHXXnIzVRVZtCGkTvgofVMQXhPH8J4MP/lO7X9/lsKRUomB4Vk/XhGwfndWVgkgoIpo7IIlAU9b7PJ7SRxlBqbrKTf7/elYEvA0gR/7EkBAX57Nu80F5PYpPWZO51PiKDMocTMzma3FecwF5AmCbQggYBvOxSqrBPhHzvVyTRxlBp5VkbqbWCXArT9GuKO7QIBYxiTgz67hdvg3uG8l/8ixtXmcf86J45x5TIFn5Rl6trbuxns6TwLszFARQICK/L1uswD/yLnv8fGnCJNmAR9PuzMABHQG2rodAlqJdV6PgM5AW7dDQCuxzus3FND5yg+yHQLEIhGAADEBcXk6AAFiAuLydAACxATE5ekABIgJiMvTAYMF1LZHQI3Q4HkEDAZc2x4BNUKD5xEwGHBtewTUCA2eR8BgwLXtEVAjNHgeAYMB17ZHQI3Q4HkEDAZc2/6YAmp3vaN5BIhlIAABYgLi8nQAAsQExOXpAASICYjL0wEIEBMQl6cDjiNAfCdvWp4OEItDAALEBMTl6QAEiAmIy9MBCBATEJenAxAgJiAuTwcEBUTTERAlGMxHQBBgNB0BUYLBfAQEAUbTERAlGMxHQBBgNB0BUYLBfAQEAUbTERAlGMxHQBBgNP09BUTvekf5CBDLQAACxATE5ekABIgJiMvTAe8mYPYxGvHl76N8hAkdIHaIgB0I+LJruB3+YzSl72HZ2jx8631ynIFY4L8d5hl6trbsxns6N3SALWd0J4CA7kjbNlwlwLeSbzHiU5oz8KzWqFglYM1GrHmNAAJe49Ytay4gv539W9vHvsWIr2nOwLPysRnLbC3OYy4gTxBsQwAB23AuVlkS4Fsmx76tiB8/aG2kM6tZbP8+jiUBj6v5pTsBBFSQjp7+BwAA///ZK8tRAAAABklEQVQDABbALLXQhdnAAAAAAElFTkSuQmCC",
        15,
        "dark"
      ),
      マザー2ミント: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAC1ElEQVR4AeyXPU4kMRBGvSNtsOFmK+0B9i/Z83ABEkKOQUjCBTgPCX8HQCIjJCAAGcngQVNtm7L7m5l+SEW3urpc7fdU3bAKjT9/vv1+JmwGjThDs4DWBtw/TQAB03yGZ00B1mvm8v4kEDYDi5tl0hRgFXC9LwEE9OXZvNqagHx8rNfM0d3XQNgMLG4529zSmoA8wfk8BBAwD2ezS5WA/JVjrkTilUArqyoBryvv068t2gsCxDJW+dc5/4LXjNLFwVkgzkyFOcOcbc6cCTDxzZNAwDyczS7NAvJXjrnqwhIeJs0CFsZ2+HYRMBzxdINuAh5ur8KSYhprfbabgPqW3JkTQEBOQ3A+owDB7nagJQLEkhCAADEBcXsmAAFiAuL2TAACxATE7ZkABIgJiNszAYMFlJZHQInQ4DwCBgMuLY+AEqHBeQQMBlxaHgElQoPzCBgMuLQ8AkqEBucRMBhwaXkElAgNziNgMODS8vspoLTrLcojQCwDAQgQExC3ZwIQICYgbs8EIEBMQNyeCUCAmIC4PROwPwLEO9nR9kyAWBwCECAmIG7PBCBATEDcnglAgJiAuD0TgAAxAXF7JsApwFuOAC9BZz0CnAC95QjwEnTWI8AJ0FuOAC9BZz0CnAC95QjwEnTWI8AJ0FuOAC9BZz0CnAC95bspwLvrLapHgFgGAhAgJiBu320Cvv/6G5YUvbx1E9DrgZa2DgLExpsF/D8/DCnEz7417ROPeGx9qGYBrQ24f5oAAqb5DM+urh9vvqT49+M4pDj9+RRSWE8RR444tPC88YscE9d4TLzjsWECzD4kHAQQ4IDXo7RKQByhFD2a7vMaiVM81uyzSkDNQtzzOQII+By3blVrAuJXOUX8Wm+KOFrE+1+IH1lsYhavJa7xmNtbE5AnOJ+HAALm4Wx2MQXEUdkUcZyI939YP7LYxCxeswyYAqwCrvclgIACz9HpFwAAAP//kEW35QAAAAZJREFUAwDHa1gFG3K6wwAAAABJRU5ErkJggg==",
        21,
        "dark"
      ),
      マザー2ストロベリー: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAC0UlEQVR4AeyXsVHzQBBG73f2dwBkEAFt0AWElEAdlEAIXdAGEEEGdEAIOmZkTozW52Pv9NnWY7TIo9PuSu/NSvYiFP6d/D/+JGwGhThDsYDSBpy/mgACVvNpvmoKsB4zD693gbAZWNwsk6YAK4HjdQkgoC7P4moDAen4WI+ZcPsSCJuBxS1lm1oaCEgX+DwNAQRMw9nssp6A9LFjlmLhm0Ahq/UEfFfeoX8bdCsIEMtYpG/n9A0++KZjXOTZ9U0gbgw63eHkcZSyTZkzAR0n5YYAJf2ud7GA9JHT5bN1BDxMigV0/dgqEkBARZh/KVVNwNv7c5hT/AX2WE41AWPFOZYngIA8o6ZnTCig6X1sbXEEiNUhAAFiAuL2TAACxATE7ZkABIgJiNszAQgQExC3ZwIaC8iVR0COUON1BDQGnCuPgByhxusIaAw4Vx4BOUKN1xHQGHCuPAJyhBqvI6Ax4Fx5BOQINV5HQGPAufK7KSB31xu0jgCxDAQgQExA3J4JQICYgLg9E4AAMQFxeyYAAWIC4vZMwO4IEN/JlrZnAsTiEIAAMQFxeyYAAWIC4vZMAALEBMTtmQAEiAmI2zMBTgHedAR4CTrzEeAE6E1HgJegMx8BToDedAR4CTrzEeAE6E1HgJegMx8BToDedAR4CTrzEeAE6E3fTgHeu96gfASIZSAAAWIC4vbVJmB/7yjMKWp5qyag1gXNrQ4CxMaLBdxfXYY+xNe+Me17HnFfelHFAkobcP5qAghYzaf56uLx4+lfH6cH56GPcHEYlmFcRhw54tKg0x1OGPZc477nHfcFE9AVZKtOAAHVkZYVXE9AMkpl5Wd4diGr9QTMkONUt4yAqUgbfQYC4lu5j/i2HovlN6N01Pi8/MY4xiwe67nGfepiICBd4PM0BBAwDWeziykgjspYxHEifn6w/mYxxiweswyYAqwEjtclgIAMz9bLXwAAAP//E2UTMwAAAAZJREFUAwBjvgQFRDfREgAAAABJRU5ErkJggg==",
        21,
        "dark"
      ),
      マザー2バナナ: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACzElEQVR4AeyXMVIcMRBF5Y2wI1/BGSb0UZz6Kg59Fac+ikMg4wpEQAalolRoqe2RRKvn7+68qWpmazTdvXqveobdpcHj++fLZ8JmMIgzDQsYbcD9ywQQsMwnfNUUYD1mrh/+JcJmYHGzTJoCrASuzyWAgLk8h6vtCajHx3rM3Kc/ibAZWNxqtqk69gRU1/m4EgEErATaatMloH7kWIW4/kpglFWXgNfSZ/T3iLaCALGMXf12rt/gPaP068dTIp5MhTXDmm3NnAkw8a2zgIB1OJtdhgXUjxyz6sYWPEyGBWyMbfh2ERCOeLnBNAF3t9dpS7GMtX91moD+ltxZE0BATUPweUUBgt2dQEsEiCUhAAFiAuL2TAACxATE7ZkABIgJiNszAQgQExC3ZwKCBbTKI6BFKHgdAcGAW+UR0CIUvI6AYMCt8ghoEQpeR0Aw4FZ5BLQIBa8jIBhwqzwCWoSC1xEQDLhV/jwFtHZ9ROsIEMtAAALEBMTtmQAEiAmI2zMBCBATELdnAhAgJiBuzwScjwDxTk60PRMgFocABIgJiNszAQgQExC3ZwIQICYgbs8EIEBMQNyeCXAK8KYjwEvQmY8AJ0BvOgK8BJ35CHAC9KYjwEvQmY8AJ0BvOgK8BJ35CHAC9KYjwEvQmY8AJ0Bv+mkK8O76iPIRIJaBAASICYjbT5uAb5dXaUsxy9s0AbO+0NbqIEBsfFjA3/8XqYT4ux9N+8Ijn0e/1LCA0Qbcv0wAAct8wld3N4+3n0pcffmZSnxNv1OJZBx55IgLg05KhV8+F675XHjn88AEJI4AAggIgDpSsktAHqESI8W3eG/hlM89++8S0FOIez5GAAEf4zYta09AfiuXyG/rQ5FHi3j7D/E9i0PM8rXCNZ9re3sC6gU+r0MAAetwNruYAvKoHIo8TsTbD9b3LA4xy9csA6YAK4HrcwkgoMEzevkFAAD//4dnJgAAAAAGSURBVAMAeq0EBXdG1C4AAAAASUVORK5CYII=",
        21,
        "dark"
      ),
      マザー2ピーナッツ: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACzElEQVR4AeyXMVLkMBBFxWQbbbrLCRiOwhU4BiExIcfgChyF4QRASkQIJaoEGmrakmjJf2b8qGrscrvV1nvVNqxC48/6z9k7YTNoxBmaBbQ24P5pAgiY5jM8awqwXjMPTzeBsBlY3CyTpgCrgOt9CSCgL8/m1bYE5ONjvWZe7u8CYTOwuOVsc0tbAvIE5/MQQMA8nM0uVQLyV465EolPAq2sqgR8rnxMv/ZoLwgQy1jlX+f8C14zSpdXm0BsTIU5w5xtzpwJMPHNk0DAPJzNLs0C8leOuerCEh4mzQIWxnb4dhEwHPF0g24Cnl/fw5JiGmt9tpuA+pbcmRNAQE5DcD6jAMHuDqAlAsSSEIAAMQFxeyYAAWIC4vZMAALEBMTtmQAEiAmI2zMBgwWUlkdAidDgPAIGAy4tj4ASocF5BAwGXFoeASVCg/MIGAy4tDwCSoQG5xEwGHBpeQSUCA3OI2Aw4NLyxymgtOs9yiNALAMBCBATELdnAhAgJiBuzwQgQExA3J4JQICYgLg9E3A8AsQ7OdD2TIBYHAIQICYgbs8EIEBMQNyeCUCAmIC4PROAADEBcXsmwCnAW44AL0FnPQKcAL3lCPASdNYjwAnQW44AL0FnPQKcAL3lCPASdNYjwAnQW44AL0FnPQKcAL3lhynAu+s9qkeAWAYCECAmIG7fbQL+/z0JS4pe3roJ6PVAS1sHAWLjzQLubtchhfjZ96Z94hGPrQ/VLKC1AfdPE0DANJ/h2dXm7fEkxfnpdUjx7+IypLCeIo4csbbwfPGLHBPXeEy847FhAsw+JBwEEOCA16O0SkAcoRQ9mh7zGolTPNbss0pAzULc8zsCCPgdt25VWwLiVzlF/FrvijhaxPdfiD9Z7GIWryWu8Zjb2xKQJzifhwAC5uFsdjEFxFHZFXGciO9/WH+y2MUsXrMMmAKsAq73JYCAAs/R6Q8AAAD//7MwMnQAAAAGSURBVAMAkyVYBSUZgvwAAAAASUVORK5CYII=",
        21,
        "dark"
      ),
      FF2: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACqklEQVR4AeydzVECQRBGpzwbiuF4NQw2CAjDq+EYAEFwV7ZgtffQTLNN8/Hzqhx3yukf973qKW68tNZ+WDoGo4A9f35UBBCgIn/sGxKwWq0a63wGR8YnHyEBJytwmCKAgBS+fLIrwF45ts16vW4sn4Fl5TG0Ma4AG8S+jgAC6tiGKs8EeCNjrxxbdRiGxhosktn1bA88tjMBNuGh9zf0cggQy3AFRK6dr89dY+1m17D16TG0Ma4AG8S+jgAC6tiGKocE2E86X5/f+2vnsEIdniDIXsOWVeTVQwIihYhZRgABy7hdLAsBF0O5rBAClnG7WBYCLoZyWaErClj2Dz56FgLEhhGAADEBcXsmAAFiAuL2TAACxATE7ZkABIgJiNszAcUCeuUR0CNUfI6AYsC98gjoESo+R0Ax4F55BPQIFZ8joBhwrzwCeoSKzxFQDLhXHgE9QsXnCCgG3Cv/mAJ6b31D5wgQy0AAAsQExO2ZAASICYjbMwEIEBMQt2cCECAmIG7PBDyOAPGb3Gl7JkAsDgEIEBMQt2cCECAmIG7PBCBATEDcnglAgJiAuD0TkBSQTUdAlmAyHwFJgNl0BGQJJvMRkASYTUdAlmAyHwFJgNl0BGQJJvMRkASYTUdAlmAyHwFJgNn0+xSQfesbykeAWAYCECAmIG7PBCBATEDcngm4BwH2y2jeP97atFrbNtZ2z+P1b1lWezjdHyagi6g2AAG1fLvVXQHel9HYEZuuomd/WiaWuMfQxrgCbNBhz+8KAgiooHpGzZmAzWbTpmVreKNkR++Z9xFWE9fxaeNnAuwB++sQQMB1OLtdXAHjqEzLZtvriP0w+ybVkYdlNfEbn/bvdu8KsEHs6wggoI5tqHJIwDhCrP9PiFEWEQMhAZFCxCwjgIAOt+rjXwAAAP//N3Zm+gAAAAZJREFUAwA9em6dmIUPRAAAAABJRU5ErkJggg==",
        15,
        "dark"
      ),
      ゴージャス: new DialogTexture(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADlElEQVR4AeydTY4TMRCFa3IBTkHYMgKxBSFyCdacIeIIKGeALZeIhFgjpGFLOAUnCF2jruiZGcft+Ke6Zx6icE87dtnfR1majpSsJPLn+Pv5sWW8e/H6OKdouVedO4JZogJiA3i/LgEKqMsze7ZAgJaKhaw/SfWA5e1/fpc5BSyt/r4HlsZVW8wVCMAOXvchQAF9OEezrLQkLGT9dCi/MeTLMKhCHD6KWKxvhvnHGGaf1V9cm61X21ochmPIjnTjrS0rwPl/AQUsWsDhz3C8nI/t542cYruV7RIC1iwT9lji8HFWQAmxymMpoDLQ3OnyBUBJbt4/kVTcfPshS47U/rQ/OKYyDeQLyEzAl58nQAHn+TTvnSYgcuw0X91CEugxZJF7HE0TsBAQS1wmBThbowAKcCbgnJ4V8HgEOO90pulZAc5iKGC2AuCXr9Pj5OExrfN6Z58+YAUMYwtnBcTIdLpPAZ1Ax9KEArBk8E3q2GjeP08AGeob/BYwKhQAHbzsQ4AC+nCOZlnZY1RtBUsmOoQdFxEAtsraghVwEc3pg1KvpIAUocb9FNAYcGp6CkgRatxPAY0Bp6angBShxv0U0BhwanoKSBFq3E8BjQGnpqeAFKHG/RTQGHBq+ocpILXrGfVTgLMMCqAAZwLO6VkBFOBMwDk9K4ACnAk4p2cFUIAzAef0rICHI8B5JwtNzwpwFkcBFOBMwDk9K4ACnAk4p2cFUIAzAef0rAAKcCbgnJ4VUCigdDgFlBIsHE8BhQBLh6/2X/+KhRyu5RSlM3N8SADYGm9tWQEhpu4/UUB35GHCUAB+fD2UTDiEP00mgAzh4+txfCgAe3jdhQAFdMEcTxIXAMfR7sNeLOJTsUcJGCdtw28k0d67ERdw97W804DAMgU0AOE1JQV4kR/zUsAIwquhAC/yY14KGEF4NRTgRX7MSwEjCK9mmgD4pUwfoVp4LXpueY2HtlN++cL1TxOAI3hdlQAFVMWZP1m+gMhxpOV3X1y/fSVLjvv29P+93GMHNWUIwGG8rkWAAmqRvHCeMgFwHAVlCPf1sewpdjvZLSHw8TvsJbbHC9nfDisTcDsF/ykhQAEl9CqMXV09+3Vlkfs1fJPyYwnjm9STBnd8Ea4N11xrCfbR9UNrvLVlBdQCfOE8FHAhuFrDAgFaEhbBcYTfrFFyDavevHwjcwpYmrTYu3HVFnMFArCD130IUECCc+vufwAAAP//c4U41QAAAAZJREFUAwAlKP+yoZsM6AAAAABJRU5ErkJggg==",
        30,
        "dark"
      ),
    },
  },
};

/**
 * 音声ファイルを自由に流せるようにセキュリティ解除
 * `click`または`touchstart`にイベントリスナーを渡します。
 */
function unlockAudioSecurity() {
  const silentAudio = new Howl({
    src: ["./assets/empty.mp3"],
    onplay() {
      this.stop();
      this.unload();
    },
  });
  silentAudio.play();
  window.removeEventListener("click", unlockAudioSecurity);
  window.removeEventListener("touchstart", unlockAudioSecurity);
}
window.addEventListener("click", unlockAudioSecurity);
window.addEventListener("touchstart", unlockAudioSecurity);
